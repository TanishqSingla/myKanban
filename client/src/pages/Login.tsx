import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function () {
	const { dispatch } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		const response = await fetch("/api/user/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		const data = await response.json();

		if (data._id) {
			dispatch({ type: "LOGIN", payload: data._id });
		}
	};

	return (
		<div className="auth-form-container">
			<form onSubmit={submitHandler} className="auth-form">
				<h1>My Kanban</h1>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Login</button>
				<span>not registered yet? <Link to="/signup">Sign Up</Link></span>
			</form>
		</div>
	);
}
