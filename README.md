<<<<<<< HEAD
# ProfRateAI
=======
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
=======
# ProfRateAI
>>>>>>> Stashed changes

## Overview

ProfRateAI is an innovative Next.js application designed to help students find the ideal professor based on their preferences . By leveraging Pinecone for Retrieval-Augmented Generation (RAG), this tool provides fast and accurate information about professors from a review database . Whether you're looking for engaging lectures, manageable workloads, or specific teaching styles, ProfRateAI aims to enhance the course selection process for students.

## Features

- **AI-Powered Recommendations**: Utilizes advanced AI to provide personalized professor recommendations .
- **RAG Model Integration**: Implements Retrieval-Augmented Generation for quick and relevant information retrieval .
- **User-Friendly Chat Interface**: Offers an intuitive chat-based interaction for easy querying .
- **Comprehensive Professor Profiles**: Provides detailed insights based on real student reviews .
- **Multi-Criteria Search**: Allows students to find professors based on various factors such as teaching style, course difficulty, and subject area .

## Tech Stack

- **Frontend**: React.js with Next.js framework
- **Backend**: Node.js
- **AI/ML**: Pinecone for vector database, Hugging Face for embeddings
- **APIs**: Groq for natural language processing with llama 3-8b
- **Styling**: Material-UI (MUI) for responsive design
- **Data Storage**: JSON for review data

## Installation

To set up ProfRateAI locally, follow these steps:

1. Clone the repository:

git clone https://github.com/wilscooding/ProfRateAI.git

2. Navigate to the project directory:

cd ProfRateAI

3. Install dependencies:

npm install

4. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

PINECONE_API_KEY=your_pinecone_api_key
GROQ_API_KEY=your_groq_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key

5. Run the development server:

npm run dev

## Usage

After starting the development server, open your browser and navigate to `http://localhost:3000`. You'll be greeted with the ProfRateAI landing page. From there, you can:

1. Start a chat session to query about professors.
2. Input your preferences and requirements for course instructors.
3. Receive AI-generated recommendations based on the available professor reviews.

## Contributing

Contributions to ProfRateAI are welcome! To contribute:

<<<<<<< Updated upstream
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
