import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../style/Navbar.css"
const Navbar = () => {
    const navigate = useNavigate() ;

  return (
    <nav>
        <ul>
            <li onClick={()=>{navigate("/")}}>HOME </li>
            <li onClick={()=>{navigate("/books")}}>BOOKS </li>
            <li onClick={()=>{navigate("/users")}}>USERS </li>
            <li onClick={()=>{navigate("/create")}}>ADD BOOK </li>
            <li onClick={()=>{navigate("/register")}}>REGISTER </li>
            <li onClick={()=>{navigate("/login")}}>LOGIN </li>
        </ul>
    </nav>
  )
}

export default Navbar
