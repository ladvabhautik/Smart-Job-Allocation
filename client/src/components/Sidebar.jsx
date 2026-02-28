import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Briefcase, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { role } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div
            className="flex flex-column p-3 shadow-3"
            style={{ width: "250px", background: "#1e293b", color: "white" }}
        >
            <h2 className="mb-4">Smart Jobs</h2>

            <NavLink
                to="/dashboard"
                className="mb-3 flex align-items-center gap-2 text-white no-underline"
            >
                <LayoutDashboard size={18} /> Dashboard
            </NavLink>

            <NavLink
                to="/jobs"
                className="mb-3 flex align-items-center gap-2 text-white no-underline"
            >
                <Briefcase size={18} /> Jobs
            </NavLink>

            {role === "admin" && (
                <p className="mt-3 text-sm text-green-300">Admin Access</p>
            )}

            {role === "contractor" && (
                <p className="mt-3 text-sm text-blue-300">Contractor Access</p>
            )}

            <div
                onClick={handleLogout}
                className="mt-auto flex align-items-center gap-2 cursor-pointer"
            >
                <LogOut size={18} /> Logout
            </div>
        </div>
    );
}