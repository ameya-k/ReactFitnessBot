const express=require('express');
const app=express();

const PORT_NUMBER=process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send({'message':'Hello from FitBot!'});
});



app.listen(PORT_NUMBER);
