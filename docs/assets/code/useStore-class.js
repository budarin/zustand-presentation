import React from "react";
import store from "./store";

class UseStore extends React.Component {
  unsubscribe = null;

  constructor(props) {
    super(props);

    if (typeof props.selector !== "function") {
      throw new Error("Selector prop must be a function");
    }

    this.stateFieldName = props.stateFieldName || "selectedState";
    this.state = {
      [this.stateFieldName]: props.selector(store.getState()),
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const newState = this.props.selector(store.getState());

      if (newState !== this.state[this.stateFieldName]) {
        this.setState({ [this.stateFieldName]: newState });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    throw new Error("Render method must be implemented by subclass");
  }
}

/**
 * Using the UseStore class
 */
class CounterContainer extends UseStore {
  render() {
    return <div>Counter: {this.state.counter}</div>;
  }
}

const counterSelector = (state) => state.counter;

export const Counter = () => (
  <CounterContainer selector={counterSelector} stateFieldName="counter" />
);

export default UseStore;
