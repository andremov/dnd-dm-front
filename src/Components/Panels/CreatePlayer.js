import React, { Component, Fragment } from "react";
import { getAbilities, getAlignments, getClass, getClasses, getRace, getRaces } from "../../Utils/Data";
import { RollDie, validCharacter } from "../../Utils/Functions";
import { createCharacter } from "../../Services/api";

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
            d.age = Math.min(Math.max(this.state.formData.age, getRace(r).age.min), getRace(r).age.max)
            d.height = Math.min(Math.max(this.state.formData.height, getRace(r).height.min), getRace(r).height.max)
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
    
    validateSection = ( section_id ) => {
        switch ( section_id ) {
            case 1:
                return validSection1(this.state.formData)
            case 2:
                return validSection2(this.state.formData)
            case 3:
                return validSection3(this.state.formData)
            default:
                return validSection1(this.state.formData)
                    && validSection2(this.state.formData)
                    && validSection3(this.state.formData);
        }
    }
    
    doSend = () => {
        createCharacter({
            ...this.state.formData,
            stats : JSON.stringify(this.state.formData.stats),
            level : 1,
            hit_points : getClass(this.state.formData.char_class).hit_dice,
            max_hit_points : getClass(this.state.formData.char_class).hit_dice
        }).then(r => {
            console.log(r.message)
            this.props.endCallback()
        })
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
        let { formData, rollData, swapStats, rolledStats } = this.state;
        
        return <form
            className={'create-form'}
            onSubmit={e => {
                e.preventDefault()
            }}
        >
            
            <BasicSection
                formData={formData}
                handleChange={this.handleChange}
            />
            <div className={'color-bar'} />
            <AbilitySection
                formData={formData}
                swapStats={swapStats}
                rolledStats={rolledStats}
                rollData={rollData}
                rollAbility={this.rollAbility}
                assignRoll={this.assignRoll}
                trySwap={this.trySwap}
            />
            <div className={'color-bar'} />
            <BackgroundSection
                formData={formData}
                handleChange={this.handleChange}
                validateSection={this.validateSection}
                doSend={this.doSend}
            />
        </form>
    }
}

function BasicSection( props ) {
    const { formData, handleChange } = props;
    
    return <div className={'section'}>
        <h1>
            Character Information
        </h1>
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
                    getRaces().map(( item, i ) => {
                        return <option key={i} value={item.id}>
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
                    getClasses().map(( item, i ) => {
                        return <option key={i} value={item.id}>
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
                getAlignments().map(( item, i ) => {
                    return <option key={i} value={item.id}>
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
                min={getRace(formData.race)?.height.min}
                max={getRace(formData.race)?.height.max}
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
                min={getRace(formData.race)?.age.min}
                max={getRace(formData.race)?.age.max}
                value={formData.age}
                onChange={handleChange}
            />
        </div>
    
    </div>
}

function AbilitySection( props ) {
    const { swapStats, formData, rolledStats, rollData, rollAbility, assignRoll, trySwap } = props;
    
    return <div className={'section'}>
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
            {getAbilities().map(( item, i ) => {
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
    
    </div>
}

function BackgroundSection( props ) {
    const { formData, handleChange, validateSection, doSend } = props;
    
    function validateChange( e ) {
        if ( validCharacter(e.target.value) ) {
            handleChange(e)
        }
    }
    
    return <div className={'section'}>
        <h1>
            Character Backstory
        </h1>
        <textarea
            placeholder={'Background'}
            name={'background'}
            value={formData.background}
            onChange={validateChange}
        />
        
        <div className={'input-group'}>
            <button
                className={'primary'}
                children={'Create'}
                disabled={!validateSection()}
                onClick={doSend}
            />
        </div>
    
    </div>
}

function validSection1( formData ) {
    return (
        !!formData.name &&
        !!formData.codename &&
        formData.alignment !== -1 &&
        formData.race !== -1 &&
        formData.char_class !== -1 &&
        formData.age <= getRaces(formData.race).age.max &&
        formData.age >= getRaces(formData.race).age.min &&
        formData.height <= getRaces(formData.race).height.max &&
        formData.height >= getRaces(formData.race).height.min
    )
}

function validSection2( formData ) {
    return (
        !!formData.stats[0] &&
        !!formData.stats[1] &&
        !!formData.stats[2] &&
        !!formData.stats[3] &&
        !!formData.stats[4] &&
        !!formData.stats[5]
    )
}

function validSection3( formData ) {
    return (
        !!formData.background
    )
}
