import React, { useState, useRef, useEffect } from "react";
import QrReader from "react-qr-reader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./home.css";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import loader from "../../images/Loading.gif";
import axios from "axios";

const Home = () => {
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const [display, setDisply] = useState(false);
  const [inputData, setInputData] = useState("");
  const [finalInputData, setFinalInputData] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const history = useHistory();
  const [topImg, setTopImg] = useState([]);
  const [midImg, setMidImg] = useState([]);
  const [disclaimer, setDisclaimer] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  const mblDataPass = "www.neurologylibrary.org";
  const pcDataPass = "Dementa";

  //for login system
  useEffect(() => {
    if (scanResultWebCam == mblDataPass) {
      sessionStorage.setItem("mblData", mblDataPass);
      history.push("/termsCondition");
    } else if (finalInputData == pcDataPass) {
      sessionStorage.setItem("pcData", pcDataPass);
      history.push("/termsCondition");
    }
  }, [finalInputData, history, scanResultWebCam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFinalInputData(inputData);
    if (finalInputData != pcDataPass) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }
  };

  useEffect(() => {
    axios
      .get("https://server.neurologylibrary.org/getFrontPageTopImage")
      .then((response) => {
        setTopImg(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://server.neurologylibrary.org/getFrontPageMiddleImage")
      .then((response) => {
        setMidImg(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://server.neurologylibrary.org/getFrontPageDisclaimer")
      .then((response) => {
        setDisclaimer(response.data);
      });
  }, []);

  return (
    <section>
      {topImg.length === 0 &&
        midImg.length === 0 &&
        disclaimer.length === 0 && (
          <div className="loader">
            <img src={loader} alt="Loading......" />
          </div>
        )}

      <div className="homeHead">
        {topImg?.map((dt, index) => (
          <span key={index}>
            <img
              src={dt.topImage}
              alt=""
              className="headImg"
              // effect="blur"
              width={"100%"}
              height={"auto"}
            />
          </span>
        ))}
      </div>
      {/* Camera */}
      <div className="qr-main-section row container-fluid">
        {display && (
          <div className="col-md-3">
            <QrReader
              delay={300}
              style={{ width: "100%" }}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
            />
          </div>
        )}
      </div>
      {/* Button */}
      <div className="scan-button">
        <button className="btn btn-success" onClick={() => setDisply(!display)}>
          SCAN YOUR CARD
        </button>
      </div>
      {/* Login input */}
      <form onSubmit={handleSubmit} className="loginForm my-5">
        <div className="input-group">
          <input
            required
            type="text"
            className="form-control loginInput"
            placeholder="Enter Your Password"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onChange={(e) => setInputData(e.target.value)}
          />
          <button className="btn btn-success" type="submit">
            SUBMIT
          </button>
        </div>
      </form>
      {errorMessage && (
        <h1 className="errorMessage">INVALID PASSWORD OR NETWORK SLOW..!</h1>
      )}

      <div className="homeMiddleImg">
        {midImg?.map((dt, index) => (
          <span key={index}>
            <img
              src={dt?.middleImage}
              alt=""
              className="midImg"
              effect="blur"
              width={"100%"}
              height={"auto"}
            />
          </span>
        ))}
      </div>

      <div className="mt-5 disclaimer">
        <h2 className="text-center mb-5 disclaimerHead">Disclaimer</h2>
        <div className="container mt-3">
          <div>
            {disclaimer?.map((dsData, index) => (
              <span key={index}>{ReactHtmlParser(dsData?.description)}</span>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="text-center mt-5 pb-5">
        <Link to="/" className="disclaimer_seeMore">
          See More......
        </Link>
      </div> */}
    </section>
  );
};

export default Home;
