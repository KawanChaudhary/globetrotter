import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Quiz from '../pages/Quiz';
import * as ROUTES from './config'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.QUIZ} element={<Quiz />} />
        {/* <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;