import * as React from 'react';
import * as firebase from 'firebase';
import {fire} from './fire.jsx';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons.min.js';
import 'font-awesome/css/font-awesome.css';
export class Notification extends React.Component{


    not_display;
    not_display_bool;
    mold;
    phup;
    phdown;
    nutrition;
    mist;
    not;
    constructor(){
        super();
        this.mold={
            heading:"Mold Detected",
            icon:'bug',
            message:"Mold growth has been detected in the root of your plant. Please tend to your plant immediately to avoid fatal consequences.",
        };
        this.phup={
            heading:"Low pH Up",
            icon:'flask',
            message:"Your plant is running out of the pH Up Solution. Please replenish it immediately!",
        };
        this.phdown={
            heading:"Low pH Down",
            icon:'flask',
            message:"Your plant is running out of the pH Down Solution. Please replenish it immediately!",
        };
        this.nutrition={
            heading: "Low nutrition",
            icon:'flask',
            message:"Your plant is running out of the nutrition Solution. Please replenish it immediately!",
        };
        this.mist={
            heading:"Mist maker malfunctioned",
            icon:'shower',
            message:"The mist maker of your device has malfunctioned. This might be caused by blocked nozzles. Address this problem immediately to avoid lethal consequences.",
        };
    
        this.state={
            fixed:[],
            alert:[],
            count:0,
            not_display:{
                display:'none'
            },
            alertF:{
                display:'block'
            },
            fixedF:{
                display:'none',
                left:"400px",
                right:"-400px"

            },
            fixedTab:{
                color:'#bfbfbf'
            },
            alertTab:{
                color:'#333'
            }
            
        }
        UIkit.use(Icons);
        this.not_display_bool=false;
        this.display=this.display.bind(this);
        this.fixed=this.fixed.bind(this);
        this.alertF=this.alertF.bind(this);
    }
    componentWillMount(){
        fire.database().ref("notifications").on("value",(snapshot)=>{
            var m =snapshot.val();
            
            var array=Object.entries(m);
            
            var fixed=array.filter((val)=>{
                return(
                   val[1].fixed==true
                );
            });
            var alert=array.filter(val=>{
                return(
                    val[1].fixed==false
                )
            });

            var fixedRead=fixed.filter((val)=>{
                return(
                    val[1].read==true
                )
            });
            var fixedUnread=fixed.filter((val)=>{
                return(
                    val[1].read==false
                )
            });

            var alertRead=alert.filter((val)=>{
                return(
                    val[1].read==true
                )
            });
            var alertUnread=alert.filter((val)=>{
                return(
                    val[1].read==false
                )
            });

            var unread=array.filter((val)=>{
                return(
                   val[1].read==false
                );
            });
            this.setState({
                count:unread.length
            });
            var topFixedR=fixedRead.sort((a,b)=>{
                var aD=new Date(a[1].dateTime);
                var bD=new Date(b[1].dateTime);
                return bD-aD;
            });
            var topFixedU=fixedUnread.sort((a,b)=>{
                var aD=new Date(a[1].dateTime);
                var bD=new Date(b[1].dateTime);
                return bD-aD;
            });
            var topAlertR=alertRead.sort((a,b)=>{
                var aD=new Date(a[1].dateTime);
                var bD=new Date(b[1].dateTime);
                return bD-aD;
            });
            var topAlertU=alertUnread.sort((a,b)=>{
                var aD=new Date(a[1].dateTime);
                var bD=new Date(b[1].dateTime);
                return bD-aD;
            });
            var topFixed=topFixedU.concat(topFixedR);
            var topAlert=topAlertU.concat(topAlertR);
            this.setState({
                fixed:topFixed,
                alert:topAlert
            });

           
        });
    }
    
    display(){
        
        if(!this.not_display_bool)
        {
            
            this.not_display_bool=true;
            this.setState({
                not_display:{
                    
                    animationName:"notification",
                    animationDuration:'0.5s',
                    animationTimingFunction: "ease-out",
                    animationFillMode:"forwards",
                    display:"block",
                    
                }
            });
        }
        else{
            
            this.not_display_bool=false;
            this.setState({
                not_display:{
                    
                    animationName:"notification-close",
                    animationDuration:'0.5s',
                    animationTimingFunction: "ease-out",
                    animationFillMode:"forwards"
                    
                }
            },()=>{
                document.getElementsByClassName('not-drop')[0].addEventListener("animationend",()=>{
                    if(!this.not_display_bool){
                        this.setState({
                            not_display:{
                                display:"none"
                            }
                        });
                    }

                });

            });    
            this.state.alert.map(([key,value])=>{
                fire.database().ref().child("notifications").child(key).child("read").set(true);
            });    
        }

    }
    fixed(){
        this.setState({
            alertF:{
                
                animationName:"alert-move-left",
                animationDuration:"0.5s",
                animationFillMode:"forwards",
                animationTimingFunction: "ease-out",
                
            },
            fixedF:{
                
                animationName:"fixed-move-left",
                animationDuration:"0.5s",
                animationFillMode:"forwards",
                animationTimingFunction: "ease-out",
                display:'block'

            },
            alertTab:{
                color:'#bfbfbf'
            },
            fixedTab:{
                color:"#333"
            }
        },()=>{
            document.getElementsByClassName("alertBox")[0].addEventListener("animationend",()=>{
                
                if(this.state.fixedF.display=="block"){
                    this.setState({
                        alertF:{
                            display:"none"
                        }
                    })
                }
          
            })
        })
        this.state.fixed.map(([key,value])=>{
            fire.database().ref().child("notifications").child(key).child("read").set(true);
        });        
    }
    alertF(){
        this.setState({
            alertF:{
                display:'block',
                animationName:"alert-move-right",
                animationDuration:"0.5s",
                animationFillMode:"forwards",
                animationTimingFunction: "ease-out",
            },
            fixedF:{
                animationName:"fixed-move-right",
                animationDuration:"0.5s",
                animationFillMode:"forwards",
                animationTimingFunction: "ease-out",
            },
            alertTab:{
                color:'#333'
            },
            fixedTab:{
                color:"#bfbfbf"
            }
        },()=>{
            document.getElementsByClassName("fixedBox")[0].addEventListener("animationend",()=>{
                
                if(this.state.alertF.display=="block"){
                    this.setState({
                        fixedF:{
                            display:"none"
                        }
                    })
                }
            });    
        })
    }
    render(){
        return(
            <div className="notification">
                <div  className="not-icon">
                    <div style={this.state.count==0?{display:'none'}:{display:'flex'}} className="not-icon-count"><span>{this.state.count}</span></div>
                    <div className="not-logo" uk-icon="icon: bell; ratio:1.5" onClick={this.display}></div>
                </div>
                <div className="not-drop" style={this.state.not_display}>
                    <div className="tabName">
                        <div style={this.state.alertTab} onClick={this.alertF}>Alert</div>
                        <div style={this.state.fixedTab} onClick={this.fixed}>Fixed</div>
                    </div>
                    <div className="not-container">
                        <div  className="alertBox" style={this.state.alertF}>
                            
                            {
                                this.state.alert.map(([key,value])=>{
                                    if(value.type=="MOLD_DETECTED"){
                                        this.not=this.mold;
                                        
                                    }
                                    else if (value.type=="LOW_PH_UP"){
                                        this.not=this.phup;
                                        
                                    }
                                    else if (value.type=="LOW_PH_DOWN"){
                                        this.not=this.phdown;
                                        
                                    }      
                                    else if (value.type=="MIST_MAKER_MALFUNCTIONED"){
                                        this.not=this.mist;
                                        
                                    }
                                    else if (value.type=="LOW_NUTRITION"){
                                        this.not=this.nutrition;
                                        
                                    }                                                          
                                    return(
                                        <div className={value.read?"not-read":"not-unread"} key={key}>
                                            <div className="not-icon"><i className={"fa fa-4x fa-"+this.not.icon} aria-hidden="true"></i></div>
                                            <div>                                       
                                                <div className="not-heading">{this.not.heading}</div>
                                                <div className="not-time">{value.dateTime}</div>  
                                                <div className="not-mes">{this.not.message}</div>
                                                                                    
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>   
                        
                        <div className="fixedBox" style={this.state.fixedF}>
                            
                            {
                                this.state.fixed.map(([key,value])=>{
                                    if(value.type=="MOLD_DETECTED"){
                                        this.not=this.mold;
                                        
                                    }
                                    else if (value.type=="LOW_PH_UP"){
                                        this.not=this.phup;
                                        
                                    }
                                    else if (value.type=="LOW_PH_DOWN"){
                                        this.not=this.phdown;
                                        
                                    }      
                                    else if (value.type=="MIST_MAKER_MALFUNCTIONED"){
                                        this.not=this.mist;
                                        
                                    }
                                    else if (value.type=="LOW_NUTRITION"){
                                        this.not=this.nutrition;
                                        
                                    }              
                                    return(
                                        <div className={value.read?"not-read":"not-unread"} key={key}>
                                            <div className="not-icon"><i className={"fa fa-4x fa-"+this.not.icon} aria-hidden="true"></i></div>
                                            <div>                                       
                                                <div className="not-heading">{this.not.heading}</div>
                                                <div className="not-time">{value.dateTime}</div>  
                                                <div className="not-mes">{this.not.message}</div>
                                                                                    
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}