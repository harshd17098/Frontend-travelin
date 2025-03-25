import React, { useContext, useEffect, useState } from 'react';
import { Utensils, Leaf, Clock, Flame, List, Camera, Edit, Tag } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Editrecipe = () => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState({});
  const { tokens } = useContext(AuthContext);
  const navigate= useNavigate()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`https://backend-recipe-w4hy.onrender.com/viewSingleRecipe/${id}`, {
          headers: { Authorization: `Bearer ${tokens}` },
        });
        setRecipeData(res.data.singleRecipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id, tokens]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setRecipeData({ ...recipeData, [name]: files[0] });
    } else {
      setRecipeData({ ...recipeData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in recipeData) {
      formData.append(key, recipeData[key]);
    }

    try {
      const res = await axios.put(`https://backend-recipe-w4hy.onrender.com/editRecipe/${id}`, formData, {
        headers: { Authorization: `Bearer ${tokens}`, 'Content-Type': 'multipart/form-data' },
      });
      if (res.data) {
        toast.success('Recipe updated successfully!');
        navigate("/viewrecipe")
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update recipe');
    }
  };

  return (
    <div className="bg-gradient-to-r w-full from-amber-50 py-8 to-yellow-50">
      <div className="bg-white border border-amber-100 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex justify-center items-center">
          <Edit className="text-amber-500 mr-2" size={20} /> Edit Recipe
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-gray-700 text-sm block font-medium">Recipe Name</label>
            <input type="text" name="name" value={recipeData.name || ''} onChange={handleChange} className="border rounded-md w-full px-3 py-2" required />
          </div>

          {/* Vegetarian Option */}
          <div className="space-y-2">
            <label className="text-gray-700 text-sm block font-medium">Dietary Type</label>
            <select name="isVegetarian" value={recipeData.isVegetarian || 'vegetarian'} onChange={handleChange} className="border rounded-md w-full px-3 py-2" required>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>

          {/* Time and Difficulty */}
          <div className="grid grid-cols-3 gap-4">
            <input type="number" name="prepTime" value={recipeData.prepTime || ''} onChange={handleChange} placeholder="Prep Time (min)" className="border rounded-md px-3 py-2" />
            <input type="number" name="cookTime" value={recipeData.cookTime || ''} onChange={handleChange} placeholder="Cook Time (min)" className="border rounded-md px-3 py-2" />
            <select name="difficulty" value={recipeData.difficulty || 'easy'} onChange={handleChange} className="border rounded-md px-3 py-2">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Servings and Category */}
          <div className="grid grid-cols-2 gap-4">
            <input type="number" name="servings" value={recipeData.servings || ''} onChange={handleChange} placeholder="Servings" className="border rounded-md px-3 py-2" />
            <select name="category" value={recipeData.category || 'Breakfast'} onChange={handleChange} className="border rounded-md px-3 py-2">
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
              <option value="Snack">Snack</option>
            </select>
          </div>

          {/* Ingredients */}
          <textarea name="ingredients" value={recipeData.ingredients || ''} onChange={handleChange} rows="5" className="border rounded-md w-full px-3 py-2" placeholder="Enter ingredients..." required />

          {/* Image Upload */}
          <input type="file" name="image" onChange={handleChange} className="border rounded-md w-full px-3 py-2" accept="image/*" />

          {/* Submit Button */}
          <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded-md w-full">Update Recipe</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default  Editrecipe;
