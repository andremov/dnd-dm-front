import React, { useState } from 'react';
import { getPanel, getPanels } from "../Utils/Data";

export function Panel( props ) {
    const [ panel, setPanel ] = useState(-1)
    const [ player, setPlayer ] = useState(-1)
    
    const possiblePanels = getPanels(player === -1).sort(( a, b ) => a.name < b.name ? -1 : 1);
    
    function handleChangePanel( e ) {
        setPanel(parseInt(e.target.value))
    }
    
    function handleChangePlayer( e ) {
        if (e.target.value === '-1') {
            setPanel(-1)
        }
        setPlayer(parseInt(e.target.value))
    }
    
    return (
        <div className={'panel'}>
            
            <div className={'panel-header'}>
                
                <select value={player} onChange={handleChangePlayer}>
                    <option value={'-1'}>
                        Select player...
                    </option>
                    
                    {
                        props.player_data.map(( item, i ) => {
                            return <option value={i} key={i}>
                                {item.player_data.name + ' ' + item.player_data.family}
                            </option>
                        })
                    }
                </select>
                
                <select value={panel} onChange={handleChangePanel}>
                    <option value={-1}>
                        Select panel...
                    </option>
                    
                    {
                        possiblePanels.map(( item, i ) => {
                            return <option value={item.id} key={i}>
                                {item.name}
                            </option>
                        })
                    }
                </select>
            
            </div>
            
            <div className={'panel-contents'}>
                {
                    getPanel(panel, player, props)
                }
            </div>
        </div>
    );
}

