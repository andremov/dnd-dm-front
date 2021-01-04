import React, { Component, Fragment } from "react";
import { abilities, alignments, classes, races } from "../../Utils/Data";
import { RollDie } from "../../Utils/Functions";
import { sendCharacter } from "../../Services/api";

export class CreatePlayer extends Component {
    
    state = {
        formData : {
            name : '',
            family : '',
            codename : '',
            
            stats : [ 0, 0, 0, 0, 0, 0 ],
            
            alignment : -1,
            race : -1,
            char_class : -1,
            
            height : 0,
            age : 0,
            background : ''
        },
        section : 0,
        rollData : {
            rolls : [ 0, 0, 0 ],
            rolled : false,
            rolling : false,
            total : 0
        },
        rolledStats : 0,
        swapStats : [ -1, -1 ]
    }
    
    wrapFormData = ( data ) => {
        this.setState({
            formData : {
                ...this.state.formData,
                ...data
            }
        })
    }
    
    handleChange = ( e ) => {
        let d = {
            [e.target.name] : e.target.value
        }
        
        if ( e.target.name === 'race' && e.target.value !== '-1' ) {
            let r = e.target.value
            d.age = Math.min(Math.max(this.state.formData.age, races[r].age.min), races[r].age.max)
            d.height = Math.min(Math.max(this.state.formData.height, races[r].height.min), races[r].height.max)
        }
        
        this.wrapFormData(d)
    }
    
    rollAbility = ( index = 0, missing_rolls = 5 ) => {
        
        this.setState({
            rollData : {
                ...this.state.rollData,
                rolling : true
            }
        })
        
        let new_rolls = [ ...this.state.rollData.rolls ]
        new_rolls[index] = RollDie()
        
        this.setState({
            rollData : {
                ...this.state.rollData,
                rolls : new_rolls,
            }
        })
        
        if ( missing_rolls === 0 ) {
            if ( index === 2 ) {
                let { rolls } = this.state.rollData;
                let total = rolls[0] + rolls[1] + rolls[2] - Math.min(...rolls);
                this.setState({
                    rollData : {
                        ...this.state.rollData,
                        rolling : false,
                        rolled : true,
                        total
                    }
                })
            } else {
                setTimeout(() => this.rollAbility(index + 1), 50)
            }
        } else {
            setTimeout(() => this.rollAbility(index, missing_rolls - 1), 50)
        }
    }
    
    validSection1 = () => {
        let { formData } = this.state;
        
        return (
            !!formData.name &&
            !!formData.codename &&
            formData.alignment !== -1 &&
            formData.race !== -1 &&
            formData.char_class !== -1 &&
            formData.age <= races[formData.race].age.max &&
            formData.age >= races[formData.race].age.min &&
            formData.height <= races[formData.race].height.max &&
            formData.height >= races[formData.race].height.min
        )
    }
    validSection2 = () => {
        let { formData } = this.state;
        
        return (
            !!formData.stats[0] &&
            !!formData.stats[1] &&
            !!formData.stats[2] &&
            !!formData.stats[3] &&
            !!formData.stats[4] &&
            !!formData.stats[5]
        )
    }
    
    validSend = () => {
        let { formData } = this.state;
        
        return (
            !!formData.background
        )
    }
    
    doSend = () => {
        sendCharacter(this.state.formData).then(r => {
            console.log(r.message)
        })
        
        this.props.eventCallback({ action : 'go_to_destination' })
        setTimeout(() => {
            this.props.eventCallback({ action : 'change_destination', data : { destination : 'enter' } })
            setTimeout(() => {
                this.props.eventCallback({ action : 'go_to_destination' })
            }, 1000)
        }, 1000)
    }
    
    assignRoll = ( id ) => {
        let { stats } = this.state.formData;
        let { rollData } = this.state;
        if ( rollData.rolled ) {
            stats[id] = rollData.total
            
            this.setState({
                formData : {
                    ...this.state.formData,
                    stats
                },
                rollData : {
                    rolls : [ 0, 0, 0 ],
                    rolled : false,
                    rolling : false,
                    total : 0
                },
                rolledStats : this.state.rolledStats + 1
            })
        }
    }
    
    trySwap = ( id = -1 ) => {
        let { swapStats, formData } = this.state;
        let { stats } = formData
        
        if ( swapStats[0] === -1 ) {
            swapStats[0] = id;
        } else if ( swapStats[1] === -1 ) {
            swapStats[1] = id;
            setTimeout(this.trySwap, 200)
        } else {
            let stat1 = stats[swapStats[0]]
            stats[swapStats[0]] = stats[swapStats[1]]
            stats[swapStats[1]] = stat1
            swapStats = [ -1, -1 ]
        }
        
        this.setState({ swapStats, formData : { ...formData, stats } })
    }
    
    render = () => {
        let { formData, section, rollData, swapStats, rolledStats } = this.state;
        
        return <div className={'new-player'}>
            <form className={'enter-form'} onSubmit={e => {
                e.preventDefault()
            }}>
                <BasicSection
                    section={section}
                    formData={formData}
                    handleChange={this.handleChange}
                    validSection={this.validSection1}
                    setState={( data ) => this.setState(data)}
                />
                <div className={'color-bar'} />
                <AbilitySection
                    section={section}
                    formData={formData}
                    swapStats={swapStats}
                    validSection={this.validSection2}
                    rolledStats={rolledStats}
                    rollData={rollData}
                    rollAbility={this.rollAbility}
                    assignRoll={this.assignRoll}
                    trySwap={this.trySwap}
                    setState={( data ) => this.setState(data)}
                />
                <div className={'color-bar'} />
                <BackgroundSection
                    section={section}
                    formData={formData}
                    handleChange={this.handleChange}
                    validSend={this.validSend}
                    doSend={this.doSend}
                    setState={( data ) => this.setState(data)}
                />
            </form>
        </div>
    }
}

function BasicSection( props ) {
    const { section, formData, handleChange, validSection, setState } = props;
    
    return <div className={'section' + (section === 0 ? '' : ' hidden')}>
        <input
            placeholder={'Codename'}
            name={'codename'}
            value={formData.codename}
            onChange={handleChange}
        />
        
        <div className={'input-group'}>
            <input
                placeholder={'Name'}
                name={'name'}
                value={formData.name}
                onChange={handleChange}
            />
            <input
                placeholder={'Family Name'}
                name={'family'}
                value={formData.family}
                onChange={handleChange}
            />
        </div>
        
        <div className={'input-group'}>
            <select
                name={'race'}
                value={formData.race}
                onChange={handleChange}
            >
                <option value={-1}>Race</option>
                {
                    races.map(( item, i ) => {
                        return <option key={i} value={i}>
                            {item.name}
                        </option>
                    })
                }
            </select>
            
            <select
                name={'char_class'}
                value={formData.char_class}
                onChange={handleChange}
            >
                <option value={-1}>Class</option>
                {
                    classes.map(( item, i ) => {
                        return <option key={i} value={i}>
                            {item.name}
                        </option>
                    })
                }
            </select>
        </div>
        
        <select
            name={'alignment'}
            value={formData.alignment}
            onChange={handleChange}
        >
            <option value={-1}>Alignment</option>
            {
                alignments.map(( item, i ) => {
                    return <option key={i} value={i}>
                        {item.name}
                    </option>
                })
            }
        </select>
        
        <div className={'range-input'}>
            <div>
                Height:
                <input
                    className={'short'}
                    placeholder={'0'}
                    name={'height'}
                    value={formData.height}
                    onChange={handleChange}
                />
                cm.
            </div>
            <input
                type={'range'}
                name={'height'}
                disabled={formData.race === -1}
                min={races[formData.race]?.height.min}
                max={races[formData.race]?.height.max}
                value={formData.height}
                onChange={handleChange}
            />
        </div>
        
        <div className={'range-input'}>
            <div>
                Age:
                <input
                    className={'short'}
                    placeholder={'0'}
                    name={'age'}
                    value={formData.age}
                    onChange={handleChange}
                />
                years
            </div>
            <input
                type={'range'}
                name={'age'}
                disabled={formData.race === -1}
                min={races[formData.race]?.age.min}
                max={races[formData.race]?.age.max}
                value={formData.age}
                onChange={handleChange}
            />
        </div>
        
        <button
            className={'primary'}
            children={'Next'}
            disabled={!validSection()}
            onClick={() => {
                if ( validSection() ) {
                    setState({
                        section : 1
                    })
                }
            }}
        />
    </div>
}

function AbilitySection( props ) {
    const { section, swapStats, validSection, formData, rolledStats, rollData, rollAbility, assignRoll, trySwap,  setState } = props;
    
    return <div className={'section' + (section === 1 ? '' : ' hidden')}>
        <h1>
            Abilities
        </h1>
        {rolledStats < 6 ?
            <div className={'ability-roll'}>
                <div className={'rolls-display'}>
                    {rollData.rolls.map(( item, i ) => {
                        return <div key={i}>
                            {item}
                        </div>
                    })}
                </div>
                
                <button
                    className={'primary' + (rollData.rolled ? ' success' : '')}
                    onClick={() => {
                        if ( !rollData.rolling && !rollData.rolled ) {
                            rollAbility()
                        }
                    }}
                >
                    {rollData.rolled ? rollData.total : 'Roll'}
                </button>
            </div> : <Fragment />
        }
        <div className={'ability-list'}>
            {abilities.map(( item, i ) => {
                return <button
                    className={'secondary ability-display' + (formData.stats[i] !== 0 ? (swapStats[0] === i || swapStats[1] === i ? ' pending' : ' success') : '')}
                    title={rolledStats === 6 ? 'Swap ' + item.name : 'Assign to ' + item.name}
                    key={i}
                    onClick={() => {
                        if ( formData.stats[i] === 0 ) {
                            assignRoll(i)
                        } else if ( rolledStats === 6 ) {
                            trySwap(i)
                        }
                    }}
                >
                    {item.shortname + ' : ' + formData.stats[i]}
                </button>
            })}
        </div>
        
        <div className={'input-group'}>
            <button
                className={'secondary'}
                children={'Back'}
                onClick={() =>
                    setState({
                        section : 0
                    })}
            />
            <button
                className={'primary'}
                children={'Next'}
                disabled={!validSection()}
                onClick={() => {
                    if ( validSection() ) {
                        setState({
                            section : 2
                        })
                    }
                }}
            />
        </div>
    </div>
}

function BackgroundSection( props ) {
    const { section, formData, handleChange, setState, validSend, doSend } = props;
    
    function validCharacter(text) {
        let re = new RegExp('[a-zA-Z0-9.,!?¡¿ ñ\n\r]*');
        let p = text;
        let m = p.match(re);
        return (m[0].length === p.length);
    }
    
    function validateChange(e) {
        if (validCharacter(e.target.value)) {
            handleChange(e)
        }
    }
    
    return <div className={'section' + (section === 2 ? '' : ' hidden')}>
        <textarea
            placeholder={'Background'}
            name={'background'}
            value={formData.background}
            onChange={validateChange}
        />
    
        <div className={'input-group'}>
            <button
                className={'secondary'}
                children={'Back'}
                onClick={() =>
                    setState({
                        section : 1
                    })}
            />
            <button
                className={'primary'}
                children={'Create'}
                disabled={!validSend()}
                onClick={() => {
                    if ( validSend() ) {
                        doSend()
                    }
                }}
            />
        </div>
        
    </div>
}
