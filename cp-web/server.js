var express = require('express');
var app=express();




app.listen(8090, ()=>{
    console.log("Server running at http://localhost:8090");
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/dist/index.html');
});
app.use(express.static('dist'));
app.get('*',function (req, res) {
    res.sendFile(__dirname+'/dist/index.html');
});