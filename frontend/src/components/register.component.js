import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Redirect } from 'react-router-dom';
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";


import { connect } from "react-redux";
import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vemail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vfirstName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The Fisrt Name must be between 3 and 20 characters.
      </div>
    );
  }
};
const vlastName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The Last Name must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      successful: false,
    };
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    //this.form.validateAll();

    this.props
      .dispatch(
        register(this.state.firstName, this.state.lastName, this.state.email, this.state.password)
      )
      .then(() => {
        this.setState({
          successful: true,
        });
      })
      .catch(() => {
        this.setState({
          successful: false,
        });
      });
  }

  render() {

    if (this.state.successful==true) {
      return <Redirect to="/login" />;
    }

    const { message } = this.props;

    return (
      <div className="container">
        <div className="card shadow-lg o-hidden border-0 my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-dark mb-4"><br />IoT Console - Register<br /></h4>
                  </div>
                  <form className="user" method="POST" onSubmit={this.handleRegister}>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0"><input className="form-control form-control-user" type="text" id="exampleFirstName" placeholder="First Name" name="first_name" onChange={this.onChangeFirstName} validations={[required, vfirstName]} /></div>
                      <div className="col-sm-6"><input className="form-control form-control-user" type="text" id="exampleFirstName" placeholder="Last Name" name="last_name" onChange={this.onChangeLastName} validations={[required, vlastName]} /></div>
                    </div>
                    <div className="form-group"><input className="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email Address" name="email" onChange={this.onChangeEmail} validations={[required, vemail]}/></div>
                    <div className="form-group"><input className="form-control form-control-user" type="password" id="examplePasswordInput" placeholder="Password" name="password"  onChange={this.onChangePassword}validations={[required, vpassword]}/></div>
                    <button className="btn btn-primary btn-block text-white btn-user" type="submit">Register Account</button>
                    <hr />
                    {message && (
                        <div className="form-group">
                          <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                            {message}
                          </div>
                        </div>
                    )}
                  </form>
                  <div className="text-center" />
                  <div className="text-center"><a className="small" href="login">Already have an account? Login!</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      // <div className="col-md-12">
      //   <div className="card card-container">
      //     <img
      //       src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      //       alt="profile-img"
      //       className="profile-img-card"
      //     />

      //     <Form
      //       onSubmit={this.handleRegister}
      //       ref={(c) => {
      //         this.form = c;
      //       }}
      //     >
      //       {!this.state.successful && (
      //         <div>
      //           <div className="form-group">
      //             <label htmlFor="username">Username</label>
      //             <Input
      //               type="text"
      //               className="form-control"
      //               name="username"
      //               value={this.state.username}
      //               onChange={this.onChangeUsername}
      //               validations={[required, vusername]}
      //             />
      //           </div>

      //           <div className="form-group">
      //             <label htmlFor="email">Email</label>
      //             <Input
      //               type="text"
      //               className="form-control"
      //               name="email"
      //               value={this.state.email}
      //               onChange={this.onChangeEmail}
      //               validations={[required, email]}
      //             />
      //           </div>

      //           <div className="form-group">
      //             <label htmlFor="password">Password</label>
      //             <Input
      //               type="password"
      //               className="form-control"
      //               name="password"
      //               value={this.state.password}
      //               onChange={this.onChangePassword}
      //               validations={[required, vpassword]}
      //             />
      //           </div>

      //           <div className="form-group">
      //             <button className="btn btn-primary btn-block">Sign Up</button>
      //           </div>
      //         </div>
      //       )}

      //       {message && (
      //         <div className="form-group">
      //           <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
      //             {message}
      //           </div>
      //         </div>
      //       )}
      //       <CheckButton
      //         style={{ display: "none" }}
      //         ref={(c) => {
      //           this.checkBtn = c;
      //         }}
      //       />
      //     </Form>
      //   </div>
      // </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
