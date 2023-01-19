import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useAppSelector } from 'hooks/store';

// Store
import { selectSessionUser } from 'store/session/selectors';

const defaultNotLoggedInRoute = '/register';

const useRouteProtect = () => {
  const navigate = useNavigate();

  const user = useAppSelector(selectSessionUser);

  useEffect(() => {
    if (!user) {
      navigate(defaultNotLoggedInRoute);
    }
  }, [user, navigate]);
};

export default useRouteProtect;
