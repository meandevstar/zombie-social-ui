import type { Item } from 'definitions/interfaces';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';

// Constants and Enums
import { ItemType } from 'definitions/enums';

//Components and Styles
import {
  TradeModalInputRow,
  TradeModalInputWrapper,
} from './TradeModal.styles';

// Assets
import ammoIcon from 'assets/icons/ammo.svg';
import dropIcon from 'assets/icons/water-drop.svg';
import foodIcon from 'assets/icons/food.svg';
import medicationIcon from 'assets/icons/medication.svg';

interface TradeModalInputsProps {
  onChange: (items: Item[]) => void;
}

const TradeModalInputs = ({ onChange }: TradeModalInputsProps) => {
  const [items, setItems] = useState<Item[]>([]);

  const [water, setWater] = useState(0);
  const [food, setFood] = useState(0);
  const [med, setMed] = useState(0);
  const [ammo, setAmmo] = useState(0);

  const changeItems = useCallback((type: ItemType, value: number) => {
    const exist = items.find((item) => item.type === type);
    if (exist && value === 0) {
      setItems(items.filter((item) => item.type !== type));
    } else if (exist && value > 0) {
      setItems(items.map((item) => {
        if (item.type === type) {
          return {
            ...item,
            points: value,
          }
        }
        return item;
      }));
    } else {
      setItems([...items, {
        type,
        points: value,
        totalCount: 100,
      }]);
    }
  }, [items]);

  const onWaterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWater(+e.target.value);
    changeItems(ItemType.Water, +e.target.value);
  }, [changeItems]);

  const onFoodChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFood(+e.target.value);
    changeItems(ItemType.Food, +e.target.value);
  }, [changeItems]);

  const onMedChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMed(+e.target.value);
    changeItems(ItemType.Medication, +e.target.value);
  }, [changeItems]);

  const onAmmoChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAmmo(+e.target.value);
    changeItems(ItemType.Ammunition, +e.target.value);
  }, [changeItems]);

  useEffect(() => {
    if (onChange) {
      onChange(items);
    }
  }, [items, onChange]);

  return (
    <div>
      <TradeModalInputRow>
        <img src={dropIcon} height="14" alt="" />
        <Typography marginLeft="5px" marginRight="10px" width="150px">Water</Typography>
        <TradeModalInputWrapper>
          <TextField
            type="number"
            variant="standard"
            inputProps={{ min: 0 }}
            value={water}
            onChange={onWaterChange}
            fullWidth
          />
        </TradeModalInputWrapper>
      </TradeModalInputRow>
      <TradeModalInputRow>
        <img src={foodIcon} height="14" alt="" />
        <Typography marginLeft="5px" marginRight="10px" width="150px">Food</Typography>
        <TradeModalInputWrapper>
          <TextField
            type="number"
            variant="standard"
            inputProps={{ min: 0 }}
            value={food}
            onChange={onFoodChange}
            fullWidth
          />
        </TradeModalInputWrapper>
      </TradeModalInputRow>
      <TradeModalInputRow>
        <img src={medicationIcon} height="14" alt="" />
        <Typography marginLeft="5px" marginRight="10px" width="150px">Medication</Typography>
        <TradeModalInputWrapper>
          <TextField
            type="number"
            variant="standard"
            inputProps={{ min: 0 }}
            value={med}
            onChange={onMedChange}
            fullWidth
          />
        </TradeModalInputWrapper>
      </TradeModalInputRow>
      <TradeModalInputRow>
        <img src={ammoIcon} height="14" alt="" />
        <Typography marginLeft="5px" marginRight="10px" width="150px">Ammunition</Typography>
        <TradeModalInputWrapper>
          <TextField
            type="number"
            variant="standard"
            inputProps={{ min: 0 }}
            value={ammo}
            onChange={onAmmoChange}
            fullWidth
          />
        </TradeModalInputWrapper>
      </TradeModalInputRow>
    </div>
  );
}

export default TradeModalInputs;
