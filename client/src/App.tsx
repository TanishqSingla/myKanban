import Layout from "./Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateBoard from "./pages/CreateBoard";

export default function () {
	const authContext = useContext(AuthContext);

	useEffect(() => {
		fetch("/api/user/authenticated").then(async (data) => {
			const user = await data.json();
			if (user.isAuthenticated) {
				authContext?.dispatch({ type: "LOGIN", payload: { _id: user._id, email: user.email } });
			} else {
				authContext?.dispatch({ type: "LOGOUT", payload: null });
			}
		});
	}, []);

	return (
		<Layout>
			<Routes>
				<Route
					path="/"
					element={
						authContext?.state?.user ? <Home /> : <Navigate to="/login" />
					}
				/>
				<Route path="/createBoard" element={<CreateBoard />}></Route>
				<Route
					path="/signup"
					element={!authContext.state.user ? <Signup /> : <Navigate to="/" />}
				/>
				<Route
					path="/login"
					element={!authContext?.state?.user ? <Login /> : <Navigate to="/" />}
				/>
			</Routes>
		</Layout>
	);
}
