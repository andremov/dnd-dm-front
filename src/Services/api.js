import axios from "axios";
import { classes } from "../Utils/Data";

export const API = axios.create({
    baseURL : 'https://andremov-dnd.herokuapp.com/',
    // baseURL : 'http://localhost:3030/',
    timeout : 5000,
    responseType : 'json',
});

export function sendCharacter( object ) {
    return API.post('/players/', {
        ...object,
        stats : JSON.stringify(object.stats),
        level: 1,
        hit_points : classes[object.char_class].hit_dice,
        max_hit_points : classes[object.char_class].hit_dice
    }).then(r => {
        return r.data;
    })
}

export function findCharacter( codename ) {
    return API.get('/players/find', { params : { codename } }).then(r => {
        r.data.stats = JSON.parse(r.data.stats)
        return r.data;
    })
}

export function fetchInventory( id ) {
    return API.get('/items/find', { params : { id } }).then(r => {
        return r.data;
    })
}

export function fetchSpells( id ) {
    return API.get('/spells/find', { params : { id } }).then(r => {
        return r.data;
    })
}

export function modifyCharacter(player_id, changes) {
    return API.patch('/players/'+player_id, changes).then(r => {
        return r.data;
    })
}
