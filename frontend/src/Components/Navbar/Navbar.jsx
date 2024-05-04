import React, { useContext, useRef, useState } from "react";

import "./Navbar.css";
import { ShopContext } from "../../Context/ShopContext";

import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import dropdown_icon from "../Assets/new_dropdown_icon.png";

import { Link } from "react-router-dom";

const Navbar = () => {
    const [menu, setMenu] = useState("shop");

    const { getTotalCartItems } = useContext(ShopContext);

    const menuRef = useRef();

    const dropDown_toggle = (e) => {
        menuRef.current.classList.toggle("nav-menu-visible");
        e.target.classList.toggle("open");
    };

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt='' />
                <p>Senpai's Stash</p>
            </div>
            <img
                onClick={dropDown_toggle}
                className='nav-dropdown'
                src={dropdown_icon}
                alt=''
            />
            <ul ref={menuRef} className='nav-menu'>
                <li
                    onClick={() => {
                        setMenu("shop");
                    }}
                >
                    <Link to='/' style={{ textDecoration: "none" }}>
                        Shop
                    </Link>{" "}
                    {menu === "shop" ? <hr /> : <></>}
                </li>
                <li
                    onClick={() => {
                        setMenu("mens");
                    }}
                >
                    <Link to='/mens' style={{ textDecoration: "none" }}>
                        Men
                    </Link>
                    {menu === "mens" ? <hr /> : <></>}
                </li>
                <li
                    onClick={() => {
                        setMenu("women");
                    }}
                >
                    <Link to='/womens' style={{ textDecoration: "none" }}>
                        Women
                    </Link>
                    {menu === "women" ? <hr /> : <></>}
                </li>
                <li
                    onClick={() => {
                        setMenu("kids");
                    }}
                >
                    <Link to='/kids' style={{ textDecoration: "none" }}>
                        Kids
                    </Link>
                    {menu === "kids" ? <hr /> : <></>}
                </li>
            </ul>
            <div className='nav-login-cart'>
                {localStorage.getItem("auth_token") ? (
                    <button
                        onClick={() => {
                            localStorage.removeItem("auth_token");
                            window.location.replace("/");
                        }}
                    >
                        Logout
                    </button>
                ) : (
                    <Link to='/login'>
                        <button>Login</button>
                    </Link>
                )}

                <Link to='/cart'>
                    <img src={cart_icon} alt='' />
                </Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
        </div>
    );
};

export default Navbar;
