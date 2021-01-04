import React from 'react';

export function Inventory( { player_inventory } ) {
    return (
        <div className={'inventory'}>
            <h1>Inventory</h1>
            <div>
                {player_inventory.map(( item, i ) => {
                    return <Item key={i} data={item} />
                })}
            </div>
        </div>
    );
}

function Item( { data } ) {
    return <div className={'item'}>
        <div>
            <div>{data.name}</div>
            <div>x{data.quantity}</div>
        </div>
        <div>
            {data.data}
        </div>
    </div>
}
