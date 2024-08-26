import Groq from "groq-sdk";
import { Pinecone } from "@pinecone-database/pinecone";

const systemPrompt = `
You are an intelligent assistant designed to help students find the best professors based on their academic needs and preferences. Your task is to provide accurate and relevant recommendations using the Retrieval-Augmented Generation (RAG) model. When a user asks for information about professors, follow these steps:

1. **Understand the Query**: Analyze the user's question to identify the subject area, course, or specific qualities they are looking for in a professor (e.g., teaching style, difficulty, course content).

2. **Retrieve Information**: Use the RAG model to search for relevant data about professors. Gather information on professor ratings, student reviews, and course feedback to build a comprehensive profile of potential candidates.

3. **Rank and Select**: Based on the retrieved information, rank the professors according to their suitability for the user's query. Focus on factors such as high ratings, positive feedback, and alignment with the user’s preferences.

4. **Provide Recommendations**: Present the professor(s) that best match the user's query. Format the response clearly with distinct sections for each professor and their details. For example:
   - **Professor Name (Department)**
     - **Rating:** [Rating Stars]
     - **Summary:** [Brief summary of strengths and notable feedback]

5. **Offer Additional Assistance**: Ask if the user needs further details about the professor(s) or additional help with other queries related to their academic interests.
`;

async function getEmbeddings(texts) {
	const modelId = "sentence-transformers/all-MiniLM-L6-v2"; // Adjust the model ID if needed
	const hfToken = process.env.HUGGINGFACE_API_KEY;

	const apiUrl = `https://api-inference.huggingface.co/pipeline/feature-extraction/${modelId}`;
	const headers = {
		Authorization: `Bearer ${hfToken}`,
		"Content-Type": "application/json",
	};

	const response = await fetch(apiUrl, {
		method: "POST",
		headers: headers,
		body: JSON.stringify({
			inputs: texts,
			options: {
				wait_for_model: true,
			},
		}),
	});

	if (!response.ok) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}

	return await response.json();
}

export async function POST(request) {
	const data = await request.json();
	const pc = new Pinecone({
		apiKey: process.env.PINECONE_API_KEY,
	});
	const index = pc.index("professor-rate").namespace("ns1");

	const groqClient = new Groq({
		apiKey: process.env.GROQ_API_KEY,
	});

	const userQuery = data[data.length - 1].content;

	// Generate embedding using the Universal Sentence Encoder
	let embeddingArray;
	try {
		const embeddings = await getEmbeddings([userQuery]);
		embeddingArray = embeddings[0]; // Get the first embedding
	} catch (error) {
		console.error(
			"Error creating embedding with Universal Sentence Encoder:",
			error
		);
		return new Response(
			"Error creating embedding with Universal Sentence Encoder.",
			{
				status: 500,
			}
		);
	}

	// Query Pinecone with the generated embedding
	const results = await index.query({
		vector: embeddingArray,
		topK: 3,
		includeMetadata: true,
	});

	let resultString = "\n\nReturned results from vector db:";

	results.matches.forEach((match) => {
		resultString += `\n
Professor: ${match.metadata.professorName}
Review: ${match.metadata.review}
Subject: ${match.metadata.subject}
Stars: ${match.metadata.stars}\n`;
	});

	const lastMessage = data[data.length - 1];
	const lastMessageContent = lastMessage.content + resultString;
	const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

	// Generate the final response using the Groq API
	let completion;
	try {
		completion = await groqClient.chat.completions.create({
			messages: [
				{
					role: "system",
					content: systemPrompt,
				},
				...lastDataWithoutLastMessage,
				{
					role: "user",
					content: lastMessageContent,
				},
			],
			model: "llama3-8b-8192",
			stream: true,
		});
	} catch (error) {
		console.error("Error generating completion with Groq:", error);
		return new Response("Error generating completion with Groq.", {
			status: 500,
		});
	}

	// Stream the response back to the client
	const stream = new ReadableStream({
		async start(controller) {
			const encoder = new TextEncoder();
			try {
				for await (const chunk of completion) {
					const content = chunk.choices?.[0]?.delta?.content;
					if (content) {
						const text = encoder.encode(content);
						controller.enqueue(text);
					}
				}
			} catch (error) {
				controller.error(error);
			} finally {
				controller.close();
			}
		},
	});

	return new Response(stream);
}
