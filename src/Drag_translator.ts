

export class DragTranslator{

    state: "IDLE" | "DOWN";
    movementThreshold:number;
    initial_x:number;
    initial_y:number;

    constructor(){
        this.state = "IDLE";
        this.initial_x = 0;
        this.initial_y = 0;
        this.movementThreshold = 2;
    }

    translateEvent(event:MouseEvent){
        // We develop a state machine that determines when a drag event occurs
        // I have considered a minimum threshold so that it requires certain movement
        switch(this.state){
            case "IDLE":
                if(event.type == "mousedown"){
                    this.state = "DOWN";
                    this.initial_x = event.x;
                    this.initial_y = event.y;
                }
                break;
            
            case "DOWN":
                let distance = Math.sqrt(Math.pow((event.x - this.initial_x),2) + Math.pow((event.y - this.initial_y),2));
                
                if(event.type == "mousemove" && distance > this.movementThreshold){
                    return new MouseEvent("drag",{clientX:event.x,clientY:event.y});
                }else if(event.type === "mouseup"){
                    this.state = "IDLE";
                }
                break;

        }
        // If the event is not valid I return the blank event which is used as a 
        // default event indicating that no drag was detected
        return new MouseEvent("blank");

    }

}