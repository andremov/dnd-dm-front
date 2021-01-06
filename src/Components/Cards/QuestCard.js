import React, { useState } from 'react';
import { textHeight, validCharacter } from "../../Utils/Functions";
import { addQuest, deleteQuest, modifyQuest } from "../../Services/api";
import { Loading } from "../Loading";

export function QuestCard( { data } ) {
    const [ opened, setOpen ] = useState(false);
    const [ mod, setMod ] = useState(false)
    const [ deleting, setDeleting ] = useState(false)
    
    const obj_text = parseObjectives(data.objectives)
    
    function openCallback() {
        setOpen(!opened)
    }
    
    if ( mod ) {
        return <ModifyQuest
            data={{ ...data, objectives : JSON.parse(data.objectives) }}
            callback={() => setMod(false)}
        />
    }
    
    function sendDelete() {
        setDeleting(true)
        deleteQuest(data._id).then(r => {
            setDeleting(false)
        })
    }
    
    return (
        <div
            className={'quest-card ' + (opened ? '' : 'closed')}
            onClick={openCallback}
            style={{ '--textAreaHeight' : textHeight(data.data, -1) + textHeight(obj_text, -1) + 'px' }}
        >
            <h1>{data.name}</h1>
            
            <h2>Objectives</h2>
            <div style={{ '--itemDataHeight' : textHeight(obj_text, -1) + 'px' }}>
                {obj_text}
            </div>
            
            <h2>Description</h2>
            <div style={{ '--itemDataHeight' : textHeight(data.data, -1) + 'px' }}>
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
    );
}

function parseObjectives( text ) {
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

function ModifyQuest( { data, callback } ) {
    const [ item_data, setData ] = useState(data)
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
            !!a.objectives &&
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
        idata.objectives = JSON.stringify(idata.objectives)
        delete idata._id
        delete idata.owner
        delete idata.__v
        
        setProgress(true)
        modifyQuest(data._id, idata).then(r => {
            callback()
        })
    }
    
    function addObjective( data ) {
        let obj = item_data.objectives;
        obj.push(data)
        
        handleChange({
            target : {
                name : 'objectives',
                value : obj
            }
        })
    }
    
    function deleteObjective( i ) {
        let obj = item_data.objectives;
        obj.splice(i,1)
    
        handleChange({
            target : {
                name : 'objectives',
                value : obj
            }
        })
    }
    
    function editObjective( e, i ) {
        let obj = item_data.objectives;
        obj[i][e.target.name] = e.target.value;
        
        handleChange({
            target : {
                name : 'objectives',
                value : obj
            }
        })
    }
    
    return <div
        className={'new-quest-card'}
        style={{ '--textAreaHeight' : textAreaHeight + 'px' }}
    >
        <input
            placeholder={'Name'}
            value={item_data.name}
            name={'name'}
            onChange={handleChange}
        />
        <textarea
            style={{ '--textAreaHeight' : textAreaHeight + 'px' }}
            placeholder={'Description'}
            value={item_data.data}
            name={'data'}
            onChange={handleDataChange}
        />
        <EditObjectives
            data={item_data.objectives}
            addCallback={addObjective}
            editCallback={editObjective}
            deleteCallback={deleteObjective}
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
                disabled={!ready || progress}
                className={'primary'}
                onClick={sendCreateItem}
            />
        </div>
    </div>
}

function EditObjectives( { data, addCallback, editCallback, deleteCallback } ) {
    
    return <div className={'objective-list'}>
        
        <h2>
            Objectives
        </h2>
        
        <NewObjective
            addCallback={addCallback}
        />
        
        {
            data.map(( item, i ) => {
                return <Objective
                    key={i}
                    item={item}
                    editCallback={( e ) => editCallback(e, i)}
                    deleteCallback={() => deleteCallback(i)}
                />
            })
        }
    
    </div>
}

function Objective( { item, editCallback, deleteCallback } ) {
    return <div className={'edit-objective'}>
        <div>
            <input
                placeholder={'Current'}
                value={item.c}
                name={'c'}
                type={'number'}
                onChange={editCallback}
            />
            <input
                placeholder={'Max'}
                value={item.mx}
                name={'mx'}
                type={'number'}
                onChange={editCallback}
            />
        </div>
        <input
            placeholder={'Description'}
            value={item.d}
            name={'d'}
            onChange={editCallback}
        />
        <button
            children={'Delete'}
            className={'primary'}
            onClick={deleteCallback}
        />
    </div>
}

function NewObjective( { addCallback } ) {
    const [ obj, setObj ] = useState({ c : '', mx : '', d : '' })
    const [ ready, setReady ] = useState(false)
    
    function handleChange( e ) {
        let o = {
            ...obj,
            [e.target.name] : e.target.value
        }
        setObj(o)
        setReady(
            !!o.c &&
            !!o.mx &&
            !!o.d &&
            o.c <= o.mx
        )
    }
    
    function sendAdd() {
        setObj({ c : '', mx : '', d : '' })
        setReady(false)
        addCallback(obj);
    }
    
    return <div className={'add-objective'}>
        <div>
            <input
                placeholder={'Current'}
                value={obj.c}
                name={'c'}
                type={'number'}
                onChange={handleChange}
            />
            <input
                placeholder={'Max'}
                value={obj.mx}
                name={'mx'}
                type={'number'}
                onChange={handleChange}
            />
        </div>
        <input
            placeholder={'Description'}
            value={obj.d}
            name={'d'}
            onChange={handleChange}
        />
        <div>
            <button
                children={'Clear'}
                className={'secondary'}
                onClick={() => setObj({ c : '', mx : '', d : '' })}
            />
            <button
                children={'Add'}
                disabled={!ready}
                className={'primary'}
                onClick={sendAdd}
            />
        </div>
    </div>
}
