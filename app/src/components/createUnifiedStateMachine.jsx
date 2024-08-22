import createStateMachine from './createStateMachine';

const createUnifiedStateMachine = (
  initialState, 
  transitions, 
  actions, 
  entityType
) => {
  const stateMachine = createStateMachine(
    initialState, 
    transitions, 
    actions
  );

  // Example of how you might differentiate behavior if needed
  stateMachine.getEntityType = () => entityType;

  return stateMachine;
};

export default createUnifiedStateMachine;
