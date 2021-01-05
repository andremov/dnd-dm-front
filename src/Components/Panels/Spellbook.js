import React, { Fragment } from 'react';
import { SpellCard } from "../Cards/SpellCard";

export function Spellbook( { player_spells } ) {
    return (
        <Fragment>
            {player_spells.length === 0 ?
                <SpellCard
                    data={{name : 'Nothing', quantity: 0, data: ''}}
                />
                : player_spells.map(( item, i ) => {
                return <SpellCard key={i} data={item} />
            })}
        </Fragment>
    );
}

