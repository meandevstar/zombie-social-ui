import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// Constants and Enums
import { Gender, ItemType } from 'definitions/enums';

// Components and Styles
import {
  RegisterContainer,
  RegisterGender,
  RegisterInventory,
  RegisterSubmit,
} from './Register.styles';
import { Button } from 'components/common';

// Store
import { register as registerAction } from 'store/session';
import { selectSessionUser } from 'store/session/selectors';

// Utils
import registerSchema, { RegisterSchema } from 'utils/schemas/register';

// Hooks
import { useAppDispatch, useAppSelector } from 'hooks';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectSessionUser);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
    defaultValues: {
      water: 0,
      food: 0,
      medication: 0,
      ammunition: 0,
    },
    resolver: yupResolver(registerSchema),
  });

  const submit = useCallback((values: RegisterSchema) => {
    dispatch(registerAction({
      name: values.name,
      age: values.age,
      gender: values.gender,
      lastLocation: {
        lat: values.lat,
        long: values.long,
      },
      inventory: {
        [ItemType.Water]: values.water,
        [ItemType.Food]: values.food,
        [ItemType.Medication]: values.medication,
        [ItemType.Ammunition]: values.ammunition,
      }
    }));
  }, [dispatch]);

  useEffect(() => {
    if (user?._id) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <RegisterContainer>
      <Typography variant="h3" align="center">Register</Typography>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Name"
              variant="standard"
              helperText={errors.name?.message || ''}
              error={!!errors.name}
              fullWidth
              {...register('name')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Age"
              type="number"
              variant="standard"
              helperText={errors.age?.message || ''}
              error={!!errors.age}
              fullWidth
              {...register('age')}
            />
          </Grid>
        </Grid>
        <RegisterGender>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup defaultValue={Gender.Female} {...register('gender')}>
              <FormControlLabel value={Gender.Female} control={<Radio />} label="Female" />
              <FormControlLabel value={Gender.Male} control={<Radio />} label="Male" />
              <FormControlLabel value={Gender.Other} control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </RegisterGender>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Lat"
              type="number"
              variant="standard"
              helperText={errors.lat?.message || ''}
              error={!!errors.lat}
              fullWidth
              {...register('lat')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Lng"
              type="number"
              variant="standard"
              helperText={errors.long?.message || ''}
              error={!!errors.long}
              fullWidth
              {...register('long')}
            />
          </Grid>
        </Grid>
        <RegisterInventory>
          <Typography variant="h6">
            Inventory
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Water"
                type="number"
                variant="standard"
                helperText={errors.water?.message || ''}
                error={!!errors.water}
                fullWidth
                {...register('water')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Food"
                type="number"
                variant="standard"
                helperText={errors.food?.message || ''}
                error={!!errors.food}
                fullWidth
                {...register('food')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Medication"
                type="number"
                variant="standard"
                helperText={errors.medication?.message || ''}
                error={!!errors.medication}
                fullWidth
                {...register('medication')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Ammunition"
                type="number"
                variant="standard"
                helperText={errors.ammunition?.message || ''}
                error={!!errors.ammunition}
                fullWidth
                {...register('ammunition')}
              />
            </Grid>
          </Grid>
        </RegisterInventory>
        <RegisterSubmit>
          <Button type="submit" variant="contained">Register</Button>
        </RegisterSubmit>
      </form>
    </RegisterContainer>
  );
}

export default Register;
