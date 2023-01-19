import type { Item } from 'definitions/interfaces';
import { useCallback, useState } from 'react';

import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//Components and Styles
import { TradeModalContent } from './TradeModal.styles';
import { Button } from 'components/common';
import TradeModalInputs from './TradeModalInputs';

// Hooks
import { useAppDispatch, useAppSelector } from 'hooks';

// Store
import { selectTradeError, selectTradeLoading, selectTradeUser } from 'store/trade/selectors';
import { setTradeUser, trade } from 'store/trade';
import { selectSessionUser } from 'store/session/selectors';

const TradeModal = () => {
  const dispatch = useAppDispatch();

  const tradeUser = useAppSelector(selectTradeUser);
  const user = useAppSelector(selectSessionUser);
  const loading = useAppSelector(selectTradeLoading);
  const error = useAppSelector(selectTradeError);

  const [sendItems, setSendItems] = useState<Item[]>([]);
  const [receivedItems, setReceivedItems] = useState<Item[]>([]);

  const close = useCallback(() => {
    dispatch(setTradeUser(null));
  }, [dispatch]);

  const submit = useCallback(() => {
    if (user && tradeUser) {
      dispatch(trade({
        sender: user?.id,
        receiver: tradeUser?.id,
        sendItems,
        receivedItems,
      }));
    }
  }, [
    user,
    tradeUser,
    sendItems,
    receivedItems,
    dispatch,
  ]);

  return (
    <Dialog open={!!tradeUser} onClose={close}>
      <DialogTitle variant="h4">
        Trade with {tradeUser?.name}
      </DialogTitle>
      <DialogContent>
        <TradeModalContent>
          {error && <Typography color="error">{error}</Typography>}
          <Typography variant="h5" marginBottom="20px">Send</Typography>
          <TradeModalInputs onChange={setSendItems} />
          <Typography variant="h5" margin="20px 0">Receive</Typography>
          <TradeModalInputs onChange={setReceivedItems} />
        </TradeModalContent>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={close}
          loading={loading}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={submit}>Accept</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TradeModal;
