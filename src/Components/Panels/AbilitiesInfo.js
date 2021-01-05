import React, { Fragment } from 'react';
import { abilities } from "../../Utils/Data";
import { AbilityCard } from "../Cards/AbilityCard";

export function AbilitiesInfo() {
    
    return (
        <Fragment>
            {
                abilities.map( (item,i) => {
                    return <AbilityCard key={i} ability_data={item} />
                } )
            }
        </Fragment>
    );
}
