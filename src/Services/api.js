import axios from "axios";
import { classes } from "../Utils/Data";

export const API = axios.create({
    baseURL : 'https://andremov-dnd.herokuapp.com/',
    // baseURL : 'http://localhost:3030/',
    timeout : 5000,
    responseType : 'json',
});

export function createCharacter( object ) {
    return API.post('/players/', {
        ...object,
        stats : JSON.stringify(object.stats),
        level : 1,
        hit_points : classes[object.char_class].hit_dice,
        max_hit_points : classes[object.char_class].hit_dice
    }).then(r => {
        return r.data;
    })
}

export function fetchCharacterID( codename ) {
    return API.get('/players/find', { params : { codename } }).then(r => {
        return r.data;
    })
}

export function fetchAllPlayerData( id ) {
    return API.get('/players/all-data/' + id).then(r => {
        r.data.player_data.stats = JSON.parse(r.data.player_data.stats)
        return r.data;
    })
}

export function createNote( data ) {
    return API.post('/notes/', data).then(r => {
        return r.data;
    })
}

export function modifyNote( id, data ) {
    return API.patch('/notes/' + id, data).then(r => {
        return r.data;
    })
}

// export function fetchOtherPlayers() {
//     return API.get('/players/others/').then(r => {
//         return r.data;
//     })
// }

export function doTrade( trade_data ) {
    return API.post('/items/trade', trade_data).then(r => {
        return r.data;
    })
}


export function fetchAllData() {
    return API.get('/players/omega/').then(r => {
        for ( let i = 0; i < r.data.length; i++ ) {
            r.data[i].player_data.stats = JSON.parse(r.data[i].player_data.stats)
        }
        return r.data;
    })
}

export function addItem( item_data ) {
    return API.post('/items', item_data).then(r => {
        return r.data;
    })
}

export function modifyItem( item_id, item_data ) {
    return API.patch('/items/' + item_id, item_data).then(r => {
        return r.data;
    })
}

export function deleteItem( item_id ) {
    return API.delete('/items/' + item_id).then(r => {
        return r.data;
    })
}

export function addSpell( item_data ) {
    return API.post('/spells', item_data).then(r => {
        return r.data;
    })
}

export function modifySpell( item_id, item_data ) {
    return API.patch('/spells/' + item_id, item_data).then(r => {
        return r.data;
    })
}

export function deleteSpell( item_id ) {
    return API.delete('/spells/' + item_id).then(r => {
        return r.data;
    })
}

export function modifyPlayer( player_id, player_data ) {
    return API.patch('/players/'+player_id, player_data).then(r => {
        return r.data;
    })
}
