import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
// import './EditTools.css';


class EditTools extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      pictureUrl: "",
      category: "",
      description: "",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }


  componentDidMount(props) {
    let id = this.props.match.params.id
    
    api.getSingleTool(id)
      .then(tools => {
        this.setState({
          name: tools.name,
          pictureUrl: tools.pictureUrl,
          category: tools.category,
          description: tools.description,
        })
      })
      .catch(err => {
      }) 
  }


  handleClick(e) {
    e.preventDefault()
    let data = {
      name: this.state.name,
      pictureUrl: this.state.pictureUrl,
      category: this.state.category,
      description: this.state.description,
    }

    let id = this.props.match.params.id;
  
    api.editTools(id, data)
      .then(result => {
        this.setState({
          name: "",
          pictureUrl: "",
          category: "",
          description: "",
          message: `Your tool '${this.state.name}' has been modified`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 1000)
      })
      .catch(err => {
      })
  }
  
  
  render() {                
    return (
      <div className="EditTools">
        <h2>Edit tools</h2>
        <p>Edit</p>
        <form>
          name: <input type="text" value={this.state.name} onChange={(e) => {this.handleInputChange("name", e)}} /> <br/>
          pictureUrl: <input type="text" value={this.state.pictureUrl} onChange={(e) => {this.handleInputChange("pictureUrl", e)}} /> <br/>
          category: <input type="text" value={this.state.category} onChange={(e) => {this.handleInputChange("category", e)}} /> <br/>
          description: <input type="text" value={this.state.description} onChange={(e) => {this.handleInputChange("description", e)}} /> <br/>
          <button onClick={(e) => this.handleClick(e)}>Modify perk</button>
        </form>
        <div style={{
          margin: 10,
          backgroundColor: "blue",
          display: this.state.message ? "block" : "none"
        }}>
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default EditTools;
