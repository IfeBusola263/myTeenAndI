import NavBar from './NavBar.jsx'
import Home from './Home.jsx'
import UserDashBoard from './UserDashboard.jsx'
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import CreatePost from './CreatePost.jsx';
import RootHome from './RootHome.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='content'>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <RootHome />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/dashboard">
            <UserDashBoard />
          </Route>
          <Route exact path='/signup'>
            <SignUp />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/user/post'>
            <CreatePost />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
