import Login from "./pages/Login.jsx";
import {Switch,Route} from 'react-router-dom';


export default function Main () {
	return (
		<Switch>
			<Route exact path="/" component={Login} />
		</Switch>
	)
}