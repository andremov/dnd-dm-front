import React, { Fragment } from 'react';
import { races } from "../../Utils/Data";
import { RaceCard } from "../Cards/RaceCard";

export function RacesInfo() {
    return (
        <Fragment>
            {
                races.map( (item,i) => {
                    return <RaceCard key={i} race_data={item} />
                } )
            }
        </Fragment>
    );
}
