import { ItemType } from 'definitions/enums';

import { Typography } from '@mui/material';

// Assets
import ammoIcon from 'assets/icons/ammo.svg';
import dropIcon from 'assets/icons/water-drop.svg';
import foodIcon from 'assets/icons/food.svg';
import medicationIcon from 'assets/icons/medication.svg';

// Components and Styles
import {
  ReportsResourcesRow,
  ReportsResourcesRowContent,
  ReportsResourcesRowIcon,
  ReportsResourcesContainer,
  ReportsResourcesContent,
} from './ReportsResources.styles';

type Resources = {
  [key in ItemType]: number;
}

interface ReportsResourcesProps {
  resources: Resources;
  infectedResources: Resources;
}

const ReportsResourcesValues = ({ resources }: { resources: Resources }) => (
  <ReportsResourcesContent>
    <ReportsResourcesRow>
      <ReportsResourcesRowContent>
        <ReportsResourcesRowIcon>
          <img src={dropIcon} height="14" alt="" />
        </ReportsResourcesRowIcon>
        <div>Water</div>
      </ReportsResourcesRowContent>
      <div>{resources.WATER}</div>
    </ReportsResourcesRow>
    <ReportsResourcesRow>
      <ReportsResourcesRowContent>
        <ReportsResourcesRowIcon>
          <img src={foodIcon} height="14" alt="" />
        </ReportsResourcesRowIcon>
        <div>Food</div>
      </ReportsResourcesRowContent>
      <div>{resources.FOOD}</div>
    </ReportsResourcesRow>
    <ReportsResourcesRow>
      <ReportsResourcesRowContent>
        <ReportsResourcesRowIcon>
          <img src={medicationIcon} height="14" alt="" />
        </ReportsResourcesRowIcon>
        <div>Medication</div>
      </ReportsResourcesRowContent>
      <div>{resources.MED}</div>
    </ReportsResourcesRow>
    <ReportsResourcesRow>
      <ReportsResourcesRowContent>
        <ReportsResourcesRowIcon>
          <img src={ammoIcon} height="14" alt="" />
        </ReportsResourcesRowIcon>
        <div>Ammunition</div>
      </ReportsResourcesRowContent>
      <div>{resources.AMMO}</div>
    </ReportsResourcesRow>
  </ReportsResourcesContent>
);

const ReportsResources = ({ resources, infectedResources }: ReportsResourcesProps) => (
  <ReportsResourcesContainer>
    <Typography variant="h6">Average amount of resources for each survivor</Typography>
    <ReportsResourcesValues resources={resources} />
    <Typography variant="h6">Amount of resources lost due to infected</Typography>
    <ReportsResourcesValues resources={infectedResources} />
  </ReportsResourcesContainer>
);

export default ReportsResources;
