import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import AppRoutes from './Routes';
import Header from './components/Header';

function App() {
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
