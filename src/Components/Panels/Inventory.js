import React, { Fragment } from 'react';
import { ItemCard } from "../Cards/ItemCard";

export function Inventory( { player_inventory } ) {
    return (
        <Fragment>
            {player_inventory.length === 0 ?
                <ItemCard
                    data={{name : 'Nothing', quantity: 0, data: ''}}
                />
                : player_inventory.map(( item, i ) => {
                    return <ItemCard key={i} data={item} />
                })}
        </Fragment>
    );
}


