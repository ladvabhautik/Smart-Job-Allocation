import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, []);

    const handleSubmit = async () => {
        try {
            await dispatch(login(form)).unwrap();
            toast.success("Login successful 🚀");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err || "Login failed");
        }
    };

    return (
        <div className="auth-bg">
            <Card className="p-4 shadow-4 border-round-xl w-25rem">
                <h2 className="text-center mb-4">Smart Job Allocation</h2>

                <div className="field mb-3">
                    <InputText
                        placeholder="Email"
                        className="w-full"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />
                </div>

                <div className="field mb-3">
                    <Password
                        placeholder="Password"
                        className="w-full block"
                        inputClassName="w-full"
                        feedback={false}
                        toggleMask
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />
                </div>

                <Button
                    label="Login"
                    className="w-full"
                    onClick={handleSubmit}
                />

                <p className="text-center mt-3">
                    Don't have an account?{" "}
                    <span
                        style={{ color: "#3b82f6", cursor: "pointer" }}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </Card>
        </div>
    );
}