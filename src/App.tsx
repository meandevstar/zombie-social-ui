import { useEffect } from 'react';

import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import AppRoutes from './Routes';
import Header from './components/Header';

// Hooks
import { useAppDispatch, useAppSelector } from 'hooks';

// Store
import { getSurvivors, getUser } from 'store/session';
import { selectSessionUser } from 'store/session/selectors';

function App() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectSessionUser);

  useEffect(() => {
    dispatch(getSurvivors());
    if (user) {
      dispatch(getUser(user.id));
    }
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div>
      <Header />
      <AppRoutes />
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: '#f6f6f6' } }} />
    </div>
  );
}

export default App;
