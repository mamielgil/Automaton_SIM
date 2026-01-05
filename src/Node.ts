import { computed } from "@preact/signals";
import { type node_props, type connection_props} from "./model";
import * as Model from "./model";
export default class Node{
    my_id:number;
    my_x:number;
    my_y:number;
    selected:boolean;
    myconnections:connection_props[];
    constructor({id,pos_x,pos_y,selected,connections}:node_props){
        this.my_id = id;
        this.my_x = pos_x;
        this.my_y = pos_y;
        this.selected = selected;
        this.myconnections = connections;
    }

    draw(gc:CanvasRenderingContext2D){
        // We now draw the circle with its corresponding information
        gc.save();
        // We now draw all the elements that form the node

        gc.beginPath();
        gc.arc(this.my_x,this.my_y,Model.NODE_RADIUS,0,2 * Math.PI);
        gc.closePath();
        if(!this.selected){
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

    draw_connections(gc:CanvasRenderingContext2D){
        // We go through each of the connections and draw the arrow

        this.myconnections.forEach((connection)=>{

            // We set the line to start at the center of our node
            gc.save();
            gc.lineWidth = 1;
            gc.strokeStyle = "black";
            

            // We now find the credentials of the ending node(we take the first element though there is always
            // going to be a single node that is returned in the filter function)

            let ending_node_credentials = Model.nodes.value.filter((node)=> node.id === connection.ending_node)[0];
            let computed_values = this.compute_starting_ending_point_connection(this.my_x,this.my_y,ending_node_credentials.pos_x,ending_node_credentials.pos_y);
            gc.moveTo(computed_values.initial_x,computed_values.initial_y);
            gc.lineTo(computed_values.final_x,computed_values.final_y);
            // We call a method that allows to draw the line in the outer bound of the node
            
            gc.stroke();
            gc.restore();
        })

    }


    compute_starting_ending_point_connection(starting_x:number,starting_y:number,ending_x:number,ending_y:number){

        // We first compute the Euclidean distance between them
        let dx = ending_x- starting_x;
        let dy = ending_y - starting_y;
        let vector_joining_points = {x: dx , y: dy};
        let distance = Math.sqrt(Math.pow((dx),2) + Math.pow((dy),2));

        // Once we have computed the distance, we remove the radius

        let ending_distance = distance - Model.NODE_RADIUS;

        // The ending point of the line will be obtained by normalizing the vector and then multiplying it
        // by the ending_distance

        let normalized_vector = {x:vector_joining_points.x / distance, y:vector_joining_points.y / distance};
        let return_values = {initial_x: starting_x + normalized_vector.x * Model.NODE_RADIUS, initial_y: starting_y + normalized_vector.y * Model.NODE_RADIUS,final_x:starting_x + normalized_vector.x * ending_distance, final_y:starting_y + normalized_vector.y * ending_distance};
        return return_values;

    }



}