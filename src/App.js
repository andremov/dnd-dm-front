import React, { Component, Fragment } from 'react';
import { Panel } from "./Components/Panel";
import { fetchAllData } from "./Services/api";

export class App extends Component {
    
    state = {
        player_data : []
    }
    
    componentDidMount() {
        this.updatePlayerData();
        setInterval(this.updatePlayerData, 5000)
    }
    
    updatePlayerData = () => {
        fetchAllData().then(player_data => {
            this.setState({
                player_data
            })
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
        const { player_data } = this.state;
        const panels = [ 1, 2, 3 ];
        return <Fragment>
            {
                panels.map(item => {
                    return <Panel
                        id={item}
                        key={item}
                        
                        player_data={player_data}
                        
                        setPlayerNotes={this.setNotes}
                        setPlayerInventory={this.setInventory}
                    />
                })
            }
        </Fragment>
        
    }
}

