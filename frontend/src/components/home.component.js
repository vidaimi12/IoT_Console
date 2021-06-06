import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }


  //<h3>{this.state.content}</h3>
  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Info2 házi feladat</h3>
          <p>Node.js, MongoDB, React példa</p>
          <div>{JSON.stringify(this.state.content)}</div>
        </header>
      </div>
    );
  }
}
