import React, {useEffect, useState} from 'react';
import Post from './Post';
import useGet from './myHooks/useGet';

function UserDashBoard({username}) {

    const url = `http://localhost:3000/user/dashboard?username=ToDWorld`;
    const headers = {
        "X-Token": "f30f00c7-824a-4a78-a528-a9a2f54ab1f7",
    };

    const [userData, error, token] = useGet(url, headers);
    const [showPosts, setShowPosts] = useState(false);

    function handlePostsDisplay(event){

        if (event.target.textContent === 'See Posts'){
            event.target.textContent = "Hide Posts";
        } else {
            event.target.textContent = "See Posts";
        }
        setShowPosts(!showPosts);
    }

    if (error){
        return(
            <p className='error-message'>🚧 {error} 🚧</p>
        );
    }

    return(
        <>
            <div className='user-dashboard-container'>
                <h2>{userData && userData.name}</h2>
                <button className='edit-button'>Edit Profile</button>
                <h3>{userData && userData.username}</h3>
                <h3>Joined: {userData && new Date(userData.createdAt).toLocaleDateString()}</h3>
                <p className='bio-container'>Bio:<span>{userData && userData.bio}</span></p>
                <p>Posts: {userData && userData.posts.length}</p>
                <button onClick={handlePostsDisplay}>See Posts</button>
                {showPosts && <Post data={userData && userData.posts} />}
                {token && <p>{token}</p>}
                
            </div>
        </>
    );
}

export default UserDashBoard;