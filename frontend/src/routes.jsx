import React from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./pages/Signup";
import Login from "./pages/Login"

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/" component={Login} />
			<Route exact path="/signup" component={SignUp} />
		</Switch>
	);
}
