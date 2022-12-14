import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaColumns, FaSignOutAlt } from "react-icons/fa";
import "./header.css";
import { Link } from "react-router-dom";

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
								<Link to="/">
									<FaColumns color="white" />
									Boards
								</Link>
							</li>
						</ul>
					</nav>
					<div className="user">
						<span>{user.email}</span>
						<button onClick={handleLogout}>
							<FaSignOutAlt color="white" />
							Sign Out
						</button>
					</div>
				</header>
			)}
		</>
	);
}
