import * as Model from "./model"


export function AutomatonMode(){

    let selected_DFA = false;
    let selected_NFA = false;

    if(Model.automaton_type.value === "DFA"){
        selected_DFA = true;
        selected_NFA = false;
    }else{
        selected_NFA = true;
        selected_DFA = false;
    }

    return(
        <select onChange = {(event)=>Model.change_automaton_mode(event)}>
            <option selected = {selected_DFA} >DFA</option>
            <option selected = {selected_NFA}>NFA</option>
        </select>

    );
}