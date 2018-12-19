import * as React from 'react';
import * as firebase from 'firebase';
import {fire} from './fire.jsx';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect, NavLink} from 'react-router-dom';
import {History} from './history.jsx';
import {Latest} from './latest.jsx';
import {Config} from './config.jsx';
import {Login} from './login.jsx';
import {Notification} from './notification.jsx';
import UIkit from 'uikit';
import {Lightbox} from './lightbox.jsx';
import 'uikit/dist/css/uikit.min.css';
import {logo} from '../index.js';
export class Main extends React.Component{

constructor(){
    super();
    this.state={
        login: true,
        lightbox:false
    }
    this.logout=this.logout.bind(this);
    this.takePicture=this.takePicture.bind(this);
    this.destroyImage=this.destroyImage.bind(this);
}

logout(e){
    e.preventDefault();
    firebase.auth().signOut().then(function() {
        
        }).catch(function(error) {
          // An error happened.
    });
}
componentWillMount(){
    
     fire.auth().onAuthStateChanged(user=>{
        
        if(user){
           this.setState({
               login: true
               
           }); 
           
           
        }
        else{
            this.setState({
                login: false
            });
        }
    }); 
}
takePicture(){
    this.setState({
        lightbox:true
    })
 
}
destroyImage(){
    this.setState({
        lightbox:false
    })
}
render(){
    
    if(!this.state.login){
        return(
            <Switch>
                <Route exact path='/login' component={Login}/>
                <Redirect to="/login"/>
            </Switch>
        ); 

    }
    else{
        
        return(
            <div className="main-wrap">
                {this.state.lightbox?<div className="lightbox-wrap"><div className="image-wrap"><Lightbox/><div onClick={this.destroyImage}className="lightbox-close"><i class="fa fa-2x fa-window-close" aria-hidden="true"></i></div></div></div>:null}
                <div className="sidebar">
                    <div className="header-logo">
                        <img src={logo}/>
                    </div>
                    <div className="menu">
                        <NavLink to="/realtime" activeClassName="active-menu"><i className="fa fa-clock-o" aria-hidden="true"></i> Realtime Data</NavLink>
                        <NavLink to="/statistics" activeClassName="active-menu"><i className="fa fa-line-chart" aria-hidden="true"></i> Statistics</NavLink>
                        <NavLink to="/configurations" activeClassName="active-menu"><i className="fa fa-cogs" aria-hidden="true"></i> Configurations</NavLink>
                    </div>
                </div>
                <div className="side-content">
                    <div className="header">
                        <Notification/>
                        <button className="uk-button uk-button-default" onClick={this.takePicture}><i className="fa fa-camera" aria-hidden="true"></i> Take a Picture!</button>
                        <button className="uk-button uk-button-default" onClick={this.logout}>Logout</button>
                    </div>
                    <div className="content">
                        <Switch>
                            <Route exact path="/realtime" component={Latest}/>
                            <Route exact path='/statistics' component={History}/>
                            <Route exact path="/configurations" component={Config}/>
                            <Redirect from="/login" to="/realtime"/>
                            <Redirect from="*" to="/realtime"/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
    
 
}
}



ReactDOM.render(
    <BrowserRouter>
        <Main/>
    </BrowserRouter>, document.getElementById("cp-react")
    
);
