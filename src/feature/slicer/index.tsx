import React, { FC } from 'react';

import { Grid, GridSidepane, GridContent, GridTabs } from '../../component/grid';
import { Notifications } from '../../component/tabs';
import { useNotification } from '../../store/notification';

import DropZone from './drop-zone';
import Info from './info';
import Visualizer from './visualizer';
import Hint from './hint';
import Export from './export';

import { SSlicer } from './styled';

const Slicer: FC = () => {
  const { notifications } = useNotification();

  return (
    <Grid>
      <GridSidepane>
        <DropZone />
      </GridSidepane>

      <GridContent>
        <SSlicer>
          <Info />
          <Visualizer />
          <Hint />
        </SSlicer>
      </GridContent>

      <GridTabs
        tabs={[
          { name: 'Exporter', component: <Export /> },
          { name: 'Notifications', component: <Notifications />, count: notifications.length }
        ]}
        initialTab={0}
      />
    </Grid>
  );
};

export default Slicer;
