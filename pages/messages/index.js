import { DashboardItem } from "../../components";
import styles from "../../styles/Home.module.css";
import { InputGroup, FormControl, Image, Form, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { TbNotes } from "react-icons/tb";
import { BsJournalMedical } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useMessageContext } from "../../shared/contexts/MessagesContext";

export default function Home() {
	// const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
	const {
		chatrooms,
		fetchMessages,
		selectedChatroom,
		getSpecificChatroom,
		selectedChatroomUser,
	} = useMessageContext();
	const myRef = useRef(null);

	const executeScroll = () =>
		myRef.current?.scrollIntoView({ behavior: "smooth" });

	// Effects
	useEffect(() => {
		fetchMessages();
		executeScroll();
	}, []);
	// End Effects

	return (
		<div className={styles.container}>
			<div className="pageTitle__container">
				<p className="pageTitle">Messages</p>
			</div>
			<div className="vh-100" style={{ display: "flex" }}>
				{/* Start: Left - Chat Collection */}
				<div className="pr-2" style={{ width: "35%", overflow: "auto" }}>
					{/* Chat Instance */}
					{chatrooms?.map((item) => {
						if (item.messages) {
							return (
								<figure
									onClick={() => {
										getSpecificChatroom(item);
										executeScroll();
									}}
									key={item.id}
									className={
										"d-flex p-2 rounded-3 " +
										(selectedChatroomUser === item.secondUser
											? "bg-secondary bg-opacity-25"
											: "")
									}
									style={{
										alignItems: "center",
										cursor: "pointer",
										userSelect: "none",
									}}
								>
									{/* Photo */}
									<Image
										thumbnail={true}
										roundedCircle={true}
										style={{ width: "50px", height: "50px" }}
										src="user.webp"
										alt="user photo"
									/>
									<div className="p-2 text-truncate" style={{ maxWidth: 250 }}>
										{/* Name */}
										<h5 className="text-truncate pe-none">{item.secondUser}</h5>
										{/* Latest Message */}
										{item.lastSender === item.firstUser ? "You: " : ""}
										<p className="text-truncate pe-none">{item.lastMessage}</p>
									</div>
								</figure>
							);
						}
					})}
				</div>
				{/* End: Left - Chat Collection */}

				{/* Start: Right - Chat Conversation */}
				<div
					className="d-flex flex-column justify-content-between border border-2 rounded-3"
					style={{ width: "65%", overflow: "auto" }}
				>
					{/* Header */}
					<section
						className="d-flex p-2 border-bottom border-2"
						style={{ alignItems: "center" }}
					>
						{/* Photo */}
						<Image
							roundedCircle={true}
							style={{ width: "50px", height: "50px" }}
							src="user.webp"
							alt="user photo"
						/>
						<div className="p-2 text-truncate">
							{/* Name */}
							<h5 className="text-truncate pe-none">{selectedChatroomUser}</h5>
						</div>
					</section>

					{/* Messages */}
					<section
						className="flex-grow-1 p-2 border-2 border-secondary"
						style={{ alignItems: "center", overflow: "auto" }}
					>
						{/* Message Instance */}
						{Object.entries(selectedChatroom).map((item) => {
							return (
								<figure
									key={item.id}
									className={
										item[1].sender === selectedChatroomUser
											? "d-flex"
											: "d-flex flex-row-reverse"
									}
									style={{ alignItems: "center" }}
								>
									{/* Photo */}
									<Image
										roundedCircle={true}
										style={{ width: "35px", height: "35px" }}
										src="user.webp"
										alt="user photo"
									/>
									<div
										ref={myRef}
										className="p-3 m-3 bg-secondary bg-opacity-25 rounded-3"
									>
										{/* Message */}
										<p>{item[1].text}</p>
									</div>
								</figure>
							);
						})}
					</section>

					{/* Chatbox Input*/}
					<section>
						<InputGroup className="rounded-3 p-3">
							<Form.Control
								className="border-primary"
								as="textarea"
								aria-label="With textarea"
							/>
							<Button>Send</Button>
						</InputGroup>
					</section>
				</div>
				{/* End: Right - Chat Conversation */}
			</div>
		</div>
	);
}
