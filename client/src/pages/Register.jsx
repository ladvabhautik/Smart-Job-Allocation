import { Button, Card, InputText, Password } from "primereact";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../features/auth/authSlice";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async () => {
        try {
            await dispatch(register(form)).unwrap();
            toast.success("Registered successfully 🎉");
            navigate("/");
        } catch {
            toast.error("Registration failed");
        }
    };

    return (
        <div className="auth-bg">
            <Card className="p-4 shadow-4 border-round-xl w-25rem">
                <h2 className="text-center mb-4">Create Account</h2>

                <InputText
                    placeholder="Name"
                    className="w-full mb-3"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <InputText
                    placeholder="Email"
                    className="w-full mb-3"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <Password
                    placeholder="Password"
                    className="w-full block mb-3"
                    inputClassName="w-full"
                    feedback={false}
                    toggleMask
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <Button label="Register" className="w-full" onClick={handleSubmit} />
            </Card>
        </div>
    );
}