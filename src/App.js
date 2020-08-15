import React, { Component } from "react";
import "./App.css";
import Dropdown from "./components/dropdown";

class App extends Component {
  constructor() {
    super();
    this.toggleSelected = this.toggleSelected.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.addLocationHandler = this.addLocationHandler.bind(this);
    this.showMoreHandler = this.showMoreHandler.bind(this);
    this.state = {
      location: [],
      filtered: [],
      addBtn: false,
      showItems: 2,
      selectedItem: "",
    };
  }

  componentDidMount() {
    fetch("https://run.mocky.io/v3/7b2ad53f-98e4-442d-b274-c406ab78525d")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        this.setState({ location: data, filtered: data });
      })
      .catch(console.log);
  }
  toggleSelected(id, key) {
    let temp = this.state[key];
    temp[id].selected = !temp[id].selected;
    this.setState({
      [key]: temp,
    });
  }
  addLocationHandler(event) {
    let temp = [...this.state.location];
    console.log("vale new", this.state.selectedItem);
    const loc = {
      id: temp.length,
      title: this.state.selectedItem,
      selected: false,
      key: "location",
    };
    temp.push(loc);
    this.setState({
      location: temp,
      filtered: temp,
      showItems: temp.length,
      selectedItem: "",
    });
    this.setState((prevState) => ({
      addBtn: !prevState.addBtn,
    }));
  }

  showMoreHandler(showMoreItems) {
    console.log("show more", showMoreItems);
    console.log("show More ", this.state.filtered);
    this.setState({
      showItems:
        this.state.showItems >= this.state.location.length
          ? this.state.showItems
          : this.state.location.length,
    });
  }

  searchHandler(e) {
    let currentList = [...this.state.location];
    let newList = [];
    let searchString = e.target.value;
    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      console.log("string", e.target.value);

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter((item) =>
        item.title.toLowerCase().includes(searchString.toLowerCase())
      );
      this.setState({
        filtered: newList,
        selectedItem: e.target.value,
      });
      const isAdmin = true; // check add priviledge
      //Click show all before add button
      if (newList.length < 1 && isAdmin) {
        this.setState({
          addBtn: true,
          selectedItem: e.target.value,
        });
      }
    } else {
      // If the search bar is empty, set newList to original task list
      this.setState({
        filtered: currentList,
        addBtn: false,
        selectedItem: "",
      });
    }
  }

  render() {
    return (
      <div>
        <Dropdown
          titleHelper="Location"
          title="Select a location"
          noOfRecord={this.state.showItems}
          selectedItem={this.state.selectedItem}
          list={this.state.filtered}
          toggleItem={this.toggleSelected}
          searchItem={this.searchHandler}
          addItem={this.addLocationHandler}
          showMoreItems={this.showMoreHandler}
          addBtn={this.state.addBtn}
        />
      </div>
    );
  }
}
export default App;
