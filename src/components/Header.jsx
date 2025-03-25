import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate()

  const logOut = () => {
    logout(navigate)
  }
  // console.log(user);


  return (
    <header className="bg-gradient-to-r shadow-lg from-orange-500 to-red-600">
      <div className="lg:px-8 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex bg-white h-10 justify-center rounded-full w-10 items-center">
                <svg className="h-6 text-orange-500 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-3-2a1 1 0 100-2H4a1 1 0 100 2h2zm3-4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <Link to="/" className="text-white text-xl font-bold">TastyPlate</Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-sm text-white font-medium hover:text-orange-100 px-3 py-2">Home</Link>

            {/* Show Add Recipes for Admin Only */}
            {user?.role === 'admin' && (
              <Link to="/addrecipe" className="bg-green-500 rounded text-sm text-white font-medium hover:text-orange-100 px-3 py-2">
                Add Recipes
              </Link>
            )}
          </nav>

          {/* Authentication Buttons and Profile */}
          <div className="hidden items-center md:flex space-x-4">
            {/* Show Login and Sign Up if No User */}
            {!user ? (
              <>
                <Link to="/login" className="border border-white rounded-md text-white duration-300 hover:bg-white hover:text-orange-500 px-4 py-2 transition">
                  Log In
                </Link>
                <Link to="/signup" className="bg-white rounded-md text-orange-600 duration-300 hover:bg-orange-100 px-4 py-2 transition">
                  Sign Up
                </Link>
              </>
            ) : (
              // Show Profile if User Exists
              <div className="group relative">
                <div className="flex border-2 border-white rounded-full text-sm focus:border-white focus:outline-none">
                 <User size={30} className="text-gray-500" />
                </div>

                {/* Profile Dropdown */}
                <div className="bg-white rounded-md shadow-lg w-48 absolute group-hover:opacity-100 group-hover:visible invisible mt-2 opacity-0 origin-top-right right-0 ring-1 ring-black z-3 ring-opacity-5 transition-all">
                  <div className="py-1">
                    <Link to={"/profile"} className="text-gray-700 text-sm block hover:bg-gray-100 px-4 py-2">Your Profile</Link>
                    {user?.role == "admin" &&
                      <Link to={"/viewrecipe"} className="text-gray-700 text-sm block hover:bg-gray-100 px-4 py-2">Your Added Recipe</Link>
                    }
                    {/* <a href="#" className="text-gray-700 text-sm block hover:bg-gray-100 px-4 py-2">Saved Recipes</a> */}
                    <a onClick={logOut} className="text-gray-700 text-sm block hover:bg-gray-100 px-4 py-2">Sign out</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
