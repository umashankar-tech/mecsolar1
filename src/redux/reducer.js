import { combineReducers } from 'redux'
// import uniqueId from 'lodash.uniqueid';
//
// Initial State...
//

const initialState = {
  isLoggedIn: false,
  entityChild:[],
  entityDeviceIds:[],
  entityDeviceData:[],
  entityDataUpdater:false,
  userUpdater:false,
  userName: "",
  userData:[],
  updatedTime:new Date(),
  entityData:[],
  personData: {},
  numResult: {},
  userDetails: {},
  isLoggedIn: false,
};


const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case "setLoginInData": 
    return { ...state, isLoggedIn: action.value.loggedIn,userName: action.value.userName};
  
    default: 
      return state;
  }
}

const productReducer = (state = initialState, action) => {
  switch(action.type) {
    case "SET_ENTITY_DATA": 
    return { ...state,  entityChild: action.value};
    case "SET_ENTITY_DEVICE_DATA": 
    return { ...state,  entityDeviceIds: action.value};
    case "SET_ENTITY_DEVICE_TABLE_DATA":
      return { ...state,  entityDeviceData: action.value}; 
    case 'SET_ENTITY_TABLE_DATA':
      return { ...state,  entityData: action.value}; 
      case 'SET_ENTITY_DEVICE_DATA_UPDATER':
        return { ...state,  entityDataUpdater: action.value}; 
        case 'SET_USER_UPDATER':
          return { ...state,  userUpdater: action.value}; 
        case 'SET_USER_DATA':
          return { ...state,  userData: action.value}; 
         case 'SET_UPDATED_TIME':
          return { ...state,  updatedTime: action.value}; 
   default: 
      return state;
  }
}

 const rootReducer=combineReducers({
  auth:authReducer,
  product:productReducer
});

export default rootReducer;