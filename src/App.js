import React, {  Component, Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios';
import Search from './components/layout/Search';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';

class App extends Component  {

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
}

// Search Github users
searchUsers = async ( texto ) => {
  console.log("Called by Search ...", texto);

  this.setState( { loading: true});

  const response = await axios.get(`https://api.github.com/search/users?q=${texto}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
   client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
   
   this.setState( { users: response.data.items, loading: false});

   console.log('Search Count' , response.data.total_count)

}

// Get single Github user
  getUser = async (username) => {

    
  this.setState( { loading: true});

  const response = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
   client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
   
   this.setState( { user: response.data, loading: false});
  }

  // Get User repos

  getUserRepos = async (username) => {

    
    this.setState( { loading: true});
  
    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
     client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
     console.log('GetUserRepos ==> ', response);
     this.setState( { repos: response.data, loading: false}) ;
    }

//  Clear user from state
clearUsers = () => {
  this.setState( {users: [], loading: false} );
}

setAlert = (message, type) =>{
   this.setState( { alert: { message: message, type: type } });

   setTimeout(() => {
     this.setState( { alert: null} );
   }, 5000);
}
   render(){   
     
    const {users, loading, user, repos } = this.state;

    return (
      <Router>
      <div className="App">
         <Navbar title="Smart Finder"/>
         <div className="container">
             <Alert alert={this.state.alert} />
             <Switch>
               <Route  exact path='/' render={ props => (
                  <Fragment>
                  <Search searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                     showClear={this.state.users.length>0 ? true: false} 
                     setAlert={this.setAlert}/>  
                    <Users loading={loading} users={users} />
                  </Fragment>
               )}  />
               <Route exact path="/about" component={About}/>
               <Route exact path="/user/:login" render={ props => (
                    <User { ... props} 
                      getUser={this.getUser} 
                      getUserRepos={this.getUserRepos} 
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
  
}

export default App;
