
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Provider/AuthProvider';
import { FaGoogle } from 'react-icons/fa';
import axiosInstance from '../../utility/axiosInstance';

const GoogleLogin = ({setError}) => {
    const {  loginWithGoogle, loading, setLoading } = useAuth();
    
  const location = useLocation();
  const navigate = useNavigate();
  // Register with google
  const handleGoogleLogin = async () => {
    setError("");
    try {
      const {user} = await loginWithGoogle();
      console.log(user);
       const dbUserInfo = await axiosInstance.post("/users", {
        email:user.email,
        name:user.displayName,
        photoUrl:user.photoURL,
      }); 
      console.log('google login',dbUserInfo);
      navigate(location?.state?.from?.pathname || "/");
    } catch (error) {
      console.log({ error });
      setLoading(false);
      setError(error.code);
    }
  };
    return (
        <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className={`text-white bg-gradient-to-br   font-bold py-2 px-4 btn btn-circle btn-outline ${
                    loading
                      ? "from-green-800 via-yellow-600 to-red-500"
                      : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  }`}
                >
                  <FaGoogle />
                </button>
              </div>
    );
};

export default GoogleLogin;