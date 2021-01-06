import React, { Fragment } from 'react';
import { getRaces } from "../../Utils/Data";
import { RaceCard } from "../Cards/RaceCard";

export function RacesInfo() {
    return (
        <Fragment>
            {
                getRaces().map( (item,i) => {
                    return <RaceCard key={i} race_data={item} />
                } )
            }
        </Fragment>
    );
}
