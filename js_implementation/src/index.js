require('./assets/stylesheets/styles.scss');

import React from 'react'; // main react dependency
import ReactDOM from 'react-dom'; // ReactDOM virtual DOM
import App from './app/App.jsx'; // main app component

ReactDOM.render(<App />, document.getElementById('root'));
// render our app component and mount it to our #root element








// // Test cases
//
// const salsa = () => {
//   document.write('Salsa, seltzer, Sosa, tzarist, zest.')
// }
//
// salsa();
//
// class ConnectiveTissue {
//
//   ligament(bone1, bone2) {
//     document.write(`The ${bone1} is connected to the...${bone2} bone!`)
//   }
//
// }
//
// const mu = new ConnectiveTissue;
//
// mu.ligament('arm', 'thigh');
