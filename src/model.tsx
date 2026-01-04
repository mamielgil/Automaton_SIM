import {signal} from "@preact/signals"

export const NODE_RADIUS = 25;
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
export const show_connection_popup = signal(false);

const is_add_tool_active = signal(false);
const is_delete_tool_active = signal(false);
const is_connections_tool_active = signal(false);

export function changeAddMode(){
    // We change the AddMode value alternatively
    let previous_add = is_add_tool_active.value;
    resetAllButtonSignals();
    is_add_tool_active.value = !previous_add;
    

}

export function changeConnectionMode(){
    let previous_connection_status = is_connections_tool_active.value;
    resetAllButtonSignals();
    is_connections_tool_active.value = !previous_connection_status;
    if(is_connections_tool_active.value){
        // IF the value is true, we activate the pop up
        show_connection_popup.value = true;
        setTimeout(()=>{show_connection_popup.value = false;},2000);
    }
}

export function changeDeleteMode(){
    let previous_delete = is_delete_tool_active.value;
    resetAllButtonSignals();
    is_delete_tool_active.value = !previous_delete;

}

export function handleCanvasClick(e:Event){
    let event = e as MouseEvent;
    
    // We determine which signal is active and depending on that
    // we perform a specific action
    if(is_add_tool_active.value){
        
        create_node(event.offsetX,event.offsetY);
    }
    else if(is_delete_tool_active.value){
        let collided_id = find_clicked_node(event.offsetX,event.offsetY); 
        if(collided_id != -1){
            // This means that the hitTest yielded true for some node
            delete_node(collided_id);
        }

    } else if( is_connections_tool_active.value){

    }

}

    // If several nodes collide only the latest node in the array will be deleted
    function find_clicked_node(clicked_x:number,clicked_y:number){
        // We go through all of the nodes and analyze if there was a node that was clicked

        let collided_id:number = -1;
        nodes.value.forEach((node)=>{
            if(clicked_x >= node.pos_x - NODE_RADIUS && clicked_x <= node.pos_x + NODE_RADIUS){
                // This means that the click is in a valid x location so we now analyze y

                if(clicked_y <= node.pos_y + NODE_RADIUS && clicked_y >= node.pos_y - NODE_RADIUS ){
                    // This means that it collided with this node so we take its id
                    collided_id = node.id;
                }
            }

        });
       return collided_id;
    }
export function create_node(x:number,y:number){
    let new_node_info:node_props = {id:node_id, pos_x: x, pos_y: y, connections:[]};
    // We increase the node id so that all nodes have a different id
    node_id++;

    nodes.value = [...nodes.value, new_node_info];
    

}

export function delete_node(id:number){
    // This function deletes the node with the given id

    nodes.value = nodes.value.filter((node)=> node.id != id);

    // We now delete the connections that existing nodes had with the deleted one

    nodes.value.forEach((node)=>{
        // We identify those connections with the deleted node and filter them out
        node.connections = node.connections.filter((connection)=> connection.ending_node != id);

    });


}

function resetAllButtonSignals(){
    is_add_tool_active.value = false;
    is_delete_tool_active.value = false;
}