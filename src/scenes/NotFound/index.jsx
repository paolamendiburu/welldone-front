import React from 'react';
import { Segment, Icon, Header } from 'semantic-ui-react';

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="bullhorn" />
        ERROR 404 !! NOT FOUND !!
      </Header>
    </Segment>
  );
};

export default NotFound;
