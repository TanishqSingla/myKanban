import { useLayoutEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom"

export default function Board() {
  const params = useParams();
  const navigate = useNavigate();

  const [boardDetails, setBoardDetails] = useState<any>({});

  useLayoutEffect(() => {
    fetch("/api/action/getBoards", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: params.id}),
    }).then(async (res) => {
      const data = await res.json();
      setBoardDetails(data.board);
    }).catch(() => {
      navigate("/");
    })
  }, []);

  return <main>
    <div className="lists">
      <h1>{boardDetails.name}</h1>
      {boardDetails?.lists && null}
      <div className="createList">
        <AiOutlinePlus />
      </div>
    </div> 
  </main>
}