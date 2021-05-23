import Login from "./pages/Login.jsx";
import {Switch,Route} from 'react-router-dom';
import SignUp from "./pages/Signup.jsx";


export default function Main () {
	return (
		<Switch>
			<Route exact path="/" component={Login} />
			<Route exact path="/signup" component={SignUp} />
		</Switch>
	)
}