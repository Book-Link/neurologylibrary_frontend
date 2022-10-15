import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BookDisplay.css";
import { saveAs } from "file-saver";
import loader from "../../images/Loading.gif";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";

const BookDisplay = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [bookCat, setBookCat] = useState("");
  const [topBannerImg, setTopBannerImg] = useState([]);

  //for searching book
  const handleSearch = (e) => {
    setSearch(e.target.value);
    // search butoon a click na korei jokhn change korbo tokhni data dekhabe
    // handeSearchSubmit(e);
  };

  //gatting the radio button value and set inte state
  const filterbookCat = (bookType) => {
    setBookCat(bookType);
  };

  //ata conditionally search kore value onujay
  const handeSearchSubmit = (e) => {
    e.preventDefault();
    if (bookCat == "bookName") {
      const filterResult = books.filter((product) =>
        product?.bookName
          .toLowerCase()
          .includes(search.toString().toLowerCase())
      );

      setFilteredBooks(filterResult);
    }
    if (bookCat == "authorName") {
      const filterResult = books.filter((product) =>
        product?.authorName
          .toLowerCase()
          .includes(search.toString().toLowerCase())
      );
      setFilteredBooks(filterResult);
    }
    if (bookCat == "isbn") {
      const filterResult = books.filter((product) =>
        product?.isbn
          ?.toString()
          .toLowerCase()
          .includes(search.toString().toLowerCase())
      );
      setFilteredBooks(filterResult);
    }
  };

  //getting books data
  useEffect(() => {
    setLoading(true);
    axios.get("https://server.cardiaccasestudy.net/getBookData").then((response) => {
      setBooks(response.data);
      setFilteredBooks(response.data);
      setLoading(false);
    });
  }, []);

  //Top banner img reading/getting form server
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://server.cardiaccasestudy.net/DisplayBookTopImage")
      .then((response) => {
        setTopBannerImg(response.data);
        setLoading(false);
      });
  }, []);

  //this is for download book
  const handleDownload = (download) => {
    saveAs(download);
  };

  return (
    <main className="book_display">
      {loading && (
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
            placeholderSrc={loader}
            width={"100%"}
            height={"auto"}
          />
        ))}
      </section>

      <section className="text-center mt-2 mb-2">
        <h6>Publish Your Case Study:</h6>
        <span>
          <a href="mailto: pantonix365@gmail.com">pantonix365@gmail.com</a>
        </span>
      </section>
      <section className="container-fluid book_display_body my-3">
        <form className="search__filter">
          <div className="srarch_section d-flex justify-content-center">
            <input
              type="text"
              className="searchbar"
              placeholder="Search title, author name, source name....."
              onChange={handleSearch}
            />

            <button
              type="submit"
              className="btn search_btn"
              onClick={handeSearchSubmit}
            >
              Search
            </button>
          </div>
          <div className="sideFilter my-4">
            <span className="radioSearch">
              <input
                type="radio"
                id="book_name"
                name="search"
                value="bookName"
                onClick={() => filterbookCat("bookName")}
              />
              <label htmlFor="book_name">Title</label>
            </span>
            <span className="radioSearch">
              <input
                type="radio"
                id="author_name"
                name="search"
                value="authorName"
                onClick={() => filterbookCat("authorName")}
              />
              <label htmlFor="author_name">Author Name</label>
            </span>
            <span className="radioSearch">
              <input
                type="radio"
                id="isbn"
                name="search"
                value="isbn"
                onClick={() => filterbookCat("isbn")}
              />
              <label htmlFor="isbn">Source Name</label>
            </span>
          </div>
        </form>
        <div className="book_display_main my-3">
          <div className="row bookRow">
            {/* card */}
            {filteredBooks?.map((bookData, index) => (
              <div className="col-12 book_card mb-4" key={bookData?._id}>
                <div class="card book_card_body">
                  <div class="row g-0">
                    <div class="col-3 col-md-6">
                      <LazyLoadImage
                        src={bookData?.bookImg}
                        alt=""
                        className="bookImage"
                        placeholderSrc={loader}
                        width={"100%"}
                        height={"auto"}
                      />
                    </div>
                    <div class="col-9 col-md-6">
                      <div className="bookFoot">
                        {/* <p className="b-name pt-2">{bookData?.bookName}</p> */}
                        <p className="b-name mb-0">
                          <b>{bookData?.bookName}</b>
                        </p>
                        <p className="b-name">{bookData?.authorName}</p>
                        <aside className="d-flex actionbtn">
                          {/* <Link to={`/viewPdf/${bookData?._id}`}>
                            <button className="viewBtn">View</button>
                          </Link> */}
                          <span>
                            <a
                              href={bookData.bookLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          </span>
                          /
                          <button
                            className="downloadBtn"
                            onClick={() =>
                              handleDownload(bookData?.downloadBookLink)
                            }
                          >
                            Download
                          </button>
                        </aside>
                      </div>
                    </div>
                  </div>
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