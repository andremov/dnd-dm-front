import React, { Fragment } from 'react';
import { getSkills } from "../../Utils/Data";
import { SkillCard } from "../Cards/SkillCard";

export function SkillsInfo() {
    
    return (
        <Fragment>
            {
                getSkills().map( (item,i) => {
                    return <SkillCard key={i} skill_data={item} />
                } )
            }
        </Fragment>
    );
}
