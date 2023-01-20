import { useEffect } from 'react';

import { CircularProgress, Grid, Typography } from '@mui/material';

// Components and Styles
import { ReportsContainer, ReportsData, ReportsLoading } from './Reports.styles';
import ReportsResources from './ReportsResources';
import ReportsSurvivors from './ReportsSurvivors';

// Hooks
import { useAppDispatch, useAppSelector, useRouteProtect } from 'hooks';

// Store
import { getStatistics } from 'store/reports';
import { selectReportsLoading, selectReportsStatistics } from 'store/reports/selectors';

const Reports = () => {
  const dispatch = useAppDispatch();

  const statistics = useAppSelector(selectReportsStatistics);
  const reportsLoading = useAppSelector(selectReportsLoading);

  useRouteProtect();

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);

  return (
    <ReportsContainer>
      <Typography variant="h2" align="center">Reports</Typography>
      {!reportsLoading && (
        <ReportsData>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ReportsSurvivors
                infectedSurvivors={statistics.infected}
                otherSurvivors={statistics.normal}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ReportsResources
                resources={statistics.resourceAverage}
                infectedResources={statistics.lostPoints}
              />
            </Grid>
          </Grid>
        </ReportsData>
      )}
      {reportsLoading && (
        <ReportsLoading>
          <CircularProgress size={80} />
        </ReportsLoading>
      )}
    </ReportsContainer>
  );
}

export default Reports;
