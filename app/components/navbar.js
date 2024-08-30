import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import Image from 'next/image';

const Navbar = () => {
    const {user} = useUser()

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
            <SignedOut>
              <Button color="inherit">About</Button>
              <Button color="inherit" variant="outlined" href="/sign-in">Login</Button>
              <Button color="inherit" variant="contained" href="/sign-up">Sign Up</Button>
            </SignedOut>
            <SignedIn>
            <Button color="inherit">{user ? user.firstName : null}</Button>
              <UserButton />
            </SignedIn>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  };

  export default Navbar;