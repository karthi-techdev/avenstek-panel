import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Layout from './Layout';
import Login from '../Login';
import { useAuth } from './AuthContext';

const Dashboard = lazy(() => import('../Dashboard'));
const Employee = lazy(() => import('../Employee'));
const AddEmployee = lazy(() => import('../AddEmployee'));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

const routes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'employee',
        element: (
          <ProtectedRoute>
            <Employee />
          </ProtectedRoute>
        ),
      },
      {
        path: 'employee/add-employee',
        element: (
          <ProtectedRoute>
            <AddEmployee />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default routes;