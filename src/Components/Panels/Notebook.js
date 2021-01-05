import React, { Fragment, useState } from 'react';
import { NoteCard } from "../Cards/NoteCard";
import { createNote } from "../../Services/api";
import { Loading } from "../Loading";

export function Notebook( { player_id, player_notes, setPlayerNotes } ) {
    return (
        <Fragment>
            <NewNoteCard player_id={player_id} setNotes={setPlayerNotes} />
            {
                player_notes.map(( item, i ) => {
                    return <NoteCard key={i} data={item} setPlayerNotes={setPlayerNotes} />
                })
            }
        </Fragment>
    );
}

function NewNoteCard( { player_id, setNotes } ) {
    const [ title, setTitle ] = useState('');
    const [ progress, setProgress ] = useState(false);
    
    function sendCreateNote() {
        setProgress(true)
        createNote({ owner : player_id, name : title, data : '' }).then(r => {
            setNotes(r)
            setTitle('')
            setProgress(false)
        })
    }
    
    return <div className={'new-note-card'}>
        <input
            placeholder={'Title'}
            value={title}
            onChange={e => setTitle(e.target.value)}
        />
        <button
            children={progress? <Loading /> : 'Create'}
            disabled={title.length === 0 || progress}
            className={'secondary'}
            onClick={sendCreateNote}
        />
    </div>
}
