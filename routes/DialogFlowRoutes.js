
const  df=require('dialogflow');
const conf=require('../config/keys');

const sessionClient=new df.SessionsClient();

const sessionPath=sessionClient.sessionPath(conf.googleProjectId,conf.sessionId);

module.exports=app=>{

    app.get('/',(req,res)=>{
        res.send({'message':'Hello from FitBot chatbot!'});
    });

    app.post('/api/text_bot/',async (req,res)=>{

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: req.body.text,
                    // The language used by the client (en-US)
                    languageCode: conf.dialogFlowLanguage,
                },
            },
        };

        let responses=await sessionClient.detectIntent(request);
        res.send(responses[0].queryResult);
    });

    app.post('/api/event_bot',(req,res)=>{
        res.send({'message':'Responds to click events'});
    });
}
