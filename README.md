# Automaton_SIM
Preact application that simulates Finite Automaton

# Reminders and to-dos
    1. Save automaton structure by clicking the save button.
    
    2. Being able to load an automaton file by clicking the load button.

# To explain

- When turning from NFA to DFA, if repeated transitions are detected, we reset all connections to -1(default value). This way, we avoid incompatibility.

- Depending on to which side the arrow goes to we draw the text above or below the edge(connection). Moreover, **green** represents right and **left** represents connections to the left. On the other hand, **cycles** are represented with black.

-Connections are created with a default value that  must be changed of -1.

- Customs images were created for each of the different options: add connection, add,delete and edit nodes. These cursors are applied when the user is on the canvas. The customs cursor images are located in the public directory of the project.