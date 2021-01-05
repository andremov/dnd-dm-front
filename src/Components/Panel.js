import React, { useState } from 'react';
import { getPanel, getPanels } from "../Utils/Data";

export function Panel( props ) {
    const [ panel, setPanel ] = useState(-1)
    
    const possiblePanels = getPanels(props.id, !!props.player_data).sort((a,b) => a.name < b.name? -1 : 1);
    if (possiblePanels.length === 1 && panel !== possiblePanels[0].id) {
        setPanel(possiblePanels[0].id)
    }
    
    function handleChangePanel( e ) {
        setPanel(parseInt(e.target.value))
    }
    
    return (
        <div className={'panel'}>
            
            <div className={'panel-header'}>
                <select value={panel} onChange={handleChangePanel}>
                    <option value={-1}>
                        Select panel...
                    </option>
                    
                    {
                        possiblePanels.map(( item, i ) => {
                        return <option value={item.id} key={i}>
                            {item.name}
                        </option>
                    })}
                </select>
            </div>
            
            <div className={'panel-contents'}>
                {
                    getPanel(panel, props)
                }
            </div>
        </div>
    );
}

