export type NodeStateChangeProps = {
    my_label:string;
    my_value_input: boolean;
    onInputHandler:(event:Event)=>void;
    my_class:string;
}


export function NodeStateChange({my_label,my_value_input,onInputHandler,my_class}:NodeStateChangeProps){

    let class_string = "flex box-border h-[22px] items-center " + my_class;
    return(
        <div class = {class_string} >
        <label>{my_label}</label>
        <input class = "mt-[3px]" type = "checkbox" checked = {my_value_input} onInput={onInputHandler}></input>
        </div>


    );
}