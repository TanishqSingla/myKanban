import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function () {
	const user = useContext(AuthContext).state.user;

	return (
		<>
			{user && (
				<header>
					<nav>
						<ul>
							<li></li>
						</ul>
					</nav>
				</header>
			)}
		</>
	);
}
