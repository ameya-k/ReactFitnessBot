module.exports=app=>{

    app.get('/',(req,res)=>{
        res.send({'message':'Hello from FitBot chatbot!'});
    });

    app.post('/api/text_bot',(req,res)=>{
        res.send({'message':'Responds to text query'});
    });

    app.post('/api/event_bot',(req,res)=>{
        res.send({'message':'Responds to click events'});
    });
}
