import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/BookList.css";
import Navbar from "./Navbar";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setError(null);
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "https://library-app-tyab.onrender.com/book/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch books");
        }

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://library-app-tyab.onrender.com/book/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete book");
      }

      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (id) => {
    setError(null);
    const token = localStorage.getItem("token");

    const title = prompt("Enter new title (leave blank if unchanged):");
    const description = prompt("Enter new description (leave blank if unchanged):");
    const price = prompt("Enter new price (leave blank if unchanged):");

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (price) updateData.price = price;

    if (Object.keys(updateData).length > 0) {
      try {
        const response = await fetch(
          `https://library-app-tyab.onrender.com/book/update/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateData),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update book");
        }

        const updatedBook = await response.json();
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book._id === id ? updatedBook : book))
        );
      } catch (error) {
        setError(error.message);
      }
    } else {
      alert("No fields were updated.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      
      <header>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
        <Navbar />
        <button onClick={() => navigate("/create")} className="create-button">
          ADD NEW BOOK
        </button>
      </header>
      <h1>WELCOME HERE YOU WILL SEE ALL THE BOOKS</h1>
      <table>
        <thead>
          <tr>
            <th>Created By</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id}>
                <td>{book.createdBy}</td>
                <td>{book.title}</td>
                <td>{book.description}</td>
                <td>{book.price}</td>
                <td>
                  <button onClick={() => handleDelete(book._id)}>Delete</button>
                  <button onClick={() => handleUpdate(book._id)}>Update</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No books available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
