import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import "./TermsConditionEdit.css";
import ReactHtmlParser from "react-html-parser";

const TermsConditionEdit = () => {
  const [suceesMsg, setSuccessMsg] = useState("");
  const [showDescription, setShowDescription] = useState("");
  const [termsAndCondition, setTermsAndCondition] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTermsSubmit = (e) => {
    e.preventDefault();
    const termsConditionData = {
      description: showDescription,
    };
    // INSERT A ADMIN AT THE DATABASE
    fetch("https://server.cardiaclibrary.org/addTermsCondition", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(termsConditionData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setSuccessMsg(true);
          window.location.reload();
        }
      });
  };

  //getting terms and conditin form server
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://server.cardiaclibrary.org/getTermsCondition"
        );

        const data = await response.json();
        setTermsAndCondition(data);
      } catch (error) {
        console.log("err", error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, []);

  //delete terms and condition
  const handleTermsConditionRemove = (id) => {
    fetch(`https://server.cardiaclibrary.org/termsConditiondelete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          console.log("deleted successfully");
          window.location.reload();
        }
      });
  };

  return (
    <div className="p-4">
      <Link to="/dashboard" className="back">
        {" "}
        <i className="bi bi-skip-backward-fill"></i> Back{" "}
      </Link>
      <h1 className="text-center">Terms and condtion edit and adding data</h1>
      <form onSubmit={handleTermsSubmit}>
        <div>
          <ReactQuill
            className="fullDescription mt-5 mb-5"
            theme="snow"
            value={showDescription}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["code-block"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "color",
              "background",
              "list",
              "bullet",
              "indent",
              "code-block",
              "align",
            ]}
            onChange={(val) => {
              setShowDescription(val);
            }}
          />
        </div>

        <div className="d-flex justify-content-center">
          {/* delete disclaimer */}
          <button
            className="btn btn-outline-primary btn_terms_submit"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdropTermsCondition"
          >
            Delete
          </button>
          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id="staticBackdropTermsCondition"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Terms and Condition
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div
                  className="modal-body"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {/* this is modal body */}

                  <div
                    className="card"
                    style={{
                      width: "100%",
                      padding: "15px",
                      textAlign: "justify",
                    }}
                  >
                    {termsAndCondition.map((tpData) => (
                      <span key={tpData?._id}>
                        <strong>{ReactHtmlParser(tpData?.description)}</strong>

                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleTermsConditionRemove(tpData._id)}
                        >
                          Confirm Delete
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* submit disclaimer */}
          <button
            className="btn btn-outline-primary btn_terms_submit"
            type="submit"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default TermsConditionEdit;
