const fitbot=require('../fitbot/fitbot');

module.exports=app=>{

    app.get('/',(req,res)=>{
        res.send({'message':'Hello from FitBot chatbot!'});
    });

    app.post('/api/text_bot/',async (req,res)=>{

        let responses=await fitbot.textQuery(req.body.text,req.body.parameters);

        res.send(responses[0].queryResult);
    });

    app.post('/api/event_bot',async (req,res)=>{
        let responses=await fitbot.eventQuery(req.body.event,req.body.parameters);

        res.send(responses[0].queryResult);
    });


};
