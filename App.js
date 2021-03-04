import React from 'react';
import dva from 'dva';
import { createMemoryHistory } from 'history';
import MainNavigator from './src/utils/navigator'


//create a dva app instance
const app = dva({
  history: createMemoryHistory(), //history object (reqd)
  onError(e, dispatch) {
    console.log(e, dispatch); //global error handler
  },
});

app.model(require('./src/models/app').default);
//register app router to navigate between views
app.router(() => (
  <MainNavigator />
));

//start the app instance and export it to be rendered
export default app.start();