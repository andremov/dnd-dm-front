import React, { Fragment } from 'react';
import { getAbilities } from "../../Utils/Data";
import { AbilityCard } from "../Cards/AbilityCard";

export function AbilitiesInfo() {
    
    return (
        <Fragment>
            {
                getAbilities().map( (item,i) => {
                    return <AbilityCard key={i} ability_data={item} />
                } )
            }
        </Fragment>
    );
}
