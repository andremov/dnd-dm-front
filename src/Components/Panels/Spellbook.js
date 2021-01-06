import React, { Fragment, useState } from 'react';
import { SpellCard } from "../Cards/SpellCard";
import { textHeight, validCharacter } from "../../Utils/Functions";
import { addSpell } from "../../Services/api";
import { Loading } from "../Loading";

export function Spellbook( { player_data, player_index } ) {
    return (
        <Fragment>
            <NewSpellCard
                player_id={player_data[player_index].player_data._id}
            />
            {
                player_data[player_index].player_spells.map(( item, i ) => {
                    return <SpellCard key={i} data={item} />
                })
            }
        </Fragment>
    );
}


function NewSpellCard( { player_id } ) {
    const [ item_data, setData ] = useState({ name : '', quantity : '', data : '' })
    const [ progress, setProgress ] = useState(false)
    const [ textAreaHeight, setTextAreaHeight ] = useState(50)
    const [ ready, setReady ] = useState(false)
    
    function handleChange( e ) {
        let a = {
            ...item_data,
            [e.target.name] : e.target.value
        }
        setData(a)
        setReady(
            !!a.name &&
            !!a.quantity &&
            !!a.data
        )
    }
    
    function handleDataChange( e ) {
        if ( validCharacter(e.target.value) ) {
            setTextAreaHeight(textHeight(e.target.value))
            handleChange(e)
        }
    }
    
    function sendCreateItem() {
        setProgress(true)
        addSpell({ ...item_data, owner : player_id }).then(r => {
            setData({ name : '', quantity : '', data : '' })
            setReady(false)
            setProgress(false)
        })
    }
    
    return <div
        className={'new-spell-card'}
        style={{ '--textAreaHeight' : textAreaHeight + 'px' }}
    >
        <input
            placeholder={'Name'}
            value={item_data.name}
            name={'name'}
            onChange={handleChange}
        />
        <input
            placeholder={'Quantity'}
            value={item_data.quantity}
            name={'quantity'}
            onChange={handleChange}
            type={'number'}
        />
        <textarea
            style={{ '--textAreaHeight' : textAreaHeight + 'px' }}
            placeholder={'Data'}
            value={item_data.data}
            name={'data'}
            onChange={handleDataChange}
        />
        <div>
            <button
                children={'Clear'}
                disabled={progress}
                className={'secondary'}
                onClick={() => {
                    setReady(false)
                    setData({ name : '', quantity : '', data : '' })
                }}
            />
            <button
                children={progress ? <Loading /> : 'Create'}
                disabled={!ready}
                className={'primary'}
                onClick={sendCreateItem}
            />
        </div>
    </div>
}
