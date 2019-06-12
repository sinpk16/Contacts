import React from 'react';
import ReactDOM from 'react-dom';
import Contact from './Contact';

export default class App extends React.Component {
  render() {
    return <Contact />;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
