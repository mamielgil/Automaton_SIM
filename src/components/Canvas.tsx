import { useLayoutEffect, useRef } from "preact/hooks";
import * as Model from "../model"
import Node from "../Node";

export function Canvas(){

    let myCanvas = useRef<HTMLCanvasElement>(null);
    useLayoutEffect(()=>{
        // We only draw the nodes if the canvas is displayed on the screen
        let gc = myCanvas.current?.getContext("2d");
        if(gc){
        draw_canvas(gc);
        }
    },[Model.nodes.value]);
    return(
        <div class = "bg-gray-400 grow ml-[5px] mr-[5px] mb-[5px] border">
        <canvas ref = {myCanvas}> onClick = {Model.handleCanvasClick} </canvas>
        </div>

    )

    function draw_canvas(gc:CanvasRenderingContext2D){
        let canvas = myCanvas.current as HTMLCanvasElement;
        gc.fillRect(0,0,canvas.width,canvas.height);
        Model.nodes.value.forEach((node)=>{
            let new_Node = new Node(node);
            // Each render, we create new nodes after having deleted
            // the previous ones
            new_Node.draw(gc);
            


        });
    }


}