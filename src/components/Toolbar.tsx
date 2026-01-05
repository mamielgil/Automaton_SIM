import * as Model from "../model"
import { MenuOption } from "./MenuOption";
export default function Toolbar(){
    
    return(
        <div class = " bg-sky-800 border-b-2 gap-[20px] flex box-border pl-[5px] pt-[5px] pb-[5px] h-[50px]">
        <MenuOption onClickHandler={Model.changeConnectionMode} stringLabel= "Add connection" ></MenuOption>
        <MenuOption onClickHandler={Model.changeAddMode} stringLabel="Add Tool"></MenuOption>
        <MenuOption onClickHandler={Model.changeDeleteMode} stringLabel="Delete Tool"></MenuOption>
        <button class = "ml-[15px] w-[100px]"> Save</button>
        </div>


    );





}