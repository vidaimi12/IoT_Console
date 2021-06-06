import React, { Component } from "react";

import UserService from "../services/user.service";
import SensorService from "../services/sensor.service";
import { connect } from "react-redux";
class BoardSensor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      pagecontent: []
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
    console.log(this.props.user);
    SensorService.getSensorsBoard(this.props.user._id).then(
      response => {
        this.setState({
          pagecontent: JSON.parse(response.data)
        });

      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
    
  }

  render() {
    return (

      <div className="container">
        <header className="jumbotron">
          <h3>Your sensors:</h3>
          <ul>
            {this.state.pagecontent.map(item => { return <li><a href={"/sensorDetails/" + item}>{item}</a></li> })}
          </ul>
        </header>
        <footer className="bg-white sticky-footer">
          <div className="container my-auto">
            <div className="text-center my-auto copyright"><span>Made by: Imre Vida 2021</span></div>
          </div>
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}


export default connect(mapStateToProps)(BoardSensor);