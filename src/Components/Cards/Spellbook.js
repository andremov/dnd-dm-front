import React from 'react';

export function Spellbook( { player_spells } ) {
    return (
        <div className={'inventory'}>
            <h1>Spellbook</h1>
            <div>
                {player_spells.map(( item, i ) => {
                    return <Spell key={i} data={item} />
                })}
            </div>
        </div>
    );
}


function Spell( { data } ) {
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
