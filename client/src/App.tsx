import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppRoutes from './routes';
import { fetchUserRequest } from './store/reducers/authReducer';

function App() { 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserRequest());
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;
