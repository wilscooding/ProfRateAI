"use client";

import { Box, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/navbar.js';

const MarkdownRenderer = ({ children }) => (
  <ReactMarkdown
    components={{
      p: ({ children }) => <p style={{ marginBottom: '10px' }}>{children}</p>,
      h1: ({ children }) => <h1 style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '10px' }}>{children}</h1>,
      h2: ({ children }) => <h2 style={{ fontSize: '1.3em', fontWeight: 'bold', marginBottom: '8px' }}>{children}</h2>,
      strong: ({ children }) => <strong style={{ fontWeight: 'bold' }}>{children}</strong>,
      ul: ({ children }) => <ul style={{ paddingLeft: '20px', marginBottom: '10px' }}>{children}</ul>,
      li: ({ children }) => <li style={{ marginBottom: '5px' }}>{children}</li>,
    }}
  >
    {children}
  </ReactMarkdown>
);

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
        background: "linear-gradient(to bottom, #4A90E2, #9013FE)",
        padding: "20px",
      }}
    >
     <Navbar/>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      ></Box>
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
                  backgroundColor: msg.role === "assistant" ? "#E5E5EA" : "#007AFF",
                  color: msg.role === "assistant" ? "#000000" : "#FFFFFF",
                  p: 2,
                  maxWidth: "80%",
                  fontFamily: "Arial, sans-serif",
                  borderRadius: "20px",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                  position: "relative",
                }}
              >
                {msg.role === "assistant" ? (
                  <MarkdownRenderer>{msg.content}</MarkdownRenderer>
                ) : (
                  msg.content
                )}
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
}
