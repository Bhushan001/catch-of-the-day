import React, { Component } from "react";
import Header from "./Header";
import Order from "./Order";
import Invetory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "./../sample-fishes";
import base from "./../base";
class App extends Component {

  constructor() {
    super();
    // Binding all methods to component scope
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish=this.updateFish.bind(this);
    this.removeFish=this.removeFish.bind(this);
    this.removeFromOrder=this.removeFromOrder.bind(this);
    this.state = {
      fishes: {},
      order: {}
    };
  }

  // Here we are syncing firebase data with our app & also checking if there is already an order inside localstorage
  componentWillMount() {
    // Sync with firebase
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
    // check if there is any order in localstorage
    const localStorageRef = localStorage.getItem(
      `order-${this.props.params.storeId}`
    );
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    // Removing firebase binding when component is unmounted
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    // We are setting order state in localstorage every time component is updating the state
    localStorage.setItem(
      `order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order)
    );
  }

  addFish(fish) {
    // update the state
    const fishes = { ...this.state.fishes };
    // add in new fish
    let timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes });
  }

  // Updating the fish from inventory component
  updateFish(key,updatedFish){
    const fishes={...this.state.fishes};
    fishes[key]=updatedFish;
    this.setState({
      fishes
    });
  }

  // removing fish from inventory
  removeFish(key){
    const fishes={...this.state.fishes};
    fishes[key]=null;
    this.setState({
      fishes
    });
  }

  // removing fish from order
  removeFromOrder(key){
    const order={...this.state.order};
    delete order[key];
    this.setState({
      order
    });
    console.log(order);
  }

  // Loading sample fishes from local js file
  loadSamples() {
    this.setState({ fishes: sampleFishes });
  }

  addToOrder(key) {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                addToOrder={this.addToOrder}
                details={this.state.fishes[key]}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.state.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Invetory
          fishes={this.state.fishes}
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
        />
      </div>
    );
  }
}

// Validating Props
App.propTypes={
  params:React.PropTypes.object.isRequired
}
export default App;
