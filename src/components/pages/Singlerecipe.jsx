import React, { useContext, useState, useEffect } from 'react';
import { Clock, Award, Heart, Printer, Share2, Utensils, ChefHat } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const SingleRecipeView = () => {
  const { tokens } = useContext(AuthContext);
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getSingleRecipe = async () => {
      try {
        const res = await axios.get(`https://backend-recipe-w4hy.onrender.com/viewSingleRecipe/${id}`, {
          headers: { Authorization: `Bearer ${tokens}` },
        });
        if (res.data) {
          setRecipe(res.data.singleRecipe);
          setIngredients(res.data.singleRecipe.ingredients);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    getSingleRecipe();
  }, [id, tokens]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-200 to-orange-400 text-gray-900 flex justify-center">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mt-24">
        {/* Left Column - Recipe Image */}
        <div className="relative flex  justify-center">
          <img
            src={`https://backend-recipe-w4hy.onrender.com${recipe.image}`}
            alt={recipe.name}
            className="w-full h-[700px] object-cover rounded-3xl shadow-xl"
          />
          <span className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1 rounded-full text-lg font-medium">
            {recipe.category}
          </span>
        </div>

        {/* Right Column - Recipe Details */}
        <div className="p-10">
          <h1 className="text-6xl font-bold mb-8 flex items-center gap-3">
            <ChefHat size={48} className="text-orange-500" /> {recipe.name}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-10">
            <div className="flex items-center gap-3">
              <Clock className="text-orange-500" size={32} />
              <div>
                <p className="text-gray-500 text-lg">Prep Time</p>
                <span className="text-gray-800 font-semibold text-xl">{recipe.prepTime} min</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="text-orange-500" size={32} />
              <div>
                <p className="text-gray-500 text-lg">Cook Time</p>
                <span className="text-gray-800 font-semibold text-xl">{recipe.cookTime} min</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="text-orange-500" size={32} />
              <div>
                <p className="text-gray-500 text-lg">Total Time</p>
                <span className="text-gray-800 font-semibold text-xl">{recipe.prepTime + recipe.cookTime} min</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="text-orange-500" size={32} />
              <div>
                <p className="text-gray-500 text-lg">Difficulty</p>
                <span className="text-gray-800 font-semibold text-xl capitalize">{recipe.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6 mb-12">
            <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition shadow-md text-xl">
              <Heart size={24} /> Like
            </button>
            <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-gray-800 text-white hover:bg-gray-900 transition shadow-md text-xl">
              <Share2 size={24} /> Share
            </button>
            <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition shadow-md text-xl">
              <Printer size={24} /> Print
            </button>
          </div>

          {/* Ingredients */}
          <div className="mt-12">
            <h2 className="text-5xl font-bold mb-8 text-gray-800">Ingredients <Utensils className="inline ml-3 text-orange-500" /></h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-6">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700 text-xl flex items-center">
                  <span className="w-4 h-4 bg-orange-500 rounded-full mr-4"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipeView;
