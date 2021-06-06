import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import UserService from "../services/user.service";

class Profile extends Component {

    constructor(props)
    {
      super(props);
      this.state = {
        content: ""
      };
    }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState(response.data);
        console.log(response.data);
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
    console.log(this.state);
  }

  render() {
    const { user: currentUser } = this.props;
    console.log(this.props);
    console.log(currentUser)
    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
  <div className="container">
      <header className="jumbotron">
        <div className="card-body">
          <p>
          <strong>FirstName:</strong> {currentUser.firstName}
          </p>
          <p>
            <strong>LastName:</strong> {currentUser.lastName}
          </p>
          <p>
            <strong>Id:</strong> {currentUser._id} <br/>
            Ezt az adja meg az IoT eszköznek, egy választott szenzornévvel együtt, az eszköz az első adatküldést követően jelenik meg a listában.
          </p>
          <p>
            <strong>Email:</strong> {currentUser.emailAddress}
          </p>
        </div>
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

export default connect(mapStateToProps)(Profile);
