import React,{Component} from 'react'
import axios from 'axios/index';
import  Message from './Message'
import Cookies from 'universal-cookie'
import {v4 as uuid} from 'uuid'
import Card from './Card'
const cookies=new Cookies();
class Chatbot extends Component {
    messagesBottom;
    state={
        messages:[]
    };

    constructor(props){
        super(props);
        this.inputChange=this.inputChange.bind(this);
        if(cookies.get('userID')===undefined) {


            cookies.set('userID', uuid(), {path: '/'});
        }
        console.log(cookies.get('userID'));
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
        const res=await axios.post('http://localhost:5000/api/text_bot/',{text,userID:cookies.get('userID')});
        for (let msg of res.data.fulfillmentMessages){
            console.log(JSON.stringify(msg));
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
        const res=await axios.post('http://localhost:5000/api/event_bot/',{event,userID:cookies.get('userID')});
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
                return this.showOneMessage(message,i);
            })
        }else{
            return null;
        }
    }

    renderExercises(cards){
        return cards.map((card,i)=><Card key={i} payload={card.structValue} />)
    }

    showOneMessage(message,i){
        if(message.msg && message.msg.text && message.msg.text.text){
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
        }
        else if(message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.cards){
            return <div key={i}>
                <div className='card-panel grey lighten-5 z-depth-1'>
                    <div style={{overflow:'hidden'}}>
                        <div className='col s2'>
                            <button>{message.speaks}</button>
                        </div>
                        <div style={{overflow:'auto',overflowY:'scroll'}}>
                            <div style={{height:300,width:message.msg.payload.fields.cards.listValue.values.length*270}}>
                                {this.renderExercises(message.msg.payload.fields.cards.listValue.values)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
