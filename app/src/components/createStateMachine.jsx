const createStateMachine = (
  initialState,  // The initial state of the state machine
  transitions,   // An object defining state transitions based on events
  actions = {}   // Optional actions to be executed on entering or exiting states
) => {

  let state = initialState; // The current state of the state machine, initialized to the initial state

  // Function to transition the state machine based on an event
  const transition = (event) => {
    const nextState = transitions[state]?.[event]; // Determine the next state based on the current state and event
    if (nextState) { // If a valid next state is found
      if (actions[state]?.onExit) { // If there's an onExit action for the current state, execute it
        actions[state].onExit();
      }

      state = nextState; // Update the state to the next state

      if (actions[nextState]?.onEnter) { // If there's an onEnter action for the new state, execute it
        actions[nextState].onEnter();
      }
    } else {
      console.error(`Invalid event: ${event} for state: ${state}`); // Log an error if the event is not valid for the current state
    }
  };

  // Function to get the current state of the state machine
  const getState = () => state;

  // Return the transition function and the getState function to interact with the state machine
  return { transition, getState };
};

export default createStateMachine; // Export the createStateMachine function as the default export
