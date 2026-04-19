import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../redux/authSlice';
import { MdMovie } from 'react-icons/md';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { email, password, confirmPassword } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      const userData = { email, password };
      dispatch(register(userData));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 w-full max-w-md mx-auto">
      <div className="mb-12">
        <MdMovie size={48} className="text-red-netflix" />
      </div>
      
      <div className="glass-panel p-8 w-full rounded-xl">
        <h1 className="text-3xl font-light text-white mb-8">Sign Up</h1>
        
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <input
              type="email"
              className="w-full bg-transparent border-b border-greyish-blue outline-none text-white pb-3 pl-2 transition-colors focus:border-white placeholder:text-greyish-blue"
              id="email"
              name="email"
              value={email}
              placeholder="Email address"
              onChange={onChange}
              required
            />
          </div>
          
          <div className="relative">
            <input
              type="password"
              className="w-full bg-transparent border-b border-greyish-blue outline-none text-white pb-3 pl-2 transition-colors focus:border-white placeholder:text-greyish-blue"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
              required
            />
          </div>

          <div className="relative mb-4">
            <input
              type="password"
              className="w-full bg-transparent border-b border-greyish-blue outline-none text-white pb-3 pl-2 transition-colors focus:border-white placeholder:text-greyish-blue"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Repeat password"
              onChange={onChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-netflix hover:bg-white hover:text-dark-bg text-white font-light py-3 rounded-md transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create an account'}
          </button>

          <p className="text-center font-light mt-4 text-white">
            Already have an account?{' '}
            <Link to="/login" className="text-red-netflix hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
