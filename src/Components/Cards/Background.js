import React from 'react';

export function Background({player_data}) {
    return (
        <div className={'background'}>
            <h1>Background</h1>
            {player_data.background}
        </div>
    );
}
