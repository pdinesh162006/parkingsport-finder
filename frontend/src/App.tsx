import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/Home';
import SearchPage from './pages/Search';
import ParkingMap from './pages/ParkingMap';
import ParkingDetails from './pages/ParkingDetails';
import Login from './pages/Login';
import Register from './pages/Register';

// User pages
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Bookings from './pages/Bookings';
import BookingDetails from './pages/BookingDetails';

// Owner pages
import OwnerDashboard from './pages/owner/OwnerDashboard';
import MyParking from './pages/owner/MyParking';
import ParkingForm from './pages/owner/ParkingForm';
import OwnerBookings from './pages/owner/OwnerBookings';
import OwnerStatistics from './pages/owner/OwnerStatistics';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminParking from './pages/admin/AdminParking';
import AdminBookings from './pages/admin/AdminBookings';
import AdminReviews from './pages/admin/AdminReviews';
import AdminAnalytics from './pages/admin/AdminAnalytics';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            {/* ── Public ── */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/map" element={<ParkingMap />} />
            <Route path="/parking/:id" element={<ParkingDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ── Authenticated User ── */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
            <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
            <Route path="/bookings/:id" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />

            {/* ── Owner ── */}
            <Route path="/owner" element={<ProtectedRoute roles={['OWNER', 'ADMIN']}><OwnerDashboard /></ProtectedRoute>} />
            <Route path="/owner/parking" element={<ProtectedRoute roles={['OWNER', 'ADMIN']}><MyParking /></ProtectedRoute>} />
            <Route path="/owner/parking/new" element={<ProtectedRoute roles={['OWNER', 'ADMIN']}><ParkingForm /></ProtectedRoute>} />
            <Route path="/owner/parking/:id/edit" element={<ProtectedRoute roles={['OWNER', 'ADMIN']}><ParkingForm /></ProtectedRoute>} />
            <Route path="/owner/bookings" element={<ProtectedRoute roles={['OWNER', 'ADMIN']}><OwnerBookings /></ProtectedRoute>} />
            <Route path="/owner/statistics" element={<ProtectedRoute roles={['OWNER', 'ADMIN']}><OwnerStatistics /></ProtectedRoute>} />

            {/* ── Admin ── */}
            <Route path="/admin" element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute roles={['ADMIN']}><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/parking" element={<ProtectedRoute roles={['ADMIN']}><AdminParking /></ProtectedRoute>} />
            <Route path="/admin/bookings" element={<ProtectedRoute roles={['ADMIN']}><AdminBookings /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute roles={['ADMIN']}><AdminReviews /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute roles={['ADMIN']}><AdminAnalytics /></ProtectedRoute>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
