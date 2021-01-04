import React  from 'react';
import { alignments } from "../../Utils/Data";
import { Gem } from "../Gem";

export function AlignmentInfo( { card_data } ) {
    const { name, description } = alignments[card_data.item_id]
    return <div className={'alignment_info'}>
        <h1>{name}</h1>
        
        <div className={'info-section'}>
            {description}
        </div>
        
        <Gem
            color={'orange'}
            text={'Alignment'}
            type={2}
        />
    </div>
}
