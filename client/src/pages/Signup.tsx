import React, { useContext, useState } from "react";
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
		<div>
			<form onSubmit={submitHandler}>
				<input
					type="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Sign up</button>
			</form>
		</div>
	);
}
