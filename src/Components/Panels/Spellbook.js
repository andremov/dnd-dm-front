import React, { Fragment } from 'react';
import { SpellCard } from "../Cards/SpellCard";

export function Spellbook( { player_data, player_index } ) {
    return (
        <Fragment>
            {player_data[player_index].player_spells.length === 0 ?
                <SpellCard
                    data={{name : 'Nothing', quantity: 0, data: ''}}
                />
                : player_data[player_index].player_spells.map(( item, i ) => {
                return <SpellCard key={i} data={item} />
            })}
        </Fragment>
    );
}

