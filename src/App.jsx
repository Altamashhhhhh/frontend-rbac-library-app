import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from "./components/Login"
import Register from "./components/Register"
import BookList from "./components/BookList"
import UserList from "./components/UserList"
import AddBook from './components/AddBook'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/books" element={<BookList />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/create" element={<AddBook />} />
    </Routes>
    </>
  )
}

export default App
