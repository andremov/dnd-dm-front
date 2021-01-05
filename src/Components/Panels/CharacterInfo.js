import React from 'react';
import { abilities, alignments, classes, races } from "../../Utils/Data";
import { Gem } from "../Gem";
import { EnterForm } from "./EnterForm";
import { Loading } from "../Loading";

export function CharacterInfo( { player_id, player_data, setPlayerData } ) {
    
    if (!player_id) {
        return <EnterForm setPlayerData={setPlayerData} />
    }
    
    if (!player_data) {
        return <Loading />
    }
    
    return (
        <div className={'char-info'}>
            
            <h1>{player_data.name + ' ' + player_data.family}</h1>
            
            <div className={'section basic'}>
                
                <h2>Character Info</h2>
                <div className={'two-gems'}>
                    <Gem
                        text={player_data.age + ' yrs'}
                        title={'Age'}
                        side={'right'}
                        type={-1}
                        blend={false}
                    />
                    <Gem
                        text={player_data.height + ' cm'}
                        title={'Height'}
                        side={'right'}
                        type={-1}
                        blend={false}
                    />
                </div>
                
                <div className={'two-gems'}>
                    <Gem
                        color={'cyan'}
                        text={races[player_data.race].name}
                        title={'Race'}
                        type={2}
                        side={'right'}
                        blend={false}
                    />
                    <Gem
                        color={'aqua'}
                        text={classes[player_data.char_class].name}
                        title={'Class'}
                        type={2}
                        side={'right'}
                        blend={false}
                    />
                </div>
                
                <div className={'one-gem'}>
                    <Gem
                        color={'orange'}
                        text={alignments[player_data.alignment].name}
                        title={'Alignment'}
                        type={2}
                        side={'right'}
                        blend={false}
                    />
                </div>
            </div>
            
            <div className={'section basic'}>
                <h2>Basic Info</h2>
                
                <div className={'one-gem'}>
                    <Gem
                        color={'red'}
                        text={'Level ' + player_data.level}
                        title={'Level'}
                        type={2}
                        side={'right'}
                        blend={false}
                        shadow={true}
                    />
                </div>
                
                <div className={'two-gems'}>
                    <Gem
                        color={'red'}
                        text={player_data.hit_points + ' / ' + player_data.max_hit_points}
                        title={'Hit points'}
                        type={5}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                    <Gem
                        color={'red'}
                        text={'1d' + classes[player_data.char_class].hit_dice}
                        title={'Hit dice'}
                        type={8}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                </div>
                
                <div className={'two-gems'}>
                    <Gem
                        color={'red'}
                        text={player_data.attack_dice_number + 'd' + player_data.attack_dice_sides}
                        title={'Attack dice'}
                        type={7}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                    <Gem
                        color={'red'}
                        text={player_data.armor_class}
                        title={'Armor class'}
                        type={6}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                </div>
            </div>
            
            <div className={'section basic'}>
                <h2>Abilities</h2>
                <div className={'two-gems'}>
                    <Gem
                        color={'purple'}
                        text={abilities[0].shortname + ': ' + player_data.stats[0]}
                        title={abilities[0].name}
                        type={2}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                    <Gem
                        color={'purple'}
                        text={abilities[1].shortname + ': ' + player_data.stats[1]}
                        title={abilities[1].name}
                        type={2}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                </div>
                
                <div className={'two-gems'}>
                    <Gem
                        color={'purple'}
                        text={abilities[2].shortname + ': ' + player_data.stats[2]}
                        title={abilities[2].name}
                        type={2}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                    <Gem
                        color={'purple'}
                        text={abilities[3].shortname + ': ' + player_data.stats[3]}
                        title={abilities[3].name}
                        type={2}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                </div>
                
                <div className={'two-gems'}>
                    <Gem
                        color={'purple'}
                        text={abilities[4].shortname + ': ' + player_data.stats[4]}
                        title={abilities[4].name}
                        type={2}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                    <Gem
                        color={'purple'}
                        text={abilities[5].shortname + ': ' + player_data.stats[5]}
                        title={abilities[5].name}
                        type={2}
                        side={'right'}
                        blend={false}
                        shadow={true}
                        full={true}
                    />
                </div>
            </div>
            
        </div>
    );
}

