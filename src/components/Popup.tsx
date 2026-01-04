import * as Model from "../model"

export function Popup({message = ""}){
    
    return(
        Model.show_connection_popup.value ? <div class = "bg-gray-700 flex"><label class = "grow text-orange-500 text-center"> {message}</label> </div> : null
    );
}