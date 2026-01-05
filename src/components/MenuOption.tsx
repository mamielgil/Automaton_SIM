
type MenuOptionProps = {
    onClickHandler: () => void;
    stringLabel:string;
    checked:boolean;
}

export function MenuOption({onClickHandler, stringLabel, checked} : MenuOptionProps){

    return(
        <div class = "flex gap-[5px]">
        <input type = "radio" name = "options" class = "w-[50px]" onClick = {onClickHandler} checked = {checked}></input>
        <div class = "flex items-center">
        <label class = "text-center">{stringLabel} </label>
        </div>
        </div>


    );

}