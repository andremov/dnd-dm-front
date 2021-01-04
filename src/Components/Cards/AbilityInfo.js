import React from 'react';
import { abilities } from "../../Utils/Data";
import { Gem } from "../Gem";

export function AbilityInfo( { card_data } ) {
    const { name, description } = abilities[card_data.item_id]
    return <div className={'ability_info'}>
        <h1>{name}</h1>
        
        <div className={'info-section'}>
            {description}
        </div>
        
        <Gem
            color={'purple'}
            text={'Ability'}
            type={2}
        />
    </div>
}
