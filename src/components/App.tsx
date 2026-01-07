import Toolbar from "./Toolbar";
import { Canvas } from "./Canvas";
import { Popup } from "./Popup";
import { NodeEditor } from "./NodeEditor";

export default function App(){
    
    return(
        <div class = "flex flex-col box-border h-screen w-full gap-[5px]">
            <Toolbar/>
            <div class = "flex grow box-border w-full gap-[5px] pl-[5px] pr-[5px] pb-[5px] min-h-0">
            <Canvas/>
            <NodeEditor/>
            </div>
            <Popup message = "Click on two nodes to create a connection"></Popup>
        </div>
    );
}