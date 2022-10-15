import React, { useRef, useState } from "react";
import "./AddBook.css";
import { Link } from "react-router-dom";

const AddBook = () => {
  const [suceesMsg, setSuccessMsg] = useState(false);
  const [message, setMessage] = useState("");
  const bookImgRef = useRef();
  const bookNameRef = useRef();
  const authorNameRef = useRef();
  const isbnRef = useRef();
  const bookNumberRef = useRef();
  const bookLinkRef = useRef();
  const downloadBookLinkRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      bookImg: bookImgRef?.current?.value,
      bookName: bookNameRef?.current?.value,
      authorName: authorNameRef?.current?.value,
      isbn: isbnRef?.current?.value,
      bookNumber: bookNumberRef?.current?.value,
      bookLink: bookLinkRef?.current?.value,
      downloadBookLink: downloadBookLinkRef?.current?.value,
    };

    console.log(bookData);

    // INSERT top image ADMIN AT THE DATABASE
    fetch("https://server.cardiaccasestudy.net/addBookData", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(bookData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setSuccessMsg(true);
          bookImgRef.current.value = "";
          bookNameRef.current.value = "";
          authorNameRef.current.value = "";
          isbnRef.current.value = "";
          bookNumberRef.current.value = "";
          bookLinkRef.current.value = "";
          downloadBookLinkRef.current.value = "";
        }
      });
  };

  return (
    <main className="bookupload">
      <section className="container">
        <Link to="/dashboard" className="back">
          {" "}
          <i className="bi bi-skip-backward-fill"></i> Back{" "}
        </Link>

        <div className="row">
          <h2 className="text-center text-bold">Upload Your Book</h2>
          <div className="col-12 col-md-2"></div>

          <form
            className="col-12 col-md-8 bookInputForm"
            onSubmit={handleSubmit}
          >
            <div className="mb-3 bookImgInput">
              {bookImgRef?.current?.value && (
                <img
                  src={bookImgRef?.current?.value}
                  className="img-fluid bookImg"
                  alt="BOOK"
                />
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="InputBookImage" className="form-label">
                Book Image Link:
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="InputBookImage"
                placeholder="Image Link"
                ref={bookImgRef}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="InputBookName" className="form-label">
                Book Name:
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="InputBookName"
                placeholder="Book Name"
                ref={bookNameRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputAuthorName" className="form-label">
                Author Name:
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="InputAuthorName"
                placeholder="Author Name"
                ref={authorNameRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputISBN" className="form-label">
                Source Name
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="InputISBN"
                // placeholder="Isbn"
                ref={isbnRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputBookNo." className="form-label">
                Book No:
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="InputBookNo."
                placeholder="Book Number"
                ref={bookNumberRef}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Book Link:</label>
              <input
                required
                type="text"
                className="form-control"
                id="InputBookLink"
                placeholder="Book Link"
                ref={bookLinkRef}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="InputDownloadBook" className="form-label">
                Download Book Link
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="InputDownloadBook"
                placeholder="Download Book Link"
                ref={downloadBookLinkRef}
              />
            </div>
            {suceesMsg && (
              <div className="alert alert-success text-center" role="alert">
                <strong>Book successfully added!</strong>
              </div>
            )}
            <button type="submit" className="btn bookSubmit mt-2">
              Submit
            </button>
          </form>
          <div className="col-12 col-md-2"></div>
        </div>
      </section>
    </main>
  );
};

export default AddBook;
