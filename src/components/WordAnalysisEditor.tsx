import * as Model from "../model"
import { useState } from "preact/hooks";
import { NodeEditorOption } from "./NodeEditorOption";

export function WordAnalysisEditor(){
    let [isValid,setValidity] = useState(false);

    function compute_word_directly(event:Event){

        // We update the local state
        setValidity(Model.compute_word_directly(event));

    }
    return(
        Model.is_word_analysis_active.value ? <div class = "flex flex-col box-border w-[200px] bg-white pr-[5px] border min-h-0 p-[5px] gap-[10px]">
        <NodeEditorOption my_label="Word to analyze:" my_value_input="" onInputHandler={()=>{}}></NodeEditorOption>
        <div class = "flex flex-col box-border gap-[10px]">
        <button onClick = {(event)=>compute_word_directly(event)}> Auto computation</button>
        <button> Step by step computation</button>
        </div>
        </div> : null


    );
}
