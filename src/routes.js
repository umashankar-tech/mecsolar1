import React, { useContext, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
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

const APP_ROUTES = [
  {
    path: '/',
    component: LoginView,
    page: 'login',
    name: 'Login'
  },
  {
    path: '/login',
    component: LoginView,
    page: 'login',
    name: 'Login'
  },
  {
    path: '/app/account',
    component: AccountView,
    protected: true,
    page: 'account',
    name: 'Account'
  },
  {
    path: '/app/customers',
    component: CustomerListView,
    protected: true,
    page: 'customer',
    name: 'Customer'
  },
  {
    path: '/app/dashboard',
    component: DashboardView,
    protected: true,
    page: 'dashboard',
    name: 'Dashboard'
  },
  {
    path: '/app/devices',
    component: ProductListView,
    protected: true,
    page: 'devices',
    name: 'Devices'
  },
  {
    path: '/app/createdevice',
    component: CreateDevice,
    protected: true,
    page: 'createdevice',
    name: 'Create Device'
  },
  {
    path: '/app/devicedetails/:deviceID',
    component: DeviceDetails,
    protected: true,
    page: 'devicedetails',
    name: 'Device Detail'
  },
  {
    path: '/app/role',
    component: RoleView,
    protected: true,
    page: 'role',
    name: 'Role'
  },
  {
    path: '/app/templates',
    component: TemplateListView,
    protected: true,
    page: 'templates',
    name: 'Templates'
  },
  {
    path: '/app/createtemplate',
    component: CreateTemplate,
    protected: true,
    page: 'createtemplate',
    name: 'Create Templates'
  },
  {
    path: '/app/permissions',
    component: PermissionView,
    protected: true,
    page: 'permissions',
    name: 'Permissions'
  },
  {
    path: '/app/*',
    component: NotFoundView
  },
  {
    path: '/404',
    component: NotFoundView,
    page: 'notfound',
    name: 'Not Found'
  }
];




export default APP_ROUTES;