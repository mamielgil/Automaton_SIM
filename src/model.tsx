import {signal} from "@preact/signals"

// This signal will store the current nodes of the automaton
export type node_props = {
    id:number;
    pos_x:number;
    pos_y:number;
    connections: connection_props[];
}

export type connection_props = {
    // Specifies to which end node it is connected
    ending_node:number;
    // Letter that characterizes this transition
    associated_letter:string;

}


export let nodes = signal<node_props[]>([]);

let node_id:number = 0;
let is_Add_Tool_Active = signal(false);

export function changeAddMode(){
    // We change the AddMode value alternatively
    is_Add_Tool_Active.value = !is_Add_Tool_Active.value;


}

export function handleCanvasClick(){
    if(is_Add_Tool_Active){
        create_node();
    }
}

function create_node(){
    let new_node_info:node_props = {id:node_id, pos_x: 0, pos_y: 0, connections:[]};
    // We increase the node id so that all nodes have a different id
    node_id++;

    nodes.value = [...nodes.value, new_node_info];

}