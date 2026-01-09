import * as Model from "../model"
import { NodeEditorOption } from "./NodeEditorOption";

export function WordAnalysisEditor(){
    
    return(
        Model.is_word_analysis_active.value ? <div class = "flex flex-col box-border w-[200px] bg-white pr-[5px] border min-h-0 p-[5px] gap-[10px]">
        <NodeEditorOption my_label="Word to analyze:" my_value_input="" onInputHandler={(event)=>Model.update_word_to_analyze(event)}></NodeEditorOption>
        <div class = "flex flex-col box-border gap-[10px]">
        <label class = "pl-[40px]">{Model.word_resolution.value}</label>
        <button onClick = {()=>Model.compute_word_directly()}> Auto computation</button>
        <button onClick = {()=>Model.compute_step_by_step()}> Step by step computation</button>
        </div>
        </div> : null


    );
}
