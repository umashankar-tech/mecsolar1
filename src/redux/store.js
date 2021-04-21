


import { createStore, applyMiddleware ,compose} from 'redux';

import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { createLogger } from 'redux-logger';



import rootReducer from './reducer';


  const middleware = applyMiddleware(thunk, createLogger());
const store = createStore(rootReducer, middleware);




export { store  };
