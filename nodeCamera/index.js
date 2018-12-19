var io=require("socket.io-client");
var socket=io.connect("https://cyberponics.herokuapp.com/camera");
var cam=require('raspicam');
var c=new cam({mode:"photo",output:"photo.jpg",w:1920,h:1080});
var fs= require('fs');

socket.on("connect",()=>{
    console.log("connected!");
    socket.emit("deviceID","device1");
});

socket.on("takePicture",(msg, fn)=>{
    console.log("picture request");
    c.start();
    c.on("read",()=>{
	var data=new Buffer(fs.readFileSync("./photo.jpg")).toString("base64");
    	fn(data);
    });
	var data=new Buffer(fs.readFileSync("./photo.jpg")).toString("base64");
    	fn(data);
    
});

//rpi server

