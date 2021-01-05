import React, { Fragment } from 'react';

export function Background({player_data}) {
    return (
        <Fragment>
            {player_data?.background}
        </Fragment>
    );
}
