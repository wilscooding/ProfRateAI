"use client";

import { Box, Typography, Button, Container, AppBar, Toolbar, IconButton } from "@mui/material";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="/imgs/logo.png" 
              alt="ProfessorPal Logo"
              width={40}
              height={40}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                ml: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              ProfessorPal
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" href="/about">About</Button>
            <Button color="inherit" variant="outlined" href="/login">Login</Button>
            <Button color="inherit" variant="contained" href="/signup">Sign Up</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default function LandingPage() {
  const router = useRouter();

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
      <Navbar />
      <Container 
        maxWidth="md" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: "center",
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 'bold' }}>
          Welcome to ProfessorPal
        </Typography>
        <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: 4 }}>
          Your AI-powered guide to finding the perfect professor
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, mb: 4 }}>
          ProfessorPal uses advanced AI to help you find the ideal professor based on your preferences. 
          Whether you're looking for engaging lectures, manageable workloads, or specific teaching styles, 
          we've got you covered.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, fontWeight: 'bold' }}>
            Key Features:
          </Typography>
          <ul style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <li>Personalized professor recommendations</li>
            <li>Insights based on real student reviews</li>
            <li>Easy-to-use chat interface</li>
            <li>Helps you make informed decisions about your courses</li>
          </ul>
        </Box>
        <Button 
          variant="contained" 
          size="large"
          onClick={() => router.push('/chat')}
          sx={{ 
            fontSize: '1.2rem', 
            padding: '12px 24px', 
            backgroundColor: '#FFD700', 
            color: '#000',
            '&:hover': {
              backgroundColor: '#FFC500',
            }
          }}
        >
          Start Chatting Now
        </Button>
      </Container>
    </Box>
  );
}