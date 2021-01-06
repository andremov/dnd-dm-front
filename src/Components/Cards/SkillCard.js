import React, { useState } from 'react';
import { Gem } from "../Gem";

export function SkillCard( { skill_data } ) {
    const [opened, setOpen] = useState(false);
    
    function openCallback() {
        setOpen(!opened)
    }
    
    const { name, description } = skill_data
    
    return <div className={'ability-card ' + (opened ? '' : 'closed')} onClick={openCallback}>
        <h1>{name}</h1>
        
        <div className={'info-section'}>
            {description}
        </div>
        
        <Gem
            color={'blue'}
            text={'Skill'}
            type={2}
        />
    </div>
}
