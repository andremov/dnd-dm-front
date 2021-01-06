import React from "react";
import { CharacterInfo } from "../Components/Panels/CharacterInfo";
import { Inventory } from "../Components/Panels/Inventory";
import { Background } from "../Components/Panels/Background";
import { Spellbook } from "../Components/Panels/Spellbook";
import { ClassesInfo } from "../Components/Panels/ClassesInfo";
import { RacesInfo } from "../Components/Panels/RacesInfo";
import { AlignmentsInfo } from "../Components/Panels/AlignmentsInfo";
import { AbilitiesInfo } from "../Components/Panels/AbilitiesInfo";
import { Notebook } from "../Components/Panels/Notebook";
import { RollInfo } from "../Components/Panels/RollInfo";
import { TradeItems } from "../Components/Panels/TradeItems";
import { Quests } from "../Components/Panels/Quests";
import { SkillsInfo } from "../Components/Panels/SkillsInfo";

const skills = [
    // 0
    {
        name : 'Athletics',
        id : 0,
        description : 'Athletics covers difficult situations you encounter while climbing, jumping, or swimming.'
    },
    {
        name : 'Acrobatics', id : 1,
        description : 'Acrobatics covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. The GM might also call for a Acrobatics check to see if you can perform acrobatic stunts, including dives, rolls, somersaults, and flips.'
    },
    {
        name : 'Stealth', id : 2,
        description : 'Make a Stealth check when you attempt to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard.'
    },
    {
        name : 'Sleight of Hand', id : 3,
        description : 'Whenever you attempt an act of legerdemain or manual trickery, such as planting something on someone else or concealing an object on your person, make a Sleight of Hand check. The GM might also call for a Sleight of Hand check to determine whether you can lift a coin purse off another person or slip something out of another person’s pocket.'
    },
    {
        name : 'Arcana', id : 4,
        description : 'Arcana measures your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes.'
    },
    
    // 5
    {
        name : 'History', id : 5,
        description : 'History your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations.'
    },
    {
        name : 'Research', id : 6,
        description : 'When you look around for clues and make deductions based on those clues, you make a Research check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through ancient scrolls in search of a hidden fragment of knowledge might also call for an Intelligence Research check.'
    },
    {
        name : 'Nature', id : 7,
        description : 'Nature measures your ability to recall lore about terrain, plants and animals, the weather, and natural cycles.'
    },
    {
        name : 'Religion', id : 8,
        description : 'Religion measures your ability to recall lore about deities, rites and prayers, religious hierarchies, holy symbols, and the practices of secret cults.'
    },
    {
        name : 'Animal Handling', id : 9,
        description : 'When there is any question whether you can calm down a domesticated animal, keep a mount from getting spooked, or intuit an animal’s intentions, the GM might call for an Animal Handling check. You also make an Animal Handling check to control your mount when you attempt a risky maneuver.'
    },
    
    // 10
    {
        name : 'Perception', id : 10,
        description : 'Your Perception lets you spot, hear, or otherwise detect the presence of something. It measures your general awareness of your surroundings and the keenness of your senses. For example, you might try to hear a conversation through a closed door, eavesdrop under an open window, or hear monsters moving stealthily in the forest. Or you might try to spot things that are obscured or easy to miss, whether they are orcs lying in ambush on a road, thugs hiding in the shadows of an alley, or candlelight under a closed secret door.'
    },
    {
        name : 'Insight', id : 11,
        description : 'Insight is the ability to determine the true intentions of a creature, such as when searching out a lie or predicting someone’s next move. Doing so involves gleaning clues from body language, speech habits, and changes in mannerisms.'
    },
    {
        name : 'Medicine', id : 12,
        description : 'Medicine lets you try to stabilize a dying companion or diagnose an illness.'
    },
    {
        name : 'Survival Skills', id : 13,
        description : 'The GM might ask you to make a Survival check to follow tracks, hunt wild game, guide your group through frozen wastelands, identify signs that owlbears live nearby, predict the weather, or avoid quicksand and other natural hazards.'
    },
    {
        name : 'Deception', id : 14,
        description : 'Deception lets you convincingly hide the truth, either verbally or through your actions. This deception can encompass everything from misleading others through ambiguity to telling outright lies. Typical situations include trying to fasttalk a guard, con a merchant, earn money through gambling, pass yourself off in a disguise, dull someone’s suspicions with false assurances, or maintain a straight face while telling a blatant lie.'
    },
    
    // 15
    {
        name : 'Intimidation', id : 15,
        description : 'When you attempt to influence someone through overt threats, hostile actions, and physical violence, the GM might ask you to make an Intimidation check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision.'
    },
    {
        name : 'Performance', id : 16,
        description : 'Performance determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment.'
    },
    {
        name : 'Persuasion', id : 17,
        description : 'When you attempt to influence someone or a group of people with tact, social graces, or good nature, the GM might ask you to make a Persuasion check. Typically, you use persuasion when acting in good faith, to foster friendships, make cordial requests, or exhibit proper etiquette. Examples of persuading others include convincing a chamberlain to let your party see the king, negotiating peace between warring tribes, or inspiring a crowd of townsfolk.'
    },
    {
        name : 'Toughness', id : 18,
        description : 'The DM might call for a Constitution check when you try to accomplish tasks like holding your breath, march or labor for hours without rest, go without sleep, survive without food or water, quaff an entire stein of ale in one go, or resist the effects of poison.'
    },
]

const abilities = [
    {
        name : 'Strength',
        id : 0,
        shortname : 'STR',
        skills : [ 0 ],
        description : 'Strength measures bodily power, athletic Training, and the extent to which you can exert raw physical force.'
    },
    {
        name : 'Dexterity',
        id : 1,
        shortname : 'DEX',
        skills : [ 1, 2, 3 ],
        description : 'Dexterity measures agility, reflexes, and balance.\n'
    },
    {
        name : 'Constitution',
        id : 2,
        shortname : 'CON',
        skills : [ 18 ],
        description : 'Constitution measures health, stamina, and vital force.\n'
    },
    {
        name : 'Intelligence',
        id : 3,
        shortname : 'INT',
        skills : [ 4, 5, 6, 7, 8 ],
        description : 'Intelligence measures mental acuity, accuracy of recall, and the ability to reason.\n'
    },
    {
        name : 'Wisdom',
        id : 4,
        shortname : 'WIS',
        skills : [ 9, 10, 11, 12, 13 ],
        description : 'Wisdom reflects how attuned you are to the world around you and represents perceptiveness and intuition.\n'
    },
    {
        name : 'Charisma',
        id : 5,
        shortname : 'CHA',
        skills : [ 14, 15, 16, 17 ],
        description : 'Charisma measures your ability to interact effectively with others. It includes such factors as confidence and eloquence, and it can represent a charming or commanding Personality.\n'
    },
]

const races = [
    {
        name : 'Dwarf',
        id : 0,
        trait_name : 'Dwarven Resilience',
        ability_bonus : [ {
            id : 2,
            bonus : 2
        } ],
        skill_bonus : [ {
            id : 18,
            bonus : 2,
        } ],
        age : {
            min : 60,
            max : 300
        },
        height : {
            min : 120,
            max : 150
        }
    },
    
    {
        name : 'Elf',
        id : 1,
        trait_name : 'Keen Senses',
        ability_bonus : [ {
            id : 1,
            bonus : 2
        } ],
        skill_bonus : [ {
            id : 10,
            bonus : 2,
        } ],
        age : {
            min : 30,
            max : 700
        },
        height : {
            min : 150,
            max : 180
        }
    },
    
    {
        name : 'Gnome',
        id : 2,
        trait_name : 'Gnome Cunning',
        ability_bonus : [ {
            id : 3,
            bonus : 2
        } ],
        skill_bonus : [ {
            id : 6,
            bonus : 2,
        } ],
        age : {
            min : 30,
            max : 450
        },
        height : {
            min : 90,
            max : 120
        }
    },
    
    {
        name : 'Human',
        id : 6,
        trait_name : 'Humanity',
        ability_bonus : [
            {
                id : 5,
                bonus : 2
            },
        ],
        skill_bonus : [
            {
                id : 17,
                bonus : 2,
            },
        ],
        age : {
            min : 20,
            max : 140
        },
        height : {
            min : 150,
            max : 180
        }
    },
    
    {
        name : 'Draconic',
        id : 6,
        trait_name : 'Dragonborn',
        ability_bonus : [
            {
                id : 0,
                bonus : 2
            },
        ],
        skill_bonus : [
            {
                id : 4,
                bonus : 2,
            },
        ],
        age : {
            min : 15,
            max : 60
        },
        height : {
            min : 170,
            max : 200
        }
    },
    
    {
        name : 'Tiefling',
        id : 6,
        trait_name : 'Wicked',
        ability_bonus : [
            {
                id : 4,
                bonus : 2
            },
        ],
        skill_bonus : [
            {
                id : 11,
                bonus : 2,
            },
        ],
        age : {
            min : 20,
            max : 160
        },
        height : {
            min : 150,
            max : 180
        }
    },
    
    {
        name : 'Half-Elf',
        id : 3,
        trait_name : 'Charismatic Senses',
        ability_bonus : [
            {
                id : 1,
                bonus : 1
            }, {
                id : 5,
                bonus : 1
            }
        ],
        skill_bonus : [
            {
                id : 10,
                bonus : 1,
            },
            {
                id : 16,
                bonus : 1,
            },
        ],
        age : {
            min : 20,
            max : 140
        },
        height : {
            min : 150,
            max : 180
        }
    },
    
    {
        name : 'Half-Orc',
        id : 4,
        trait_name : 'Orcen Glare',
        ability_bonus : [
            {
                id : 2,
                bonus : 1
            }, {
                id : 5,
                bonus : 1
            }
        ],
        skill_bonus : [
            {
                id : 15,
                bonus : 1,
            },
            {
                id : 0,
                bonus : 1,
            },
        ],
        age : {
            min : 15,
            max : 60
        },
        height : {
            min : 150,
            max : 180
        }
    },
    
    {
        name : 'Half-Gnome',
        id : 5,
        trait_name : 'Light-footed',
        ability_bonus : [
            {
                id : 3,
                bonus : 1
            },
            {
                id : 5,
                bonus : 1
            },
        ],
        skill_bonus : [
            {
                id : 3,
                bonus : 1,
            },
            {
                id : 5,
                bonus : 1,
            },
        ],
        age : {
            min : 15,
            max : 60
        },
        height : {
            min : 150,
            max : 180
        }
    },
]

const alignments = [
    {
        name : 'Lawful Good',
        id : 0,
        shortname : 'LG',
        description : 'A lawful good character acts as a good person is expected or required to act. He tells the truth, ' +
            'keeps his word, helps those in need, and speaks out against injustice. A lawful good character hates to see ' +
            'the guilty go unpunished.'
    },
    {
        name : 'Neutral Good',
        id : 1,
        shortname : 'NG',
        description : 'A neutral good character does the best that a good person can do. He is devoted to helping others.'
    },
    {
        name : 'Chaotic Good',
        id : 2,
        shortname : 'CG',
        description : 'A chaotic good character acts as his conscience directs him with little regard for what others ' +
            'expect of him. He makes his own way, but he\'s kind and benevolent. He believes in goodness and right but ' +
            'has little use for laws and regulations. He hates it when people try to intimidate others and tell them what ' +
            'to do. He follows his own moral compass, which, although good, may not agree with that of society.'
    },
    {
        name : 'Lawful Neutral',
        id : 3,
        shortname : 'LN',
        description : 'A lawful neutral character acts as law, tradition, or a personal code directs her. Order and ' +
            'organization are paramount to her. She may believe in personal order and live by a code or standard, or she ' +
            'may believe in order for all and favor a strong, organized government.'
    },
    {
        name : 'True Neutral',
        id : 4,
        shortname : 'N',
        description : 'A neutral character does what seems to be a good idea. She doesn\'t feel strongly one way or the ' +
            'other when it comes to good vs. evil or law vs. chaos. Such a character thinks of good as better than evil - after all,' +
            ' she would rather have good neighbors and rulers than evil ones. Still, she\'s not personally committed to ' +
            'upholding good in any abstract or universal way.'
    },
    {
        name : 'Chaotic Neutral',
        id : 5,
        shortname : 'CN',
        description : 'A chaotic neutral character follows his whims. He is an individualist first and last. He values ' +
            'his own liberty but doesn\'t strive to protect others\' freedom. He avoids authority, resents restrictions, ' +
            'and challenges traditions.'
    },
    {
        name : 'Lawful Evil',
        id : 6,
        shortname : 'LE',
        description : 'A lawful evil villain methodically takes what he wants within the limits of his code of conduct ' +
            'without regard for whom it hurts. He cares about tradition, loyalty, and order but not about freedom, ' +
            'dignity, or life. He plays by the rules but without mercy or compassion.'
    },
    {
        name : 'Neutral Evil',
        id : 7,
        shortname : 'NE',
        description : 'A neutral evil villain does whatever she can get away with. She is out for herself, pure and simple. ' +
            'She sheds no tears for those she kills, whether for profit, sport, or convenience. She has no love of order ' +
            'and holds no illusion that following laws, traditions, or codes would make her any better or more noble. ' +
            'On the other hand, she doesn\'t have the restless nature or love of conflict that a chaotic evil villain has.'
    },
    {
        name : 'Chaotic Evil',
        id : 8,
        shortname : 'CE',
        description : 'A chaotic evil character does whatever his greed, hatred, and lust for destruction drive him to do. ' +
            'He is hot-tempered, vicious, arbitrarily violent, and unpredictable. If he is simply out for whatever he can ' +
            'get, he is ruthless and brutal. If he is committed to the spread of evil and chaos, he is even worse.'
    },
]

const classes = [
    {
        name : 'Barbarian',
        id : 0,
        hit_dice : 12,
        alignment : 5,
        armor : {
            light : true,
            medium : true
        },
        weapons : {
            simple : {
                melee : true,
                ranged : true,
            },
            martial : {
                melee : true
            }
        },
    },
    
    {
        name : 'Bard',
        id : 1,
        hit_dice : 8,
        alignment : 1,
        armor : {
            light : true,
        },
        weapons : {
            simple : {
                melee : true,
                ranged : true,
            },
            martial : {}
        }
    },
    
    {
        name : 'Warrior',
        id : 2,
        hit_dice : 10,
        alignment : 4,
        armor : {
            light : true,
            medium : true,
            heavy : true,
            shield : true
        },
        weapons : {
            simple : {
                melee : true,
                ranged : true,
            },
            martial : {
                melee : true
            }
        }
    },
    
    {
        name : 'Monk',
        id : 3,
        hit_dice : 8,
        alignment : 3,
        armor : {
            light : true
        },
        weapons : {
            simple : {
                melee : true,
                ranged : true,
            },
            martial : {}
        }
    },
    
    {
        name : 'Paladin',
        id : 4,
        hit_dice : 10,
        alignment : 0,
        armor : {
            light : true,
            medium : true,
            heavy : true,
            shield : true
        },
        weapons : {
            simple : {
                melee : true,
                ranged : true,
            },
            martial : {
                melee : true,
            }
        }
    },
    
    {
        name : 'Ranger',
        id : 5,
        hit_dice : 10,
        alignment : 1,
        armor : {
            light : true,
            medium : true,
        },
        weapons : {
            simple : {
                melee : true,
                ranged : true,
            },
            martial : {
                ranged : true,
            }
        }
    },
    
    {
        name : 'Rogue',
        id : 6,
        hit_dice : 8,
        alignment : 7,
        armor : {
            light : true
        },
        weapons : {
            simple : {
                melee : true,
                ranged : true,
            },
            martial : {
                melee : true,
            }
        }
    },
    
    {
        name : 'Sorcerer',
        id : 7,
        hit_dice : 6,
        alignment : 1,
        armor : {
            light : true,
            medium : true,
        },
        weapons : {
            simple : {
                melee : true,
                ranged : true,
            },
            martial : {}
        },
    },
    
    {
        name : 'Warlock',
        id : 8,
        hit_dice : 8,
        alignment : 7,
        armor : {
            light : true,
        },
        weapons : {
            simple : {
                melee : true,
                ranged : true,
            },
            martial : {}
        }
    },
    
    {
        name : 'Wizard',
        id : 9,
        hit_dice : 6,
        alignment : 2,
        armor : {
            light : true,
        },
        weapons : {
            simple : {
                melee : true,
                ranged : true,
            },
            martial : {}
        }
    },
    
    {
        name : 'Cleric',
        id : 10,
        hit_dice : 8,
        alignment : 1,
        armor : {
            light : true,
            medium : true,
        },
        weapons : {
            simple : {
                melee : true,
                ranged : true,
            },
            martial : {}
        }
    },

]

const panels = [
    {
        id : 0,
        name : 'Wiki - Races',
        panel : ( props ) => <RacesInfo {...props} />
    },
    {
        id : 1,
        name : 'Wiki - Classes',
        panel : ( props ) => <ClassesInfo {...props} />
    },
    {
        id : 2,
        name : 'Wiki - Alignments',
        panel : ( props ) => <AlignmentsInfo {...props} />
    },
    {
        id : 3,
        name : 'Player - Character',
        panel : ( props ) => <CharacterInfo {...props} />
    },
    {
        id : 4,
        name : 'Player - Inventory',
        panel : ( props ) => <Inventory {...props} />
    },
    {
        id : 5,
        name : 'Player - Spellbook',
        panel : ( props ) => <Spellbook {...props} />
    },
    {
        id : 6,
        name : 'Wiki - Abilities',
        panel : ( props ) => <AbilitiesInfo {...props} />
    },
    {
        id : 7,
        name : 'Player - Ability Checks',
        panel : ( props ) => <RollInfo {...props} />
    },
    {
        id : 8,
        name : 'Player - Background',
        panel : ( props ) => <Background {...props} />
    },
    {
        id : 9,
        name : 'Player - Notebook',
        panel : ( props ) => <Notebook {...props} />
    },
    {
        id : 10,
        name : 'Player - Quests',
        panel : ( props ) => <Quests {...props} />
    },
    {
        id : 11,
        name : 'Player - Trade',
        panel : ( props ) => <TradeItems {...props} />
    },
    {
        id : 12,
        name : 'Wiki - Skills',
        panel : ( props ) => <SkillsInfo {...props} />
    },
]

export function getPanels( noPlayer ) {
    if ( noPlayer ) {
        return panels.filter(item => item.name.includes('Wiki'))
    }
    return panels
}

export function getPanel( panel_id, player_index, props ) {
    return panels.filter(item => item.id === panel_id)[0]?.panel({ ...props, player_index })
}


export function getSkills() {
    return skills;
}

export function getSkill( pid ) {
    let id = (typeof pid) !== 'number' ? parseInt(pid) : pid;
    return skills.filter(item => item.id === id)[0]
}

export function getSkillAbility( pid ) {
    let id = (typeof pid) !== 'number' ? parseInt(pid) : pid;
    return abilities.filter(item => item.skills.includes(id))[0].id
}


export function getAbilities() {
    return abilities;
}

export function getAbility( pid ) {
    let id = (typeof pid) !== 'number' ? parseInt(pid) : pid;
    return abilities.filter(item => item.id === id)[0]
}

export function getAbilitySkills( pid ) {
    let id = (typeof pid) !== 'number' ? parseInt(pid) : pid;
    return skills.filter((item => abilities[id].skills.includes(item.id)))
}

export function getRaces() {
    return races;
}

export function getRace( pid ) {
    let id = (typeof pid) !== 'number' ? parseInt(pid) : pid;
    return races.filter(item => item.id === id)[0]
}


export function getAlignments() {
    return alignments;
}

export function getAlignment( pid ) {
    let id = (typeof pid) !== 'number' ? parseInt(pid) : pid;
    return alignments.filter(item => item.id === id)[0]
}


export function getClasses() {
    return classes;
}

export function getClass( pid ) {
    let id = (typeof pid) !== 'number' ? parseInt(pid) : pid;
    return classes.filter(item => item.id === id)[0]
}
