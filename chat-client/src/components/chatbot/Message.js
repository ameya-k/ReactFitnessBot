import React from 'react';

const Message=(props)=>(
    <div className='col s12 m8 offset-m2 offset-l3'>
        <div className='card-panel grey lighten-5 z-depth-1'>
            <div className='row valign-wrapper'>

                    <div className='col s2'>
                        <button disabled={true}>{props.speaks}</button>
                    </div>

                <div className='col s10'>
                    <span className='black-text'>{props.text}</span>
                </div>

            </div>
        </div>
    </div>
);
export default Message;
