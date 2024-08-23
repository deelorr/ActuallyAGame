import createStateMachine from './createStateMachine'; // Import the createStateMachine function

// createUnifiedStateMachine creates a state machine with an additional entityType property
const createUnifiedStateMachine = (
  initialState,  // The initial state of the state machine
  transitions,   // An object defining state transitions based on events
  actions,       // Actions to be executed on entering or exiting states
  entityType     // The type of entity the state machine is associated with (e.g., player, enemy)
) => {
  // Create the base state machine using createStateMachine
  const stateMachine = createStateMachine(
    initialState, 
    transitions, 
    actions
  );

  // Add a method to the state machine to get the entity type
  stateMachine.getEntityType = () => entityType;

  // Return the enhanced state machine with the getEntityType method
  return stateMachine;
};

export default createUnifiedStateMachine; // Export the createUnifiedStateMachine function as the default export
