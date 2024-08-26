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
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(to bottom, #4A90E2, #9013FE)", // Gradient background
        padding: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          flexGrow: 1,
          overflowY: "auto",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <Stack spacing={2}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              display={"flex"}
              justifyContent={msg.role === "assistant" ? "flex-start" : "flex-end"}
            >
              <Box
                sx={{
                  color: msg.role === "assistant" ? "#ffffff" : "#000000", // White for assistant, black for user
                  p: 2,
                  maxWidth: "95%",
                  fontFamily: "Arial, sans-serif",
                  textAlign: msg.role === "assistant" ? "left" : "right", // Align text based on role
                }}
              >
                {msg.content}
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #ddd",
          padding: "10px 0",
        }}
      >
        <TextField
          label={"Message"}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          sx={{
            borderRadius: "8px",
            backgroundColor: "white",
            marginRight: "10px",
          }}
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          sx={{
            minWidth: "80px",
            borderRadius: "8px",
            backgroundColor: "primary.main",
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};
