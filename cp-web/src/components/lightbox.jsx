import * as React from 'react';
import openSocket from 'socket.io-client';

export class Lightbox extends React.Component{
    socket;
    constructor(){
        super();
        this.state={
            picture:null
        }
        this.socket=openSocket("https://cyberponics.herokuapp.com/camera");
    }
    componentWillMount(){
        
        this.socket.emit("deviceID","clientWeb");
        this.socket.emit("takePicture","device1",(picture)=>{
           this.setState({
               picture:picture
           });
        });
    }
    componentWillUnmount(){
        this.socket.disconnect();
    }
    render(){
        return(
            <div className="lightbox">
		
                <img src={'data:image/jpg;base64, '+this.state.picture}/>
            </div>
        );
    }

}