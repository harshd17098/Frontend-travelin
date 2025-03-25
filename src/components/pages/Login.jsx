import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate()
  const {login, user } = useContext(AuthContext)

  // console.log(tokens);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  };


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("https://backend-recipe-w4hy.onrender.com/login", formData);
      if (res) {
        // console.log(res.data.user);
        // console.log(res.data.token);
        login(res.data.token)
        toast.success("login success")
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }
    } catch (error) {
      console.log("error is", error);
    }
  };
  return (
    <div className="flex bg-gradient-to-br justify-center from-orange-100 items-center min-h-screen to-red-100">
      {/* Background decorative elements */}
      <div className="absolute overflow-hidden z-0">
        <div className="bg-orange-300 h-96 rounded-full w-96 -right-20 absolute opacity-20 top-1/4"></div>
        <div className="bg-red-300 h-80 rounded-full w-80 -bottom-20 -left-20 absolute opacity-20"></div>
        <div className="bg-yellow-300 h-64 rounded-full w-64 absolute left-1/4 opacity-15 top-1/3"></div>

        {/* Food-related SVG elements */}
        <div className="absolute opacity-10 right-32 top-32">
          <svg className="h-20 w-20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z" />
            <path d="M15 11.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z" />
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
          </svg>
        </div>
        <div className="absolute bottom-40 left-40 opacity-10">
          <svg className="h-28 w-28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
          </svg>
        </div>
      </div>

      {/* Login Card */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative z-10">
        {/* Header with logo */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r h-16 justify-center rounded-full w-16 from-orange-500 inline-flex items-center mb-4 to-red-600">
            <svg className="h-8 text-white w-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-3-2a1 1 0 100-2H4a1 1 0 100 2h2zm3-4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-3xl text-gray-800 font-bold">Welcome back</h2>
          <p className="text-gray-500 mt-2">Sign in to your TastyPlate account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="text-gray-700 text-sm block font-medium mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 px-4 py-3"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="text-gray-700 text-sm block font-medium">Password</label>
              <a href="#" className="text-orange-600 text-sm hover:text-orange-500">Forgot password?</a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 px-4 py-3"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r rounded-md shadow-md text-white w-full duration-300 ease-in-out font-medium from-orange-500 hover:from-orange-600 hover:to-red-700 px-4 py-3 to-red-600 transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Don't have an account? <Link to={"/signup"} href="#" className="text-orange-600 font-medium hover:text-orange-500">Sign up</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;