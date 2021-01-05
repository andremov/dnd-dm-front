import React, { useState } from 'react';
import { abilities, races, skills } from "../../Utils/Data";

export function RollInfo( { player_data, player_index } ) {
    const [ ability, setAbility ] = useState(-1)
    const [ skill, setSkill ] = useState(-1)
    
    let filtered_skills = ability === -1 ? skills : skills.filter(( item, i ) => abilities[ability].skills.includes(i))
    
    
    let ab_mod = 0;
    if ( ability !== -1 ) {
        ab_mod = (player_data[player_index].player_data.stats[ability] - 10) / 2
    }
    
    let rac_ab_mod = 0;
    if ( ability !== -1 ) {
        let ab_mod = races[player_data[player_index].player_data.race].ability_bonus.filter(item => item.id === ability)[0]?.bonus / 2;
        rac_ab_mod = ab_mod ? ab_mod : rac_ab_mod;
    }
    
    let rac_sk_mod = 0;
    if ( skill !== -1 ) {
        let sk_mod = races[player_data[player_index].player_data.race].skill_bonus.filter(item => item.id === skill)[0]?.bonus;
        rac_sk_mod = sk_mod ? sk_mod : rac_sk_mod;
    }
    
    let contents = [
        {
            text : '1d20',
            label : 'Roll'
        },
        {
            text : ab_mod < 0 ? ab_mod : '+' + ab_mod,
            label : 'Ability modifier'
        },
        {
            text : rac_ab_mod < 0 ? rac_ab_mod : '+' + rac_ab_mod,
            label : 'Racial ability bonus'
        },
        {
            text : rac_sk_mod < 0 ? rac_sk_mod : '+' + rac_sk_mod,
            label : 'Racial skill bonus'
        },
    ]
    
    function chooseAbility( value ) {
        setAbility(parseInt(value))
        setSkill(-1)
    }
    
    function chooseSkill( value ) {
        setSkill(parseInt(value))
        
        if ( value === "-1" ) {
            return;
        }
        
        setAbility(abilities.filter(item => item.skills.includes(parseInt(value)))[0].id)
    }
    
    
    return (
        <div className={'ability-check-info'}>
            
            <select onChange={e => chooseAbility(e.target.value)} value={ability}>
                <option value={-1}>
                    Ability
                </option>
                {abilities.map(( item, i ) => {
                    return <option value={item.id} key={i}>
                        {item.name}
                    </option>
                })}
            </select>
            
            <select onChange={e => chooseSkill(e.target.value)} value={skill}>>
                <option value={-1}>
                    Skill
                </option>
                {filtered_skills.map(( item, i ) => {
                    return <option value={item.id} key={i}>
                        {item.name}
                    </option>
                })}
            </select>
            
            <div className={'roll-guide'}>
                {
                    contents.map(( item, i ) => {
                        return <div className={'roll-guide-item'} key={i}>
                            <div className={'item-text'}>
                                {item.text}
                            </div>
                            <div className={'item-label'}>
                                {item.label}
                            </div>
                        </div>
                    })
                }
            </div>
        
        </div>
    );
}

