import React,{Component} from 'react'
import axios from 'axios/index';
import  Message from './Message'
class Chatbot extends Component {
    messagesBottom;
    state={
        messages:[]
    };

    constructor(props){
        super(props);
        this.inputChange=this.inputChange.bind(this);
    }

    async text_bot_query(text){

        let says={
            speaks:'Me',
            msg:{
                'text':{
                    'text':text
                }
            }
        }
        this.setState({messages:[...this.state.messages,says]});
        const res=await axios.post('http://localhost:5000/api/text_bot/',{text});
        for (let msg of res.data.fulfillmentMessages){
            says= {
                speaks: 'FitBot',
                msg: msg
            };
            this.setState({
                messages:[...this.state.messages,says]
            })
        }
    }

    async event_bot_query(event){
        const res=await axios.post('http://localhost:5000/api/event_bot/',{event});
        for(let msg of res.data.fulfillmentMessages){
            let says={
                speaks:'FitBot',
                msg:msg
            };
            this.setState({
                messages:[...this.state.messages,says]
            });
            console.log(this.state.messages);
        }
    }

    componentDidMount() {
        this.event_bot_query('Welcome');
    }

componentDidUpdate() {
    this.messagesBottom.scrollIntoView({behavior:'smooth'});
}

    showMessages(messages){
        if(messages){
            return messages.map((message,i)=>{
                return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />

            })
        }else{
            return null;
        }
    }

    inputChange(e){
        if(e.key==='Enter'){
            this.text_bot_query(e.target.value);
            e.target.value='';
        }
    }

    render(){
        return(
            <div className="container" style={{height:'400',width:'400',float:'center'}}>
                <div id='chatbot' style={{height:'100%',width:'100%',overflow:'auto'}}>
                    <h2>Chatbot</h2>
                    {this.showMessages(this.state.messages)}
                    <div ref={(el)=>{this.messagesBottom=el;}} style={{float:'left',clear:'both'}} />
                    <input type='text' onKeyPress={this.inputChange}/>
                </div>
            </div>
        )
    }
}


export  default Chatbot;
