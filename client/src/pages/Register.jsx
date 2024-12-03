import { Link } from "react-router-dom";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from "react";
import { TextField, InputAdornment, FormControl, OutlinedInput, IconButton, Button } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: ""
    });

    const [toastOpen, setToastOpen] = useState(false); // State for toast visibility
    const [toastMessage, setToastMessage] = useState(""); // State for toast message
    const [toastSeverity, setToastSeverity] = useState("success"); // State for toast severity (success/error)

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8800/server/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Registration failed");
            }

            const data = await res.json();
            setToastMessage("Registration successful!");
            setToastSeverity("success");
            setToastOpen(true);
        } catch (error) {
            console.error("Error during registration:", error.message);
            setToastMessage(error.message);
            setToastSeverity("error");
            setToastOpen(true);
        }
    };

    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setToastOpen(false);
    };

    return (
        <div className="bg-[#c1beff] flex min-h-screen w-full items-center justify-center">
            <div className="card w-1/2 rounded-2xl bg-white flex flex-row max-w-screen-lg">
                <div className="register-left flex-1">
                    <h1 className="text-2xl font-bold">Register</h1>
                    <form className="flex flex-col gap-8">
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        <input type="text" placeholder="Name" name="name" onChange={handleChange} />

                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
                <div className="register-right flex-2">
                    <h1 className="text-8xl font-bold">Pharm Sentry.</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                        alias totam numquam ipsa exercitationem dignissimos, error nam,
                        consequatur.
                    </p>
                    <span>Do you have an account?</span>
                    <Link to="/">
                    <Button
                            variant="contained"
                            color="secondary"
                            sx={{ '&:hover': { backgroundColor: 'violet' } }}
                        >
                            Login
                        </Button>
                    </Link>
                </div>
            </div>

            <Snackbar open={toastOpen} autoHideDuration={6000} onClose={handleToastClose}>
                <Alert onClose={handleToastClose} severity={toastSeverity} sx={{ width: '100%' }}>
                    {toastMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Register;