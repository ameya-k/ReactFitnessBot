const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send({'message':'Hello from FitBot!'});
});


app.listen(5000);
