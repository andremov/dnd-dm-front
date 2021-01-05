import React, { Fragment } from 'react';
import { alignments } from "../../Utils/Data";
import { AlignmentCard } from "../Cards/AlignmentCard";

export function AlignmentsInfo() {
    return (
        <Fragment>
            {
                alignments.map( (item,i) => {
                    return <AlignmentCard key={i} alignment_data={item} />
                } )
            }
        </Fragment>
    );
}

