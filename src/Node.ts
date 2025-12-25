import type { node_props, connection_props } from "./model";
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


        gc.restore();

    }



}