import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

// Components and Styles
import { Button } from 'components/common';

// Hooks
import { useAppSelector } from 'hooks';

// Store
import { selectSessionUser } from 'store/session/selectors';

const Header = () => {
  const user = useAppSelector(selectSessionUser);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button to="/survivors">
              Survivors
            </Button>
            <Button to="/reports">
              Reports
            </Button>
          </Box>
          {!user && <Button to="/register">Register</Button>}
          {user && <Button to="/account">{user.name}</Button>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
