import * as Model from "../model"
import { NodeEditorOption } from "./NodeEditorOption";
import { NodeStateChange } from "./NodeStateChange";


export function NodeEditor(){
    // This component will appear in the program when a
    // single node is selected, allowing to modify its data
    let selected_node_data: Model.node_props = {id:-1,name: "-1",pos_x:-1,pos_y:-1,selected:false,connections:[],starting_node:false,final_node:false};

    selected_node_data = Model.find_selected_credentials();
    return(
        Model.is_edit_tool_active.value && selected_node_data.id != -1 ? <div class = "flex flex-col box-border w-[200px] bg-white pr-[5px] border min-h-0 p-[5px] gap-[10px]">
        <NodeEditorOption my_label = {"Node name:"} my_value_input={selected_node_data.name} onInputHandler={(event)=>Model.updateNodeName(event as Event,selected_node_data.id)} ></NodeEditorOption>
        <div class = "flex box-border flex-col gap-[10px]">
        <NodeStateChange my_class = "gap-[5px]" my_label = "Starting node" my_value_input={selected_node_data.starting_node} onInputHandler={(event)=>Model.change_starting_node_status(event,selected_node_data.id)}></NodeStateChange>
        <NodeStateChange my_class = "gap-[12px]" my_label = "Ending node" my_value_input = {selected_node_data.final_node} onInputHandler={(event)=>Model.change_final_node_status(event,selected_node_data.id)}></NodeStateChange>
        </div>
        <label>Connections: </label>
        {selected_node_data.connections.map((connection)=>{
            let my_string = selected_node_data.id.toString() + "-> " + connection.ending_name;
            return(<div class = "flex box-border gap-[5px]"><NodeEditorOption my_label = {my_string} my_value_input = {connection.associated_letter} onInputHandler={(event)=> Model.updateConnection(event as Event,selected_node_data.id,connection.connection_id)}></NodeEditorOption>
            <button class = "grow" onClick = {()=>Model.delete_connection(selected_node_data.id,connection)}>Delete</button></div>);
        })}
       
        </div> : null


    )
}