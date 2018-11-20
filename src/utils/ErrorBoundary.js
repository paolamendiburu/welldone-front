import React from 'react';
import { Segment, Icon, Header } from 'semantic-ui-react';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Segment placeholder>
          <Header icon>
            <Icon name="bullhorn" />
            SOMETHING WENT WRONG !!
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </Header>
        </Segment>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
