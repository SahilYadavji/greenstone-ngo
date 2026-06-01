import React from 'react';

import ReactDOM from 'react-dom/client';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";

import { useEffect, useState } from "react";

import App from './App';
import ActivityDetails from "./pages/ActivityDetails";

import Admin from './components/Admin';

import Login from './components/Login';

import './index.css';

import './i18n';

function ProtectedRoute({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser);

        setLoading(false);

      }
    );

    return () => unsubscribe();

  }, []);

  if (loading) return <h1>Loading...</h1>;

  return user ? children : <Navigate to="/login" />;
}

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <BrowserRouter>

      <Routes>
       <Route
  path="/activity/:id"
  element={<ActivityDetails />}
/>
        <Route path="/" element={<App />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>,
)