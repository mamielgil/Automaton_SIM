import * as Model from "../model"
export type AutomatonModeProps = {
    disabled:boolean;
}


export function AutomatonMode({disabled}:AutomatonModeProps){

    let selected_DFA = false;
    let selected_NFA = false;

    if(Model.automaton_type.value === "DFA"){
        selected_DFA = true;
        selected_NFA = false;
    }else{
        selected_NFA = true;
        selected_DFA = false;
    }

    let selector_class = "";
    if(disabled){
        selector_class = " border-red-500 text-red-500";
    }

    return(
        <select class = {selector_class} disabled = {disabled} onChange = {(event)=>Model.change_automaton_mode(event)}>
            <option selected = {selected_DFA} >DFA</option>
            <option selected = {selected_NFA}>NFA</option>
        </select>

    );
}