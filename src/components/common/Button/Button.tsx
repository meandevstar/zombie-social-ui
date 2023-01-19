import type { PropsWithChildren } from 'react';
import type { LinkProps } from 'react-router-dom';

import { type ButtonProps as MuiButtonProps, default as MuiButton } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// Components and Styles
import { ButtonLink } from './Button.styles';

interface ButtonProps extends MuiButtonProps {
  to?: string;
  linkProps?: LinkProps;
  loading?: boolean;
}

const Button = ({
  to,
  linkProps,
  loading,
  children,
  ...otherProps
}: PropsWithChildren<ButtonProps>) => {
  if (to) {
    return (
      <ButtonLink {...linkProps} to={to}>
        <MuiButton sx={{ my: 2, color: 'white', display: 'block' }} {...otherProps}>
          {!loading && children}
          {loading && <CircularProgress />}
        </MuiButton>
      </ButtonLink>
    )
  }
  return (
    <MuiButton sx={{ my: 2, color: 'white', display: 'flex' }} {...otherProps}>
      {!loading && children}
      {loading && <CircularProgress size={25} color="inherit" />}
    </MuiButton>
  );
};

export default Button;
