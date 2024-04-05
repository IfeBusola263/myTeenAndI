
import React, {useState, useEffect} from 'react';

function Post({ data }){

    return(
        <>
            { data && data.map((post) => (
                    <div className='posts-container' key={post.id || post._id}>
                        <h1>{'@' + post.username}</h1>
                        <h4>{new Date(post.date).toLocaleString()}</h4>
                        <div>{post.body}</div>
                        <h5>Likes: {post.likes} <strong><h5>Comments: {post.comments.length}</h5></strong></h5>
                    </div>
                ))}
        </>
    )
}

export default Post;