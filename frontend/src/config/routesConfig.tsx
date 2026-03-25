import { Navigate, type RouteObject } from "react-router";
import App from "../App";
import { routes } from "./routes";
import AdList from "../App/pages/AdList";
import AdDetail from "../App/pages/AdDetail";
import AdEdit from "../App/pages/AdEdit";

export const routesConfig: RouteObject[] = [
    {
        path: routes.main.mask,
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to={routes.list.mask} replace />
            },
            {
                path: routes.list.mask,
                element: <AdList />
            },
            {
                path: routes.detail.mask,
                element: <AdDetail />
            },
            {
                path: routes.edit.mask,
                element: <AdEdit />
            },
            {
                path: "*",
                element: <Navigate to={routes.list.mask} replace />
            }
        ]
    }
];