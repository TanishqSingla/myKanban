import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function () {
	const [name, setName] = useState("");
	const navigate = useNavigate();

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();

		fetch("/api/action/createBoard", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name }),
		}).then(() => {
      navigate("/");
    });
	};

	return (
		<div className="auth-form-container">
			<form onSubmit={submitHandler} className="auth-form">
				<h1>My Kanban</h1>
				<input
					type="Enter Title"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Enter name"
					required
				/>
				<button type="submit">Submit</button>
				<span>
					<Link to="/">Go back</Link>
				</span>
			</form>
		</div>
	);
}
