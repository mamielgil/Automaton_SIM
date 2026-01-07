import * as Model from "../model"
import { useState } from "preact/hooks";

export function NodeEditor(){
    // This component will appear in the program when a
    // single node is selected, allowing to modify its data
    let [isVisible,setVisibility] = useState(false);
    function handle_editor_visibility(){
        if(Model.num_nodes_selected.value === 1 && Model.noOptionActive()){
            setVisibility(true);
        }else{
            setVisibility(false);
        }

    }
    handle_editor_visibility();
    return(
         isVisible ? <div class = "flex box-border w-[200px] h-full bg-black pr[5px]">

        </div> : null


    )
}