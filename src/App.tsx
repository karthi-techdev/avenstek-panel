import { useRoutes } from 'react-router-dom';
import routes from './components/shared/Routes';
import { Suspense } from 'react';
import { AuthProvider } from './components/shared/AuthContext';

function App() {
  const element = useRoutes(routes);
  
  return (
    <AuthProvider>
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        {element}
      </Suspense>
    </AuthProvider>
  );
}

export default App;