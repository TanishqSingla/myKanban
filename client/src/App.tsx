import Layout from "./Layout";

export default function () {
	const submitForm = (e: any) => {
		e.preventDefault();
    fetch("http://localhost:4000/user/signup", {method: 'POST'})
	};

	return (
		<Layout>
			<form onSubmit={submitForm}>
				<input type="email" />
				<input />
				<button type="submit">click</button>
			</form>
		</Layout>
	);
}
