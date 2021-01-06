import React, { Fragment, useEffect, useState } from 'react';
import { getAbility, getAlignment, getClass, getRace } from "../../Utils/Data";
import { Gem } from "../Gem";
import { Loading } from "../Loading";
import { modifyPlayer } from "../../Services/api";

export function CharacterInfo( { player_data, player_index } ) {
    const [ mod, setMod ] = useState(false)
    
    useEffect(() => {
        setMod(false)
    }, [ player_index ])
    
    if ( mod ) {
        return <ModifyCharacter
            data={player_data[player_index].player_data}
            callback={() => setMod(false)}
        />
    }
    
    
    return (
        <div className={'char-info'}>
            <div>
                <h1>
                    {player_data[player_index].player_data.name + ' ' + player_data[player_index].player_data.family}
                </h1>
                <Gem
                    color={'red'}
                    text={'Level ' + player_data[player_index].player_data.level}
                    title={'Level'}
                    type={2}
                    side={'right'}
                    blend={false}
                    shadow={true}
                />
            </div>
            
            <div className={'section basic'}>
                
                <h2>Character Info</h2>
                <div className={'two-gems'}>
                    <Gem
                        text={player_data[player_index].player_data.age + ' yrs'}
                        title={'Age'}
                        side={'right'}
                        type={-1}
                        blend={false}
                    />
                    <Gem
                        text={player_data[player_index].player_data.height + ' cm'}
                        title={'Height'}
                        side={'right'}
                        type={-1}
                        blend={false}
                    />
                </div>
                
                <div className={'two-gems'}>
                    <Gem
                        color={'cyan'}
                        text={getRace(player_data[player_index].player_data.race).name}
                        title={'Race'}
                        type={2}
                        side={'right'}
                        blend={false}
                    />
                    <Gem
                        color={'aqua'}
                        text={getClass(player_data[player_index].player_data.char_class).name}
                        title={'Class'}
                        type={2}
                        side={'right'}
                        blend={false}
                    />
                </div>
                
                <div className={'one-gem'}>
                    <Gem
                        color={'orange'}
                        text={getAlignment(player_data[player_index].player_data.alignment).name}
                        title={'Alignment'}
                        type={2}
                        side={'right'}
                        blend={false}
                    />
                </div>
            </div>
            
            <div className={'section basic'}>
                <h2>Basic Info</h2>
                
                <div className={'two-gems'}>
                    <Gem
                        color={'red'}
                        text={player_data[player_index].player_data.hit_points + ' / ' + player_data[player_index].player_data.max_hit_points}
                        title={'Hit points'}
                        type={5}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                    <Gem
                        color={'red'}
                        text={'1d' + getClass(player_data[player_index].player_data.char_class).hit_dice}
                        title={'Hit dice'}
                        type={8}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                </div>
                
                <div className={'two-gems'}>
                    <Gem
                        color={'red'}
                        text={player_data[player_index].player_data.attack_dice_number + 'd' + player_data[player_index].player_data.attack_dice_sides}
                        title={'Attack dice'}
                        type={7}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                    <Gem
                        color={'red'}
                        text={player_data[player_index].player_data.armor_class}
                        title={'Armor class'}
                        type={6}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                </div>
            </div>
            
            <div className={'section basic'}>
                <h2>Abilities</h2>
                <div className={'two-gems'}>
                    <Gem
                        color={'purple'}
                        text={getAbility(0).shortname + ': ' + player_data[player_index].player_data.stats[0]}
                        title={getAbility(0).name}
                        type={2}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                    <Gem
                        color={'purple'}
                        text={getAbility(1).shortname + ': ' + player_data[player_index].player_data.stats[1]}
                        title={getAbility(1).name}
                        type={2}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                </div>
                
                <div className={'two-gems'}>
                    <Gem
                        color={'purple'}
                        text={getAbility(2).shortname + ': ' + player_data[player_index].player_data.stats[2]}
                        title={getAbility(2).name}
                        type={2}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                    <Gem
                        color={'purple'}
                        text={getAbility(3).shortname + ': ' + player_data[player_index].player_data.stats[3]}
                        title={getAbility(3).name}
                        type={2}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                </div>
                
                <div className={'two-gems'}>
                    <Gem
                        color={'purple'}
                        text={getAbility(4).shortname + ': ' + player_data[player_index].player_data.stats[4]}
                        title={getAbility(4).name}
                        type={2}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                    <Gem
                        color={'purple'}
                        text={getAbility(5).shortname + ': ' + player_data[player_index].player_data.stats[5]}
                        title={getAbility(5).name}
                        type={2}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                </div>
            </div>
            
            <div>
                <button
                    className={'primary'}
                    children={'Modify'}
                    onClick={() => setMod(true)}
                />
            </div>
        </div>
    );
}

const accepted = {
    'armor_class' : { name : 'Armor Class', type : 'number' },
    // '_id',
    'level' : { name : 'Level', type : 'number' },
    'attack_dice_sides' : { name : 'Attack Dice Sides', type : 'number' },
    'attack_dice_number' : { name : 'Attack Dice Number', type : 'number' },
    // 'name' : {name:'Name'},
    // 'family' : {name:'Family'},
    // 'codename',
    'stats' : { name : 'Stats' },
    // 'alignment' : {name:'Alignment'},
    // 'race' : {name:'Race'},
    // 'char_class' : {name:'Class'},
    'height' : { name : 'Height', type : 'number' },
    'age' : { name : 'Age', type : 'number' },
    // 'background',
    'hit_points' : { name : 'Hit points', type : 'number' },
    'max_hit_points' : { name : 'Max hit points', type : 'number' },
    // '__v'
}

function ModifyCharacter( { data, callback } ) {
    const [ charData, setCharData ] = useState(data);
    const [ progress, setProgress ] = useState(false)
    
    function handleChange( e ) {
        setCharData({
            ...charData,
            [e.target.name] : e.target.value
        })
    }
    
    function sendChanges() {
        setProgress(true);
        modifyPlayer(data._id, { ...charData, stats : JSON.stringify(charData.stats) }).then(r => {
            setProgress(false);
            callback()
        })
    }
    
    return <div className={'edit-char-info'}>
        
        {
            Object.keys(charData).map(( item, i ) => {
                return <Fragment key={i}>
                    {
                        accepted[item] ?
                            item === 'stats' ?
                                <ModifyStats
                                    data={charData[item]}
                                    editCallback={handleChange}
                                /> :
                                <ModifyField
                                    data={charData[item]}
                                    name={item}
                                    label={accepted[item].name}
                                    type={accepted[item].type}
                                    editCallback={handleChange}
                                /> :
                            <> </>
                    }
                </Fragment>
            })
        }
        
        <div>
            <button
                children={'Cancel'}
                disabled={progress}
                className={'secondary'}
                onClick={callback}
            />
            <button
                children={progress ? <Loading /> : 'Modify'}
                disabled={progress}
                className={'primary'}
                onClick={sendChanges}
            />
        </div>
    </div>
}

function ModifyField( { data, name, label, editCallback, type } ) {
    return <div className={'edit-char-field'}>
        <div>
            {label}
        </div>
        <input
            value={data}
            name={name}
            onChange={editCallback}
            type={type}
        />
    </div>
}

function ModifyStats( { data, editCallback } ) {
    
    function editWrapper( e, i ) {
        let d = data;
        d[i] = parseInt(e.target.value);
        editCallback({ ...e, target : { ...e.target, value : d } })
    }
    
    return <div className={'edit-char-stats'}>
        {
            data.map(( item, i ) => {
                return <ModifySingleStat
                    key={i}
                    data={item}
                    index={i}
                    editCallback={( e ) => editWrapper(e, i)}
                />
            })
        }
    </div>
}

function ModifySingleStat( { data, index, editCallback } ) {
    return <div className={'edit-stat'}>
        <div>
            {getAbility(index).name}
        </div>
        <input
            value={data}
            name={'stats'}
            onChange={editCallback}
            type={'number'}
        />
    </div>
}
