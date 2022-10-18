import React, { useState, useEffect, useRef } from "react";

const PopupEditBookList = ({ singleBook }) => {
  const { _id } = singleBook;
  const [suceesMsg, setSuccessMsg] = useState(false);
  const [message, setMessage] = useState("");
  const bookImgRef = useRef();
  const bookNameRef = useRef();
  const authorNameRef = useRef();
  const isbnRef = useRef();
  const bookNumberRef = useRef();
  const bookLinkRef = useRef();
  const downloadBookLinkRef = useRef();

  // update product and send to the database
  const handleEditBook = (e) => {
    e.preventDefault();
    //this poroduct sotoreing all input value like object and properties
    const editBook = {
      bookImg: bookImgRef?.current?.value,
      bookName: bookNameRef?.current?.value,
      authorName: authorNameRef?.current?.value,
      isbn: isbnRef?.current?.value,
      bookNumber: bookNumberRef?.current?.value,
      bookLink: bookLinkRef?.current?.value,
      downloadBookLink: downloadBookLinkRef?.current?.value,
    };

    fetch(`https://server.neurologylibrary.org/updateBook/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editBook),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        bookImgRef.current.value = "";
        bookNameRef.current.value = "";
        authorNameRef.current.value = "";
        isbnRef.current.value = "";
        bookNumberRef.current.value = "";
        bookLinkRef.current.value = "";
        downloadBookLinkRef.current.value = "";
      });
    // alert("product successfully updated");
    setMessage("Your Product Udpade Successfully");
    window.location.reload();
  };

  return (
    <div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdropBook"
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
                Edit Your data
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
              {/* this is modal body */}

              <div
                className="card"
                style={{
                  width: "100%",
                }}
              >
                <form className="bookInputForm" onSubmit={handleEditBook}>
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
                    <label htmlFor="Inputisbn" className="form-label">
                      ISBN:
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="Inputisbn"
                      placeholder="Isbn"
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
                    <div
                      className="alert alert-success text-center"
                      role="alert"
                    >
                      <strong>Book successfully update!</strong>
                    </div>
                  )}
                  <button type="submit" className="btn bookSubmit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupEditBookList;
