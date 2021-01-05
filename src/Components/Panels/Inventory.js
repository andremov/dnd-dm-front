import React, { Fragment } from 'react';
import { ItemCard } from "../Cards/ItemCard";

export function Inventory( { player_data, player_index } ) {
    return (
        <Fragment>
            {player_data[player_index].player_items.length === 0 ?
                <ItemCard
                    data={{name : 'Nothing', quantity: 0, data: ''}}
                />
                : player_data[player_index].player_items.map(( item, i ) => {
                    return <ItemCard key={i} data={item} />
                })}
        </Fragment>
    );
}


