import * as Model from "../model"

export type NodeEditorOptionProps = {
    my_credentials: Model.node_props;
}

export function NodeEditorOption({my_credentials}: NodeEditorOptionProps){

    let selected_node_data = my_credentials;
    return(
    <div class = "flex">
         <label class = "w-[100px]">Node name: </label>
        <input class = "h-[20px] w-full" value = {selected_node_data.name} onInput = {(event)=>Model.updateNodeId(event as Event,selected_node_data.id)}></input>
    </div>


    );
}