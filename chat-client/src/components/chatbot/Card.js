import React from 'react'

const Card=(props)=> {
    return(
    <div style={{float: 'left', paddingRight: '30', width: 270}}>
        <div className="row">
            <div className="col s12 m7">
                <div className="card">
                    <div className="card-image">
                        <img src={props.payload.fields.image.stringValue} />
                            <span className="card-title">{props.payload.fields.header.stringValue}</span>
                    </div>
                    <div className="card-content">
                        <p>{props.payload.fields.description.stringValue}</p>
                    </div>
                    <div className="card-action">
                        <a href="#">{}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
