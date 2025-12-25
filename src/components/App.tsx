import Toolbar from "./Toolbar";
import { Canvas } from "./Canvas";

export default function App(){
    


    return(
        <div class = "flex flex-col box-border h-screen w-screen gap-[5px]">
            <Toolbar/>
            <Canvas/>
        </div>
    );
}