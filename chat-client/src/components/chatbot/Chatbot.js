import React,{Component} from 'react'
import axios from 'axios/index';
import  Message from './Message'
class Chatbot extends Component {

    state={
        messages:[]
    };

    async text_bot_query(text){

        let says={
            speaks:'Me',
            msg:{
                text:{
                    text:text
                }
            }
        }
        this.setState({messages:[...this.state.messages,says]});
        const res=await axios.post('/api/text_bot/',{text});
        for (let msg of res.data.fulfillmentMessages){
            says= {
                speaks: 'FitBot',
                msg: msg
            }
            this.setState({
                messages:[...this.state.messages,says]
            })
        }
    }

    async event_bot_query(event){
        const res=await axios.post('/api/event_bot/',{event});
        for(let msg of res.data.fulfillmentMessages){
            let says={
                speaks:'Me',
                msg:msg
            };
            this.setState({
                messages:[...this.state.messages,says]
            });
        }
    }

    showMessages(messages){
        if(messages){
            return messages.map((message,i)=>{
                return <Message key={e} speaks={message.speaks} text={message.msg.text.text} >
                </Message>
            })
        }else{
            return null;
        }
    }

    render(){
        return(
            <div className="container" style={{height:'400',width:'400',float:'center'}}>
                <div id='chatbot' style={{height:'100%',width:'100%',overflow:'auto'}}>
                    <h2>Chatbot</h2>
                    {this.showMessages(this.state.messages)}
                    <input type='text'/>
                </div>
            </div>
        )
    }
}


export  default Chatbot;
