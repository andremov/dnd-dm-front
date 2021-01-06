import React, { Fragment, useState } from 'react';
import { QuestCard } from "../Cards/QuestCard";
import { textHeight, validCharacter } from "../../Utils/Functions";
import { addQuest } from "../../Services/api";
import { Loading } from "../Loading";

export function Quests( { player_data, player_index } ) {
    return (
        <Fragment>
            <NewQuestCard
                player_id={player_data[player_index].player_data._id}
            />
            {
                player_data[player_index].player_quests.map(( item, i ) => {
                    return <QuestCard key={i} data={item} />
                })
            }
        </Fragment>
    );
}

function NewQuestCard( { player_id } ) {
    const [ item_data, setData ] = useState({ name : '', objectives : [], data : '' })
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
        setProgress(true)
        addQuest({ ...item_data, owner : player_id, objectives : JSON.stringify(item_data.objectives) }).then(r => {
            setData({ name : '', objectives : [], data : '' })
            setReady(false)
            setProgress(false)
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
                children={'Clear'}
                disabled={progress}
                className={'secondary'}
                onClick={() => {
                    setReady(false)
                    setData({ name : '', objectives : [], data : '' })
                }}
            />
            <button
                children={progress ? <Loading /> : 'Create'}
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
