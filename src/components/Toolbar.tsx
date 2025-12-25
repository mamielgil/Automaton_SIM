import * as Model from "../model"

export default function Toolbar(){
    
    
    return(
        <div class = " bg-sky-800 border-b-2 gap-[5px] flex box-border  h-[50px]">
        <button class = "w-[100px] ml-[5px] mb-[5px] mt-[5px]">Input a word</button>
        <button class = "w-[100px] ml-[5px] mb-[5px] mt-[5px]" onClick = {Model.changeAddMode}>Add Tool</button>
        <button class = "w-[100px] ml-[5px] mb-[5px] mt-[5px]">Delete Tool</button>
        <button class = "w-[100px] ml-[5px] mb-[5px] mt-[5px]"> Save</button>
        </div>


    );





}