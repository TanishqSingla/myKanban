import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect } from "react";

export default function () {
	const authContext = useContext(AuthContext);

	useEffect(() => {
		fetch("/api/user/authenticated").then(async (data) => {
			const json = await data.json();
			if (json.isAuthenticated) {
				authContext?.dispatch({ type: "LOGIN", payload: { _id: json._id } });
			} else {
				authContext?.dispatch({ type: "LOGOUT", payload: null});
			}
		});
	}, []);

	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</Layout>
	);
}
