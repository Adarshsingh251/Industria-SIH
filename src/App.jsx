import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';

// Pages
import { Landing } from './pages/Landing';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ApprovalDiscovery } from './pages/ApprovalDiscovery';
import { Applications } from './pages/Applications';
import { ApplicationDetail } from './pages/ApplicationDetail';
import { Documents } from './pages/Documents';
import { Compliance } from './pages/Compliance';
import { GovernmentSupport } from './pages/GovernmentSupport';
import { BusinessProfile } from './pages/BusinessProfile';
import { OfficerQueue } from './pages/OfficerQueue';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Authentication */}
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Authenticated Application Shell */}
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/discovery" element={<ApprovalDiscovery />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/:id" element={<ApplicationDetail />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/support" element={<GovernmentSupport />} />
            <Route path="/profile" element={<BusinessProfile />} />
            <Route path="/officer" element={<OfficerQueue />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
