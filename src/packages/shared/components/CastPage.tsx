import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

export interface CastPageProps {}

const CastPage: FunctionComponent<CastPageProps> = (props) => {
  return (
    <Container maxWidth="md">
      <Box my={3}>
        {props.children}
      </Box>
    </Container>
  );
}

export default CastPage;
