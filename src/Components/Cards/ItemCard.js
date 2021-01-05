import React from 'react';
import { textHeight } from "../../Utils/Functions";

export function ItemCard( { data } ) {
    return <div
        className={'inventory-item-card'}
        style={{ '--itemDataHeight' : textHeight(data.data) + 'px' }}
    >
        <div>
            <div>{data.name}</div>
            <div>x{data.quantity}</div>
        </div>
        <div style={{ '--itemDataHeight' : textHeight(data.data) + 'px' }} >
            {data.data}
        </div>
    </div>
}

