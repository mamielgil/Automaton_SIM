import {signal} from "@preact/signals"

export const NODE_RADIUS = 25;
// This signal will store the current nodes of the automaton
export type node_props = {
    id:number;
    pos_x:number;
    pos_y:number;
    selected:boolean;
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

// This array will store the connection that needs to be created
let connectionPair  = {starting_node : -1 , ending_node: -1, associated_letter: "-1" };

export function changeAddMode(){

    resetAllButtonSignals();
    is_add_tool_active.value = true;
    

}

export function changeConnectionMode(){

    resetAllButtonSignals();
    is_connections_tool_active.value = true;
    if(is_connections_tool_active.value){
        // IF the value is true, we activate the pop up
        show_connection_popup.value = true;
        setTimeout(()=>{show_connection_popup.value = false;},2000);
    }
}

export function changeDeleteMode(){
    
    resetAllButtonSignals();
    is_delete_tool_active.value = true;

}

export function handleCanvasClick(e:Event){
    let event = e as MouseEvent;
    
    // We determine which signal is active and depending on that
    // we perform a specific action
    if(is_add_tool_active.value){
        
        create_node(event.offsetX,event.offsetY);
    }
    else if(is_delete_tool_active.value){
        handle_delete_option(e as MouseEvent);

    } else if( is_connections_tool_active.value){

        
        handle_connection_option(e as MouseEvent);
}
}

function handle_connection_option(event:MouseEvent){

    // We determine if we selected one node to create the connection
        let collided_id = find_clicked_node(event.offsetX,event.offsetY);

            if(collided_id != -1){
                if(connectionPair.starting_node == -1){
                    reset_node_selection();
                    // This means that it is the first node that was clicked
                connectionPair.starting_node = collided_id;
                // To identify that this node was selected, we are going to change its color
                change_node_color(collided_id);
                }else if( connectionPair.ending_node == -1){
                    // This means that it is the second node that was clicked
                    connectionPair.ending_node = collided_id;
                    create_connection(connectionPair.starting_node,connectionPair.ending_node,connectionPair.associated_letter);
                    reset_node_selection();

                } else{
                    // In this case, we need to reset the previous connection to establish the new one
                    connectionPair = {starting_node: collided_id, ending_node: -1, associated_letter: "-1"}


                    // We set the clicked node to a different color so that the user knows that it was selected
                    change_node_color(collided_id);
                }
            
            

    }
}


function change_node_color(collided_id:number){

    // Changing the color is changing its selection state so that it has a different color
    nodes.value.forEach((node)=>{
        if(node.id === collided_id){
            node.selected = true;

        }
    });

    // We change the signal reference so that the rerender is triggered
    nodes.value = [...nodes.value];

}

function reset_node_selection(){

    // This method resets all nodes to non selected
    nodes.value.forEach((node)=>{
        node.selected = false;
    });
    // We change the reference so that a rerender is triggered
    nodes.value = [...nodes.value];
}
function handle_delete_option(event:MouseEvent){

    let collided_id = find_clicked_node(event.offsetX,event.offsetY); 
        if(collided_id != -1){
            // This means that the hitTest yielded true for some node
            delete_node(collided_id);
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
    let new_node_info:node_props = {id:node_id, pos_x: x, pos_y: y, selected:false,connections:[]};
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

function create_connection(starting_node:number,end_node:number,my_letter:string){

    // We know that the passed ids exist therefore, we just perform a for each
    nodes.value.forEach((node)=>{
        if(node.id == starting_node){
            let myConnection = {ending_node: end_node,associated_letter:my_letter};
            node.connections =  [...node.connections, myConnection];
            // We update the reference so that the update is noticed by the engine
            nodes.value = [...nodes.value];
        }
    })

    nodes.value.forEach((node)=>{
        console.log(node);
    })

}