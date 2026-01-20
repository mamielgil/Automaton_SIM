# Automaton_SIM
Preact application that simulates Finite Automaton

# Explanation

Based on the utilization of JFLAP during my Automaton course, I decided to implement a simplified version of JFLAP by using Preact. It allows to model deterministic and non deterministic finite automaton.

## Tools

To model an automaton, the user must draw the nodes on the provided canvas(greyish area) located below  the toolbar. To do so, the user needs to work with the different tools provided above.

Each of the tools are activated by clicking on the designated radio button.

1. **Add connection** -> This tool allows to add a default connection between two nodes. Once the mode is active, you must click on the node you want to become the starting node. Then, continue by clicking on the node you wish to become the ending node of the connection. You will see that a default connection(associated letter -1) will be displayed on the canvas.
**Two types of connections can be added** 
    - Cycles, those are connections to itself.
    - Connections to another node.

![Add Connection Utilization](/assets/Add_connection.gif)

2. **Add tool** -> This tool is used to add new nodes to the canvas. Whenever this option is active, click anywhere on the canvas to create the node. The node will appear on the canvas represented by a yellow circle.

![Add Node Utilization](/assets/Add_node.gif)

3. **Delete tool** -> This tool can be used to delete nodes from the canvas. Once a node is deleted, its deletion cannot be undone. All the connections from and to that node will be deleted. After activating the deletion tool, simply click on the node you wish to erase. If several nodes are located on top of each other, the uppermost node will be the one to be deleted.

![Delete Node Utilisation](/assets/Delete_tool1.gif)

![Delete Node Utilisation2](/assets/Delete_tool2.gif)
In the previous video, the nodes are deleted in the following order: 1->5->2->4->3.

4. **Edit node tool** -> This tool allows to modify the information related to a node, including its name, connections, start and final status. **To activate this tool, you must click on the proper radio button and then click on the node you wish to edit**. **A selected node is highlighted by an orange colour.**

![Access Edit Menu](/assets/Edit_menu1.gif)
### Edit Menu Options

**Name:** it corresponds to the text displayed within the node. Any kind of character is allowed as long as it is a text smaller than the with of the node. The user can observe how the node name is updated in real time as the user types its new value.

![Change Node Name](/assets/Edit_menu2.gif)

**Starting and ending status** -> these checkboxes allow to define a node as a starting or ending node. Recall that there can only be a single initial node but infinitely many final nodes. Therefore, if a node is selected as starting, if another one had been previously selected, it will become unchecked. Whenever a node is set as starting, a green left arrow pointing towards the node will be displayed. Moreover, if a node is final, an inner black circle will be drawn.

![Selection Of Starting Ending Node Status](/assets/Edit_menu3.gif)


Only the connections departing from it will be displayed in its edit menu. If a node has no connections, the connections display will be empty.

- When turning from NFA to DFA, if repeated transitions are detected, we reset all connections to -1(default value). This way, we avoid incompatibility.

- Depending on to which side the arrow goes to we draw the text above or below the edge(connection). Moreover, **green** represents right and **left** represents connections to the left. On the other hand, **cycles** are represented with black.

-Connections are created with a default value that  must be changed of -1.

- Customs images were created for each of the different options: add connection, add,delete and edit nodes. These cursors are applied when the user is on the canvas. The customs cursor images are located in the public directory of the project.