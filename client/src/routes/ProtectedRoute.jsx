import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
    const { token, role } = useSelector((state) => state.auth);

    if (!token) return <Navigate to="/" />;

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/dashboard" />;
    }

    return children;
}