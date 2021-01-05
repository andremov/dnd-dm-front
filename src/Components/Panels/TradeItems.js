import React, { useState } from 'react';
import { TradeItemCard } from "../Cards/TradeItemCard";
import { doTrade } from "../../Services/api";

export function TradeItems( { player_data, player_index } ) {
    const [ selectedPlayer, selectPlayer ] = useState(-1)
    const [ progress, setProgress ] = useState(false)
    const [ hasChanges, setHasChanges ] = useState(false)
    const [ trade_inventory, setTradeInventory ] = useState(player_data[player_index].player_items)
    
    function changeAmount( index, value ) {
        let ti = JSON.parse(JSON.stringify(trade_inventory));
        ti[index].trade_amount = value;
        setTradeInventory(ti)
        setHasChanges(ti.filter(item => item.trade_amount > 0).length > 0)
    }
    
    function send() {
        setProgress(true)
        let ti = JSON.parse(JSON.stringify(trade_inventory));
        for ( let i = ti.length - 1; i >= 0; i-- ) {
            if ( ti[i].trade_amount === 0 ) {
                ti.splice(i, 1)
                continue
            }
            let item = ti[i];
            delete item.name
            delete item.owner
            delete item.quantity
            delete item.data
            delete item.__v
        }
        
        doTrade({ target_player : selectedPlayer, trade_data : ti, origin_player : player_data[player_index].player_data._id }).then(r => {
            setTradeInventory(r)
            setProgress(false)
            selectPlayer(-1)
        })
    }
    
    return (
        <div className={'trade-items'}>
            <select onChange={e => selectPlayer(e.target.value)} value={selectedPlayer}>
                
                <option value={-1}>
                    Select player...
                </option>
                
                {player_data.map(( item, i ) => {
                    return <option key={i} value={item.player_data._id}>
                        {item.player_data.name + ' ' + item.player_data.family}
                    </option>
                })}
            
            </select>
            
            <div>
                <button
                    children={'Update'}
                    className={'secondary'}
                    onClick={() => setTradeInventory(player_data[player_index].player_items)}
                />
                
                <button
                    children={'Send Items'}
                    className={'primary'}
                    onClick={send}
                    disabled={progress || !hasChanges || selectedPlayer === -1}
                />
            </div>
            
            {
                trade_inventory.map(( item, i ) => {
                    return <TradeItemCard
                        key={i}
                        data={item}
                        changeAmount={( value ) => changeAmount(i, value)}
                    />
                })
            }
        </div>
    );
}

