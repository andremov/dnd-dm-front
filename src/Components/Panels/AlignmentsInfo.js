import React, { Fragment } from 'react';
import { getAlignments } from "../../Utils/Data";
import { AlignmentCard } from "../Cards/AlignmentCard";

export function AlignmentsInfo() {
    return (
        <Fragment>
            {
                getAlignments().map( (item,i) => {
                    return <AlignmentCard key={i} alignment_data={item} />
                } )
            }
        </Fragment>
    );
}

