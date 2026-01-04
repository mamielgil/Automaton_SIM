import * as Model from "../model"

export default function Toolbar(){
    
    return(
        <div class = " bg-sky-800 border-b-2 gap-[5px] flex box-border pl-[5px] pt-[5px] pb-[5px] h-[50px]">
        <button class = "w-[120px] " onClick = {Model.changeConnectionMode}>Add connection</button>
        <button class = "w-[100px]" onClick = {Model.changeAddMode}>Add Tool</button>
        <button class = "w-[100px] " onClick = {Model.changeDeleteMode}>Delete Tool</button>
        <button class = "w-[100px]"> Save</button>
        </div>


    );





}