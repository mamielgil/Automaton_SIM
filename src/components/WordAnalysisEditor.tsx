import * as Model from "../model"
import { NodeEditorOption } from "./NodeEditorOption";
import { useState } from "preact/hooks";

export function WordAnalysisEditor(){

    let [valid_first_step,setValidity] = useState(false);
    function first_step(){
        setValidity(Model.first_step());
    }

     // Small explanation about what it is defined as DFA and NFA
        let DFA_explanation: string = "Currently working on a DFA(Deterministic Finite Automaton).\n\n It has the following properties:\n\n 1.Each combination (State,input) produces a single state.\n\n" +
        "2. There is a single initial state\n\n 3. There can be as many final states as desired.\n\n 4. There are not transitions on input λ.\n\n 5. For each state s and input a, there is exactly one edge" +
        "out of s labeled as s.";
        let NFA_explanation:string = "Currently working on a NDFA (Non Deterministic Finite Automaton).\n\n It has the following properties:\n\n 1.Each combination (State,input) produces several states: (state1,state2 ...staten).\n\n" +
        "2. There is a single initial state\n\n 3. There can be as many final states as desired.\n\n 4. There can be transitions with input λ.\n\n 5. More than one edge with the same label from any state is allowed.\n\n" +
        "6. Some states for which certain input symbols have no edge are allowed";

    return(
        Model.is_word_analysis_active.value ? <div class = "flex flex-col box-border w-[200px] bg-white pr-[5px] border min-h-0 p-[5px] gap-[10px] overflow-auto">
        <NodeEditorOption my_label="Word to analyze:" my_value_input="" disabled = {Model.first_step_performed.value} onInputHandler={(event)=>Model.update_word_to_analyze(event)}></NodeEditorOption>
        <div class = "flex flex-col box-border gap-[10px]">
        <label class = "pl-[40px]">{Model.auto_word_resolution.value}</label>
        <button disabled = {Model.exists_default_transition.value} onClick = {()=>Model.compute_word_directly()}> Auto computation</button>
        <button disabled = {Model.first_step_performed || Model.exists_default_transition.value} onClick = {()=>first_step()}> Step by step computation</button>
        {Model.first_step_performed.value ? <div class = "flex box-border flex-col"><label class = "block whitespace-pre-line">{Model.step_by_step_word_resolution.value}</label>{ valid_first_step ? <button onClick = {Model.compute_step_by_step}>Next Step</button> : null} </div> : null}
        {Model.exists_default_transition.value? <label class = " text-center text-red-600"> ALL -1 TRANSITIONS MUST BE REMOVED</label>: null}
        </div>
        <div class = "flex flex-col box-border border border-red-500 p-[5px]">
        {Model.automaton_type.value === "DFA"? <label class = "block whitespace-pre-line">{DFA_explanation} </label> : <label class = "block whitespace-pre-line">{NFA_explanation}</label>}
        </div>
        </div> : null


    );
}
