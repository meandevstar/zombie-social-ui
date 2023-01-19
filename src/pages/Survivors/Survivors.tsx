import { useEffect } from 'react';

import { CircularProgress, Grid } from '@mui/material';

// Components and Styles
import { SurvivorsContainer, SurvivorsLoading } from './Survivors.styles';
import SurvivorCard from './SurvivorCard';

// Hooks
import useRouteProtect from 'hooks/useRouteProtect';
import { useAppDispatch, useAppSelector } from 'hooks';

// Store
import { getSurvivors } from 'store/session';
import {
  selectSessionLoading,
  selectSessionSurvivors,
} from 'store/session/selectors';
import TradeModal from './TradeModal';

const Survivors = () => {
  const dispatch = useAppDispatch();

  const survivors = useAppSelector(selectSessionSurvivors);
  const sessionLoading = useAppSelector(selectSessionLoading);

  useRouteProtect();

  useEffect(() => {
    dispatch(getSurvivors());
  }, [dispatch]);

  return (
    <SurvivorsContainer>
      {sessionLoading && (
        <SurvivorsLoading>
          <CircularProgress size={80} />
        </SurvivorsLoading>
      )}
      {!sessionLoading && (
        <Grid container spacing={3}>
          {survivors.map((survivor) => (
            <Grid key={survivor.id} item xs={12} md={4} lg={3}>
              <SurvivorCard {...survivor} />
            </Grid>
          ))}
        </Grid>
      )}
      <TradeModal />
    </SurvivorsContainer>
  );
}

export default Survivors;
