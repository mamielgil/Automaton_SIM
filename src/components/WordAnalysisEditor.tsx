import * as Model from "../model"
import { NodeEditorOption } from "./NodeEditorOption";
import { useState } from "preact/hooks";

export function WordAnalysisEditor(){

    let [valid_first_step,setValidity] = useState(false);
    function first_step(){
        setValidity(Model.first_step());
    }
    return(
        Model.is_word_analysis_active.value ? <div class = "flex flex-col box-border w-[200px] bg-white pr-[5px] border min-h-0 p-[5px] gap-[10px]">
        <NodeEditorOption my_label="Word to analyze:" my_value_input="" disabled = {Model.first_step_performed.value} onInputHandler={(event)=>Model.update_word_to_analyze(event)}></NodeEditorOption>
        <div class = "flex flex-col box-border gap-[10px]">
        <label class = "pl-[40px]">{Model.auto_word_resolution.value}</label>
        <button onClick = {()=>Model.compute_word_directly()}> Auto computation</button>
        <button onClick = {()=>first_step()}> Step by step computation</button>
        {Model.first_step_performed.value ? <div class = "flex box-border flex-col"><label class = "block whitespace-pre-line">{Model.step_by_step_word_resolution.value}</label>{ valid_first_step ? <button onClick = {Model.compute_step_by_step}>Next Step</button> : null} </div> : null}
        </div>
        </div> : null


    );
}
