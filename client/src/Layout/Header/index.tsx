import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaColumns, FaSignOutAlt } from "react-icons/fa";
import "./header.css";

export default function () {
	const { state, dispatch } = useContext(AuthContext);
	const { user } = state;

	const handleLogout = () => {
		fetch("/api/user/logout")
			.then(() => {
				dispatch({ type: "LOGOUT", payload: null });
			})
			.catch((e) => console.log(e));
	};

	return (
		<>
			{user && (
				<header>
					<nav>
						<ul>
							<li>
								<FaColumns color="white" />
								Boards
							</li>
						</ul>
					</nav>
					<button onClick={handleLogout}>
						<FaSignOutAlt color="white" />
						Sign Out
					</button>
				</header>
			)}
		</>
	);
}
