import React, { useState } from 'react';
import { Gem } from "../Gem";

export function AbilityCard( { ability_data } ) {
    const [opened, setOpen] = useState(false);
    
    function openCallback() {
        setOpen(!opened)
    }
    
    const { name, description } = ability_data
    
    return <div className={'ability-card ' + (opened ? '' : 'closed')} onClick={openCallback}>
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
