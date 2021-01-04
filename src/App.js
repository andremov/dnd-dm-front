import React, { Component, Fragment } from 'react';
import { card_states, panel_states } from "./Utils/Data";
import { Header } from "./Components/Header";
import { Panel } from "./Components/Panel";
import { fetchInventory, fetchSpells, findCharacter } from "./Services/api";

export class App extends Component {
    
    state = {
        player_data : undefined,
        player_inventory : [],
        player_spells : [],
        
        panel_data : {
            name : 'loading',
            destination : 'enter'
        },
        
        cards_data : [],
    }
    
    componentDidMount() {
        setTimeout(() => {
            this.handlePanel({ action : 'go_to_destination' })
        }, 1000)
    }
    
    updatePlayerData = () => {
        findCharacter(this.state.player_data.codename).then(r => {
            this.setState({
                player_data : r
            })
        })
        
        fetchInventory(this.state.player_data._id).then(r => {
            this.setState({
                player_inventory : r
            })
        })
    
        fetchSpells(this.state.player_data._id).then(r => {
            this.setState({
                player_spells : r
            })
        })
    }
    
    handleCard = ( { action, card_id, data } ) => {
        if ( action === 'add' ) {
            this.addCard(data)
        } else if ( action === 'remove' ) {
            this.removeCard(card_id)
        } else if ( action === 'modify' ) {
            this.modifyCard(card_id, data)
        } else if ( action === 'change_destination' ) {
            this.changeCardDestination(card_id, data)
        } else if ( action === 'go_to_destination' ) {
            this.gotoCardDestination(card_id)
        }
    }
    
    addCard = ( data ) => {
        let { cards_data } = this.state;
        
        let place = -1;
        for ( let i = 0; i < cards_data.length; i++ ) {
            if ( cards_data[i].card_name === 'hidden' ) {
                place = i;
                break;
            }
        }
        
        if ( place === -1 ) {
            place = cards_data.length
            cards_data.push({})
        }
        
        cards_data[place] = data;
        this.setState({ cards_data })
        this.cleanCards();
        
        setTimeout(() => this.gotoCardDestination(place), 1000)
    }
    
    removeCard = ( card_id ) => {
        let { cards_data } = this.state;
        
        cards_data[card_id] = {
            card_name : 'hidden'
        }
        
        this.setState({ cards_data })
        this.cleanCards();
    }
    
    modifyCard = ( card_id, data ) => {
        let { cards_data } = this.state;
        
        cards_data[card_id] = data;
        
        this.setState({ cards_data })
        this.cleanCards();
    }
    
    changeCardDestination = ( card_id, data ) => {
        let { cards_data } = this.state;
    
        cards_data[card_id].card_destination = data.card_destination;
        
        this.setState({ cards_data })
        this.cleanCards();
    }
    
    gotoCardDestination = ( card_id ) => {
        let { cards_data } = this.state;
        
        cards_data[card_id].card_name = cards_data[card_id].card_destination;
        cards_data[card_id].card_destination = 'loading';
        
        this.setState({ cards_data })
        this.cleanCards();
    }
    
    cleanCards = () => {
        let { cards_data } = this.state;
        for ( let i = cards_data.length - 1; i >= 0; i-- ) {
            if ( cards_data[i].card_name === 'hidden' ) {
                cards_data.splice(i, 1)
            }
        }
        
        this.setState({ cards_data })
    }
    
    handlePanel = ( { action, data } ) => {
        if ( action === 'modify' ) {
            this.modifyPanel(data)
        } else if ( action === 'change_destination' ) {
            this.changePanelDestination(data)
        } else if ( action === 'go_to_destination' ) {
            this.gotoPanelDestination()
        }
    }
    
    modifyPanel = ( data ) => {
        this.setState({ panel_data : data })
    }
    
    changePanelDestination = ( data ) => {
        let { panel_data } = this.state;
        
        panel_data.destination = data.destination;
        
        this.setState({ panel_data })
    }
    
    gotoPanelDestination = () => {
        let { panel_data } = this.state;
        
        panel_data.name = panel_data.destination;
        panel_data.destination = 'loading';
        
        this.setState({ panel_data })
    }
    
    render() {
        const { player_data, panel_data, cards_data, player_inventory, player_spells } = this.state;
        
        return (
            <Fragment>
                <Header
                    callback={this.handleCard}
                    showTools={!!player_data}
                    resetUI={() => this.setState({cards_data : []})}
                />
                
                <Panel type={''}>
                    {panel_states[panel_data.name].component(
                        {
                            card_data : panel_data,
                            player_data : player_data,
                            eventCallback : this.handlePanel,
                            setPlayerData : (data) => {
                                this.setState({
                                    player_data : data
                                })
                                setInterval(this.updatePlayerData, 15000);
                            }
                        }
                    )}
                </Panel>
                
                <div className={'card-holder-panel'}>
                    <div className={'board'}>
                        {cards_data.map(( item, i ) => {
                            
                            return <Fragment key={i}>
                                {card_states[item.card_name].card(
                                    {
                                        card_data : item,
                                        card_id : i,
                                        player_data, player_inventory, player_spells,
                                        eventCallback : this.handleCard
                                    }
                                )}
                            </Fragment>
                            
                        })}
                    </div>
                </div>
            </Fragment>
        );
    }
}

