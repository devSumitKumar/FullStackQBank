import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import Toast from './components/UI/Toast';
import './index.css';

// Lazy load other pages to keep initial bundle size smaller
import React from 'react';
const ReactPage = React.lazy(() => import('./pages/ReactPage'));
const NodeJSPage = React.lazy(() => import('./pages/NodeJSPage'));
const MobileAppPage = React.lazy(() => import('./pages/MobileAppPage'));
const CodesPage = React.lazy(() => import('./pages/CodesPage'));
const AddNotesPage = React.lazy(() => import('./pages/AddNotesPage'));
const FeedbackPage = React.lazy(() => import('./pages/FeedbackPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

// Loading component for lazy-loaded routes
const LazyLoadingComponent = () => (
  <div className="flex items-center justify-center h-[70vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
  </div>
);

export function App() {
  useEffect(() => {
    // Load Inter font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Provider store={store}>
      <Toast />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route 
              path="react" 
              element={
                <React.Suspense fallback={<LazyLoadingComponent />}>
                  <ReactPage />
                </React.Suspense>
              } 
            />
            <Route 
              path="nodejs" 
              element={
                <React.Suspense fallback={<LazyLoadingComponent />}>
                  <NodeJSPage />
                </React.Suspense>
              } 
            />
            <Route 
              path="mobileapp" 
              element={
                <React.Suspense fallback={<LazyLoadingComponent />}>
                  <MobileAppPage />
                </React.Suspense>
              } 
            />
            <Route 
              path="codes" 
              element={
                <React.Suspense fallback={<LazyLoadingComponent />}>
                  <CodesPage />
                </React.Suspense>
              } 
            />
            <Route 
              path="add-notes" 
              element={
                <React.Suspense fallback={<LazyLoadingComponent />}>
                  <AddNotesPage />
                </React.Suspense>
              } 
            />
            <Route 
              path="feedback" 
              element={
                <React.Suspense fallback={<LazyLoadingComponent />}>
                  <FeedbackPage />
                </React.Suspense>
              } 
            />
            <Route 
              path="contact" 
              element={
                <React.Suspense fallback={<LazyLoadingComponent />}>
                  <ContactPage />
                </React.Suspense>
              } 
            />
            <Route 
              path="*" 
              element={
                <React.Suspense fallback={<LazyLoadingComponent />}>
                  <NotFoundPage />
                </React.Suspense>
              } 
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
