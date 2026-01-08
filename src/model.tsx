import {signal,computed} from "@preact/signals"
import { DragTranslator } from "./Drag_translator";

export const NODE_RADIUS = 25;
// This signal will store the current nodes of the automaton
export type node_props = {
    id:number;
    name:string;
    pos_x:number;
    pos_y:number;
    selected:boolean;
    connections: connection_props[];
    starting_node:boolean;
    final_node:boolean;
}

export type connection_props = {
    // Specifies to which end node it is connected
    ending_node:number;
    ending_name:string;
    // Letter that characterizes this transition
    associated_letter:string;

}

export type Automaton_type =  "DFA" | "NFA";

export const automaton_type = signal<Automaton_type>("DFA");

export let nodes = signal<node_props[]>([]);

let node_id:number = 0;
export const show_connection_popup = signal(false);
export const is_add_tool_active = signal(false);
export const is_delete_tool_active = signal(false);
export const is_connections_tool_active = signal(false);
export const is_edit_tool_active = signal(false);
export const is_word_analysis_active = signal(false);
export const num_nodes_selected = computed(()=>{

    // We return the number of nodes that are in their selected state
    return nodes.value.filter((node)=>node.selected === true).length;

});

export const current_selected_node = computed(()=>{
    if(num_nodes_selected.value === 1){
        // If there is only a single selected node we keep track of its id
        return nodes.value.filter((node)=>node.selected === true)[0].id;
    }
})

// Arrays that store starting and ending nodes
// They are used to reduce the overhead due to the full node array scan
let starting_nodes:number[] = [];
let final_nodes:number[] = [];

// This array will store the connection that needs to be created
let connectionPair  = {starting_node : -1 , ending_node: -1, associated_letter: "-1" };

export function changeAddMode(){
    let previous_add = is_add_tool_active.value;
    resetAllButtonSignals();
    
    is_add_tool_active.value = !previous_add;
    

}
export function noOptionActive(){
    return !is_add_tool_active.value && !is_delete_tool_active.value && !is_connections_tool_active.value && !is_edit_tool_active.value && !is_word_analysis_active.value;
}
export function changeConnectionMode(){
    let previous_connection_mode = is_connections_tool_active.value;
    resetAllButtonSignals();
    is_connections_tool_active.value = !previous_connection_mode;

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

export function changeEditMode(){
    let previous_edit = is_edit_tool_active.value;
    resetAllButtonSignals();
    is_edit_tool_active.value = !previous_edit;
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
    }else{
        handle_no_option(e as MouseEvent);
    }
}

let drag_translator = new DragTranslator();
let to_drag_node = signal(-1);

export function handleCanvasDrag(e:Event){

    // We are only going to allow the nodes to be dragged if there is
    // no current selected option
    if(noOptionActive()){
    let event:MouseEvent = e as MouseEvent;
    if(event.type == "mousedown"){
        // If a node is clicked it is possible that it will be dragged
        to_drag_node.value = find_clicked_node(event.offsetX,event.offsetY);
        if(to_drag_node.value != -1){
            change_node_color(to_drag_node.value);
        }
    }
    let translated_event = drag_translator.translate_event(event);
    if(translated_event.type == "drag"){
        change_node_pos(event.target as HTMLElement,to_drag_node.value,translated_event.x,translated_event.y);
    }
    }

}

function handle_no_option(event:MouseEvent){
    let collided_id = find_clicked_node(event.offsetX,event.offsetY);
    reset_node_selection();
    if(collided_id != -1){
        change_node_color(collided_id);
    }
}

export function handleToolbarClick(e:Event){
    if(e.target === e.currentTarget){
        resetAllButtonSignals();
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
                    let credentials: node_props = find_node_credentials(collided_id);
                    create_connection(connectionPair.starting_node,connectionPair.ending_node,credentials.name,connectionPair.associated_letter);
                    reset_node_selection();

                } else{
                    // In this case, we need to reset the previous connection to establish the new one
                    connectionPair = {starting_node: collided_id, ending_node: -1, associated_letter: "-1"}


                    // We set the clicked node to a different color so that the user knows that it was selected
                    change_node_color(collided_id);
 
                }
            
            

    }
}

export function find_node_credentials(node_id:number){

    let credentials:node_props = {id:-1,name:"-1",pos_x:-1,pos_y:-1,selected:false,connections:[],starting_node:false,final_node:false};
    nodes.value.forEach((node)=>{
        if(node.id == node_id){
            credentials = node;
        }
    });

    return credentials;

}

function change_node_pos(event_target:HTMLElement,collided_id:number,transl_x:number,transl_y:number){

    // We go through all the nodes and change its coordinates to the one of the translated event

    nodes.value.forEach((node)=>{

        // If the id matches, we update the coordinates
        if(node.id == collided_id){
            // We adjust the global coordinates to the local coordinates of the canvas
            let coordinates_bias = event_target.getBoundingClientRect();
            node.pos_x = transl_x - coordinates_bias.left;
            node.pos_y = transl_y - coordinates_bias.top;
        }
    });

    // We update the signal reference so the components are rerendered

    nodes.value = [...nodes.value];
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
    let new_node_info:node_props = {id:node_id,name: node_id.toString(), pos_x: x, pos_y: y, selected:false,connections:[],starting_node:false,final_node:false};
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
    is_connections_tool_active.value = false;
    is_edit_tool_active.value = false;
    is_word_analysis_active.value = false;
}

function create_connection(starting_node:number,end_node:number,end_name:string,my_letter:string){

    // We know that the passed ids exist therefore, we just perform a for each
    nodes.value.forEach((node)=>{
        if(node.id == starting_node){
            let myConnection = {ending_node: end_node,ending_name:end_name,associated_letter:my_letter};
            node.connections =  [...node.connections, myConnection];
            // We update the reference so that the update is noticed by the engine
            nodes.value = [...nodes.value];
        }
    })

    nodes.value.forEach((node)=>{
        console.log(node);
    })

}

export function find_selected_credentials(){
    if(num_nodes_selected.value === 1){

        let found = false;
        let index = 0;

        while(!found){
            if(nodes.value[index].selected){
                // We set the control var to true so that the loop finishes
                found = true;
            }else{
                // We keep searching within the nodes
            index++;
            }
            
        }
        // We return the selected node
        return nodes.value[index];
    }else{
        // We return a default "node" that allows us to know no node was detected
        return {id:-1,name: "-1", pos_x:-1,pos_y:-1,selected:false,connections:[],starting_node:false,final_node:false};
    }
}


export function updateNodeName(e:Event,selected_id:number){

    let inputField = e.target as HTMLInputElement;
    let temportal_canvas = document.createElement("canvas");

    let gc = temportal_canvas.getContext("2d") as CanvasRenderingContext2D;

    let new_text_width = gc.measureText(inputField.value).width;

    nodes.value.forEach((node)=>{
        // We update the name to the associated node as long as it fits into the node
        if(node.id == selected_id && new_text_width <= NODE_RADIUS * 1.75){
            node.name = inputField.value;
        }
    });

    // We change the reference so that the signal is updated
    nodes.value = [...nodes.value];

}

export function updateConnection(event: Event, node_id: number, ending_node_id: number, associated_letter: string) {
    
    // We take the new value of the input tag and update the connection accordingly
    const inputField = event.target as HTMLInputElement;
    const new_letter = inputField.value;

    // We only update the connection if the introduced letter is valid
    if(verify_new_letter_connection(new_letter)){
    // We map through nodes to find the specific node, then map through its connections
    nodes.value = nodes.value.map((node) => {
        if (node.id === node_id) {
            // Found the node, now update its connections
            const updatedConnections = node.connections.map((conn) => {
                // We identify the specific connection to update
                // Note: Checking old_letter ensures we don't change other transitions to the same node if multiple exist
                if (conn.ending_node === ending_node_id && conn.associated_letter === associated_letter) {
                    return { ...conn, associated_letter: new_letter };
                }
                return conn;
            });
            return { ...node, connections: updatedConnections };
        }
        return node;
    });
    }
}

function verify_new_letter_connection(letter:string){

    if(letter.length > 1 || letter.length === 0){
        return false;
    }else{
        return true;
    }
}


export function activateWordAnalysis(){
    // We activate the word analysis mode
    let previous_is_analysis = is_word_analysis_active.value;
    resetAllButtonSignals();
    is_word_analysis_active.value = !previous_is_analysis;
}

export function compute_word_directly(event:Event){
    //Depending on which automaton we are dealing with, the algorithm will be different

    let myInput = event.target as HTMLInputElement;
    let word_to_analyze = myInput.value;
    if(automaton_type.value == "DFA"){
        //Deterministic automaton computation

        // As it is a deterministic finite automaton, there can
        // only be one initial state
        let starting_node = starting_nodes[0];

        // We get its credentials to go through the word
        let starting_credentials = find_node_credentials(starting_node);
        
        // We take the first letter which is the one that the transition must have
        let current_letter = word_to_analyze[0];
        

    }else{
        //Non deterministic automaton computation

    }
}

export function change_starting_node_status(event:Event,selected_id:number){
    let myInput = event.target as HTMLInputElement;

    let checked_status = myInput.checked;

    // We go through all of the nodes until we find the selected node
    // we then modify its credentials
    nodes.value = nodes.value.map((node)=>{
        if(node.id == selected_id){
            return {...node,starting_node:checked_status};
        }else{
            return{...node};
        }
    });

    if(checked_status){

        // We add the node if it was set as a starting node
        starting_nodes.push(selected_id);

    }else{
        // We remove the node from the array if its starting selection was removed
        starting_nodes = starting_nodes.filter((node_id)=> node_id != selected_id);
    }
}

export function change_final_node_status(event:Event,selected_id:number){
    let myInput = event.target as HTMLInputElement;

    let checked_status = myInput.checked;

    // We find the corresponding node and change its checked status
    nodes.value = nodes.value.map((node)=>{
        if(node.id === selected_id){
            return {...node,final_node:checked_status};
        }else{
            return {...node};
        }
    });

    if(checked_status){
        // We add the node to ending array if it was set
        final_nodes.push(selected_id);
    }else{
        // We remove the node from the array if the final state was disabled
        final_nodes = final_nodes.filter((node_id)=>node_id != selected_id);
    }
}


export function delete_connection(selected_id:number,to_delete_connection:connection_props){
    nodes.value = nodes.value.map((node)=>{
        if(node.id == selected_id){

        let selected_connections = node.connections;
            
        selected_connections = selected_connections.filter((current_conn)=>{
            if(current_conn.ending_node === to_delete_connection.ending_node &&
                current_conn.associated_letter === to_delete_connection.associated_letter){
                    return false;
                }else{
                    return true;
                }
        });
        return {...node,connections:selected_connections};
        }else{
            return {...node};
        }
    });

    nodes.value = [...nodes.value];
}