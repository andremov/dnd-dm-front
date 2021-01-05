import React, { Fragment } from 'react';
import { QuestCard } from "../Cards/QuestCard";

export function Quests( { player_quests } ) {
    return (
        <Fragment>
            {
                player_quests.map(( item, i ) => {
                    return <QuestCard key={i} data={item} />
                })
            }
        </Fragment>
    );
}

