import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function () {
	const { state, dispatch } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		const response = await fetch("/api/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		const data = await response.json();

		if (data._id) {
			dispatch({ type: "LOGIN", payload: data._id });
		}
	};

	return (
		<div>
			<form onSubmit={submitHandler}>
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
				<button type="submit">Login</button>
			</form>
		</div>
	);
}
