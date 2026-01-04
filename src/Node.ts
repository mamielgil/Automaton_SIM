import { type node_props, type connection_props,NODE_RADIUS } from "./model";
export default class Node{
    my_id:number;
    my_x:number;
    my_y:number;
    myconnections:connection_props[];
    constructor({id,pos_x,pos_y,connections}:node_props){
        this.my_id = id;
        this.my_x = pos_x;
        this.my_y = pos_y;
        this.myconnections = connections;
    }

    draw(gc:CanvasRenderingContext2D){
        // We now draw the circle with its corresponding information
        gc.save();
        // We now draw all the elements that form the node

        gc.beginPath();
        gc.arc(this.my_x,this.my_y,NODE_RADIUS,0,2 * Math.PI);
        gc.closePath();
        gc.fillStyle = "yellow";
        gc.fill();

        gc.strokeStyle = "black";
        gc.lineWidth = 1;
        gc.stroke();
        gc.restore();
        console.log("i am drawing");

    }



}