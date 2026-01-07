import * as Model from "../model"
import { MenuOption } from "./MenuOption";
export default function Toolbar(){
    
    return(
        <div class = " bg-sky-800 border-b-2 gap-[20px] flex box-border pl-[5px] pt-[5px] pb-[5px] h-[50px]" onClick = {Model.handleToolbarClick}>
        <MenuOption onClickHandler={Model.changeConnectionMode} stringLabel= "Add connection" checked = {Model.is_connections_tool_active.value}></MenuOption>
        <MenuOption onClickHandler={Model.changeAddMode} stringLabel="Add Tool" checked = {Model.is_add_tool_active.value}></MenuOption>
        <MenuOption onClickHandler={Model.changeDeleteMode} stringLabel="Delete Tool" checked = {Model.is_delete_tool_active.value}></MenuOption>
        <MenuOption stringLabel="Edit Node Tool" onClickHandler={Model.changeEditMode} checked = {Model.is_edit_tool_active.value}></MenuOption>
        <button class = "ml-[15px] w-[100px]"> Save</button>
        </div>


    );





}