import { useEffect, useState } from "react";
import Layout from "./Layout";

export default function () {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitForm = async (e: any) => {
		e.preventDefault();
		fetch("/api/user/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, password }),
		}).then((data) => console.log(data.json().then(data => console.log(data))));
	};

	return (
		<Layout>
			<form onSubmit={submitForm}>
				<input value={name} onChange={(e) => setName(e.target.value)} />
				<input value={email} onChange={(e) => setEmail(e.target.value)} />
				<input value={password} onChange={(e) => setPassword(e.target.value)} />
				<button type="submit">click</button>
			</form>
		</Layout>
	);
}
