import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ViewRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  // const [editRecipe, setEditRecipe] = useState(null);
  // const [formData, setFormData] = useState({});
  const {tokens} = useContext(AuthContext);
  const navigate= useNavigate()

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get('https://backend-recipe-w4hy.onrender.com/getAllRecipes', {
          headers: { Authorization: `Bearer ${tokens}` },
        });
        setRecipes(res.data.recipes);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch recipes');
      }
    };
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://backend-recipe-w4hy.onrender.com/deleteRecipe/${id}`, {
        headers: { Authorization: `Bearer ${tokens}` },
      });
      toast.success(res.data.message);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete recipe');
    }
  };

  const handleEdit = (recipe) => {
    // setEditRecipe(recipe._id);
    console.log(recipe);
    navigate(`/editrecipepage/${recipe._id}`)
    // setFormData(recipe);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Admin Panel - View All Recipes</h1>
      {recipes.length === 0 ? (
        <p>No recipes available.</p>
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
              <div className="flex justify-between mt-4">
                <button onClick={() => handleEdit(recipe)} className="bg-blue-500 text-white px-4 py-2">Edit</button>
                <button onClick={() => handleDelete(recipe._id)} className="bg-red-500 text-white px-4 py-2">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* {editRecipe && (
        <div className="mt-8 p-6 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-4">Edit Recipe</h2>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2">Update Recipe</button>
        </div>
      )} */}
    </div>
  );
};

export default ViewRecipe;
