import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Pizza, Cake, Drumstick ,User} from 'lucide-react';

const Profile = () => {
  const { user, tokens } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);

  

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const res = await axios.get("https://backend-recipe-w4hy.onrender.com/getFavourite", {
          headers: { Authorization: `Bearer ${tokens}` },
        });
        setRecipes(res.data.savedRecipes);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch recipes.");
      }
    };
    fetchSavedRecipes();
  }, []);

  // Remove recipe function
  const handleRemove = async (id) => {
    try {
      const res = await axios.delete(`https://backend-recipe-w4hy.onrender.com/removeFavourite/${id}`, {
        headers: { Authorization: `Bearer ${tokens}` },
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove recipe.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8  relative bg-orange-100">
      {/* Food Icons using Position */}
      <Pizza className="absolute top-10 left-10 text-orange-400 w-16 h-16 opacity-20" />
      <Cake className="absolute top-20 right-20 text-yellow-500 w-16 h-16 opacity-20" />
      <Drumstick className="absolute bottom-20 left-20 text-blue-400 w-16 h-16 opacity-20" />
      
      {/* Profile Section */}
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mb-8">
        <div className="flex flex-col items-center">
          {user && (
            <>
              <User size={30} className="text-gray-500" />
              <h1 className="text-3xl font-bold mt-4 text-gray-800">{user.name}</h1>
              <p className="text-gray-500">{user.email}</p>
            </>
          )}
        </div>
      </div>

      {/* Saved Recipes Section */}
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Saved Recipes</h2>
        {recipes.length === 0 ? (
          <p className="text-gray-500">You haven't saved any recipes yet. Start exploring and save your favorites!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300">
                <img
                  src={`https://backend-recipe-w4hy.onrender.com${recipe.image}`}
                  alt={recipe.name}
                  className="rounded-lg h-80 w-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">{recipe.name}</h3>
                <p className="text-sm text-gray-600">Category: {recipe.category}</p>
                <p className="text-sm text-gray-600">Difficulty: {recipe.difficulty}</p>
                
                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(recipe._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove from Saved
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;