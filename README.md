# Automaton_SIM
Preact application that simulates Finite Automaton

# Explanation

Based on the utilization of JFLAP during my Automaton course, I decided to implement a simplified version of JFLAP by using Preact. It allows to model Deterministic and Non Deterministic Finite Automaton.

## Tools

To model an automaton, the user must draw the nodes on the provided canvas(greyish area) located below  the toolbar. To do so, the user needs to work with the different tools explained below.

Each of the tools are activated by clicking on the designated radio button.

### 1.Add connection

This tool allows to add a default connection between two nodes. Once the mode is active, you must click on the node you want to become the starting node. Then, continue by clicking on the node you wish to become the ending node of the connection. You will see that a default connection(associated letter -1) will be displayed on the canvas.

**Two types of connections can be added** 

- Cycles, those are connections to itself.
- Connections to another node.

![Add Connection Utilization](/assets/Add_connection.gif)

### 2.Add tool

This tool is used to add new nodes to the canvas. Whenever this option is active, click anywhere on the canvas to create the node. The node will appear on the canvas represented by a yellow circle.

![Add Node Utilization](/assets/Add_node.gif)

### 3.Delete tool

This tool can be used to delete nodes from the canvas. Once a node is deleted, its deletion cannot be undone. All the connections from and to that node will be deleted. After activating the deletion tool, simply click on the node you wish to erase. If several nodes are located on top of each other, the uppermost node will be the one to be deleted.

![Delete Node Utilisation](/assets/Delete_tool1.gif)

![Delete Node Utilisation2](/assets/Delete_tool2.gif)
In the previous video, the nodes are deleted in the following order: 1->5->2->4->3.

### Edit node tool

This tool allows to modify the information related to a node, including its name, connections, start and final status. **To activate this tool, you must click on the proper radio button and then click on the node you wish to edit**. **A selected node is highlighted by an orange colour.**

![Access Edit Menu](/assets/Edit_menu1.gif)
#### Edit Menu Options

**Name:** it corresponds to the text displayed within the node. Any kind of character is allowed as long as it is a text smaller than the with of the node. The user can observe how the node name is updated in real time as the user types its new value.

![Change Node Name](/assets/Edit_menu2.gif)

**Starting and ending status** -> these checkboxes allow to define a node as a starting or ending node. Recall that there can only be a single initial node but infinitely many final nodes. Therefore, if a node is selected as starting, if another one had been previously selected, it will become unchecked. 

Whenever a node is set as starting, a green left arrow pointing towards the node will be displayed. Moreover, if a node is final, an inner black circle will be drawn.

![Selection Of Starting Ending Node Status](/assets/Edit_menu3.gif)

**Modifying connections** -> whenever a node is selected, the edit menu will display the connections departing from it. If a node has no connections, the connections display will be empty.

Within the menu,the associated letter to the connection can be modified. Furthermore, the menu allows to delete a connection by clicking on the Delete button. The deletion is be applied automatically. 

**Connections are created by default with the value -1, they must be modified to create the intended automaton.**

![Editing And Deleting Connections](/assets/Edit_menu4.gif)


### 5.Analyze word tool

if this option is active, a menu will be displayed. The user can determine whether a word is recognized or not by the automaton located in the canvas.
**The tool allows for two ways of computation:**
   
**Auto computation** -> gives directly the result of whether a given word is accepted or not.

**Step by step computation** -> provides a step by step resolution of the word, allowing the user to know why a specific word was accepted or rejected.

**Word resolution with a DFA**
![Word resolution DFA](/assets/Edit_menu5.gif)

**Word resolution with a NFA**
![Word resolution NFA](/assets/Edit_menu6.gif)

- When turning from NFA to DFA, if repeated transitions are detected, we reset all connections to -1(default value). This way, we avoid incompatibility.

### 6.Automaton-mode tool

This tool allows to switch between a DFA(Deterministic Finite Automaton) and a NFA(Non Deterministic Finite Automaton).

Depending on the current chosen automaton, the analyze word menu will display a different explanation about what it is being considered as a DFA or NFA.**The most important aspect to consider is that NFA allows lambda transitions and several transitions with the same letter for a given node, unlike DFA which does not.**

**If the user attempts to switch from NFA  to DFA mode, if there are lambda transitions or repeated letters for a given node, all connections will be resetted to the default value(-1) to avoid incompatibility issues.**

**Automaton mode selector**

![Automaton Mode Selector](/assets/Automaton_mode1.png)

**Connection reset after incompatible switch NFA->DFA**
![Connection reset after switching mode](/assets/Automaton_mode2.gif)

### 7.Save Automaton

The website includes a save button which allows to download your current automaton shoudl you wish using it later. The automaton is stored in a json file, storing the nodes information as well as their corresponding connections. Once the button is clicked, a json file called automaton.json will be downloaded into the Downloads folder of your device.

### 8. Load Automaton

On the rightmost side, there is an input you can click to load an automaton. If several files are selected, only the first one of them will be considered. The automata are loaded by using the same json format generated by clicking on the save button. Consequently, users can load an automaton by using a previously saved file or by generating their own json files manually.


## Additional information and conventions

1. Depending on the orientation of a node connection the text is drawn above or below the edge.**Green** represents right-oriented connections and **red** represents left-oriented ones. On the other hand, **black** is used to represent cyclic connections.

2. Connections are created with a default value that  must be changed of -1.

3. Customs images were created for each of the different options: add connection, add,delete and edit nodes. These cursors are applied when the user is on the canvas. The customs cursor images are located in the public directory of the project.

# Author

Made by Miguel Amiel Gil.