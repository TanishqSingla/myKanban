import React from "react";
import "./Modal.css";

interface ModalProps {
	children: React.ReactNode;
	visible: boolean;
	onCancel: (e: React.MouseEvent) => void;
}

export default function Modal(props: ModalProps) {
	return (
		<div
			className="modal"
			style={{ display: props.visible ? "" : "none" }}
			onClick={props.onCancel}
		>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>{props.children}</div>
		</div>
	);
}
