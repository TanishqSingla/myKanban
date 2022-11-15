import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function () {
	const { dispatch } = useContext(AuthContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		const response = await fetch("/api/user/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		});

		const data = await response.json();

		if (data._id) {
			dispatch({ type: "LOGIN", payload: { _id: data.id, email: data.email } });
		}
	};

	return (
		<div className="auth-form-container">
			<form onSubmit={submitHandler} className="auth-form">
				<h1>My Kanban</h1>
				<input
					type="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Enter name"
					required
				/>
				<input
					type="email"
					value={email}
					placeholder="Enter Email"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					value={password}
					placeholder="Enter password"
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Sign up</button>
				<span>already registered? <Link to="/login">Login</Link></span>
			</form>
		</div>
	);
}
