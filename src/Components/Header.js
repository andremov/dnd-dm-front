import React, { useState } from 'react';
import { abilities, alignments, classes, races } from "../Utils/Data";

const items = [
    {
        name : 'Races',
        list : races,
        window_type : 'race_info'
    },
    {
        name : 'Classes',
        list : classes,
        window_type : 'class_info'
    },
    {
        name : 'Abilities',
        list : abilities,
        window_type : 'ability_info'
    },
    {
        name : 'Alignments',
        list : alignments,
        window_type : 'alignment_info'
    },
]

const tools = [
    {
        name : 'Class Quest',
        window_type : 'class_quest'
    },
    {
        name : 'Ability Check',
        window_type : 'roll_info'
    },
    {
        name : 'Inventory',
        window_type : 'inventory'
    },
    {
        name : 'Spellbook',
        window_type : 'spells'
    },
    {
        name : 'Background',
        window_type : 'bkg_story'
    },
    {
        name : 'Notes',
        window_type : 'notes'
    },
]

export function Header( { callback, showTools, resetUI } ) {
    return (
        <header>
            {items.map(( item, i ) => {
                return <HeaderItem data={item} key={i} callback={callback} />
            })}
            {showTools ? <ToolsItem callback={callback} resetUI={resetUI} /> : <></>}
        </header>
    );
}

function HeaderItem( { data, callback } ) {
    const [ opened, setOpened ] = useState(false)
    
    return <div className={'header-item'}>
        
        <div className={'item-name' + (opened ? ' open' : '')} onClick={() => setOpened(!opened)}>
            {data.name}
        </div>
        
        <ul className={'dropdown-list' + (opened ? ' open' : '')}> {
            data.list.map(( item, i ) => {
                return <li
                    className={'dropdown-item'}
                    key={i}
                    onClick={
                        () => {
                            setOpened(false)
                            callback({
                                action : 'add',
                                data : {
                                    card_name : 'loading',
                                    card_destination : data.window_type,
                                    item_id : item.id
                                }
                            })
                        }
                    }
                >
                    {item.name}
                </li>
            })
        }
        </ul>
    </div>
}

function ToolsItem( { callback, resetUI } ) {
    const [ opened, setOpened ] = useState(false)
    
    return <div className={'header-item'}>
        
        <div className={'item-name' + (opened ? ' open' : '')} onClick={() => setOpened(!opened)}>
            Tools
        </div>
        
        <ul className={'dropdown-list' + (opened ? ' open' : '')}>
            
            {
                tools.map(( item, i ) => {
                    return <li
                        className={'dropdown-item'}
                        key={i}
                        onClick={
                            () => {
                                setOpened(false)
                                callback({
                                    action : 'add',
                                    data : {
                                        card_name : 'loading',
                                        card_destination : item.window_type,
                                    }
                                })
                            }
                        }
                    >
                        {item.name}
                    </li>
                })
            }
            
            <li
                className={'dropdown-item'}
                onClick={
                    () => {
                        setOpened(false)
                        resetUI()
                    }
                }
            >
                Reset UI
            </li>
        </ul>
    </div>
}
