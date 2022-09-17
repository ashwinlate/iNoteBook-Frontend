
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert  from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import {useState} from 'react';
import { useEffect } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (bool) => {
    setIsAuthenticated(bool);
  };

  async function verifyAuth() {
    try {
      const response = await fetch(
        "https://inotebook-backend-api.herokuapp.com/auth/verify",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();
      console.log(parseRes);

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.log(err.message);
    }
  }
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  useEffect(() => {
    verifyAuth();
  }, []);
  return (
    <>
      <NoteState>
        <Router>
          <Navbar setAuth ={ setAuth }/>
          <Alert alert={alert} />
          <div className="container">
            <Switch>
              <Route exact path="/" element = {isAuthenticated ? <Home showAlert={showAlert} setAuth={setAuth}/> : <Navigate to="/login"/>} />
                            
          
              <Route exact path="/about">
                <About />
              </Route>
              {/* <Route exact path="/login"> */}
                
                <Route exact path="/login" element = {isAuthenticated ? <Navigate to="/" /> : <Login showAlert={showAlert} setAuth={setAuth}/>} />
                
 
              {/* </Route> */}
              {/* <Route exact path="/signup"> */}
                
                <Route exact path="/login" element = {isAuthenticated ? <Navigate to="/" /> : <Signup showAlert={showAlert} setAuth={setAuth}/>} />
              {/* </Route> */}
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
