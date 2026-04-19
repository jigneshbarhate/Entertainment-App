import { Link, useLocation } from 'react-router-dom';
import { MdHomeFilled, MdMovie, MdTv, MdBookmark, MdLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../redux/authSlice';
import { resetBookmarks } from '../redux/bookmarkSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetBookmarks());
    navigate('/login');
  };

  const navLinks = [
    { path: '/', icon: <MdHomeFilled size={24} />, label: 'Home' },
    { path: '/movies', icon: <MdMovie size={24} />, label: 'Movies' },
    { path: '/tv', icon: <MdTv size={24} />, label: 'TV Series' },
    { path: '/bookmarks', icon: <MdBookmark size={24} />, label: 'Bookmarks' },
  ];

  return (
    <nav className="glass-panel text-white p-4 md:p-6 flex md:flex-col justify-between items-center md:fixed md:top-0 md:left-0 md:h-screen md:w-24 md:rounded-none z-50 transition-all">
      <div className="text-red-netflix text-2xl font-bold mb-0 md:mb-12 cursor-pointer">
        <MdMovie size={32} />
      </div>

      <div className="flex md:flex-col gap-6 md:gap-10">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-red-netflix transition-colors ${
                isActive ? 'text-white' : 'text-greyish-blue'
              }`}
              title={link.label}
            >
              {link.icon}
            </Link>
          );
        })}
      </div>

      <div className="mt-0 md:mt-auto cursor-pointer text-greyish-blue hover:text-white transition-colors" onClick={handleLogout} title="Logout">
        <MdLogout size={24} />
      </div>
    </nav>
  );
};

export default Navbar;
