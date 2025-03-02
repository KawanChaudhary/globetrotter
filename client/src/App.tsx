import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import AppRoutes from "./routes";
import { fetchUserRequest } from "./store/reducers/authReducer";
import Loader from '@/components/Loader';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUserRequest());
    setTimeout(() => {setLoading(false)}, 1000);
  }, [dispatch]);

  return (
    <Loader isLoading={loading}>
      <AppRoutes />
    </Loader>
  );
}

export default App;
