import createStateMachine from './createStateMachine';

const initialState = 'idle'; // Initial state for state machines

const transitions = { // Define the transitions between states for the state machines
  idle: { MOVE: 'moving', ATTACK: 'attacking' },
  moving: { STOP: 'idle', ATTACK: 'attacking' },
  attacking: { STOP_ATTACK: 'idle' },
};

const actions = {
  attacking: {
    onEnter: () => console.log('Entering attacking state'), // Action on entering attacking state      
    onExit: () => console.log('Exiting attacking state'), // Action on exiting attacking state
  },
  idle: {
    onEnter: () => console.log('Entering idle state'), // Action on entering idle state
    onExit: () => console.log('Exiting idle state'), // Action on exiting idle state
  },
  moving: {
    onEnter: () => console.log('Entering moving state'), // Action on entering moving state
    onExit: () => console.log('Exiting moving state'), // Action on exiting moving state
  },
};

// Create a state machine for both player and enemy

export const createPlayerStateMachine = () => 
    createStateMachine(initialState, transitions, actions);

export const createEnemyStateMachine = () =>
    createStateMachine(initialState, transitions, actions);