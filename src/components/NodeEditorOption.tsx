export type NodeEditorOptionProps = {
    my_label:string;
    my_value_input: string;
    onInputHandler:(event:Event)=>void;
}

// This component is used to represent the options that are displayed in the edit and analyze word menus
export function NodeEditorOption({my_label,my_value_input,onInputHandler}: NodeEditorOptionProps){


    return(
    <div class = "flex box-border items-center">
        <label class = "w-[200px]">{my_label}</label>
        <input class = "h-[20px] w-full" value = {my_value_input} onInput = {(event:Event)=>onInputHandler(event)}></input>
    </div>


    );
}