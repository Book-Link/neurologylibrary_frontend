import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BookList.css";
import PopupEditBookList from "./PopupEditBookList";

const BooklistEdit = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [singleBook, setSingleBook] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //for search bar
  const filterResult = books.filter((product) =>
    product?.bookName.toLowerCase().includes(search.toString().toLowerCase())
  );

  //getting books data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://server.cardiaccasestudy.net/getBookData");

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.log("err", error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, []);

  //delete the book
  const handleBookDelete = (id) => {
    fetch(`https://server.cardiaccasestudy.net/bookDelete/${id}`, {
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

  //getting the single book and send the id to the opoupEditBookList component
  const fetchSingleBook = async (singleBookId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://server.cardiaccasestudy.net/singleBook/${singleBookId}`
      );
      const data = await response.json();
      setSingleBook(data);
    } catch (error) {
      console.log("err", error);
    }
    setLoading(false);
  };

  return (
    <main className="container my-3">
      <Link to="/dashboard" className="back">
        {" "}
        <i className="bi bi-skip-backward-fill"></i> Back{" "}
      </Link>
      <br />
      <br />
      <span>
        <input
          style={{ width: "450px", height: "40px" }}
          className="mt-3"
          type="text"
          onChange={handleSearch}
          placeholder="Search your book by name"
        />
      </span>
      <section className="bookList">
        <div className="table-responsive mt-3">
          {loading && <h3>loading...</h3>}
          <table className="table mt-3">
            <thead className="thead-dark">
              <tr>
                <th scope="col">NO</th>
                <th scope="col">IMAGE</th>
                <th scope="col">BOOK NAME</th>
                <th scope="col">EDIT</th>
                <th scope="col">DELETE</th>
              </tr>
            </thead>

            <tbody>
              {filterResult?.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {" "}
                    <img
                      style={{ height: "50px", width: "50px" }}
                      src={data?.bookImg}
                      alt=""
                    />{" "}
                  </td>
                  <td>{data?.bookName}</td>

                  {/* edit button */}
                  <td>
                    <button
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdropBook"
                      onClick={() => fetchSingleBook(data?._id)}
                    >
                      Edit
                    </button>
                    <PopupEditBookList singleBook={singleBook} />
                  </td>

                  {/* delete button */}
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleBookDelete(data?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default BooklistEdit;