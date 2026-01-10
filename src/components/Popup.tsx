import * as Model from "../model"

export function Popup({message = ""}){
    
    return(
        Model.show_connection_popup.value ? <div class = "bg-red-200 flex"><label class = "grow text-black text-center"> {message}</label> </div> : null
    );
}