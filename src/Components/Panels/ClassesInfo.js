import React, { Fragment } from 'react';
import { classes } from "../../Utils/Data";
import { ClassCard } from "../Cards/ClassCard";

export function ClassesInfo() {
    
    return (
        <Fragment>
            {
                classes.map( (item,i) => {
                    return <ClassCard key={i} class_data={item} />
                } )
            }
        </Fragment>
    );
}


