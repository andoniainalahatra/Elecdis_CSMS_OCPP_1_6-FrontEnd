
import { Provider } from "react-redux";
import store from "./App/store";
import { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";
import { AppRoutes } from "./routes/AppRoute";



function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Simplicité de chargement après le montage
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <RotateLoader color="#f87" />
        </div>
      ) : (
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      )}
    </>
  );
}

export default App;
