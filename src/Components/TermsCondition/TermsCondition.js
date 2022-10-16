import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./TermsCondition.css";
import ReactHtmlParser from "react-html-parser";

const TermsCondition = () => {
  const history = useHistory();
  const [lodaing, setLoading] = useState(false);
  const [description, setDescription] = useState([]);

  // logout and clear the session stroage
  const handleLogout = () => {
    sessionStorage.setItem("token", "");
    history.push("/");
  };

  //redirect add book page
  const handleAgreBtn = () => {
    setTimeout(() => {
      history.push("/books");
    }, 150);
  };

  //getting terms and condition description
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://server.cardiaclibrary.org/getTermsCondition"
        );

        const data = await response.json();
        setDescription(data);
      } catch (error) {
        console.log("err", error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, []);

  return (
    <div className="container-fluid">
      <h1 className="text-center termsAndConditionHead my-5">WELCOME!</h1>
      <div className="form-check agreeCheckbox">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          onClick={() => handleAgreBtn()}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          I Agree
        </label>
      </div>
      <div className="termsAndConditionsBody my-5">
        <button
          className="btn btn-info mb-2"
          data-bs-toggle="modal"
          data-bs-target="#termsAndCondition"
        >
          Terms And Conditions
        </button>
        <span>Research and Education Purpose only.</span>
      </div>

      {/* Terms and Conditions modal */}
      <div
        className="modal fade"
        id="termsAndCondition"
        tabIndex="-1"
        aria-labelledby="termsAndConditionLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="termsAndConditionLabel">
                Terms And Conditions
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {description?.map((dsData) => (
                <span
                  key={dsData?._id}
                  style={{ textAlign: "justify", padding: "0px 0px 15px" }}
                >
                  {ReactHtmlParser(dsData?.description)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Terms and Conditions modal */}
      <div className="d-flex justify-content-center">
        <button onClick={() => handleLogout()} className="btn btn-danger">
          <i className="bi bi-x-lg"></i> Disagree
        </button>
      </div>
    </div>
  );
};

export default TermsCondition;
