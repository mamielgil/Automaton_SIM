export type NodeEditorOptionProps = {
    my_label:string;
    my_value_input: string;
    onInputHandler:(event:Event)=>void;
    disabled?:boolean;
}

// This component is used to represent the options that are displayed in the edit and analyze word menus
export function NodeEditorOption({my_label,my_value_input,onInputHandler, disabled}: NodeEditorOptionProps){
   
    return(
    <div class = "flex box-border items-center gap-[5px]">
        <label class = "w-full">{my_label}</label>
        <input disabled = {disabled} class = "h-[20px] w-[80px] text-center" value = {my_value_input} onInput = {(event:Event)=>onInputHandler(event)}></input>
    </div>


    );
}