import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Reports from 'pages/Reports';
import Survivors from 'pages/Survivors';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/survivors" element={<Survivors />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/" element={<Navigate to="/survivors" replace />} />
    </Routes>
  )
}

export default AppRoutes;
