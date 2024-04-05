import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UsernameContext } from "./Login";
import usePost from "./myHooks/usePost";

function CreatePost(){

    const username = useContext(UsernameContext);
    const history = useHistory();
    const [post, setPost] = useState("");
    const [error, setError] = useState("");

    function handlePost(event){
        setPost(event.target.value);
    }

    async function handlePosting(event){
        event.preventDefault();
        const url = 'http://localhost:3000/user/posts';
        const headers = {
            "Content-Type": "application/json",
        }
        const data = {
            username,
            body: post  // Fixed typo here
        };

        try {
            const [userData, error] = await usePost(url, headers, data);

            if(!error){
                history.push("/home");
            } else {
                setError(error);
            }
        } catch (error) {
            console.error("Error posting:", error);
            setError("Error posting: " + error.message);
        }
    }

    return(
        <div className="form-class">
            <h2>Add a New Post</h2>
            <form onSubmit={handlePosting}>
                <label>Post</label>
                <textarea value={post} onChange={handlePost} required></textarea>
                <button type="submit">Post it!</button> {/* Changed button type to submit */}
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default CreatePost;
