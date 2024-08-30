'use client'
import Navbar from "@/app/components/navbar";
import { SignUp } from "@clerk/nextjs";
import { Box, Container, Typography } from "@mui/material";

export default function SignInPage() {
    return (
        <Box
        sx={{
            minHeight: "100vh",
            background: "linear-gradient(to bottom right, #4A90E2, #9013FE)",
            display: "flex",
            flexDirection: "column",
            color: "white",
          }}
        >
            <Navbar/>
            <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            >
                <Typography variant='h4' gutterBottom>Sign Up</Typography>
                <SignUp/>
            </Box>
        </Box>
    )
}