import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Account from 'pages/Account';
import Reports from 'pages/Reports';
import Survivors from 'pages/Survivors';
import Register from 'pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/survivors" element={<Survivors />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account" element={<Account />} />
      <Route path="/" element={<Navigate to="/survivors" replace />} />
    </Routes>
  )
}

export default AppRoutes;
