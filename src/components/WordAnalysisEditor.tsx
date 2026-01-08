import * as Model from "../model"
import { NodeEditorOption } from "./NodeEditorOption";

export function WordAnalysisEditor(){
    

    return(
        Model.is_word_analysis_active.value ? <div class = "flex flex-col box-border w-[200px] bg-white pr-[5px] border min-h-0 p-[5px] gap-[10px]">
        <NodeEditorOption my_label="Word to analyze:" my_value_input="" onInputHandler={()=>{}}></NodeEditorOption>
        <div class = "flex flex-col box-border gap-[10px]">
        <button> Auto computation</button>
        <button> Step by step computation</button>
        </div>
        </div> : null


    );
}
