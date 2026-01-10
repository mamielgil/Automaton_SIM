import * as Model from "../model"
import { MenuOption } from "./MenuOption";
import { AutomatonMode } from "../AutomatonMode";
export default function Toolbar(){
    
    return(
        <div class = " bg-sky-600 border-b-2 gap-[20px] flex box-border p-[5px] h-[50px] text-sm" onClick = {Model.handleToolbarClick}>
        <MenuOption onClickHandler={Model.changeConnectionMode} stringLabel= "Add connection" checked = {Model.is_connections_tool_active.value}></MenuOption>
        <MenuOption onClickHandler={Model.changeAddMode} stringLabel="Add Tool" checked = {Model.is_add_tool_active.value}></MenuOption>
        <MenuOption onClickHandler={Model.changeDeleteMode} stringLabel="Delete Tool" checked = {Model.is_delete_tool_active.value}></MenuOption>
        <MenuOption onClickHandler={Model.changeEditMode} stringLabel="Edit Node Tool" checked = {Model.is_edit_tool_active.value}></MenuOption>
        <MenuOption onClickHandler={Model.activateWordAnalysis} stringLabel = "Analyze word" checked = {Model.is_word_analysis_active.value}></MenuOption>
        <AutomatonMode></AutomatonMode>
        <button class = "w-[100px]"> Save</button>
        </div>


    );





}