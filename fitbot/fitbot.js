'use strict'

const  df=require('dialogflow');
const conf=require('../config/keys');
const sj=require('structjson');


const projectID=conf.googleProjectId;
const credentials={
    client_email:conf.googleClientEmail,
    private_key:conf.googlePrivateKey
}
const sessionClient=new df.SessionsClient({projectID:projectID,credentials:credentials});

module.exports={
    textQuery:async function(text,userID,parameters={}){
        let sessionPath=sessionClient.sessionPath(conf.googleProjectId,conf.sessionId+userID);
        let self=module.exports;


        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: text,
                    // The language used by the client (en-US)
                    languageCode: conf.dialogFlowLanguage,
                },
            },
            queryParams:{
                payload:{
                    data:sj.jsonToStructProto(parameters)
                }
            }
        };
        let responses=await sessionClient.detectIntent(request);
        responses=await self.handleActions(responses);
        return responses;

    },

    eventQuery:async function(event,userID,parameters={}){

        let self=module.exports;
        let sessionPath=sessionClient.sessionPath(conf.googleProjectId,conf.sessionId+userID);

        const request = {
            session: sessionPath,
            queryInput: {
                event: {

                    name: event,
                    parameters:parameters,

                    languageCode: conf.dialogFlowLanguage,
                },
            }
        };
        let responses=await sessionClient.detectIntent(request);
        responses=await self.handleActions(responses);
        return responses;

    }
    ,
    handleActions:function (responses) {
        return responses;

    }
};
