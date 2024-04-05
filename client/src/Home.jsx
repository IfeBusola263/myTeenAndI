
import React, {useEffect, useState} from 'react';
import Post from './Post';
import UserDashBoard from './UserDashboard';
import usePost from './myHooks/usePost';

function Home(){

    const url = 'http://localhost:3000/login';
    const headers = {
        "Authorization": "Basic VG9EV29ybGQ6c29TZWNyZXQ="
    };
    const [userData, error] = usePost(url, headers);

    if (error){
        return(
            <p>Something Went Wrong!</p>
        )
    } else {

        return(
            <div className="home">
               <Post data={userData && userData.posts} />
               <Post data={userData && userData.posts.filter((post) => post.likes >= 50)}/>
            </div>
        );
    
    }
}

export default Home;
