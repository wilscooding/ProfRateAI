import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
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

  export default Navbar;