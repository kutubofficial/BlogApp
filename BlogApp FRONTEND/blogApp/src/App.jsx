import { RouterProvider } from "react-router-dom";
import { myRoutes } from "./routes/routes";

function App() {

  return (
    <>
     <RouterProvider router={myRoutes}></RouterProvider>
    </>
  );
}

export default App;
