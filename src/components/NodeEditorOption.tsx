import * as Model from "../model"

export type NodeEditorOptionProps = {
    my_label:string;
    my_credentials: Model.node_props;
}

export function NodeEditorOption({my_label,my_credentials}: NodeEditorOptionProps){

    let selected_node_data = my_credentials;
    return(
    <div class = "flex box-border items-center">
         <label class = "w-[200px]">{my_label}</label>
        <input class = "h-[20px] w-full" value = {selected_node_data.name} onInput = {(event)=>Model.updateNodeId(event as Event,selected_node_data.id)}></input>
    </div>


    );
}