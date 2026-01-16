import * as Model from "../model"

export function CursorManager(){
    document.body.style.cursor = Model.cursor_image.value;
    return null;
}