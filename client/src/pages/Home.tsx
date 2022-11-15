import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function () {
	const { state } = useContext(AuthContext);

	const [boards, setBoards] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (!state.user) {
			return;
		}
	}, []);

	return (
		<main>
			<h1>Boards</h1>
			<div className="boards">
				{boards && boards.map(board => <div className="card"></div>)}
				<div className="card createBoardCard" onClick={() => navigate("/createBoard")}>
					<AiOutlinePlus />
				</div>
			</div>
		</main>
	);
}
