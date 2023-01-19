import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import AppRoutes from './Routes';

function App() {
  return (
    <div>
      <AppRoutes />
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: '#f6f6f6' } }} />
    </div>
  );
}

export default App;
