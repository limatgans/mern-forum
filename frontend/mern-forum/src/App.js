import "./App.css";
import Main from "./Main.jsx"
import { BrowserRouter } from "react-router-dom";

function App() {
	console.log("App");
	return (
		<BrowserRouter>
			<Main />
		</BrowserRouter>
	);
}

export default App;
