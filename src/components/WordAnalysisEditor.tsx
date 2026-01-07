import * as Model from "../model"
import { useState } from "preact/hooks";


export function WordAnalysisEditor(){
    // This component will appear in the program when a
    // single node is selected, allowing to modify its data
    let [isVisible,setVisibility] = useState(false);
    
    function handle_editor_visibility(){
        // We will make it visible if the word analysis signal is active
        if(Model.is_word_analysis_active.value){

            setVisibility(true);
        }else{
            setVisibility(false);
        }
    }
    handle_editor_visibility();
    return(
        isVisible ? <div class = "flex flex-col box-border w-[200px] bg-white pr-[5px] border min-h-0 p-[5px] gap-[10px]">
        
        </div> : null


    );
}
