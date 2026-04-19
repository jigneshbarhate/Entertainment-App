import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

// Layout & Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVSeries from './pages/TVSeries';
import Bookmarks from './pages/Bookmarks';
import Details from './pages/Details';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {user && <Navbar />}
      
      <main className={`flex-1 p-4 md:p-8 w-full transition-all ${user ? 'md:ml-24' : ''}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tv"
            element={
              <ProtectedRoute>
                <TVSeries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:type/:id"
            element={
              <ProtectedRoute>
                <Details />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
