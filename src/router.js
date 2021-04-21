import React, { useContext, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,useHistory
} from 'react-router-dom';
import { getCookie } from 'src/utils/cookie';
import { auth, db } from './firebase';
import { useSelector, useDispatch } from 'react-redux';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import CreateDevice from 'src/views/product/ProductListView/CreateDevice';
import DeviceDetails from 'src/views/product/ProductListView/details';
import RoleView from 'src/views/customer/CustomerListView/RoleView';
import TemplateListView from 'src/views/templates/TemplatesListView';
import CreateTemplate from 'src/views/templates/TemplatesListView/CreateTemplate';
import PermissionView from 'src/views/customer/CustomerListView/PermissionView';
import { isAuthorised} from 'src/utils/cookie';
import { addUserTable,setEntityDeviceDataUpdater,addEntityChild, addEntityDevice,setLastUpdatedTime,addEntityDeviceTable,addEntityData } from '../src/redux/action';

const APP_ROUTES = [
  {
    path: '/',
    component: LoginView,
    page: 'login'
  },
  {
    path: '/login',
    component: LoginView,
    page: 'login'
  },
  {
    path: '/app/account',
    component: AccountView,
    protected: true,
    page: 'account'
  },
  {
    path: '/app/customers',
    component: CustomerListView,
    protected: true,
    page: 'customer'
  },
  {
    path: '/app/dashboard',
    component: DashboardView,
    protected: true,
    page: 'dashboard'
  },
  {
    path: '/app/devices',
    component: ProductListView,
    protected: true,
    page: 'devices'
  },
  {
    path: '/app/createdevice',
    component: CreateDevice,
    protected: true,
    page: 'createdevice'
  },
  {
    path: '/app/devicedetails/:deviceID',
    component: DeviceDetails,
    protected: true,
    page: 'devicedetails'
  },
  {
    path: '/app/role',
    component: RoleView,
    protected: true,
    page: 'role'
  },
  {
    path: '/app/templates',
    component: TemplateListView,
    protected: true,
    page: 'templates'
  },
  {
    path: '/app/createtemplate',
    component: CreateTemplate,
    protected: true,
    page: 'createtemplate'
  },
  {
    path: '/app/permissions',
    component: PermissionView,
    protected: true,
    page: 'permissions'
  },
  {
    path: '/app/*',
    component: NotFoundView
  },
  {
    path: '/404',
    component: NotFoundView,
    page: 'notfound'
  }
];

const UnAuthorisedRoute = ({ component: Comp, path, location, ...rest }) => {
  let isLoggedIn = isAuthorised();
  return (
    <Route
      key={path}
      path={path}
      {...rest}
      render={(props) => {
        return !isLoggedIn ? (
          // <MainLayout>
            <Comp {...props} />
          // </MainLayout>
        ) : (
          <Redirect
            to={{
              pathname: '/app/dashboard'
            }}
          />
        );
      }}
    />
  );
};

const AuthorisedRoute = ({
  component: Comp,
  path,
  location,
  page,
  ...rest
}) => {
  let isLoggedIn = isAuthorised();

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        console.log('gauty',props.location.pathname.split('/')[2],'->',props.match.url)
        return isLoggedIn ? (
          <DashboardLayout>
            <Comp {...props} />
          </DashboardLayout>
        ) : (
          <Redirect
            to={{
              pathname: '/login'
            }}
          />
        );
      }}
    />
  );
};

const AppRouter = () => {
  const dispatch = useDispatch();
  const reduxEntityChild = useSelector((state) => state.product.entityChild);
  let history = useHistory();

  const reduxEntityDeviceId = useSelector(
    (state) => state.product.entityDeviceIds
  );
  const customers = useSelector(
    (state) => state.product.entityDeviceData
  );
  const entityDataUpdater = useSelector(
    (state) => state.product.entityDataUpdater
  );
    const userUpdater = useSelector(
      (state) => state.product.userUpdater
    );
  let entity1 = [];
  let entityTable1 = [];
  const [entityChild, setEntityChild] = useState([]);
  const [completedQuery, setCompletedQuery] = useState(false);
  let loggedinUser = getCookie('_loggedinUser');
  useEffect(() => {
    // const uuu= await db.collection("User").get()
    console.log('setEntityDeviceDataUpdater',entityDataUpdater)
    if(entityDataUpdater == true){
      updateData();
      dispatch(setEntityDeviceDataUpdater(false));
    }

    
  }, [entityDataUpdater]);
  useEffect(() => {
    // const uuu= await db.collection("User").get()
    // if(reduxEntityChild.length == 0)
    updateData()
  }, []);
  useEffect(() => {
    let deviceList = []
  
    if (completedQuery == true) {
      reduxEntityDeviceId.map((child, index1) => {
        db.collection('Device')
          .doc(child)
          .get()
          .then((querySnapshotDevice) => {
            if (querySnapshotDevice.exists) {
              if (querySnapshotDevice.data()) {
               
                deviceList=[...deviceList,querySnapshotDevice.data()]
                dispatch(addEntityDeviceTable(deviceList))
                
              }
            }
          });
      });
    }
  }, [completedQuery]);
  useEffect(() => {
    let deviceList = []

  
    if (completedQuery == true) {
     
      // reduxEntityDeviceId.map((child, index1) => {
        if(reduxEntityChild.length>0){
          reduxEntityChild.map((child)=>{
            // console.log('reduxEntityChild',reduxEntityChild)
            db.collection('User').where('Entity', '==',child)
            .get()
            .then((querySnapshot) => {
         
              // if (querySnapshot.exists) {
              
                  querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    deviceList=[...deviceList,doc.data()]
                   
                });
                  
                  dispatch(addUserTable(deviceList))
                  
                
              // }
            });
          })
        }
     
      // });
    }
  }, [completedQuery]);
  useEffect(() => {
    let deviceList = []

  // console.log('reduxEntityChild',reduxEntityChild)
 
      // reduxEntityDeviceId.map((child, index1) => {
        if(reduxEntityChild.length>0){
          reduxEntityChild.map((child)=>{
            db.collection('User').where('Entity', '==',child)
            .get()
            .then((querySnapshot) => {
         
              // if (querySnapshot.exists) {
              
                  querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    deviceList=[...deviceList,doc.data()]
                   
                });
                  
                  dispatch(addUserTable(deviceList))
                  
                
              // }
            });
          })
       
        }
      // });
    
  }, [userUpdater]);
const updateData= ()=>{
  console.log('loggedinUser',getCookie('_loggedinUser'))
  loggedinUser=getCookie('_loggedinUser')
  dispatch(setLastUpdatedTime(new Date()));
  if (loggedinUser != '') {
    db.collection('User')
      .doc(loggedinUser)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.exists) {
          const selectedUserData = querySnapshot.data();
          db.collection('Entity')
            .doc(selectedUserData.Entity)
            .get()
            .then(async (querySnapshot2) => {
              if (querySnapshot2.exists) {
                entityTable1.push(querySnapshot2.data())
                dispatch(addEntityData([...entityTable1]));
                let selectedEntity = querySnapshot2.data().Child;
                let selectedEntityDevice=[]
                if(querySnapshot2.data().Devices.length > 0){
                  selectedEntityDevice = querySnapshot2.data().Devices;
                  dispatch(addEntityDevice(selectedEntityDevice));
                }
                 
                setEntityChild(selectedEntity);
                dispatch(addEntityChild(selectedEntity));
               
                entity1 = selectedEntity;
                let tempEntity1 = [];
                let tempEntityTable1 = [];
                let tempEntityDevice1 = [];
                if (entity1.length > 0) {
                  entity1.map((child, index1) => {
                    db.collection('Entity')
                      .doc(child)
                      .get()
                      .then((querySnapshot3) => {
               
                        if (querySnapshot3.exists) {
                          if (querySnapshot3.data()) {
                            
                            tempEntity1 = [
                              ...tempEntity1,
                              ...querySnapshot3.data().Child
                            ];
                            tempEntityTable1= [
                              ...tempEntityTable1,
                              querySnapshot3.data()
                            ]
                            
                            if(querySnapshot3.data().Devices.length > 0){
                              tempEntityDevice1 = [
                                ...tempEntityDevice1,
                                ...querySnapshot3.data().Devices
                              ];
                              dispatch(
                                addEntityDevice([
                                  ...selectedEntityDevice,
                                  ...tempEntityDevice1
                                ])
                              );
                            }
                            setEntityChild([...entity1, ...tempEntity1]);
                            dispatch(
                              addEntityChild([...entity1, ...tempEntity1])
                            );
                            dispatch(addEntityData([...entityTable1,...tempEntityTable1]));
                          }
                          if (
                            index1 === entity1.length - 1 &&
                            tempEntity1.length > 0
                          ) {
                            let tempEntity2 = [];
                            let tempEntityTable2 = [];
                            let tempEntityDevice2 = [];
                            tempEntity1.map((child1, index2) => {
                              db.collection('Entity')
                                .doc(child1)
                                .get()
                                .then((querySnapshot4) => {
                                  if (querySnapshot4.exists) {
                                    if (querySnapshot4.data()) {
                                     
                                      tempEntity2 = [
                                        ...tempEntity2,
                                        ...querySnapshot4.data().Child
                                      ];
                                      tempEntityTable2= [
                                        ...tempEntityTable2,
                                        querySnapshot4.data()
                                      ]
                                    
                                      if(querySnapshot4.data().Devices.length > 0){
                                        tempEntityDevice2 = [
                                          ...tempEntityDevice2,
                                          ...querySnapshot4.data().Devices
                                        ];
                                        dispatch(
                                          addEntityDevice([
                                            ...selectedEntityDevice,
                                            ...tempEntityDevice1,
                                            ...tempEntityDevice2
                                          ])
                                        );
                                      }
                                   

                                      setEntityChild([
                                        ...entity1,
                                        ...tempEntity1,
                                        ...tempEntity2
                                      ]);
                                      dispatch(
                                        addEntityChild([
                                          ...entity1,
                                          ...tempEntity1,
                                          ...tempEntity2
                                        ])
                                      );
                                      dispatch(addEntityData([...entityTable1, ...tempEntityTable1,...tempEntityTable2]));
                                    }
                                    if (
                                      index2 === tempEntity1.length - 1 &&
                                      tempEntity2.length > 0
                                    ) {
                                      let tempEntity3 = [];
                                      let tempEntityTable3 = [];
                                      let tempEntityDevice3 = [];
                                      tempEntity2.map((child2, index3) => {
                                        db.collection('Entity')
                                          .doc(child2)
                                          .get()
                                          .then((querySnapshot5) => {
                                            if (querySnapshot5.exists) {
                                              if (querySnapshot5.data()) {
                                              
                                                tempEntity3 = [
                                                  ...tempEntity3,
                                                  ...querySnapshot5.data()
                                                    .Child
                                                ];
                                                tempEntityTable3= [
                                                  ...tempEntityTable3,
                                                querySnapshot5.data()
                                                ]
                                                if(querySnapshot5.data().Devices.length > 0){
                                                  tempEntityDevice3 = [
                                                    ...tempEntityDevice3,
                                                    ...querySnapshot5.data()
                                                      .Devices
                                                  ];
                                                  dispatch(
                                                    addEntityDevice([
                                                      ...selectedEntityDevice,
                                                      ...tempEntityDevice1,
                                                      ...tempEntityDevice2,
                                                      ...tempEntityDevice3
                                                    ])
                                                  );
                                                }
                                             
                                                setEntityChild([
                                                  ...entity1,
                                                  ...tempEntity1,
                                                  ...tempEntity2,
                                                  ...tempEntity3
                                                ]);
                                                dispatch(
                                                  addEntityChild([
                                                    ...entity1,
                                                    ...tempEntity1,
                                                    ...tempEntity2,
                                                    ...tempEntity3
                                                  ])
                                                );
                                                dispatch(addEntityData([...entityTable1, ...tempEntityTable1,...tempEntityTable2,...tempEntityTable3]));
                                              }

                                              if (
                                                index3 ===
                                                  tempEntity2.length - 1 &&
                                                tempEntity3.length > 0
                                              ) {
                                                let tempEntity4 = [];
                                                let tempEntityTable4 = [];
                                                let tempEntityDevice4 = [];
                                                tempEntity3.map(
                                                  (child3, index4) => {
                                                    db.collection('Entity')
                                                      .doc(child3)
                                                      .get()
                                                      .then(
                                                        (querySnapshot6) => {
                                                          if (
                                                            querySnapshot6.exists
                                                          ) {
                                                            if (
                                                              querySnapshot6.data()
                                                            ) {
                                                             
                                                              tempEntity4 = [
                                                                ...tempEntity4,
                                                                ...querySnapshot6.data()
                                                                  .Child
                                                              ];
                                                              tempEntityTable4 = [
                                                                ...tempEntityTable4,
                                                                querySnapshot6.data()
                                                              ]
                                                              if(querySnapshot6.data().Devices.length > 0){
                                                                tempEntityDevice4 = [
                                                                  ...tempEntityDevice4,
                                                                  ...querySnapshot6.data()
                                                                    .Devices
                                                                ];
                                                                dispatch(
                                                                  addEntityDevice(
                                                                    [
                                                                      ...selectedEntityDevice,
                                                                      ...tempEntityDevice1,
                                                                      ...tempEntityDevice2,
                                                                      ...tempEntityDevice3,
                                                                      ...tempEntityDevice4
                                                                    ]
                                                                  )
                                                                );
                                                              }
                                                            
                                                              setEntityChild([
                                                                ...entity1,
                                                                ...tempEntity1,
                                                                ...tempEntity2,
                                                                ...tempEntity3,
                                                                ...tempEntity4
                                                              ]);
                                                              dispatch(
                                                                addEntityChild(
                                                                  [
                                                                    ...entity1,
                                                                    ...tempEntity1,
                                                                    ...tempEntity2,
                                                                    ...tempEntity3,
                                                                    ...tempEntity4
                                                                  ]
                                                                )
                                                              );
                                                              dispatch(addEntityData([...entityTable1, ...tempEntityTable1,...tempEntityTable2,...tempEntityTable3,...tempEntityTable4]));
                                                            }

                                                            if (
                                                              index4 ===
                                                                tempEntity3.length -
                                                                  1 &&
                                                              tempEntity4.length >
                                                                0
                                                            ) {
                                                              let tempEntity5 = [];
                                                              let tempEntityTable5 = [];
                                                              let tempEntityDevice5 = [];
                                                              tempEntity4.map(
                                                                (
                                                                  child4,
                                                                  index5
                                                                ) => {
                                                                  db.collection(
                                                                    'Entity'
                                                                  )
                                                                    .doc(
                                                                      child4
                                                                    )
                                                                    .get()
                                                                    .then(
                                                                      (
                                                                        querySnapshot7
                                                                      ) => {
                                                                        if (
                                                                          querySnapshot7.exists
                                                                        ) {
                                                                          if (
                                                                            querySnapshot7.data()
                                                                          ) {
                                                                           
                                                                            tempEntity5 = [
                                                                              ...tempEntity5,
                                                                              ...querySnapshot7.data()
                                                                                .Child
                                                                            ];
                                                                            tempEntityTable5 = [...tempEntityTable5,querySnapshot7.data()]
                                                                            if(querySnapshot7.data().Devices.length > 0){
                                                                              tempEntityDevice5 = [
                                                                                ...tempEntityDevice5,
                                                                                ...querySnapshot7.data()
                                                                                  .Devices
                                                                              ];
                                                                              dispatch(
                                                                                addEntityDevice(
                                                                                  [
                                                                                    ...selectedEntityDevice,
                                                                                    ...tempEntityDevice1,
                                                                                    ...tempEntityDevice2,
                                                                                    ...tempEntityDevice3,
                                                                                    ...tempEntityDevice4,
                                                                                    ...tempEntityDevice5
                                                                                  ]
                                                                                )
                                                                              );
                                                                            }
                                                                         
                                                                            setEntityChild(
                                                                              [
                                                                                ...entity1,
                                                                                ...tempEntity1,
                                                                                ...tempEntity2,
                                                                                ...tempEntity3,
                                                                                ...tempEntity4,
                                                                                ...tempEntity5
                                                                              ]
                                                                            );
                                                                            dispatch(
                                                                              addEntityChild(
                                                                                [
                                                                                  ...entity1,
                                                                                  ...tempEntity1,
                                                                                  ...tempEntity2,
                                                                                  ...tempEntity3,
                                                                                  ...tempEntity4,
                                                                                  ...tempEntity5
                                                                                ]
                                                                              )
                                                                            );
                                                                            dispatch(addEntityData([...entityTable1, ...tempEntityTable1,...tempEntityTable2,...tempEntityTable3,...tempEntityTable4,...tempEntityTable5]));
                                                                          }

                                                                          if (
                                                                            index5 ===
                                                                              tempEntity4.length -
                                                                                1 &&
                                                                            tempEntity5.length >
                                                                              0
                                                                          ) {
                                                                            let tempEntity6 = [];
                                                                            let tempEntityTable6 = [];
                                                                            let tempEntityDevice6 = [];
                                                                            tempEntity5.map(
                                                                              (
                                                                                child5,
                                                                                index6
                                                                              ) => {
                                                                                db.collection(
                                                                                  'Entity'
                                                                                )
                                                                                  .doc(
                                                                                    child5
                                                                                  )
                                                                                  .get()
                                                                                  .then(
                                                                                    (
                                                                                      querySnapshot8
                                                                                    ) => {
                                                                                      if (
                                                                                        querySnapshot8.exists
                                                                                      ) {
                                                                                        if (
                                                                                          querySnapshot8.data()
                                                                                        ) {
                                                                                          
                                                                                          tempEntity6 = [
                                                                                            ...tempEntity6,
                                                                                            ...querySnapshot8.data()
                                                                                              .Child
                                                                                          ];
                                                                                          tempEntityTable6=[...tempEntityTable6,querySnapshot8.data()]
                                                                                          if(querySnapshot8.data().Devices.length > 0){
                                                                                            tempEntityDevice6 = [
                                                                                              ...tempEntityDevice6,
                                                                                              ...querySnapshot8.data()
                                                                                                .Devices
                                                                                            ];
                                                                                            dispatch(
                                                                                              addEntityDevice(
                                                                                                [
                                                                                                  ...selectedEntityDevice,
                                                                                                  ...tempEntityDevice1,
                                                                                                  ...tempEntityDevice2,
                                                                                                  ...tempEntityDevice3,
                                                                                                  ...tempEntityDevice4,
                                                                                                  ...tempEntityDevice5,
                                                                                                  ...tempEntityDevice6
                                                                                                ]
                                                                                              )
                                                                                            );
                                                                                          }
                                                                                      
                                                                                          setEntityChild(
                                                                                            [
                                                                                              ...entity1,
                                                                                              ...tempEntity1,
                                                                                              ...tempEntity2,
                                                                                              ...tempEntity3,
                                                                                              ...tempEntity4,
                                                                                              ...tempEntity5,
                                                                                              ...tempEntity6
                                                                                            ]
                                                                                          );
                                                                                          dispatch(
                                                                                            addEntityChild(
                                                                                              [
                                                                                                ...entity1,
                                                                                                ...tempEntity1,
                                                                                                ...tempEntity2,
                                                                                                ...tempEntity3,
                                                                                                ...tempEntity4,
                                                                                                ...tempEntity5,
                                                                                                ...tempEntity6
                                                                                              ]
                                                                                            )
                                                                                          );
                                                                                          dispatch(addEntityData([...entityTable1, ...tempEntityTable1,...tempEntityTable2,...tempEntityTable3,...tempEntityTable4,...tempEntityTable5,...tempEntityTable6]));
                                                                                        }

                                                                                        if (
                                                                                          index6 ===
                                                                                            tempEntity5.length -
                                                                                              1 &&
                                                                                          tempEntity6.length >
                                                                                            0
                                                                                        ) {
                                                                                          let tempEntity7 = [];
                                                                                          let tempEntityDevice7 = [];
                                                                                          let tempEntityTable7 = [];
                                                                                          tempEntity6.map(
                                                                                            (
                                                                                              child6,
                                                                                              index7
                                                                                            ) => {
                                                                                              db.collection(
                                                                                                'Entity'
                                                                                              )
                                                                                                .doc(
                                                                                                  child6
                                                                                                )
                                                                                                .get()
                                                                                                .then(
                                                                                                  (
                                                                                                    querySnapshot9
                                                                                                  ) => {
                                                                                                    if (
                                                                                                      querySnapshot9.exists
                                                                                                    ) {
                                                                                                      if (
                                                                                                        querySnapshot9.data()
                                                                                                      ) {
                                                                                                     
                                                                                                        tempEntity7 = [
                                                                                                          ...tempEntity7,
                                                                                                          ...querySnapshot9.data()
                                                                                                            .Child
                                                                                                        ];
                                                                                                        if(querySnapshot9.data().Devices.length > 0){
                                                                                                          tempEntityDevice7 = [
                                                                                                            ...tempEntityDevice7,
                                                                                                            ...querySnapshot9.data()
                                                                                                              .Devices
                                                                                                          ];
                                                                                                          tempEntityTable7 = [
                                                                                                            ...tempEntityTable7,querySnapshot9.data()
                                                                                                          ]
                                                                                                          dispatch(
                                                                                                            addEntityDevice(
                                                                                                              [
                                                                                                                ...selectedEntityDevice,
                                                                                                                ...tempEntityDevice1,
                                                                                                                ...tempEntityDevice2,
                                                                                                                ...tempEntityDevice3,
                                                                                                                ...tempEntityDevice4,
                                                                                                                ...tempEntityDevice5,
                                                                                                                ...tempEntityDevice6,
                                                                                                                ...tempEntityDevice7
                                                                                                              ]
                                                                                                            )
                                                                                                          );
                                                                                                        }
                                                                                                      
                                                                                                        setEntityChild(
                                                                                                          [
                                                                                                            ...entity1,
                                                                                                            ...tempEntity1,
                                                                                                            ...tempEntity2,
                                                                                                            ...tempEntity3,
                                                                                                            ...tempEntity4,
                                                                                                            ...tempEntity5,
                                                                                                            ...tempEntity6,
                                                                                                            ...tempEntity7
                                                                                                          ]
                                                                                                        );
                                                                                                        dispatch(
                                                                                                          addEntityChild(
                                                                                                            [
                                                                                                              ...entity1,
                                                                                                              ...tempEntity1,
                                                                                                              ...tempEntity2,
                                                                                                              ...tempEntity3,
                                                                                                              ...tempEntity4,
                                                                                                              ...tempEntity5,
                                                                                                              ...tempEntity6,
                                                                                                              ...tempEntity7
                                                                                                            ]
                                                                                                          )
                                                                                                        );
                                                                                                        dispatch(addEntityData([...entityTable1, ...tempEntityTable1,...tempEntityTable2,...tempEntityTable3,...tempEntityTable4,...tempEntityTable5,...tempEntityTable6,...tempEntityTable7]));
                                                                                                      }
                                                                                                    } else {
                                                                                               
                                                                                                    }
                                                                                                    //  console.log('gauty--->',tempEntity2)
                                                                                                    //  if(index2 === tempEntity1.length-1  && tempEntity4.length>0){
                                                                                                    //   console.log('gauty',tempEntity1)

                                                                                                    //  }
                                                                                                  }
                                                                                                );
                                                                                            }
                                                                                          );
                                                                                        }
                                                                                        else if (
                                                                                          index6 === tempEntity5.length - 1 &&
                                                                                          tempEntity6.length == 0
                                                                                        ) {
                                                                                          setCompletedQuery(true);
                                                                                        }
                                                                                      } else {
                                                                                      
                                                                                      }
                                                                                    }
                                                                                  );
                                                                              }
                                                                            );
                                                                          }
                                                                          else if (
                                                                            index5 === tempEntity4.length - 1 &&
                                                                            tempEntity5.length == 0
                                                                          ) {
                                                                            setCompletedQuery(true);
                                                                          }
                                                                        } else {
                                                                     
                                                                        }
                                                                      }
                                                                    );
                                                                }
                                                              );
                                                            }
                                                            else if (
                                                              index4 === tempEntity3.length - 1 &&
                                                              tempEntity4.length == 0
                                                            ) {
                                                              setCompletedQuery(true);
                                                            }
                                                          } else {
                                                 
                                                          }
                                                        }
                                                      );
                                                  }
                                                );
                                              }
                                              else if (
                                                index3 === tempEntity2.length - 1 &&
                                                tempEntity3.length == 0
                                              ) {
                                                setCompletedQuery(true);
                                              }
                                            } else {
                                            
                                            }
                                          });
                                      });
                                    }
                                    else if (
                                      index2 === tempEntity1.length - 1 &&
                                      tempEntity2.length == 0
                                    ) {
                                      setCompletedQuery(true);
                                    }
                                  } else {
                                 
                                  }
                                });
                            });
                          } else if (
                            index1 === entity1.length - 1 &&
                            tempEntity1.length == 0
                          ) {
                            setCompletedQuery(true);
                          }
                        } else {
                   
                        }
                      });
                  });
                }
              } else {
         
              }
            });
        }
      });
  }

}
  return (
    <Router>
      <Switch>
        {APP_ROUTES.map((route, inx) => {
          if (route.protected) {
            return (
              <AuthorisedRoute
                exact={true}
                path={route.path}
                component={route.component}
                page={route.page}
                key={`approute_${inx}`}
              />
            );
          } else {
            return (
              <UnAuthorisedRoute
                exact={inx == 0}
                path={route.path}
                component={route.component}
                key={`approute_${inx}`}
              />
            );
          }
        })}
      </Switch>
    </Router>
  );
};

export default AppRouter;
