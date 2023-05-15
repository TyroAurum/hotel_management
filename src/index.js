import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './page/login';
import InventoryAdd from './page/inventAdd';
import Menu from './page/menu';
import Billing from './page/home';
import PastBill from './page/pastBill';
import Kitchen from './page/kitchen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Billing />} />
      {/* <Route path='/' element={<Login />} /> */}
      <Route path='/addInventory' element={<InventoryAdd />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/pastBills' element={<PastBill />} />
      <Route path='/kitchen' element={<Kitchen />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
