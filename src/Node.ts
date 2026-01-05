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

    draw(gc:CanvasRenderingContext2D,selected:boolean){
        // We now draw the circle with its corresponding information
        gc.save();
        // We now draw all the elements that form the node

        gc.beginPath();
        gc.arc(this.my_x,this.my_y,NODE_RADIUS,0,2 * Math.PI);
        gc.closePath();
        if(!selected){
        gc.fillStyle = "yellow";
        }else{
            gc.fillStyle = "orange";
        }
        gc.fill();

        gc.strokeStyle = "black";
        gc.lineWidth = 1;
        gc.stroke();
        gc.fillStyle = "black";
        let myString = this.my_id.toString();
        let myStringHeight = gc.measureText(myString).fontBoundingBoxAscent + gc.measureText(myString).fontBoundingBoxDescent;
        gc.fillText(myString,this.my_x - 0.5 * gc.measureText(myString).width,this.my_y + 0.4 * myStringHeight);
        gc.restore();
    }



}