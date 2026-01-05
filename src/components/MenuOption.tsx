
type MenuOptionProps = {
    onClickHandler: () => void;
    stringLabel:string;
}

export function MenuOption({onClickHandler, stringLabel} : MenuOptionProps){

    return(
        <div class = "flex gap-[5px]">
        <input type = "radio" name = "options" class = "w-[50px]" onClick = {onClickHandler}></input>
        <div class = "flex items-center">
        <label class = "text-center">{stringLabel} </label>
        </div>
        </div>


    );

}