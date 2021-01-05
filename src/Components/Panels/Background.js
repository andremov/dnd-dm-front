import React, { Fragment } from 'react';

export function Background( { player_data, player_index } ) {
    return (
        <Fragment>
            {player_data[player_index].player_data.background}
        </Fragment>
    );
}
