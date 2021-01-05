import React, { Fragment } from 'react';
import { QuestCard } from "../Cards/QuestCard";

export function Quests( { player_data, player_index } ) {
    return (
        <Fragment>
            {
                player_data[player_index].player_quests.map(( item, i ) => {
                    return <QuestCard key={i} data={item} />
                })
            }
        </Fragment>
    );
}

