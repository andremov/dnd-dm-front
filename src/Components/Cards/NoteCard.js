import React, { useState } from 'react';
import { textHeight, validCharacter } from "../../Utils/Functions";
import { modifyNote } from "../../Services/api";
import { Loading } from "../Loading";

export function NoteCard( { data } ) {
    const [ textAreaHeight, setTextAreaHeight ] = useState(50)
    const [ opened, setOpen ] = useState(false);
    const [ progress, setProgress ] = useState(false);
    const [ notes, setNotes ] = useState(data.data)
    const [ hasChanges, setHasChanges ] = useState(false)
    
    function openCallback() {
        setOpen(!opened)
    }
    
    function handleChange( value ) {
        if ( validCharacter(value) ) {
            setTextAreaHeight(textHeight(value))
            setNotes(value)
            setHasChanges(true)
        }
    }
    
    function sendNotes( e ) {
        e.stopPropagation()
        setProgress(true)
        modifyNote(data._id, { data : notes }).then(r => {
            setProgress(false)
            setHasChanges(false)
        })
    }
    
    return (
        <div
            className={'note-card ' + (opened ? '' : 'closed')}
            onClick={openCallback}
            style={{ '--textAreaHeight' : textAreaHeight + 'px' }}
        >
            <h1>{data.name}</h1>
            
            <textarea
                style={{ '--textAreaHeight' : textAreaHeight + 'px' }}
                onChange={( e ) => handleChange(e.target.value)}
                onClick={e => e.stopPropagation()}
                value={notes}
                disabled={progress}
                placeholder={'Notes'}
            />
            
            <button
                disabled={!hasChanges || progress}
                children={progress ? <Loading /> : 'Save'}
                onClick={sendNotes}
                className={'primary'}
            />
        </div>
    );
}

