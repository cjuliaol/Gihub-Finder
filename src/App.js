import React, {  useState, Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios';
import Search from './components/layout/Search';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';

const  App = ( ) =>  {


const [users, setUsers ] = useState([]);
const [user, setUser] = useState({});
const [loading, setLoading] = useState(false);
const [alert, setAlerta] = useState(null);
const [repos, setRepos] = useState([]);

// Search Github users
const searchUsers = async ( texto ) => {
  console.log("Called by Search ...", texto);

  
  setLoading(true);

  const response = await axios.get(`https://api.github.com/search/users?q=${texto}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
   client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
   
   setUsers(response.data.items);
   setLoading(false);

   console.log('Search Count' , response.data.total_count)

}

// Get single Github user
  const getUser = async (username) => {

    
  
  setLoading(true);

  const response = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
   client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
   
   setUser(response.data);
   setLoading(false);

  }

  // Get User repos

  const getUserRepos = async (username) => {

    
    setLoading(true);
  
    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
     client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
     console.log('GetUserRepos ==> ', response);

     setRepos(response.data);
     setLoading(false);

    }

//  Clear user from state
const clearUsers = () => {
  setUsers([]);
  setLoading(false);
}

 const setAlert = (message, type) =>{

  setAlerta( { message: message, type: type })

   setTimeout(() => {
     setAlerta(null);
   }, 5000);
}
     
     
  

    return (
      <Router>
      <div className="App">
         <Navbar title="Smart Finder"/>
         <div className="container">
             <Alert alert={alert} />
             <Switch>
               <Route  exact path='/' render={ props => (
                  <Fragment>
                  <Search searchUsers={searchUsers} 
                    clearUsers={clearUsers} 
                     showClear={users.length>0 ? true: false} 
                     setAlert={setAlert}/>  
                    <Users loading={loading} users={users} />
                  </Fragment>
               )}  />
               <Route exact path="/about" component={About}/>
               <Route exact path="/user/:login" render={ props => (
                    <User { ... props} 
                      getUser={getUser} 
                      getUserRepos={getUserRepos} 
                      user={user} 
                      repos = {repos}
                      loading={loading}  />
                ) } />
             </Switch>
         </div>         
      </div>
      </Router>      
    );
  
  
}

export default App;
