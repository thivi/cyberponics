import * as React from 'react';
import * as firebase from 'firebase';
import {fire} from './fire.jsx';

export class Config extends React.Component{
    constructor(){
        super();
        this.update=this.update.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state={
            config:{
                EC_Low:"", 
                EC_Up:"", 
                Humidity_Water_Level:"", 
                Light_Intensity_Low:"", 
                Light_Intensity_Up:"", 
                Mist_Maker_Time:"", 
                Mold_detector_thresh:"", 
                Nut_tank_level:"", 
                Liq_level_reser:"", 
                pH_up:"",
                pH_low:"",
                pH_UP_level:"",
                pH_Down_level:"",
                Root_Hum_Up:"",
                Root_Hum_Low:"",
                Root_Pres_Up:"",
                Root_Pres_Low:"",
                Root_Temp_Up:"",
                Root_Temp_Low:"",
                Shoot_Hum_Up:"",
                Shoot_Hum_Low:"",
                Shoot_Pres_Up:"",
                Shoot_Pres_Low:"",
                Shoot_Temp_Up:"",
                Shoot_Temp_Low:""
            }
           
        }
        
    }
    componentWillMount(){
        var mes=fire.database().ref('config').once('value').then((snapshot)=>{
            var message=snapshot.val();
            
            this.setState({
                config:message
                
            });
            
        })
    }
    update(e){
        e.preventDefault();

        fire.database().ref().child("config").set(this.state.config);
    }

    handleChange(str,e){
        var obj=this.state;
        obj.config[str]=e.target.value;
        this.setState(obj);
    }
    render(){
        return(
            <div>
                
                <h2 style={{color:"white"}}>Configurations</h2>
                <form className="uk-form-stacked config-form">
                    
                        <h3>PPM of the nutrition solution</h3>
                        <label>Lower Margin (ppm): </label><input className="uk-input" onChange={(e)=>this.handleChange("EC_Low",e)} value={this.state.config.EC_Low} type="text" id="eclow"/>
                        <label>Upper Margin (ppm):</label><input className="uk-input" onChange={(e)=>this.handleChange("EC_Up",e)} value={this.state.config.EC_Up} type="text" id="ecup"/>
                    
                    
                        <h3>Water level inside the humidifier</h3>
                        <label>Margin (cm): </label><input className="uk-input" onChange={(e)=>this.handleChange("Humidity_Water_Level",e)} value={this.state.config.Humidity_Water_Level} type="text" id="humwatermargin"/>
                        
                    
                    
                        <h3>Light Intensity</h3>
                        <label>Lower Margin (cd): </label><input className="uk-input" onChange={(e)=>this.handleChange("Light_Intensity_Low",e)} value={this.state.config.Light_Intensity_Low} type="text" id="cdlow"/>
                        <label>Upper Margin (cd):</label><input className="uk-input" onChange={(e)=>this.handleChange("Light_Intensity_Up",e)} value={this.state.config.Light_Intensity_Up} type="text" id="cdup"/>
                    
                    
                        <h3>Mist Maker</h3>
                        <label>Time interval (mins): </label><input className="uk-input" onChange={(e)=>this.handleChange("Mist_Maker_Time",e)} value={this.state.config.Mist_Maker_Time} type="text" id="mistmin"/>
                    
                    
                        <h3>Mold Detector</h3>
                        <label>Threshold (0-255): </label><input className="uk-input" onChange={(e)=>this.handleChange("Mold_detector_thresh",e)} value={this.state.config.Mold_detector_thresh} type="text" id="thresh"/>
                    
                    
                        <h3>Liquid level inside the nutrition solution tank</h3>
                        <label>Margin (cm): </label><input className="uk-input" onChange={(e)=>this.handleChange("Nut_tank_level",e)} value={this.state.config.Nut_tank_level} type="text" id="nutlevel"/>
                    
                    
                        <h3>Liquid level inside the nutrition reservoir</h3>
                        <label>Margin (cm): </label><input className="uk-input" onChange={(e)=>this.handleChange("Liq_level_reser",e)} value={this.state.config.Liq_level_reser} type="text" id="nutlevelres"/>
                    
                    
                        <h3>pH of the nutrition solution</h3>
                        <label>Lower Margin (pH): </label><input className="uk-input" onChange={(e)=>this.handleChange("pH_low",e)} value={this.state.config.pH_low} type="text" id="pHlow"/>
                        <label>Upper Margin (pH):</label><input className="uk-input" onChange={(e)=>this.handleChange("pH_up",e)} value={this.state.config.pH_up} type="text" id="pHup"/>
                    
                    
                        <h3>Liquid level inside pH down solution tank</h3>
                        <label>Margin (cm): </label><input className="uk-input" onChange={(e)=>this.handleChange("pH_Down_level",e)} value={this.state.config.pH_Down_level} type="text" id="phdown"/>
                        
                    
                    
                        <h3>Liquid level inside pH up solution tank</h3>
                        <label>Margin (cm): </label><input className="uk-input" onChange={(e)=>this.handleChange("pH_UP_level",e)} value={this.state.config.pH_UP_level} type="text" id="phup_level"/>
                    
                    
                    
                        <h3>Relative Humidity inside the root chamber</h3>
                        <label>Lower Margin (%): </label><input className="uk-input" onChange={(e)=>this.handleChange("Root_Hum_Low",e)} value={this.state.config.Root_Hum_Low} type="text" id="roothumlow"/>
                        <label>Upper Margin (%):</label><input className="uk-input" onChange={(e)=>this.handleChange("Root_Hum_Up",e)} value={this.state.config.Root_Hum_Up} type="text" id="roothumup"/>
                    
                    
                        <h3>Pressure inside the root chamber</h3>
                        <label>Lower Margin (%): </label><input className="uk-input" onChange={(e)=>this.handleChange("Root_Pres_Low",e)} value={this.state.config.Root_Pres_Low} type="text" id="rootpreslow"/>
                        <label>Upper Margin (%):</label><input className="uk-input" onChange={(e)=>this.handleChange("Root_Pres_Up",e)} value={this.state.config.Root_Pres_Up} type="text" id="rootpresup"/>
                    
                    
                        <h3>Temperature inside the root chamber</h3>
                        <label>Lower Margin (°C): </label><input className="uk-input" onChange={(e)=>this.handleChange("Root_Temp_Low",e)} value={this.state.config.Root_Temp_Low} type="text" id="roottemplow"/>
                        <label>Upper Margin (°C):</label><input className="uk-input" onChange={(e)=>this.handleChange("Root_Temp_Up",e)} value={this.state.config.Root_Temp_Up} type="text" id="roottempup"/>
                    
                    
                        <h3>Relative Humidity inside the shoot chamber</h3>
                        <label>Lower Margin (%): </label><input className="uk-input" onChange={(e)=>this.handleChange("Shoot_Hum_Low",e)} value={this.state.config.Shoot_Hum_Low} type="text" id="shoothumlow"/>
                        <label>Upper Margin (%):</label><input className="uk-input" onChange={(e)=>this.handleChange("Shoot_Hum_Up",e)} value={this.state.config.Shoot_Hum_Up} type="text" id="shoothumup"/>
                    
                    
                        <h3>Pressure inside the shoot chamber</h3>
                        <label>Lower Margin (%): </label><input className="uk-input" onChange={(e)=>this.handleChange("Shoot_Pres_Low",e)} value={this.state.config.Shoot_Pres_Low} type="text" id="shootpreslow"/>
                        <label>Upper Margin (%):</label><input className="uk-input" onChange={(e)=>this.handleChange("Shoot_Pres_Up",e)} value={this.state.config.Shoot_Pres_Up} type="text" id="shootpresup"/>
                    
                    
                        <h3>Temperature inside the shoot chamber</h3>
                        <label>Lower Margin (°C): </label><input className="uk-input" onChange={(e)=>this.handleChange("Shoot_Temp_Low",e)} value={this.state.config.Shoot_Temp_Low} type="text" id="shoottemplow"/>
                        <label>Upper Margin (°C):</label><input className="uk-input" onChange={(e)=>this.handleChange("Shoot_Temp_Up",e)} value={this.state.config.Shoot_Temp_Up} type="text" id="shoottempup"/>
                    
                    <button className="uk-button uk-button-default" onClick={this.update}>Update</button>
                </form>
            </div>
        );
    }
}