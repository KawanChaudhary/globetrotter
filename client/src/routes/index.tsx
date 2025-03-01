import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import * as ROUTES from './config'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;