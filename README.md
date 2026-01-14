# Automaton_SIM
Preact application that simulates Finite Automaton

# Reminders and to-dos
    1. Change mouse cursor colour depending on the active signal
        - Add node -> light green colour
        - Delete node -> red colour
        - None selected -> default cursor

    2. When connections are drawn from A->B B->A, fix visual connection collision.

    3. Lengthen explanations when NFA step by step analysis


# To explain

- When turning from NFA to DFA, if repeated transitions are detected, we reset all connections to -1(default value). This way, we avoid incompatibility.