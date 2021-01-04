import React, { useState } from 'react';
import { modifyCharacter } from "../../Services/api";

export function Notes( { player_data } ) {
    const [ notes, setNotes ] = useState(player_data.notes)
    const [hasChanges, setHasChanges] = useState(false)
    
    
    function validCharacter(text) {
        let re = new RegExp('[a-zA-Z0-9.,!?¡¿ ñ\n\r]*');
        let p = text;
        let m = p.match(re);
        return (m[0].length === p.length);
    }
    
    function handleChange(value) {
        if (validCharacter(value)) {
            setNotes(value)
            setHasChanges(true)
        }
    }
    
    function sendNotes() {
        modifyCharacter(player_data._id, {notes}).then(r => {
            setHasChanges(false)
        })
    }
    
    return (
        <div className={'notes'}>
            <h1>Notes</h1>
            <textarea
                onChange={( e ) => handleChange(e.target.value)}
                value={notes}
                placeholder={'Notes'}
            />
            <button
                disabled={!hasChanges}
                children={'Save'}
                onClick={sendNotes}
                className={'primary'}
            />
        </div>
    );
}

