import * as Model from "../model"
import { useState } from "preact/hooks";
import { NodeEditorOption } from "./NodeEditorOption";


export function NodeEditor(){
    // This component will appear in the program when a
    // single node is selected, allowing to modify its data
    let [isVisible,setVisibility] = useState(false);
    let selected_node_data: Model.node_props = {id:-1,name: "-1",pos_x:-1,pos_y:-1,selected:false,connections:[]};
    function handle_editor_visibility(){
        if(Model.num_nodes_selected.value === 1 && Model.is_edit_tool_active.value){
            selected_node_data = Model.find_selected_credentials();
            setVisibility(true);
        }else{
            setVisibility(false);
        }

    }
    handle_editor_visibility();
    return(
        isVisible ? <div class = "flex flex-col box-border w-[200px] bg-white pr-[5px] border min-h-0 p-[5px] gap-[10px]">
        <NodeEditorOption my_label = {"Node name: "} my_credentials={selected_node_data} ></NodeEditorOption>
        <label>Connections: </label>
        {selected_node_data.connections.map((connection)=>{

        })}
        
        </div> : null


    )
}