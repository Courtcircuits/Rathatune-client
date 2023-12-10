import { useContext, useState } from "react";
import { IconButton, WarningButton } from "../components/Button";
import GoogleIcon from "../assets/icon/google";
import { Field } from "./Login";
import { User, AuthContext, loginRequest, registerRequest, getInfosAboutMe } from "../contexts/AuthContext";
import { Link } from "react-router-dom";


function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [errorMessages, setErrorMessages] = useState<string[]>([]); // ["Email is required", "Email is invalid"
    const [password, setPassword] = useState("");
    const { user: auth, setUser: setAuth } = useContext(AuthContext);

    async function validate() {
        const errors: string[] = [];
        if (email.length === 0) errors.push("Email is required");
        if (!email.includes("@")) errors.push("Email is invalid");
        if (password.length === 0) errors.push("Password is required");
        if (password.length < 8) errors.push("Password must be at least 8 characters");
        if (name.length === 0) errors.push("Name is required");
        if (errors.length === 0) {
            try {
                const {user_id} = await registerRequest(name, email, password);
                if (!user_id) {
                    errors.push("An error occured. Please try again later.");
                    setErrorMessages(errors);
                    return;
                }
                const { token } = await loginRequest(email, password);
                setAuth({
                    email: email,
                    profile_picture: "", // profile picture can't be set here because it's not in the register request
                    name: name,
                    token: token,
                })
            } catch (e) {
                console.log(e);
                errors.push("An error occured. Please try again later.");
            }
        } else {
            setErrorMessages(errors);
        }

    }

    return (
        <div className="flex items-center justify-center h-screen flex-col">
            <div className="md:w-1/3 sm:w-1/2 flex items-center flex-col">
                <h1 className="heading-1 pb-5">Register</h1>
                <IconButton icon={
                    <GoogleIcon width={25} height={25} />
                } text="Continue with Google" type="primary" onClick={() => { }} />

                <hr className="text-tint300 w-full my-10"></hr>
                <Field label="Email" placeholder="Enter your email address..." type="email" value={email} onChange={(value) =>
                    setEmail(value)
                } />
                <Field label="Name" placeholder="Enter your name..." type="text" value={name} onChange={(value) =>
                    setName(value)
                } />
                <Field label="Password" placeholder="Enter your password..." type="password" value={password} onChange={(value) =>
                    setPassword(value)
                } />
                <div className="py-2 w-full">
                    <WarningButton text="Register with email" onClick={() => {
                        validate();
                    }} />
                </div>
                <p className="text-center pt-2 font-thin text-sm text-warn">{
                    errorMessages[0]
                }</p>

                <Link to="/login" className="text-center pt-2 font-light text-sm text-tint500 hover:underline">Already have an account ? Log in here</Link>
                <p className="text-center pt-10 font-light text-sm text-tint400">
                    If you forgot your password, you’re fucked
                    so manage to pick one that you’ll remember. Even though as the old man use to say : <i>"a good password is one that you can't remember"</i> so in either case you're fucked.
                </p>
            </div>
        </div>
    )
}


export default Register;
