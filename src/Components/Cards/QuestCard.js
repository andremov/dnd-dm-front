import React, { useState } from 'react';
import { textHeight } from "../../Utils/Functions";

export function QuestCard( { data } ) {
    const [ opened, setOpen ] = useState(false);
    
    const obj_text = parseObjectives(data.objectives)
    
    function openCallback() {
        setOpen(!opened)
    }
    
    return (
        <div
            className={'quest-card ' + (opened ? '' : 'closed')}
            onClick={openCallback}
            style={{ '--textAreaHeight' : textHeight(data.data,-1)+textHeight(obj_text,-1) + 'px' }}
        >
            <h1>{data.name}</h1>
            
            <h2>Objectives</h2>
            <div style={{ '--itemDataHeight' : textHeight(obj_text,-1) + 'px' }} >
                {obj_text}
            </div>
            
            <h2>Description</h2>
            <div style={{ '--itemDataHeight' : textHeight(data.data,-1) + 'px' }} >
                {data.data}
            </div>
        </div>
    );
}

function parseObjectives(text) {
    let a = JSON.parse(text);
    let r = '';
    
    for ( let i = 0; i < a.length; i++ ) {
        let it = a[i];
        r += ' ';
        r += '[ ' + it.c + ' / ' + it.mx + ' ] ';
        r += it.d;
        r += '\n';
    }
    
    return r;
}
