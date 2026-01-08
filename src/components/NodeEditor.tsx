import * as Model from "../model"
import { NodeEditorOption } from "./NodeEditorOption";


export function NodeEditor(){
    // This component will appear in the program when a
    // single node is selected, allowing to modify its data
    let selected_node_data: Model.node_props = {id:-1,name: "-1",pos_x:-1,pos_y:-1,selected:false,connections:[]};
    
    selected_node_data = Model.find_selected_credentials();
    return(
        Model.is_edit_tool_active.value ? <div class = "flex flex-col box-border w-[200px] bg-white pr-[5px] border min-h-0 p-[5px] gap-[10px]">
        <NodeEditorOption my_label = {"Node name: "} my_value_input={selected_node_data.name} onInputHandler={(event)=>Model.updateNodeName(event as Event,selected_node_data.id)} ></NodeEditorOption>
        
        <label>Connections: </label>
        {selected_node_data.connections.map((connection)=>{
            let my_string = selected_node_data.id.toString() + "-> " + connection.ending_name;
            return(<NodeEditorOption my_label = {my_string} my_value_input = {connection.associated_letter} onInputHandler={(event)=> Model.updateConnection(event as Event,selected_node_data.id,connection.ending_node,connection.associated_letter)}></NodeEditorOption>);
        })}
        
        </div> : null


    )
}