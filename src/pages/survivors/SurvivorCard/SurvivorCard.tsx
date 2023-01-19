import type { User } from 'definitions/interfaces';
import { useCallback, useMemo } from 'react';

import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

// Components and Styles
import {
  SurvivorCardActions,
  SurvivorCardLocation,
  SurvivorCardLocationText,
  SurvivorCardInfected,
} from './SurvivorCard.styles';
import SurvivorCardInventory from './SurvivorCardInventory';

// Hooks
import { useAppDispatch, useAppSelector } from 'hooks';

// Store
import { setTradeUser } from 'store/trade';
import { selectSessionUser } from 'store/session/selectors';
import { reportAsInfected } from 'store/session';

const SurvivorCard = (user: User) => {
  const dispatch = useAppDispatch();

  const sessionUser = useAppSelector(selectSessionUser);

  const { name, age, gender, flaggedUsers, lastLocation, inventory } = user;

  const infected = useMemo(() => {
    return flaggedUsers.length >= 3;
  }, [flaggedUsers]);

  const alreadyReported = useMemo(() => {
    return flaggedUsers.find((user) => user._id === sessionUser?.id);
  }, [flaggedUsers, sessionUser]);

  const trade = useCallback(() => {
    dispatch(setTradeUser(user));
  }, [user, dispatch]);

  const report = useCallback(() => {
    if (sessionUser) {
      dispatch(reportAsInfected({
        user: user.id,
        reporter: sessionUser?.id,
      }));
    }
  }, [user, sessionUser, dispatch]);

  return (
    <Card >
      <CardContent>
        <Typography variant="body1">{name}</Typography>
        <Typography variant="body2">{age} years old</Typography>
        <Typography variant="body2" textTransform="capitalize">{gender.toLocaleLowerCase()}</Typography>
        <SurvivorCardInfected>
          <div>Infected:</div>
          <Checkbox checked={infected} />
        </SurvivorCardInfected>
        <SurvivorCardLocation>
          <Typography variant="h6">Last location:</Typography>
          <SurvivorCardLocationText>
            <Typography variant="body2">Lat: {lastLocation.lat}</Typography>
          </SurvivorCardLocationText>
          <SurvivorCardLocationText>
            <Typography variant="body2">Lng: {lastLocation.long}</Typography>
          </SurvivorCardLocationText>
        </SurvivorCardLocation>
        <SurvivorCardInventory
          water={inventory.WATER}
          food={inventory.FOOD}
          med={inventory.MED}
          ammo={inventory.AMMO}
        />
        <SurvivorCardActions>
          <Button variant="contained" disabled={sessionUser?.id === user.id} onClick={trade}>
            Trade
          </Button>
          <Button
            variant="contained"
            disabled={infected || sessionUser?.id === user.id || alreadyReported}
            onClick={report}
          >
            Report as infected
          </Button>
        </SurvivorCardActions>
      </CardContent>
    </Card >
  );
}

export default SurvivorCard;
