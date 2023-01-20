import { type ChangeEvent, useCallback, useEffect } from 'react';

import { CircularProgress, Grid, Pagination } from '@mui/material';

// Components and Styles
import { SurvivorsContainer, SurvivorsLoading, SurvivorsPagination } from './Survivors.styles';
import SurvivorCard from './SurvivorCard';

// Hooks
import useRouteProtect from 'hooks/useRouteProtect';
import { useAppDispatch, useAppSelector } from 'hooks';

// Store
import { getSurvivors, setPage } from 'store/survivors';
import {
  selectSurvivors,
  selectSurvivorsItemsPerPage,
  selectSurvivorsLoading,
  selectSurvivorsPage,
  selectSurvivorsTotal,
} from 'store/survivors/selectors';
import TradeModal from './TradeModal';

const Survivors = () => {
  const dispatch = useAppDispatch();

  const survivors = useAppSelector(selectSurvivors);
  const page = useAppSelector(selectSurvivorsPage);
  const itemsPerPage = useAppSelector(selectSurvivorsItemsPerPage);
  const total = useAppSelector(selectSurvivorsTotal);
  const loading = useAppSelector(selectSurvivorsLoading);

  useRouteProtect();

  const onPaginationChange = useCallback((_: ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSurvivors());
  }, [dispatch, page]);

  return (
    <SurvivorsContainer>
      {loading && (
        <SurvivorsLoading>
          <CircularProgress size={80} />
        </SurvivorsLoading>
      )}
      {!loading && (
        <>
          <Grid container spacing={3}>
            {survivors.map((survivor) => (
              <Grid key={survivor._id} item xs={12} md={4} lg={3}>
                <SurvivorCard {...survivor} />
              </Grid>
            ))}
          </Grid>
          <SurvivorsPagination>
            <Pagination
              count={Math.ceil(total / itemsPerPage)}
              page={page}
              color="primary"
              onChange={onPaginationChange}
            />
          </SurvivorsPagination>
        </>
      )}
      <TradeModal />
    </SurvivorsContainer>
  );
}

export default Survivors;
