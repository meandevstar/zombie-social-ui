import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Container, TextField, Typography } from '@mui/material';

// Hooks
import { useAppDispatch, useAppSelector, useRouteProtect } from 'hooks';

// Components and Styles
import { Button } from 'components/common';
import { AccountInputs, AccountSave } from './Account.styles';

// Utils
import accountSchema, { type AccountSchema } from 'utils/schemas/account';

// Store
import { selectSessionLoading, selectSessionUser } from 'store/session/selectors';
import { updateUser } from 'store/session';

const Account = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectSessionUser);
  const sessionLoading = useAppSelector(selectSessionLoading);

  useRouteProtect();

  const {
    register,
    setValue,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<AccountSchema>({
    resolver: yupResolver(accountSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('lat', user.lastLocation.lat);
      setValue('long', user.lastLocation.long);
    }
  }, [user, setValue]);

  const submit = useCallback((values: AccountSchema) => {
    if (user) {
      dispatch(updateUser({
        id: user.id,
        data: {
          lastLocation: values,
        }
      }));
    }
  }, [user, dispatch]);

  return (
    <Container>
      <Typography variant="h2" align="center" marginTop="30px">Last location</Typography>
      <form onSubmit={handleSubmit(submit)}>
        <AccountInputs>
          <TextField
            label="Lat"
            type="number"
            variant="standard"
            helperText={errors.lat?.message}
            error={!!errors.lat}
            fullWidth
            {...register('lat')}
          />
          <TextField
            label="Lng"
            type="number"
            variant="standard"
            helperText={errors.long?.message}
            error={!!errors.long}
            fullWidth
            {...register('long')}
          />
        </AccountInputs>
        <AccountSave>
          <Button type="submit" variant="contained" loading={sessionLoading}>
            Save
          </Button>
        </AccountSave>
      </form>
    </Container>
  )
}

export default Account;
