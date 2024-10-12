/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminSignup from "./Components/AdminSignup";
import AdminSignin from "./Components/AdminSignin";

function App() {
  return (
		<Router>
			<Routes>
				<Route path="/signup" element={<AdminSignup/>} />
				<Route path="/signin" element={<AdminSignin/>} />
			</Routes>
		</Router>
	);
}

export default App