# Automaton_SIM
Preact application that simulates Finite Automaton

# Explanation

Based on the utilization of JFLAP during my Automaton course, I decided to implement a simplified version of JFLAP by using Preact. It allows to model deterministic and non deterministic finite automaton.

## Tools

To model an automaton, the user must draw the nodes on the provided canvas(greyish area) located below  the toolbar. To do so, the user needs to work with the different tools provided above.

Each of the tools are activated by clicking on the designated radio button.

1. **Add connection** -> This tool allows to add a default connection between two nodes. Once the mode is active, you must click on the node you want to become the starting node. Then, continue by clicking on the node you wish to become the ending node of the connection. You will see that a default connection(associated letter -1) will be displayed on the canvas.

![Add Connection Utilization](/assets/Add_connection.gif)


- When turning from NFA to DFA, if repeated transitions are detected, we reset all connections to -1(default value). This way, we avoid incompatibility.

- Depending on to which side the arrow goes to we draw the text above or below the edge(connection). Moreover, **green** represents right and **left** represents connections to the left. On the other hand, **cycles** are represented with black.

-Connections are created with a default value that  must be changed of -1.

- Customs images were created for each of the different options: add connection, add,delete and edit nodes. These cursors are applied when the user is on the canvas. The customs cursor images are located in the public directory of the project.