import React, { useState } from 'react';
import { textHeight, validCharacter } from "../../Utils/Functions";
import { deleteSpell, modifySpell } from "../../Services/api";
import { Loading } from "../Loading";

export function SpellCard( { data } ) {
    const [ mod, setMod ] = useState(false)
    const [deleting, setDeleting] = useState(false)
    
    if ( mod ) {
        return <ModifySpell
            data={data}
            callback={() => setMod(false)}
        />
    }
    
    function sendDelete() {
        setDeleting(true)
        deleteSpell(data._id).then(r => {
            setDeleting(false)
        })
    }
    
    
    return <div
        className={'spell-card'}
        style={{ '--itemDataHeight' : textHeight(data.data) + 'px' }}
    >
        <div>
            <div>{data.name}</div>
            <div>x{data.quantity}</div>
        </div>
        
        <div style={{ '--itemDataHeight' : textHeight(data.data) + 'px' }} >
            {data.data}
        </div>
    
        <div>
            <button
                children={'Delete'}
                disabled={deleting}
                className={'secondary'}
                onClick={sendDelete}
            />
            <button
                onClick={() => setMod(true)}
                disabled={deleting}
                children={'Modify'}
                className={'primary'}
            />
        </div>
    </div>
}

function ModifySpell( { data, callback } ) {
    const [ item_data, setData ] = useState(data)
    const [ progress, setProgress ] = useState(false)
    const [ textAreaHeight, setTextAreaHeight ] = useState(50)
    const [ ready, setReady ] = useState(true)
    
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
        let idata = { ...item_data }
        delete idata._id
        delete idata.owner
        delete idata.__v
        
        setProgress(true)
        modifySpell(data._id, idata).then(r => {
            callback()
        })
    }
    
    return <div
        className={'new-item-card'}
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
                children={'Cancel'}
                disabled={progress}
                className={'secondary'}
                onClick={callback}
            />
            <button
                children={progress ? <Loading /> : 'Modify'}
                disabled={!ready}
                className={'primary'}
                onClick={sendCreateItem}
            />
        </div>
    </div>
}
