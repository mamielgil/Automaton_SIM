import { useLayoutEffect, useRef } from "preact/hooks";
import * as Model from "../model"
import Node from "../Node";

export function Canvas(){

    let canvasRef = useRef<HTMLCanvasElement>(null);
    
    useLayoutEffect(()=>{
        // We only draw the nodes if the canvas is displayed on the screen
        console.log("layout Effect is called")
        let gc = canvasRef.current?.getContext("2d");
        if(gc){
        draw_canvas(gc);
        }
    },[Model.nodes.value]);

    function draw_canvas(gc:CanvasRenderingContext2D){
        
        let my_canvas = canvasRef.current as HTMLCanvasElement;
        my_canvas.width = my_canvas.clientWidth;;
        my_canvas.height = my_canvas.clientHeight;
        gc.save();
        gc.fillStyle = "oklch(0.707 0.022 261.325)";
        gc.fillRect(0,0,my_canvas.width,my_canvas.height);
        gc.restore();
        Model.nodes.value.forEach((node)=>{
            
            let new_node = new Node(node);
            // Each render, we create new nodes after having deleted
            // the previous ones
            new_node.draw(gc);
            
        });
    }
    return(
        <div class =  "flex bg-gray-400 grow ml-[5px] mr-[5px] mb-[5px] border">
        <canvas class = "grow" ref = {canvasRef} onClick = {Model.handleCanvasClick}> </canvas>
        </div>

    );
}

