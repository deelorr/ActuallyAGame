const createStateMachine = (
  initialState, 
  transitions, 
  actions = {}
) => {

  let state = initialState;

  const transition = (event) => {
    const nextState = transitions[state]?.[event];
    if (nextState) {
      if (actions[state]?.onExit) {
        actions[state].onExit();
      }

      state = nextState;

      if (actions[nextState]?.onEnter) {
        actions[nextState].onEnter();
      }
    } else {
      console.error(`Invalid event: ${event} for state: ${state}`);
    }
  };

  const getState = () => state;

  return { transition, getState };
};

export default createStateMachine;
