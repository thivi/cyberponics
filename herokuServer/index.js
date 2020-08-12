const PORT = process.env.PORT || 5000
var app=require('express')();
var io=require("socket.io")(
app.listen(PORT,()=>{
    console.log("Listening on port", PORT)
}))

var sockets=new Array();
io.of('/camera').on("connection",socket=>{
    var socketID;
    console.log("A user connected!");
    
    socket.on("disconnect", ()=>{
        console.log("A user disconnected");
    });
    socket.on("deviceID",(msg)=>{
        socketID=msg;
        console.log(socketID);
        if(socketID=="clientWeb"){

            socket.on("takePicture",(msg, fn)=>{

                
                console.log("take picture");

                sockets.findIndex(s=>{

                    if(s.socketID==msg){

                        console.log("the device is connected");
                        s.socket.emit("takePicture","picture",(picture)=>{

                            console.log("waiting for picture from device");

                           
                            fn(picture);
                           

                        });
                    }
                });

                

                
               
            });
        }
        if(socketID=="device1"){
            sockets.push({socketID:socketID, socket:socket});
        }
    });
});

