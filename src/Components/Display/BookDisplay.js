import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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

  //gatting the button value for search and filter it by its subject name
  const buttonFilterBookCat = (btnBookType) => {
    const filterResult = books.filter((product) => {
      return product?.bookSubject === btnBookType;
    });
    setFilteredBooks(filterResult);
  };

  //ata conditionally search kore value onujay
  const handeSearchSubmit = (e) => {
    e.preventDefault();
    if (bookCat === "bookName") {
      const filterResult = books.filter((product) =>
        product?.bookName
          .toLowerCase()
          .includes(search.toString().toLowerCase())
      );

      setFilteredBooks(filterResult);
    }
    if (bookCat === "authorName") {
      const filterResult = books.filter((product) =>
        product?.authorName
          .toLowerCase()
          .includes(search.toString().toLowerCase())
      );
      setFilteredBooks(filterResult);
    }
    if (bookCat === "isbn") {
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
  const bookBaseData = "https://server.neurologylibrary.org/getBookData";

  useEffect(() => {
    axios.get(bookBaseData).then((response) => {
      setBooks(response.data);
      setFilteredBooks(response.data);
    });
  }, []);

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
      {filteredBooks?.length === 0 && topBannerImg?.length === 0 && (
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
        <form className="search__filter">
          <div className="srarch_section d-flex justify-content-center">
            <input
              type="text"
              className="searchbar"
              placeholder="Search book name, author name, isbn....."
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
              <label htmlFor="book_name">Book Name</label>
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
              <label htmlFor="isbn">ISBN Number</label>
            </span>
          </div>
        </form>

        <div className="btn_search_main_click">
          <button
            className="btn_search_click"
            onClick={() => {
              buttonFilterBookCat("neuropathic_pain");
            }}
          >
            Neuropathic Pain
          </button>

          <button
            className="btn_search_click"
            onClick={() => setFilteredBooks(books)}
          >
            All Books
          </button>

          <button
            className="btn_search_click"
            onClick={() => {
              buttonFilterBookCat("migraines_epilepsy");
            }}
          >
            Migraines & Epilepsy
          </button>
        </div>

        <div className="book_display_main my-3">
          <div className="row bookRow">
            {/* card */}
            {filteredBooks?.map((bookData, index) => (
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
