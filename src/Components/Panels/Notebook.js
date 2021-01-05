import React, { Fragment, useState } from 'react';
import { NoteCard } from "../Cards/NoteCard";
import { createNote } from "../../Services/api";
import { Loading } from "../Loading";

export function Notebook( { player_data, player_index } ) {
    return (
        <Fragment>
            <NewNoteCard player_id={player_data[player_index].player_data._id} />
            {
                player_data[player_index].player_notes.map(( item, i ) => {
                    return <NoteCard key={i} data={item} />
                })
            }
        </Fragment>
    );
}

function NewNoteCard( { player_id } ) {
    const [ title, setTitle ] = useState('');
    const [ progress, setProgress ] = useState(false);
    
    function sendCreateNote() {
        setProgress(true)
        createNote({ owner : player_id, name : title, data : '' }).then(r => {
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
