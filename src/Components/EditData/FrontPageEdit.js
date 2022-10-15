import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";

const FrontPageEdit = () => {
  const topImgRef = useRef();
  const middleImgRef = useRef();
  const [disclaimer, setDisclaimer] = useState("");
  const [suceesMsg, setSuccessMsg] = useState(false);

  //for reading state
  const [loading, setLoading] = useState(false);
  const [topImgData, setTopImgData] = useState([]);
  const [midImgData, setMidImgData] = useState([]);
  const [disclaimerData, setDisclaimerData] = useState([]);

  //top banner submission
  const handleTopBannerSubmit = (e) => {
    e.preventDefault();
    const frontPageTopBanner = {
      topImage: topImgRef?.current?.value,
    };
    // INSERT top image ADMIN AT THE DATABASE

    fetch("https://server.cardiaccasestudy.net/addFrontPageTopImage", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(frontPageTopBanner),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setSuccessMsg(true);
          topImgRef.current.value = "";
          window.location.reload();
        }
      });
  };

  //middle banner submission
  const handleMiddleBannerSubmit = (e) => {
    e.preventDefault();
    const frontPageMiddleBanner = {
      middleImage: middleImgRef?.current?.value,
    };
    // INSERT A middle image AT THE DATABASE

    fetch("https://server.cardiaccasestudy.net/addFrontPageMiddleImage", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(frontPageMiddleBanner),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setSuccessMsg(true);
          middleImgRef.current.value = "";
          window.location.reload();
        }
      });
  };

  //disclimer submission
  const handleDisclaimerSubmit = (e) => {
    e.preventDefault();
    const frontPageDisclaimer = {
      description: disclaimer,
    };

    // INSERT A disclaimer AT THE DATABASE

    fetch("https://server.cardiaccasestudy.net/addFrontPageDisclaimer", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(frontPageDisclaimer),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setSuccessMsg(true);
          window.location.reload();
        }
      });
  };

  // this is for edit and read function section

  //getting top img form server
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://server.cardiaccasestudy.net/getFrontPageTopImage"
        );
        const data = await response.json();
        setTopImgData(data);
      } catch (error) {
        console.log("err", error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, []);

  //getting mid img form server
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://server.cardiaccasestudy.net/getFrontPageMiddleImage"
        );
        const data = await response.json();
        setMidImgData(data);
      } catch (error) {
        console.log("err", error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, []);

  //getting disclaimer img form server
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://server.cardiaccasestudy.net/getFrontPageDisclaimer"
        );
        const data = await response.json();
        setDisclaimerData(data);
      } catch (error) {
        console.log("err", error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, []);

  //for deleting data

  //for top image  delete
  const handleTopImageRemove = (id) => {
    // console.log('deleted',id);

    fetch(`https://server.cardiaccasestudy.net/topImgdelete/${id}`, {
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

  //for middle image delete
  const handlemidImageRemove = (id) => {
    // console.log('deleted',id);

    fetch(`https://server.cardiaccasestudy.net/middleImgdelete/${id}`, {
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

  //for disclaimer image delete
  const handleDisclaimerRemove = (id) => {
    // console.log('deleted',id);

    fetch(`https://server.cardiaccasestudy.net/disclaimerDelete/${id}`, {
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
    <div>
      <Link to="/dashboard" className="back">
        {" "}
        <i className="bi bi-skip-backward-fill"></i> Back{" "}
      </Link>
      <h1 style={{ textAlign: "center", marginTop: "8px" }}>
        Home page edit and adding data
      </h1>
      {/* top banner form */}
      <form onSubmit={handleTopBannerSubmit}>
        <div className="mb-3 mt-5 container">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Top image Link
          </label>
          <div className="input-group mb-3">
            <input
              required
              type="text"
              className="form-control"
              placeholder="Your image link"
              aria-label="Recipient's username  with two button addons"
              id="exampleFormControlTextarea1"
              aria-describedby="button-addon2"
              ref={topImgRef}
            />

            <button
              className="btn btn-outline-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Delete
            </button>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="staticBackdrop"
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
                      TOP IMAGE
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
                        width: "18rem",
                      }}
                    >
                      {topImgData.map((tpData) => (
                        <span key={tpData?._id}>
                          <img
                            src={tpData?.topImage}
                            className="card-img-top img-fluid"
                            style={{
                              height: "150px",
                            }}
                            alt="..."
                          />

                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{ margin: "10px 20px" }}
                            onClick={() => handleTopImageRemove(tpData._id)}
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

            {/* top Image submit button */}
            <button className="btn btn-outline-primary" type="submit">
              Submit
            </button>

            {/* <button
              className="btn btn-primary"
              type="submit"
              id="button-addon2"
            >
              Submit Top Image
            </button> */}
          </div>
        </div>
      </form>

      {/* middle banner */}
      <form onSubmit={handleMiddleBannerSubmit}>
        <div className="mb-3 container">
          <label htmlFor="ControlTextarea2" className="form-label">
            Middle image Link
          </label>
          <div className="input-group mb-3">
            <input
              required
              type="text"
              className="form-control"
              placeholder="Your image link"
              aria-label="Recipient's username"
              id="ControlTextarea2"
              aria-describedby="button-addon2"
              ref={middleImgRef}
            />

            <button
              className="btn btn-outline-primary"
              type="button"
              id="button-addon2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdropMiddleImage"
            >
              Delete
            </button>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="staticBackdropMiddleImage"
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
                      Middle IMAGE
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
                        width: "18rem",
                      }}
                    >
                      {midImgData.map((tpData) => (
                        <span key={tpData?._id}>
                          <img
                            src={tpData?.middleImage}
                            className="card-img-top img-fluid"
                            style={{
                              height: "150px",
                            }}
                            alt="..."
                          />

                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{ margin: "10px 20px" }}
                            onClick={() => handlemidImageRemove(tpData._id)}
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

            {/* submit middle image */}
            <button
              className="btn btn-outline-primary"
              type="submit"
              id="button-addon2"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* disclaimer */}
      <form onSubmit={handleDisclaimerSubmit}>
        <div className="container mt-5"></div>
        <div className="container">
          <p>Disclaimer</p>
          <ReactQuill
            className="fullDescription mb-5"
            theme="snow"
            value={disclaimer}
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
              setDisclaimer(val);
            }}
          />
        </div>
        <div className="d-flex justify-content-center mb-5 container">
          {/* delete disclaimer */}
          <button
            className="btn btn-outline-primary btn_terms_submit"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdropDisclaimer"
          >
            Delete Disclaimer
          </button>

          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id="staticBackdropDisclaimer"
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
                    Disclaimer
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
                      padding: "10px",
                    }}
                  >
                    {disclaimerData.map((tpData) => (
                      <span key={tpData?._id}>
                        <strong style={{ textAlign: "justify" }}>
                          {ReactHtmlParser(tpData?.description)}
                        </strong>

                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleDisclaimerRemove(tpData._id)}
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

export default FrontPageEdit;