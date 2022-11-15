import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function () {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

	const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

	};

	return (
		<div className="auth-form-container">
			<form onSubmit={submitHandler} className="auth-form">
				<h1>My Kanban</h1>
				<input
					type="Enter Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter name"
					required
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
