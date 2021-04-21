// import uniqueId from "lodash.uniqueid";
// import Toast from "react-native-simple-toast";

const setLoginInData = (loginInData) => {
  return {
    type: "setLoginInData",
    value: loginInData,
  };
};


const setEntityData = (entityData)=> {
  return {
    type: "SET_ENTITY_DATA",
    value: entityData,
  };
};
const setUserData = (userData)=> {
  return {
    type: "SET_USER_DATA",
    value: userData,
  };
};
const setEntityDeviceData =(entityDeviceData)=> {
  return {
    type: "SET_ENTITY_DEVICE_DATA",
    value: entityDeviceData,
  };
};
const setEntityDeviceDataUpdater =(entityDeviceData)=> {
  return {
    type: "SET_ENTITY_DEVICE_DATA_UPDATER",
    value: entityDeviceData,
  };
};
const setUserUpdater =(userData)=> {
  return {
    type: "SET_USER_UPDATER",
    value: userData,
  };
};
const setEntityDeviceTableData =(entityDeviceTableData)=> {
  return {
    type: "SET_ENTITY_DEVICE_TABLE_DATA",
    value: entityDeviceTableData,
  };
};
const setEntityTable =(entityTableData)=> {
  return {
    type: "SET_ENTITY_TABLE_DATA",
    value: entityTableData,
  };
};
const setLastUpdatedTime =(updatedTime)=> {
  return {
    type: "SET_UPDATED_TIME",
    value: updatedTime,
  };
};
const login = (email, password) => {
  return function (dispatch) {
    var loggedIn = false;
    var name = "";
    var loginData = {};
    if (
      email.toLowerCase() == "goutham" &&
      password == "12345"
    ) {
      name = email.substring(0, email.lastIndexOf("@"));
      loggedIn = true;
    } else {
      // Toast.show("Incorrect Email or Password");
    }

    loginData.userName = name;
    loginData.loggedIn = loggedIn;
    var actionSetLoginInData = setLoginInData(loginData);
    dispatch(actionSetLoginInData);
  };
};

const addEntityChild = (child)=>{
  return function (dispatch) {
    var list = [];
    list = child;
     var actionSetEntityData = setEntityData(list);
    dispatch(actionSetEntityData);
  };
}
const addUserTable = (user)=>{
  return function (dispatch) {
    var list = [];
    list = user;
     var actionSetUserData = setUserData(list);
    dispatch(actionSetUserData);
  };
}
const addEntityData = (entity)=>{
  return function (dispatch) {
    var list = [];
    list = entity;
     var actionSetEntityTable = setEntityTable(list);
    dispatch(actionSetEntityTable);
  };
}
const addEntityDevice = (device)=>{
  return function (dispatch) {
    var list = [];
    list = device;
     var actionSetEntityDeviceData = setEntityDeviceData(list);
    dispatch(actionSetEntityDeviceData);
  };
}
const addEntityDeviceTable = (deviceData)=>{
  return function (dispatch) {
    var list = [];
    list = deviceData;
     var actionSetEntityDeviceTableData = setEntityDeviceTableData(list);
    dispatch(actionSetEntityDeviceTableData);
  };
}
export {
  login,
  setLoginInData,
  setEntityData,
  setEntityDeviceData,
  addEntityChild,
  addEntityDevice,
  addEntityDeviceTable,
  setEntityDeviceTableData,
  setEntityTable,
  addEntityData,
  setEntityDeviceDataUpdater,addUserTable,setUserData,
  setUserUpdater,
  setLastUpdatedTime
};
