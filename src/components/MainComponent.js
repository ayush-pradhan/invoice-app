
import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import UserForm from "./UserForm";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
// import Invoice from "./Invoice";

class Main extends Component {
  render() {
    return (
      <div>
        {/* <Header /> */}
        <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/UserForm" component={UserForm} />
          {/* <Route exact path="/Invoice" component={Invoice} /> */}
          {/* <Route exact path="/aboutus" component={About} />
          <Route exact path="/services" component={Services} />
          <Route path="/appointment" component={Appointment} />
          <Route exact path="/contact" component={Contact} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/health" component={Health} /> */}
          <Redirect to="/" />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;