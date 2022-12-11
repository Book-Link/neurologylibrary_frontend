import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./BookDisplay.css";
import { saveAs } from "file-saver";
import loader from "../../images/Loading.gif";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";

const BookDisplay = () => {
  const [topBannerImg, setTopBannerImg] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  //geting data form local stroage
  let bookSubjectNameData = localStorage.getItem("bookSubject");

  //getting books data
  useEffect(() => {
    axios
      .get("https://server.neurologylibrary.org/getBookData")
      .then((response) => {
        setFilteredBooks(response.data);
      });
  }, []);

  //for spacefic books
  const newfilteredBooks = filteredBooks.filter(
    (product) => product?.bookSubject == bookSubjectNameData
  );
  console.log(filteredBooks);

  //Top banner img reading/getting form server

  useEffect(() => {
    if (topBannerImg.length === 0) {
      axios
        .get("https://server.neurologylibrary.org/DisplayBookTopImage")
        .then((response) => {
          setTopBannerImg(response.data);
        });
    }
  }, [topBannerImg]);

  //this is for download book
  const handleDownload = (download) => {
    saveAs(download);
  };

  return (
    <main className="book_display">
      {newfilteredBooks?.length === 0 && topBannerImg?.length === 0 && (
        <div className="loader">
          <img src={loader} alt="Loading......" />
        </div>
      )}

      <section className="book_display_header">
        {topBannerImg.map((tpBanner) => (
          <LazyLoadImage
            key={tpBanner._id}
            src={tpBanner?.topdisplayBookBanner}
            alt="Neourology Library"
            className="img-fluid bannerImg"
            effect="blur"
            width={"100%"}
            height={"auto"}
          />
        ))}
      </section>
      <section className="container-fluid book_display_body my-3">
        <div className="book_display_main my-3">
          <div className="row bookRow">
            {/* card */}
            {newfilteredBooks?.map((bookData, index) => (
              <div
                className="col-12 col-md-4 book_card mb-4"
                key={bookData?._id}
              >
                <LazyLoadImage
                  src={bookData?.bookImg}
                  alt=""
                  className="bookImage"
                  effect="blur"
                  width={"100%"}
                  height={"auto"}
                />
                <span className="b_no">
                  <p>{index + 1}</p>
                </span>
                <div className="bookFoot">
                  <p className="b-name pt-2">{bookData?.bookName}</p>
                  <aside className="d-flex justify-content-between actionbtn">
                    <Link to={`/viewPdf/${bookData?._id}`} className="viewBtn">
                      <button className="btn">View</button>
                    </Link>
                    <button
                      className="btn downloadBtn"
                      onClick={() => handleDownload(bookData?.downloadBookLink)}
                    >
                      Download
                    </button>
                  </aside>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookDisplay;
