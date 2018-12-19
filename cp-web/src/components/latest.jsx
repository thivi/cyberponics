import * as React from 'react';
import * as firebase from 'firebase';
import {fire} from './fire.jsx';



export class Latest extends React.Component{
    keyNames;
    constructor(props){
        super(props);
        this.state={
            
            cpdata:[],
            lastUpdated:0
        }
        this.keyNames={
            co2:{__html:"CO<sub>2</sub> PPM"},
            ec: "PPM of Nutrition Solution",
            humidityWaterLevel:"Water Level inside the humidifier",
            light_intensity:"Light Instensity",
            "mist-maker":"Mist maker status",
            mold:"Plant's root's health status",
            nutrition_level:"Liquid level inside the nutrition tank",
            pH: "pH of the Nutrition Solution",
            pH_UP_level:"Liquid level inside the pH Up tank",
            phDown:"Liquid level inside the pH Down tank",
            plant_height:"Height of the plant",
            root_humidity:"Humidity inside the Root Chamber",
            root_pressure:"Pressure inside the Root Chamber",
            root_temperature:"Temperature inside the Root Chamber",
            shoot_humidity:"Humidity inside the Shoot Chamber",
            shoot_pressure:"Pressure inside the Shoot Chamber",
            shoot_temperature:"Temperature inside the Shoot Chamber",
            water_level:"Liquid level inside the nutrition reservoir"
        }
        this.keyLogos={
            co2:"cloud",
            ec: "flask",
            humidityWaterLevel:"hourglass-end",
            light_intensity:"lightbulb-o",
            "mist-maker":"shower",
            mold:"bug",
            nutrition_level:"hourglass-end",
            pH: "flask",
            pH_UP_level:"hourglass-end",
            phDown:"hourglass-end",
            plant_height:"tree",
            root_humidity:"tint",
            root_pressure:"tachometer",
            root_temperature:"thermometer-half",
            shoot_humidity:"tint",
            shoot_pressure:"tachometer",
            shoot_temperature:"thermometer-half",
            water_level:"hourglass-end"
        }
    }
    componentWillMount(){
        
        var mes=fire.database().ref('data').on('value',(snapshot)=>{
            var message=snapshot.val();
            var latest=Object.entries(message).sort((a,b)=>{
                var aD= new Date(a[0]);
                var bD=new Date(b[0]);
                return bD-aD;

            })[0];
            
            var nowDate=new Date();
            

            var updated=new Date(latest[0]); 
            
            var utc1=Date.UTC(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours(), nowDate.getMinutes(), nowDate.getSeconds());
            var utc2=Date.UTC(updated.getFullYear(), updated.getMonth(), updated.getDate(), updated.getHours(), updated.getMinutes(), updated.getSeconds());

            var lastupdated=Math.floor((utc1-utc2)/(1000*60));
            
            this.setState({
                cpdata:latest,
                lastUpdated:lastupdated
                
            });
            
        })
    }

    render(){
        
        return(
            
            <div>
                <div className="updated-time"><span>Last Updated </span>{this.state.lastUpdated} <span> minutes ago </span> </div>
                <div className="data-panel">
                {
                    this.state.cpdata[1]?
                    Object.entries(this.state.cpdata[1]).map(([key,val])=>{
                        console.log(key,val);
                        return(
                            <div className="panel-item" key={key}><div className="item-key">{key=="co2"?<span dangerouslySetInnerHTML={this.keyNames[key]}></span>:this.keyNames[key]} </div><div className="keys"><div className="item-logo"><i className={"fa fa-4x fa-"+this.keyLogos[key]} aria-hidden="true"></i></div><div className="item-value">{key!="mist-maker" && key!="mold"?parseFloat(val).toFixed(2):key=="mist-maker"?val==true?"Working":<span className="mal">Malfunctioned</span>:key=="mold"?val==true?<span className="mold">Mold Detected</span>:"Healthy":null}</div></div></div>
                        );
                    })
                    :null
                }
                </div>
            
            </div>
        );
    }
}