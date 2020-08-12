import * as React from 'react';
import {fire} from './fire.jsx';
import UIkit from 'uikit';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {logo} from '../index.js';

export class Login extends React.Component{
    constructor(){
        super();
        this.login=this.login.bind(this);

    }
    render(){
        return(
            <div className="login-wrap">
                <div className="logo-login"><img src={logo} /></div>
                <form className="uk-container-small">
                    
                    <input type="text" id="uname" className="uk-input" placeholder="Username" />
                    <input type="text" id="pwd" className="uk-input" placeholder="password" />
                    <button onClick={this.login} className="uk-button uk-button-default">Login</button>
                </form>
            </div>
        );
    };

 
    login(e){
        e.preventDefault();
       
        var uname=document.getElementById("uname").value;
        var pwd=document.getElementById("pwd").value;
        
        fire.auth().signInWithEmailAndPassword(uname, pwd).catch((error)=>{
            
            if(error.code==='auth/wrong-password'){
                
                UIkit.notification('Wrong authentication info!');
            }
            else{
                UIkit.notification(error.message);
            }
        });

    
        
       
    }
}