class StateMachine {
    // Constructor to initialize the state machine with an initial state, transitions, and optional actions
    constructor(initialState, transitions, actions = {}) {
      this.state = initialState; // Set the initial state of the state machine
      this.transitions = transitions; // Store the transitions between states
      this.actions = actions; // Store the actions to perform on entering or exiting states (optional)
    }
  
    // Method to handle state transitions based on events
    transition(event) {
      // Determine the next state based on the current state and the event
      const nextState = this.transitions[this.state]?.[event];
      if (nextState) {
        // If there's an exit action for the current state, execute it
        if (this.actions[this.state]?.onExit) {
          this.actions[this.state].onExit();
        }
  
        // Log the transition for debugging purposes
        console.log(`Transitioning from ${this.state} to ${nextState} on event ${event}`);
        
        // Update the current state to the next state
        this.state = nextState;
  
        // If there's an enter action for the next state, execute it
        if (this.actions[nextState]?.onEnter) {
          this.actions[nextState].onEnter();
        }
      } else {
        // Log an error if the transition is invalid
        console.log(`Invalid transition from ${this.state} on event ${event}`);
      }
    }
  
    // Method to get the current state of the state machine
    getState() {
      return this.state;
    }
  }
  
  export default StateMachine;
  