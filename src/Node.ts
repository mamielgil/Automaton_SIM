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

            if(connection.ending_node != this.my_id){
            
                // This is the way to draw the connections as long as it is with another node
                this.draw_to_other_node_connection(gc,connection);

            }else{
                // This method draws the connections that a node has to itself
                this.draw_cycle_connection(gc,connection);
            }
            
           
        })

    }


    draw_to_other_node_connection(gc:CanvasRenderingContext2D,connection:connection_props){
         
            
            // We now find the credentials of the ending node(we take the first element though there is always
            // going to be a single node that is returned in the filter function)

            let ending_node_credentials = Model.nodes.value.filter((node)=> node.id === connection.ending_node)[0];
            let computed_values = this.compute_starting_ending_point_connection(this.my_x,this.my_y,ending_node_credentials.pos_x,ending_node_credentials.pos_y);
            gc.beginPath();
            gc.moveTo(computed_values.initial_x,computed_values.initial_y);
            gc.lineTo(computed_values.final_x,computed_values.final_y);

            // We call a method that allows to draw the line in the outer bound of the node
            let middle_point_x = this.my_x + computed_values.unit_vector.x * (computed_values.distance / 2)
            let middle_point_y = this.my_y + computed_values.unit_vector.y * (computed_values.distance/ 2);

            gc.strokeText(connection.associated_letter,middle_point_x - 5, middle_point_y - 5);
            gc.stroke();
            gc.closePath();
            this.draw_arrow_head(gc, computed_values.initial_x, computed_values.initial_y, computed_values.final_x, computed_values.final_y);
            
            gc.restore();
    }
    draw_cycle_connection(gc:CanvasRenderingContext2D,connection_data:connection_props){

        gc.save();
        gc.strokeStyle = "black";
        gc.beginPath();
        // We represent the cycle as an ellipse so that it can be distinguished more easily
        gc.ellipse(this.my_x,this.my_y- Model.NODE_RADIUS + 5,Model.NODE_RADIUS / 2, Model.NODE_RADIUS ,Math.PI,0,Math.PI);
        gc.stroke();
        gc.closePath();

        // We draw the arrow heads to indicate the direction of the connection
        this.draw_arrow_head(gc,this.my_x,this.my_y- 2 * Model.NODE_RADIUS,this.my_x + Model.NODE_RADIUS / 2 + 2,this.my_y - Model.NODE_RADIUS + 5);

        // We draw the label that characterizes this particular connection

        // We center the text by removing half of its width to the coordinate x
        let label_x = this.my_x - gc.measureText(connection_data.associated_letter).width / 2;

        // We draw it on top of the connection
        let label_y = this.my_y - 2 * Model.NODE_RADIUS - 5;
        gc.strokeText(connection_data.associated_letter,label_x,label_y);
        gc.restore();

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
        // by the ending_distance. We add the initial point as it is where we started from

        let normalized_vector = {x:vector_joining_points.x / distance, y:vector_joining_points.y / distance};
        let initial_x = starting_x + normalized_vector.x * Model.NODE_RADIUS;
        let initial_y = starting_y + normalized_vector.y * Model.NODE_RADIUS;
        let final_x = starting_x + normalized_vector.x * ending_distance;
        let final_y = starting_y + normalized_vector.y * ending_distance;

        let return_values = {initial_x: initial_x , initial_y: initial_y ,final_x:final_x, final_y:final_y,line_vector:vector_joining_points,distance:distance,unit_vector: normalized_vector};
        return return_values;

    }

    draw_arrow_head(gc: CanvasRenderingContext2D, start_x: number, start_y: number, end_x: number, end_y: number) {
        
        gc.save();
        gc.strokeStyle = "black";

        // I establish a random length for the arrow head
        let head_length = 10;

        // We compute the angle that the line forms by using the arctg
        let angle = Math.atan2(end_y - start_y, end_x - start_x);

        gc.beginPath();
        gc.moveTo(end_x, end_y);
        
        // Calculate the first wing (angle - 30 degrees)
        // I have chosen 30 degress as it is the one that visually seem more beuatiful
        // We subtract the angle to point "backwards" from the tip
        gc.lineTo(end_x - head_length * Math.cos(angle - Math.PI / 6), end_y - head_length * Math.sin(angle - Math.PI / 6));

        gc.moveTo(end_x, end_y);
        
        // Calculate the second wing (angle + 30 degrees)
        gc.lineTo(end_x - head_length * Math.cos(angle + Math.PI / 6), end_y - head_length * Math.sin(angle + Math.PI / 6));

        gc.stroke();
        gc.closePath();
        gc.restore();
    }



}