import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes";
import { fetchUserRequest } from "./store/reducers/authReducer";
import Loader from '@/components/Loader';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchUserRequest());
  }, [dispatch]);

  return (
    <Loader isLoading={loading}>
      <AppRoutes />
    </Loader>
  );
}

export default App;
