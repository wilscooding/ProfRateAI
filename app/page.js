
"use client";

import { Box, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";

export default function Home() {
	const [messages, setMessages] = useState([
		{
			role: "assistant",
			content: "Hello, how can I help you?",
		},
	]);

	const [message, setMessage] = useState("");

	const sendMessage = async () => {
		if (message.trim() === "") return; // Avoid sending empty messages

		// Add user message to chat
		setMessages((prevMessages) => [
			...prevMessages,
			{ role: "user", content: message },
		]);

		setMessage("");
		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([
					...messages,
					{ role: "user", content: message },
				]),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder();

			let result = "";
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				const text = decoder.decode(value || new Uint8Array(), {
					stream: true,
				});
				result += text;
			}

			// Add assistant's response to chat
			setMessages((prevMessages) => [
				...prevMessages,
				{ role: "assistant", content: result },
			]);
		} catch (error) {
			console.error("Error sending message:", error);
			// Handle errors as appropriate
		}
	};

	return (
		<Box
			width={"100%"}
			height={"100vh"}
			display={"flex"}
			flexDirection={"column"}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<Stack
				direction="column"
				width="500px"
				height="700px"
				border="1px solid black"
				p={2}
				spacing={3}
			>
				<Stack
					direction={"column"}
					spacing={2}
					flexGrow={1}
					overflow={"auto"}
					maxHeight={"100%"}
				>
					{messages.map((msg, index) => (
						<Box
							key={index}
							display={"flex"}
							justifyContent={
								msg.role === "assistant" ? "flex-start" : "flex-end"
							}
						>
							<Box
								bgcolor={
									msg.role === "assistant" ? "primary.main" : "secondary.main"
								}
								color={"white"}
								borderRadius={16}
								p={2}
								maxWidth={"80%"}
							>
								{msg.content}
							</Box>
						</Box>
					))}
				</Stack>
				<Stack direction={"row"} spacing={2} mt={2}>
					<TextField
						label={"Message"}
						fullWidth
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<Button variant="contained" onClick={sendMessage}>
						Send
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
}
