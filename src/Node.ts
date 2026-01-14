import { type node_props, type connection_props} from "./model";
import * as Model from "./model";
export default class Node{
    my_id:number;
    name:string;
    my_x:number;
    my_y:number;
    selected:boolean;
    myconnections:connection_props[];
    starting_node:boolean;
    final_node:boolean;
    connections_total_string: Map<number,string>;
    connection_already_drawn:Map<number,boolean>;

    constructor({id,name,pos_x,pos_y,selected,connections,starting_node,final_node}:node_props){
        this.my_id = id;
        this.name = name;
        this.my_x = pos_x;
        this.my_y = pos_y;
        this.selected = selected;
        this.myconnections = connections;
        this.starting_node = starting_node;
        this.final_node = final_node;
        // The first map stores the combined string that will be drawn on the canvas
        // to characterize the connections from two specific nodes(in a single direction
        this.connections_total_string = new Map();

        // The second map stores for each ending_node whether the connection was already drawn or not
        // we avoid unnecessary calls to the draw connection method
        this.connection_already_drawn = new Map();

        this.myconnections.forEach((conn)=>{
            if(!this.connections_total_string.get(conn.ending_node)){
                // We initialize all the counter of connections to other nodes to 0
                this.connections_total_string.set(conn.ending_node,conn.associated_letter);
            }else{
                let current_string = this.connections_total_string.get(conn.ending_node) as string;
                this.connections_total_string.set(conn.ending_node,current_string + ", " + conn.associated_letter);
            }
            this.connection_already_drawn.set(conn.ending_node,false);
        })

    }

    draw(gc:CanvasRenderingContext2D){
        // We now draw the circle with its corresponding information
        gc.save();
        
        // We now draw all the elements that form the node
        if(!this.selected){
        gc.fillStyle = "yellow";
        }else{
            gc.fillStyle = "orange";
        }
        gc.beginPath();
        gc.arc(this.my_x,this.my_y,Model.NODE_RADIUS,0,2 * Math.PI);
        gc.closePath();
        gc.fill();
        gc.strokeStyle = "black";
        gc.lineWidth = 1;
        gc.stroke();

        // We also draw an inner circle in the case that the node is final
        if(this.final_node){

            this.draw_final_state(gc);
        }

        // We also draw a special arrow in the case that it is a starting node

        if(this.starting_node){
            
            this.draw_starting_arrow(gc,"hsl(99 100% 50.3%)");
        }


        gc.fillStyle = "black";
        let myString = this.name;
        let myStringHeight = gc.measureText(myString).fontBoundingBoxAscent + gc.measureText(myString).fontBoundingBoxDescent;
        gc.font = "12px sans-serif";
        gc.strokeText(myString,this.my_x - 0.5 * gc.measureText(myString).width,this.my_y + 0.4 * myStringHeight);
        gc.restore();
    }

    draw_connections(gc:CanvasRenderingContext2D){
        // We go through each of the connections and draw the arrow

        // We set the line to start at the center of our node
        gc.save();
        gc.lineWidth = 1;
        gc.strokeStyle = "black";
        gc.font = "14px sans-serif";

        this.myconnections.forEach((connection)=>{

            

            if(connection.ending_node != this.my_id){
                let current_value = this.connection_already_drawn.get(connection.ending_node) as boolean;
                
                if(!current_value){
                // This is the way to draw the connections as long as it is with another node
                // and only a single connection exists
                this.draw_to_other_node_connection(gc,connection,this.connections_total_string.get(connection.ending_node) as string);
                this.connection_already_drawn.set(connection.ending_node,true);
            
                }
            }else{
                // This method draws the connections that a node has to itself
                this.draw_cycle_connection(gc,this.connections_total_string.get(connection.ending_node) as string);
            }
            
        });

        gc.restore();
    }

    draw_starting_arrow(gc:CanvasRenderingContext2D,stroke_style:string){
        gc.save();
        gc.lineWidth = 2;
        // The arrow will end at the left side of the node
        let ending_x = this.my_x - Model.NODE_RADIUS - 1;

        // The arrow will start 10 pixels to the left of the node
        let starting_x = ending_x - 20;

        gc.beginPath();
        // We draw the corresponding line by moving to the starting point
        gc.strokeStyle = stroke_style;
        gc.moveTo(starting_x,this.my_y);
        gc.lineTo(ending_x,this.my_y);
        gc.closePath();
        gc.stroke();
        this.draw_arrow_head(gc,starting_x,this.my_y,ending_x,this.my_y,stroke_style);

        gc.restore();
    }

    draw_to_other_node_connection(gc:CanvasRenderingContext2D,connection:connection_props,transition_string:string){

            gc.save();
            // We now find the credentials of the ending node(we take the first element though there is always
            // going to be a single node that is returned in the filter function)
            let ending_node_credentials = Model.find_node_credentials(connection.ending_node);
            let computed_values = this.compute_starting_ending_point_connection(this.my_x,this.my_y,ending_node_credentials.pos_x,ending_node_credentials.pos_y);
            gc.beginPath();
            gc.moveTo(computed_values.initial_x,computed_values.initial_y);
            gc.lineTo(computed_values.final_x,computed_values.final_y);

            // We call a method that allows to draw the line in the outer bound of the node
            let middle_point_x = this.my_x + computed_values.unit_vector.x * (computed_values.distance / 2)
            let middle_point_y = this.my_y + computed_values.unit_vector.y * (computed_values.distance/ 2);

            let start_y = computed_values.initial_y;
            let end_y = computed_values.final_y;
            let start_x = computed_values.initial_x;
            let end_x = computed_values.final_x;

            gc.save();
            // We save here again to avoid propagating the rotation and transformation changes
            gc.translate(middle_point_x,middle_point_y);
            let angle = Math.atan2(end_y - start_y, end_x - start_x);
            gc.rotate(angle);

            if (Math.abs(angle) > Math.PI / 2) {
            gc.rotate(Math.PI); // Rotate another 180 degrees
        }   gc.textAlign = "center";
            // Depending on whether the connection is going left or right we draw the text up or down
            let y_bias_for_stroke = 0;
            if(computed_values.final_x  > computed_values.initial_x){
                // This means it goes to the right
                gc.strokeStyle = "green";
                y_bias_for_stroke = -5;

            }else{
                // This means it goes to the right
                gc.strokeStyle = "red";
                y_bias_for_stroke = 14;
            }
            gc.strokeText(transition_string,0, y_bias_for_stroke);
            gc.restore();

            gc.stroke();
            gc.closePath();
            gc.restore();
            this.draw_arrow_head(gc, computed_values.initial_x, computed_values.initial_y, computed_values.final_x, computed_values.final_y,"black");
            
            
    }
    draw_cycle_connection(gc:CanvasRenderingContext2D,transition_string:string){

        gc.save();
        gc.strokeStyle = "black";
        gc.beginPath();
        // We represent the cycle as an ellipse so that it can be distinguished more easily
        gc.ellipse(this.my_x,this.my_y- Model.NODE_RADIUS + 5,Model.NODE_RADIUS / 2, Model.NODE_RADIUS ,Math.PI,0,Math.PI);
        gc.stroke();
        gc.closePath();

        // We draw the arrow heads to indicate the direction of the connection
        this.draw_arrow_head(gc,this.my_x,this.my_y- 2 * Model.NODE_RADIUS,this.my_x + Model.NODE_RADIUS / 2 + 2,this.my_y - Model.NODE_RADIUS + 5,"black");

        // We draw the label that characterizes this particular connection

        // We center the text by removing half of its width to the coordinate x
        let label_x = this.my_x - gc.measureText(transition_string).width / 2;

        // We draw it on top of the connection
        let label_y = this.my_y - 2 * Model.NODE_RADIUS - 5;
        gc.strokeText(transition_string,label_x,label_y);
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

    draw_arrow_head(gc: CanvasRenderingContext2D, start_x: number, start_y: number, end_x: number, end_y: number,stroke_style:string) {
        
        gc.save();
        gc.strokeStyle = stroke_style;

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

    draw_final_state(gc:CanvasRenderingContext2D){
        gc.save();
        
        gc.beginPath();
        gc.arc(this.my_x,this.my_y,Model.NODE_RADIUS - 5,0,2 * Math.PI);
        gc.closePath();
        gc.stroke();

        gc.restore();
}



}