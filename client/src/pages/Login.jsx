import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/Auth";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, InputAdornment, FormControl, OutlinedInput, IconButton, Button } from "@mui/material";
import React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toastMessage, setToastMessage] = useState(""); // State for toast message
    const [toastOpen, setToastOpen] = useState(false); // State for toast visibility
    const [toastSeverity, setToastSeverity] = useState("success");
    const [showPassword, setShowPassword] = useState(false);
    const auth = useAuth();
    const { setUser } = auth;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8800/server/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    email: email, 
                    password: password 
                }),
            });

            const data = await res.json();
            console.log("API Response:", data);

            if (res.ok) {
                // Set the user in the Auth context
                setUser({ id: data.id, email: data.email });
                setToastMessage(data.message); // Set the toast message
                setToastSeverity("success"); // Set severity to success
                setToastOpen(true); // Show the toast
                navigate("/dashboard");
            } else {
                console.error("Login failed:", data.message || res.statusText);
                setToastMessage(data.message || "Login failed. Please try again.");
                setToastSeverity("error"); // Set severity to error
                setToastOpen(true); // Show the toast
            }
        } catch (error) {
            console.error("Error during login:", error.message);
            setToastMessage("An error occurred. Please try again."); // Set a generic error message
            setToastSeverity("error"); // Set severity to error
            setToastOpen(true); // Show the toast
        }
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
                <div className="login-left flex w-3/5">
                    <h1>Pharm Sentry.</h1>
                    <p>
                        Your trusted platform for intelligent drug abuse monitoring and management. Pharm Sentry combines cutting edge technology with a user-friendly interface to ensure seamless oversight and reporting.
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ '&:hover': { backgroundColor: 'green' } }}
                        >
                            Register
                        </Button>
                    </Link>
                </div>
                <div className="login-right flex">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start" sx={{ mr: 1 }}>
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        <FormControl variant="outlined" fullWidth>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                type={showPassword ? "text" : "password"}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="start"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                backgroundColor: "#663399", // Default background color
                                '&:hover': {
                                    backgroundColor: 'green' // Background color on hover
                                }
                            }}
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
            <Snackbar open={toastOpen} autoHideDuration={6000} onClose={handleToastClose}>
                <Alert on Close={handleToastClose} severity={toastSeverity} sx={{ width: '100%' }}>
                    {toastMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;