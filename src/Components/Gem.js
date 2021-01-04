import React  from 'react';
import { ReactComponent as Gem0 } from '../Assets/gem0.svg'
import { ReactComponent as Gem1 } from '../Assets/gem1.svg'
import { ReactComponent as Gem2 } from '../Assets/gem2.svg'
import { ReactComponent as Gem3 } from '../Assets/gem3.svg'
import { ReactComponent as Gem4 } from '../Assets/gem4.svg'
import { ReactComponent as Gem5 } from '../Assets/gem5.svg'
import { ReactComponent as Gem6 } from '../Assets/gem6.svg'
import { ReactComponent as Gem7 } from '../Assets/gem7.svg'
import { ReactComponent as Gem8 } from '../Assets/gem8.svg'

const gem_colors = {
    gray : '#777777',
    red : '#d92020',
    green : '#0ed90e',
    blue : '#3636f5',
    orange : '#f88a37',
    purple : '#7a36e5',
    cyan : '#22d3ff',
    aqua : '#14f86f',
    magenta : '#cd1561',
}

export function Gem( props ) {
    const { color = 'gray', text = '?', type = 0, side = 'left', blend = true, shadow = false, full = false } = props;
    
    return (
        <div
            className={
                'gem-socket ' + side +
                (blend ? ' blend' : '') +
                (shadow ? ' shadow' : '') +
                (full ? ' full-width' : '')
            }
            title={props.title}
        >
            <div className={'gem-text'} style={{ backgroundColor : gem_colors[color] }}>
                <div className={'back-drop'}>
                    {text}
                </div>
            </div>
            
            <Gemstone type={type} color={color} />
        </div>
    );
}

function Gemstone( { type, color } ) {
    switch ( type ) {
        case 0:
            return <Gem0 style={{ fill : gem_colors[color] }} />
        case 1:
            return <Gem1 style={{ fill : gem_colors[color] }} />
        case 2:
            return <Gem2 style={{ fill : gem_colors[color] }} />
        case 3:
            return <Gem3 style={{ fill : gem_colors[color] }} />
        case 4:
            return <Gem4 style={{ fill : gem_colors[color] }} />
        case 5:
            return <Gem5 style={{ fill : gem_colors[color] }} />
        case 6:
            return <Gem6 style={{ fill : gem_colors[color] }} />
        case 7:
            return <Gem7 style={{ fill : gem_colors[color] }} />
        case 8:
            return <Gem8 style={{ fill : gem_colors[color] }} />
        default:
            return <svg> </svg>
    }
}
