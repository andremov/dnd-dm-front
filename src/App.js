import React, { Component, Fragment } from 'react';
import { Panel } from "./Components/Panel";
import { fetchAllPlayerData, fetchOtherPlayers } from "./Services/api";

export class App extends Component {
    
    state = {
        player_id : '',
        player_data : undefined,
        player_items : [],
        player_spells : [],
        player_notes : [],
        player_quests : [],
        other_players : [],
    }
    
    setPlayerID = ( player_id ) => {
        this.setState({
            player_id
        })
        fetchOtherPlayers().then(r => {
            this.setState({
                other_players : r
            })
        })
        this.updatePlayerData();
        setInterval(this.updatePlayerData, 5000)
    }
    
    updatePlayerData = () => {
        fetchAllPlayerData(this.state.player_id).then(r => {
            this.setState(r)
        })
    }
    
    setInventory = (new_inventory) => {
        this.setState({
            player_inventory : new_inventory
        })
    }
    
    setNotes = (new_notes) => {
        this.setState({
            player_notes : new_notes
        })
    }
    
    
    render() {
        const { player_id, player_data, player_items, player_spells, player_notes, player_quests, other_players } = this.state;
        const panels = [ 1, 2, 3 ];
        return <Fragment>
            {
                panels.map(item => {
                    return <Panel
                        id={item}
                        key={item}
                        
                        player_id={player_id}
                        player_data={player_data}
                        player_inventory={player_items}
                        player_spells={player_spells}
                        player_notes={player_notes}
                        player_quests={player_quests}
                        other_players={other_players}
                        
                        setPlayerData={this.setPlayerID}
                        setPlayerNotes={this.setNotes}
                        setPlayerInventory={this.setInventory}
                    />
                })
            }
        </Fragment>
        
    }
}

