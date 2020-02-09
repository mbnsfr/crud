import React from 'react';
import ReactDOM from 'react-dom';
import Parse from 'parse';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


Parse.initialize('myAppId', 'unused');
Parse.serverURL = 'http://localhost:1337/parse';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
