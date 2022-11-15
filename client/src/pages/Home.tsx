import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function () {
	const { state } = useContext(AuthContext);

	const [boards, setBoards] = useState<any>([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (!state.user) {
			return;
		}
		fetch("/api/user/getUser", {
			method: "POST",
			headers: {'Content-Type': "application/json"},
			body: JSON.stringify({email: state.user.email})
		}).then(async (res) => {
			const data = await res.json();
			setBoards(data.boards);
		})
	}, []);

	return (
		<main>
			<h1>Boards</h1>
			<div className="boards">
				{boards && boards.map((board: any, index: any) => <div key={board._id} className="card" onClick={() => navigate(`/boards/${board._id}`)}>{board.name}</div>)}
				<div className="card createBoardCard" onClick={() => navigate("/createBoard")}>
					<AiOutlinePlus />
				</div>
			</div>
		</main>
	);
}
