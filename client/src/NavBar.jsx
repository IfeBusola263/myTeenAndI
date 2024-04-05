
import { Link } from 'react-router-dom';


function NavBar() {


    return(
        <nav className="navbar">
            <h1>My Teen & I</h1>
            <div className="links">
                <Link to="/home">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/user/posts">New Post</Link>
                <a href="http://localhost:3000/logout" >logout</a>
            </div>
        </nav>
    )

}

export default NavBar