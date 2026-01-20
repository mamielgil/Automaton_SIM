import { useLayoutEffect, useRef } from "preact/hooks";
import * as Model from "../model"
import Node from "../Node";

export function Canvas(){

    let canvasRef = useRef<HTMLCanvasElement>(null);
    let containerRef = useRef<HTMLDivElement>(null);
    let canvasClass = "flex grow box-border min-h-0 " + Model.cursor_image.value;
       // We define a method to resize the Canvas
    function resizeCanvas(){

        // We update the size everytime
        const my_canvas = canvasRef.current as HTMLCanvasElement;
        let new_dimensions = my_canvas.getBoundingClientRect();
        my_canvas.width = new_dimensions.width;
        my_canvas.height = new_dimensions.height;
        drawCanvas();
    }

    
    useLayoutEffect(()=>{
        let containerRef = canvasRef.current as HTMLElement;
        let canvas_observer = new ResizeObserver(resizeCanvas);
        canvas_observer.observe(containerRef);

        // We invoke the cleanup function to eliminate the observer
        // once the canvas ceases to exist
        return ()=> canvas_observer.disconnect();
    },[])
    useLayoutEffect(()=>{
        drawCanvas();

},[Model.nodes.value]);

    function drawCanvas(){
        
        
        let gc = canvasRef.current?.getContext("2d");
        let my_canvas = canvasRef.current as HTMLCanvasElement;
        if(gc){

        gc.save();
        gc.fillStyle = "oklch(0.707 0.022 261.325)";
        gc.fillRect(0,0,my_canvas.width,my_canvas.height);
        gc.restore();
        Model.nodes.value.forEach((node)=>{
            
            let new_node = new Node(node);
            // Each render, we create new nodes after having deleted
            // the previous ones
            new_node.draw(gc);
            new_node.drawConnections(gc);
            
            
        });
    }
    }
    return(
        <div ref = {containerRef} class =  {canvasClass}>
        <canvas class = "border bg-gray-400 w-full h-full grow" ref = {canvasRef} onClick = {Model.handleCanvasClick}
        onMouseDown={Model.handleCanvasDrag} onMouseUp={Model.handleCanvasDrag} onMouseMove={Model.handleCanvasDrag} > </canvas>
        </div>

    );
}

