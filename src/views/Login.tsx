import { IconButton, WarningButton } from "../components/Button";
import GoogleIcon from "../assets/icon/google.tsx";
import { useState } from "react";
import { loginRequest } from "../contexts/AuthContext.tsx";
import { Link, useNavigate } from "react-router-dom";
import { Field } from "../components/Field";

function Login() {
    const [email, setEmail] = useState<string>("");
    const [errorMessages, setErrorMessages] = useState<string[]>([]); // ["Email is required", "Email is invalid"
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    function validePassword(password: string): boolean {
        return password.length >= 8;
    }

    async function validate() {
        const errors: string[] = [];
        if (email.length === 0) errors.push("Email is required");
        if (!email.includes("@")) errors.push("Email is invalid");
        if (password.length === 0) errors.push("Password is required");
        if (password.length < 8) errors.push("Password must be at least 8 characters");
        if (errors.length === 0) {
            try {
                await loginRequest(email, password);
                try {
                    navigate("/dashboard")
                } catch (e) {
                    console.log(e);
                    errors.push("An error occured. Please try again later.");
                    setErrorMessages(errors);
                }
            } catch (e) {
                console.log(e)
                errors.push("Invalid credentials");
                setErrorMessages(errors);
            }
        } else {
            setErrorMessages(errors);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen flex-col">
            <div className="md:w-1/3 sm:w-1/2 flex items-center flex-col">
                <h1 className="heading-1 pb-5">Log in</h1>
                <IconButton icon={
                    <GoogleIcon width={25} height={25} />
                } text="Continue with Google" type="primary" onClick={() => {
                    window.location.href = import.meta.env.VITE_API_ENDPOINT + "/google/redirect";
                }} />

                <hr className="text-tint300 w-full my-10"></hr>
                <Field label="Email" placeholder="Enter your email address..." type="email" value={email} onChange={(value) =>
                    setEmail(value)
                } />
                <Field label="Password" placeholder="Enter your password..." type="password" value={password} onChange={(value) =>{                   
                    setPassword(value)
                    if(!validePassword(value)){
                        setErrorMessages(["Password must be at least 8 characters"])
                    }else {
                        setErrorMessages([])
                    }
                } 
                } />
                <div className="py-2 w-full">
                    <WarningButton text="Continue with email" onClick={() => {
                        validate();
                    }} />
                </div>
                <p className="text-center pt-2 font-thin text-sm text-warn">{
                    errorMessages[0]
                }</p>
                <Link to="/register" className="text-center pt-2 font-light text-sm text-tint500 hover:underline">Don't have an account ? Register here</Link>
                <p className="text-center pt-10 font-light text-sm text-tint400">
                    If you forgot your password, you’re fucked
                    so manage to pick one that you’ll remember. Even though as the old man use to say : <i>"a good password is one that you can't remember"</i> so in either case you're fucked.
                </p>
            </div>
        </div>
    )
}


export default Login;
