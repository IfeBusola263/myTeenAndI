import React, { useState } from "react";
import usePost from "./myHooks/usePost";
import { useHistory } from "react-router-dom";

function SignUp(){

    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const handleName = (event) => setName(event.target.value);
    const handleUserName = (event) => setUserName(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    const handlePhoneNumber = (event) => setPhoneNumber(event.target.value);
    const handleGender = (event) => setGender(event.target.value);

    const handleSignUp = async (event) => {
        event.preventDefault();
        const data = { name, email, username, password, phoneNumber };
        const url = "http://localhost:3000/signup";
        const header ={
            "Content-Type": "application/json",
        };

        try {
            const [userData, error] = await usePost(url, header, data);
            if (error) {
                setError(error);
            } else {
                history.push("/");
            }
        } catch (error) {
            console.error("Error signing up:", error);
            setError("Error signing up: " + error.message);
        }

        // Clear input fields after form submission
        setName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setGender("");
    };

    return(
        <>
            <div className="form-class">
                <h2>SignUp</h2>
                <form onSubmit={handleSignUp}>
                    <label>Name</label>
                    <input value={name} onChange={handleName} type="text" required/>
                    <label>Username</label>
                    <input value={username} onChange={handleUserName} type="text" required/>
                    <label>E-mail</label>
                    <input value={email} onChange={handleEmail} type="text" required/>
                    <label>Phone</label>
                    <input value={phoneNumber} onChange={handlePhoneNumber} type="text" />
                    <label>Password</label>
                    <input value={password} onChange={handlePassword} type="password" required/>
                    <label>Gender</label>
                    <select value={gender} onChange={handleGender}>
                        <option value="">Select a gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Prefer Not to say">Prefer not to say</option>
                    </select>
                    <button type="submit">SignUp</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    )
}

export default SignUp;
