import React, {  Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/layout/Search';
import Alert from './components/layout/Alert';

class App extends Component  {

  state = {
    users: [ ],
    loading: false,
    alert: null
}

searchUsers = async ( texto ) => {
  console.log("Called by Search ...", texto);

  this.setState( { loading: true});

  const response = await axios.get(`https://api.github.com/search/users?q=${texto}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
   client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
   
   this.setState( { users: response.data.items, loading: false});

   console.log('Search Count' , response.data.total_count)

}

clearUsers = () => {
  this.setState( {users: [], loading: false} );
}

setAlert = (message, type) =>{
   this.setState( { alert: { message: message, type: type } });
}
   render(){    

    return (
      <div className="App">
         <Navbar title="Smart Finder"/>
         <div className="container">
        <Alert alert={this.state.alert} />
         <Search searchUsers={this.searchUsers} 
                 clearUsers={this.clearUsers} 
                 showClear={this.state.users.length>0 ? true: false} 
                 setAlert={this.setAlert}/>  
             <Users loading={this.state.loading} users={this.state.users} />
         </div>         
      </div>
    );
  }
  
}

export default App;
