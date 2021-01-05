import React, { useState } from 'react';
import { Gem } from "../Gem";

export function AlignmentCard( { alignment_data } ) {
    const [opened, setOpen] = useState(false);
    
    function openCallback() {
        setOpen(!opened)
    }
    
    const { name, description } = alignment_data
    
    return <div className={'alignment-card ' + (opened ? '' : 'closed')} onClick={openCallback}>
        <h1>{name}</h1>
        
        <div className={'info-section'}>
            {description}
        </div>
        
        <Gem
            color={'orange'}
            text={'Alignment'}
            type={2}
        />
    </div>
}
