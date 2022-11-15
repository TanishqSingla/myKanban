import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function () {
	const { state } = useContext(AuthContext);

	const [boards, setBoards] = useState([]);

	useEffect(() => {
		if (!state.user) {
			return;
		}
	}, []);

	return <main>
		<h1>Boards</h1>	
  </main>;
}
