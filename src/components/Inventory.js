import React, { Component } from "react";
import AddFishForm from "./AddFishForm";
class Inventory extends Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish, // spread operator
      [e.target.name]: e.target.value
    };
    this.props.updateFish(key,updatedFish);
  }
  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input
          type="text"
          name="name"
          value={fish.name}
          placeholder="Fish Name"
          onChange={e => {
            this.handleChange(e, key);
          }}
        />
        <input
          type="text"
          name="price"
          value={fish.price}
          placeholder="Fish Price"
          onChange={e => {
            this.handleChange(e, key);
          }}
        />
        <select name="status" value={fish.status} onChange={e => {
            this.handleChange(e, key);
          }}>
          <option value="available">Fresh !</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          value={fish.desc}
          placeholder="Fish Description"
          onChange={e => {
            this.handleChange(e, key);
          }}
        />
        <input
          type="text"
          value={fish.image}
          name="image"
          placeholder="Fish Image"
          onChange={e => {
            this.handleChange(e, key);
          }}
        />
        <button onClick={()=>{this.props.removeFish(key)}}>Remove {fish.name}</button>
      </div>
    );
  }
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes={
  fishes:React.PropTypes.object.isRequired,
  addFish:React.PropTypes.func.isRequired,
  removeFish:React.PropTypes.func.isRequired,
  updateFish:React.PropTypes.func.isRequired,
  loadSamples:React.PropTypes.func.isRequired
}

export default Inventory;
