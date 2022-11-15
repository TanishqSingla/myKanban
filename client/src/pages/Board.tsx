import { useLayoutEffect } from "react";
import { useParams } from "react-router-dom"

export default function() {
  const params = useParams();

  useLayoutEffect(() => {
    fetch("/api/action/getBoards", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: params.id}),
    })
  }, []);

  return <></>
}