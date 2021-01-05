import React, { useState } from "react";
import { fetchCharacterID } from "../../Services/api";
import { CreatePlayer } from "./CreatePlayer";

export function EnterForm( { setPlayerData } ) {
    const [ codename, setCodename ] = useState('test_new_ui');
    const [ creatingPlayer, setCreatingPlayer ] = useState(false)
    
    if ( creatingPlayer ) {
        return <CreatePlayer endCallback={() => setCreatingPlayer(false)} />
    }
    
    function requestPlayer() {
        fetchCharacterID(codename).then(r => {
            setPlayerData(r._id)
        })
    }
    
    return <form
        className={'enter-form'}
        onSubmit={e => {
            e.preventDefault()
        }}
    >
        <input
            placeholder={'Codename'}
            value={codename}
            onChange={e => setCodename(e.target.value)}
        />
        <button
            className={'primary'}
            children={'Enter'}
            onClick={requestPlayer}
        />
        <button
            className={'secondary small'}
            children={'Create'}
            onClick={() => setCreatingPlayer(true)}
        />
    </form>
}
