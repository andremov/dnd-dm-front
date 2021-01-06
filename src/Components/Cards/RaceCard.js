import React, { Fragment, useState } from "react";
import { getAbility, getSkill } from "../../Utils/Data";
import { Gem } from "../Gem";

export function RaceCard( { race_data } ) {
    const [opened, setOpen] = useState(false);
    
    function openCallback() {
        setOpen(!opened)
    }
    
    const { name, ability_bonus, skill_bonus, age, height, trait_name } = race_data
    
    return <div className={'race-card ' + (opened ? '' : 'closed')} onClick={openCallback}>
        <h1>{name}</h1>
        
        <div className={'trait-section'}>
            <h2>{trait_name}</h2>
            
            {
                ability_bonus.length > 0 ?
                    <Fragment>
                        <div style={{ fontWeight : 'bold' }}>
                            Abilities
                        </div>
                        {ability_bonus.map(( item, i ) => {
                            return <div key={i}>
                                {getAbility(item.id).name}: +{item.bonus}
                            </div>
                        })}
                    </Fragment> : <Fragment />
            }
            
            {
                skill_bonus.length > 0 ?
                    <Fragment>
                        <div style={{ fontWeight : 'bold' }}>
                            Skills
                        </div>
                        {skill_bonus.map(( item, i ) => {
                            return <div key={i}>
                                {getSkill(item.id).name}: +{item.bonus}
                            </div>
                        })}
                    </Fragment> : <Fragment />
            }
        </div>
        
        <div className={'info-section'}>
            <div>
                Age: {age.min}-{age.max}
            </div>
            
            <div>
                Height: {height.min}-{height.max}
            </div>
        </div>
        
        <Gem
            color={'cyan'}
            text={'Race'}
            type={2}
        />
    </div>
}
