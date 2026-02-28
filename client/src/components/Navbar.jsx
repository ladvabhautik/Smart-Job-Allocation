import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice.js";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="p-d-flex p-jc-between p-ai-center p-p-3" style={{ background: '#007ad9', color: '#fff' }}>
            <h2>Smart Job Dashboard</h2>
            <button onClick={handleLogout} className="p-button p-button-danger">Logout</button>
        </div>
    )
}