import { useLayoutEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/UI/Modal";

export default function Board() {
	const params = useParams();
	const navigate = useNavigate();

	const [boardDetails, setBoardDetails] = useState<any>({});
	const [visible, setVisible] = useState(false);
	const [cardModalVisible, setCardModalVisible] = useState(false);
	const [listName, setListName] = useState("");
	const [cardName, setCardName] = useState("");
	const [currentList, setCurrentList] = useState();

	useLayoutEffect(() => {
		updateBoard();
	}, []);

	const updateBoard = () => {
		fetch("/api/action/getBoards", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: params.id }),
		})
			.then(async (res) => {
				const data = await res.json();
				setBoardDetails(data.board);
			})
			.catch(() => {
				navigate("/");
			});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		fetch("/api/action/createList", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ boardId: params.id, listName }),
		}).then(async (res) => {
			updateBoard();
			setListName("");
			setVisible(false);
		});
	};

	const addCard = (e: React.FormEvent) => {
		e.preventDefault();

		fetch("/api/action/createCard", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				boardId: params.id,
				listId: currentList,
				content: cardName,
			}),
		}).then(async (res) => {
			updateBoard();
			setCardName("");
			setCardModalVisible(false);
		});
	};

	const handleRemoveCard = (list: any, card: any) => {
		fetch("/api/action/removeCard", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				boardId: params.id,
				listId: list._id,
				cardId: card._id,
			}),
		}).then(() => {
			updateBoard();
		});
	};

	const handleRemoveList = (list: any) => {
		fetch("/api/action/removeList", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				boardId: params.id,
				listId: list._id
			})
		}).then(() => {
			updateBoard();
		});
	}

	return (
		<main>
			<h1>{boardDetails.name}</h1>

			<div className="lists">
				{boardDetails?.lists &&
					boardDetails.lists.map((list: any) => (
						<div key={list._id} className="listContainer">
							<div className="listHeader">
								<h4>{list.name}</h4>
								<div onClick={() => handleRemoveList(list)} className="delete-list">
									<FaTrash />
								</div>
							</div>
							<div className="list-cards">
								{list.cards.map((card: any) => {
									return (
										<div key={card._id} className="list-card">
											<div className="list-card-content">{card.content}</div>
											<div
												className="delete-card"
												onClick={() => handleRemoveCard(list, card)}
											>
												<FaTrash />
											</div>
										</div>
									);
								})}
								<div
									className="create-list-card"
									onClick={() => {
										setCardModalVisible(true);
										setCurrentList(list._id);
									}}
								>
									<AiOutlinePlus />
								</div>
							</div>
						</div>
					))}
				<div className="createList" onClick={() => setVisible(true)}>
					<AiOutlinePlus />
				</div>
			</div>
			<Modal onCancel={() => setVisible(false)} visible={visible}>
				<div className="createListForm">
					<input
						value={listName}
						onChange={(e) => setListName(e.target.value)}
						placeholder="Enter name"
					/>
					<button onClick={handleSubmit}>Submit</button>
					<button
						onClick={() => {
							setListName("");
							setVisible(false);
						}}
					>
						Cancel
					</button>
				</div>
			</Modal>
			<Modal
				onCancel={() => setCardModalVisible(false)}
				visible={cardModalVisible}
			>
				<div className="createListForm">
					<input
						value={cardName}
						onChange={(e) => setCardName(e.target.value)}
						placeholder="Enter content"
					/>
					<button onClick={addCard}>Submit</button>
					<button
						onClick={() => {
							setListName("");
							setCardModalVisible(false);
						}}
					>
						Cancel
					</button>
				</div>
			</Modal>
		</main>
	);
}
