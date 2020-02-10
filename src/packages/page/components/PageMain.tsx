import React from 'react';
import { Page } from '../entities/Page';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

export interface PageMainProps {
  page?: Page;
}

const PageMain = (props: PageMainProps) => {
  return (
    <Container className="PageMain">
      <Box my={3}>
          {[...new Array(42)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
        </Box>
    </Container>
  );
}

export default PageMain;
