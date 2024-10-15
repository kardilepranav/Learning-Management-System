import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminSignup from './pages/AdminSignup';
import AdminSignin from './pages/AdminSignin';
import TeacherSignin from './pages/TeacherSignin';
import StudentSignin from './pages/StudentSignin';
import Landing from './pages/Landing';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/admin-signup' element={<AdminSignup />} />
				<Route path='/admin-signin' element={<AdminSignin />} />
				<Route path='/teacher-signin' element={<TeacherSignin />} />
				<Route path='/student-signin' element={<StudentSignin />} />
			</Routes>
		</Router>
	);
}

export default App;
