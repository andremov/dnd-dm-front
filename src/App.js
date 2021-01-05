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
                    />
                })
            }
        </Fragment>
        
    }
}

