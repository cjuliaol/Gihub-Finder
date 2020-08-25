import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class User extends Component {

   componentDidMount(){
       this.props.getUser(this.props.match.params.login);
       this.props.getUserRepos(this.props.match.params.login);
       console.log('User component => ',this.props.user)
   }

   static propTypes = {
       loading: PropTypes.bool,
       user: PropTypes.object.isRequired,
       repos: PropTypes.array.isRequired,
       getUser: PropTypes.func.isRequired,
       getUserRepos: PropTypes.func.isRequired
   }    

    render() {

        const {
          name,
          company,
          avatar_url,
          location,
          bio,
          blog,
          login,
          html_url,
          followers,
          following,
          public_repos,
          public_gists,
          hireable          
        } = this.props.user;
       
        const  { loading } = this.props;

        if(loading) return <Spinner />;

        return (
             
            <div>
                <Link to="/" className="btn btn-light">Back to search</Link>
         
                Hireable: {hireable ? <i className="fas fa-check text-success" /> : 
                <i className="fas fa-times-circle text-danger"/>}
                <div className="card grid-2">
                    <div className="all-center">
                      <img src={avatar_url} 
                         alt=""
                         className="round-img"
                         style={ {width: '150px'   }}
                         />
                    </div>
                </div>
                <h1>Name: {name}</h1>
                <p>Location: {location}</p>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url}  className="btn btn-dark my-1">Visit github profile</a>
                    <ul>
                        <li>
                            {login && (
                               <Fragment>
                                   <strong>Username: </strong> {login}
                               </Fragment>)
                              }
                        </li>
                        <li>
                            {login && (
                               <Fragment>
                                   <strong>Company: </strong> {company}
                               </Fragment> )
                              }
                        </li>
                        <li>
                            {login && (
                               <Fragment>
                                   <strong>Blog: </strong> {blog}
                               </Fragment>)
                              }
                        </li>
                    </ul>
                </div>
               <div className="card text-center">
                   <div className="badge badge-primary">Followers: {followers}</div>
                   <div className="badge badge-success">Following: {following}</div>
                   <div className="badge badge-light">Public Repos: {public_repos}</div>
                   <div className="badge badge-dark">Public Gist: {public_gists}</div>
               </div>
            </div>
        )
    }
}

export default User;