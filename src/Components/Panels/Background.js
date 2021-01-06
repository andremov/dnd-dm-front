import React  from 'react';

export function Background( { player_data, player_index } ) {
    return (
        <div className={'bkg-card'}>
            {player_data[player_index].player_data.background}
        </div>
    );
}
