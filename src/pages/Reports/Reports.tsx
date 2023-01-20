import { useMemo } from 'react';

import { Grid, Typography } from '@mui/material';

// Components and Styles
import { ReportsContainer, ReportsData } from './Reports.styles';
import ReportsResources from './ReportsResources';
import ReportsSurvivors from './ReportsSurvivors';

// Hooks
import useRouteProtect from 'hooks/useRouteProtect';
import { useAppSelector } from 'hooks';

// Store
import { selectSurvivors } from 'store/survivors/selectors';
import { ItemType } from 'definitions/enums';

const Reports = () => {
  const survivors = useAppSelector(selectSurvivors);

  const infectedSurvivors = useMemo(() => {
    return survivors.filter((survivor) => survivor.flaggedUsers.length >= 3);
  }, [survivors]);

  const otherSurvivors = useMemo(() => {
    return survivors.filter((survivor) => survivor.flaggedUsers.length < 3);
  }, [survivors]);

  const averageResources = useMemo(() => {
    let water = 0;
    let food = 0;
    let med = 0;
    let ammo = 0;

    for (let i = 0; i < otherSurvivors.length; i++) {
      const survivor = otherSurvivors[i];
      water += +survivor.inventory.WATER;
      food += +survivor.inventory.FOOD;
      med += +survivor.inventory.MED;
      ammo += +survivor.inventory.AMMO;
    }

    return {
      [ItemType.Water]: water / otherSurvivors.length,
      [ItemType.Food]: food / otherSurvivors.length,
      [ItemType.Medication]: med / otherSurvivors.length,
      [ItemType.Ammunition]: ammo / otherSurvivors.length,
    }
  }, [otherSurvivors]);

  const infectedResources = useMemo(() => {
    let water = 0;
    let food = 0;
    let med = 0;
    let ammo = 0;

    for (let i = 0; i < infectedSurvivors.length; i++) {
      const survivor = infectedSurvivors[i];
      water += +survivor.inventory.WATER;
      food += +survivor.inventory.FOOD;
      med += +survivor.inventory.MED;
      ammo += +survivor.inventory.AMMO;
    }

    return {
      [ItemType.Water]: water,
      [ItemType.Food]: food,
      [ItemType.Medication]: med,
      [ItemType.Ammunition]: ammo,
    }
  }, [infectedSurvivors]);

  useRouteProtect();

  return (
    <ReportsContainer>
      <Typography variant="h2" align="center">Reports</Typography>
      <ReportsData>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ReportsSurvivors
              infectedSurvivors={infectedSurvivors}
              otherSurvivors={otherSurvivors}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ReportsResources
              resources={averageResources}
              infectedResources={infectedResources}
            />
          </Grid>
        </Grid>
      </ReportsData>
    </ReportsContainer>
  );
}

export default Reports;
