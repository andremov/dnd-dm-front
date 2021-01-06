import React, { Fragment } from 'react';
import { getClasses } from "../../Utils/Data";
import { ClassCard } from "../Cards/ClassCard";

export function ClassesInfo() {
    
    return (
        <Fragment>
            {
                getClasses().map( (item,i) => {
                    return <ClassCard key={i} class_data={item} />
                } )
            }
        </Fragment>
    );
}


