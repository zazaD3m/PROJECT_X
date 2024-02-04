import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { lazy, Suspense } from "react";

// PAGES START
import LoginPage from "./pages/auth/LoginPage";
const DashboardPage = lazy(() => import("./pages/dashboard/DashboardPage"));
const BrandsPage = lazy(() => import("./pages/brands/BrandsPage"));
const ColorsPage = lazy(() => import("./pages/colors/ColorsPage"));
// PAGES END

// CATALOG COMPONENTS START
import AddBrand from "./pages/brands/AddBrand";
import EditBrand from "./pages/brands/EditBrand";
import AddColor from "./pages/colors/AddColor";
import EditColor from "./pages/colors/EditColor";
// CATALOG COMPONENTS END

import RequireAuth from "./components/RequireAuth";
import Loader from "./components/Loader";
import RootLayout from "./components/layout/RootLayout";
import SyncUserInfo from "./components/SyncUserInfo";
import CustomersPage from "./pages/customers/CustomersPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<LoginPage />} />
      <Route element={<RequireAuth />}>
        <Route element={<SyncUserInfo />}>
          <Route element={<RootLayout />}>
            <Route
              path="dashboard"
              element={
                <Suspense fallback={<Loader />}>
                  <DashboardPage />
                </Suspense>
              }
            />
            <Route
              path="customers"
              element={
                <Suspense fallback={<Loader />}>
                  <CustomersPage />
                </Suspense>
              }
            />
            <Route path="catalog">
              <Route path="brands">
                <Route
                  index
                  element={
                    <Suspense fallback={<Loader />}>
                      <BrandsPage />
                    </Suspense>
                  }
                />
                <Route path="addbrand" element={<AddBrand />} />
                <Route path="editbrand/:brandId" element={<EditBrand />} />
              </Route>
              <Route path="colors">
                <Route
                  index
                  element={
                    <Suspense fallback={<Loader />}>
                      <ColorsPage />
                    </Suspense>
                  }
                />
                <Route path="addcolor" element={<AddColor />} />
                <Route path="editcolor/:colorId" element={<EditColor />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
