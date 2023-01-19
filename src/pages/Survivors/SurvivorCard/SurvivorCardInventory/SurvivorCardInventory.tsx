import Typography from '@mui/material/Typography';

import ammoIcon from 'assets/icons/ammo.svg';
import dropIcon from 'assets/icons/water-drop.svg';
import foodIcon from 'assets/icons/food.svg';
import medicationIcon from 'assets/icons/medication.svg';

import {
  SurvivorCardInventoryRow,
  SurvivorCardInventoryRowContent,
  SurvivorCardInventoryRowIcon,
} from './SurvivorCardInventory.styles';

interface SurvivorCardInventoryProps {
  water: number;
  food: number;
  ammo: number;
  med: number;
}

const SurvivorCardInventory = ({ water, food, ammo, med }: SurvivorCardInventoryProps) => (
  <div>
    <Typography variant="h6">Inventory:</Typography>
    <SurvivorCardInventoryRow>
      <SurvivorCardInventoryRowContent>
        <SurvivorCardInventoryRowIcon>
          <img src={dropIcon} height="14" alt="" />
        </SurvivorCardInventoryRowIcon>
        <div>Water</div>
      </SurvivorCardInventoryRowContent>
      <div>{water}</div>
    </SurvivorCardInventoryRow>
    <SurvivorCardInventoryRow>
      <SurvivorCardInventoryRowContent>
        <SurvivorCardInventoryRowIcon>
          <img src={foodIcon} height="18" alt="" />
        </SurvivorCardInventoryRowIcon>
        <span>Food</span>
      </SurvivorCardInventoryRowContent>
      <div>{food}</div>
    </SurvivorCardInventoryRow>
    <SurvivorCardInventoryRow>
      <SurvivorCardInventoryRowContent>
        <SurvivorCardInventoryRowIcon>
          <img src={medicationIcon} height="16" alt="" />
        </SurvivorCardInventoryRowIcon>
        <span>Medication</span>
      </SurvivorCardInventoryRowContent>
      <div>{med}</div>
    </SurvivorCardInventoryRow>
    <SurvivorCardInventoryRow>
      <SurvivorCardInventoryRowContent>
        <SurvivorCardInventoryRowIcon>
          <img src={ammoIcon} height="14" alt="" />
        </SurvivorCardInventoryRowIcon>
        <span>Ammunition</span>
      </SurvivorCardInventoryRowContent>
      <div>{ammo}</div>
    </SurvivorCardInventoryRow>
  </div>
);

export default SurvivorCardInventory;
