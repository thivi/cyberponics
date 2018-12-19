import * as React from 'react';
import * as firebase from 'firebase';
import {fire} from './fire.jsx';
import * as ReactDOM from 'react-dom';
import Chart from 'chart.js';

export class History extends React.Component{
    keynames;
    chart;
    constructor(props){
        super(props);
        this.state={
            
            cpdata:{},
            selectedChart:"co2"
            
        }
        this.keyNames={
            co2:"CO2 PPM",
            ec: "PPM of Nutrition Solution",
            humidityWaterLevel:"Water Level inside the humidifier",
            light_intensity:"Light Instensity",
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
        this.generateChart=this.generateChart.bind(this);
        this.selectChart=this.selectChart.bind(this);
        
    }
    componentWillMount(){
        
        var mes=fire.database().ref('data').on('value',(snapshot)=>{
            var message=snapshot.val();
            
            this.setState({
                cpdata:message
                
            },()=>{
                this.generateChart();
            });
            
        })

    }

    generateChart(){
        
        var dataA=new Array();
        
        Object.entries(this.state.cpdata).map(([key,val])=>{
            var date=new Date(key);
            
            var value=parseFloat(val[this.state.selectedChart]);
            
            dataA.push({
                x:date,
                y:value
            });
           
        })
      
        var ctx=document.getElementById("chartStat");
        this.chart=new Chart(ctx, {
            type: 'line',
            data: {
              
            datasets: [{ 
                  data: dataA,
                  label:this.keyNames[this.state.selectedChart],
                  borderColor: "#d7df23",
                  fill: true
                }
            ]
            },
            options: {
                scales:{
                    xAxes:[{
                        type:'time',
                        distribution:'linear',
                        
                    }]
                },    
                title: {
                    display: true,
                    text: this.keyNames[this.state.selectedChart]+" over time"
                }
            }
        });
        
    }
    selectChart(e){
        
        this.setState({
            selectedChart:e.target.value
        },()=>{
            this.chart.destroy();
            this.generateChart();
        });
        
    }
    render(){
        return(
                <div>
                    <div>
                        <select className="uk-select" onChange={this.selectChart} >
                        
                            {
                                
                                Object.entries(this.keyNames).map(([key,val])=>{
                                    return(
                                        <option value={key}>{val}</option>
                                    );
                                })
                            }
                           
                        </select>
                    </div>
                    <canvas className="chart" id="chartStat"></canvas>
                </div>
            
        );
    }
}
ReactDOM.render(
    <History names="s"/>, document.getElementById("cp-react")
);
