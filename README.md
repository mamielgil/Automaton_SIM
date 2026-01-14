# Automaton_SIM
Preact application that simulates Finite Automaton

# Reminders and to-dos
    1. Change mouse cursor colour depending on the active signal
        - Add node -> light green colour
        - Delete node -> red colour
        - None selected -> default cursor

# To explain

- When turning from NFA to DFA, if repeated transitions are detected, we reset all connections to -1(default value). This way, we avoid incompatibility.

- Depending on to which side the arrow goes to we draw the text above or below the edge(connection). Moreover, **green** represents right and **left** represents connections to the left. On the other hand, **cycles** are represented with black.