import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./ViewPdf.css";
import emailjs from "@emailjs/browser";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";

const ViewPdf = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const form = useRef();
  const { bookId } = useParams();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_tgfxmke",
        "template_l1dgzs5",
        form.current,
        "-5cEZ1_2xnVcOEQhI"
      )
      .then(
        (result) => {
          if (result) {
            setMessage("Your Email Send Successfully");
            setTimeout(() => {
              setMessage("");
            }, "5000");
            e.target.reset();
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  ////getting books data
  const booksData = "https://server.cardiaclibrary.org/getBookData";
  useEffect(() => {
    axios.get(booksData).then((response) => {
      setBooks(response.data);
    });
  }, []);

  //selection the specefic book
  const selectedBook = books.filter((bk) => bk._id == bookId);

  return (
    <>
      {selectedBook.length > 0 &&
        selectedBook?.map((bookDt) => (
          <div className="viewBtnCard" key={bookDt?._id}>
            <div
              className="card mb-3 viewBtnCardBody"
              style={{ maxWidth: "540px" }}
              key={bookDt._id}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <LazyLoadImage
                    src={bookDt?.bookImg}
                    alt=""
                    className="headImg img-fluid rounded-start"
                    effect="blur"
                    width={"100%"}
                    height={"auto"}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="card-title">{bookDt?.bookName}</p>
                    <p className="card-text">{bookDt?.authorName}</p>
                    <p className="card-text">ISBN: {bookDt?.isbn}</p>
                    <span className="d-flex justify-content-between actionbtn">
                      <button className="btn readButton">
                        <a
                          className="readButton_txt"
                          href={bookDt.bookLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read Book
                        </a>
                      </button>
                      <button
                        className="btn hardCopyBtn"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdropSoftCopy"
                      >
                        Request for the hard copy
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="staticBackdropSoftCopy"
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
                      Request for the hard copy
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
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="card"
                      style={{
                        width: "100%",
                        padding: "15px",
                        textAlign: "justify",
                      }}
                    >
                      {/* this is body */}
                      <form
                        onSubmit={sendEmail}
                        ref={form}
                        className="bookInputForm"
                      >
                        <div className="mb-3">
                          <label htmlFor="InputName" className="form-label">
                            Your Name
                          </label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            id="InputName"
                            placeholder="Your Name"
                            name="Name"
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="InputEmail" className="form-label">
                            Your Email
                          </label>
                          <input
                            required
                            type="email"
                            className="form-control"
                            id="InputEmail"
                            placeholder="Email"
                            name="Email"
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="InputPhoneNumber"
                            className="form-label"
                          >
                            Your Phone Number
                          </label>
                          <input
                            required
                            type="number"
                            className="form-control"
                            id="InputPhoneNumber"
                            placeholder="Your Phone Number"
                            name="Phone Number"
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="InputBmdc" className="form-label">
                            BMDC Registration Number
                          </label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            id="InputBmdc"
                            placeholder="Your BMDC Number"
                            name="Bmdc Reg Number"
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
                            name="Book Name"
                            defaultValue={bookDt?.bookName}
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="InputISBN" className="form-label">
                            ISBN:
                          </label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            id="InputISBN"
                            placeholder="Isbn"
                            name="Isbn"
                            defaultValue={bookDt?.isbn}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="InputBookNo." className="form-label">
                            Book Number:
                          </label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            id="InputBookNo."
                            placeholder="Book Number"
                            name="Book Number"
                            defaultValue={bookDt?.bookNumber}
                          />
                        </div>

                        <button type="submit" className="btn bookSubmit mb-3">
                          Submit
                        </button>

                        <strong
                          style={{
                            color: "green",
                          }}
                        >
                          {message}
                        </strong>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ViewPdf;
