import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ResponsiveLayout } from "./components/layout/ResponsiveLayout";
import Scoreboard from "./pages/Scoreboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ResponsiveLayout />,
    children: [
      {
        index: true,
        element: <Scoreboard />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
