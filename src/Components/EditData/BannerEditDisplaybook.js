import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BannerEditDisplaybook = () => {
  const topImgRef = useRef();
  const [suceesMsg, setSuccessMsg] = useState(false);
  const [topBannerImg, setTopBannerImg] = useState([]);
  const [loading, setLoading] = useState(false);

  //top banner submission
  const handleTopBannerSubmit = (e) => {
    e.preventDefault();
    const displayBookBanner = {
      topdisplayBookBanner: topImgRef?.current?.value,
    };

    // INSERT top image ADMIN AT THE DATABASE
    fetch("https://server.cardiaccasestudy.net/addDisplayBookTopImage", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(displayBookBanner),
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

  //getting the top banner img
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://server.cardiaccasestudy.net/DisplayBookTopImage"
        );
        const data = await response.json();
        setTopBannerImg(data);
      } catch (error) {
        console.log("err", error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, []);

  const handleTopImageRemove = (id) => {
    // console.log('deleted',id);

    fetch(`https://server.cardiaccasestudy.net/bookDisplayImgdelete/${id}`, {
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
      {/* top banner form */}
      <Link to="/dashboard" className="back">
        {" "}
        <i className="bi bi-skip-backward-fill"></i> Back{" "}
      </Link>

      <form onSubmit={handleTopBannerSubmit}>
        <div className="mb-3 mt-5 container">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            <h3>Add your display book banner</h3>
          </label>
          <div className="input-group mb-3">
            <input
              required
              type="text"
              className="form-control"
              placeholder="Your image link"
              aria-label="Recipient's username"
              id="exampleFormControlTextarea1"
              aria-describedby="button-addon2"
              ref={topImgRef}
            />

            <button
              className="btn btn-outline-primary"
              type="button"
              id="button-addon2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdropTopBanner"
            >
              Delete
            </button>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="staticBackdropTopBanner"
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
                      Top display book banner
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
                      {topBannerImg.map((tpData) => (
                        <span key={tpData?._id}>
                          <img
                            src={tpData?.topdisplayBookBanner}
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
    </div>
  );
};

export default BannerEditDisplaybook;