import { useEffect,useState } from "preact/hooks";
import * as Model from "../model"

export function Popup({message = ""}){
    let [my_visibility, setVisibility] = useState(false);
    
    // We run this useEffect once and add the effect handler
    // that will update the component when the signal changes
    // in value
    useEffect(()=>{

    setVisibility(Model.show_connection_popup.value);
    },[Model.show_connection_popup.value]);

    return(
        my_visibility ? <div class = "bg-gray-700 flex"><label class = "grow text-orange-500 text-center"> {message}</label> </div> : null
    );
}