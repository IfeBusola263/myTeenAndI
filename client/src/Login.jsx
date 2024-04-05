import { useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import usePost from "./myHooks/usePost";

export const UsernameContext = createContext();

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const handleUsername = (event) => setUsername(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);

    const handleLogIn = async (event) => {
        event.preventDefault();
        const auth = btoa(`${username}:${password}`);
        const url = 'http://localhost:3000/login';
        const headers = {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json",
        };

        try {
            const [data, error] = await usePost(url, headers);
            if (!error){
                history.push("/home");
            } else {
                setError(error);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("Error logging in: " + error.message);
        }
    };

    return(
        <>
            <div className="form-class">
                <h2>Login</h2>
                <form onSubmit={handleLogIn}>
                    <label>Username</label>
                    <input value={username} onChange={handleUsername} type="text" required/>
                    <label>Password</label>
                    <input value={password} onChange={handlePassword} type="password" required/>
                    <button type="submit">Login</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    )
}

export default Login;
