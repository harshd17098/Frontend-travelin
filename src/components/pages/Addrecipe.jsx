import React, { useContext, useEffect, useState } from 'react';
import {
  Utensils,
  Leaf,
  Clock,
  Flame,
  List,
  Camera,
  Edit,
  Tag
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const RecipeForm = () => {
  const navigate = useNavigate()
  const [recipeData, setRecipeData] = useState({
    name: "",
    isVegetarian: "vegetarian",
    prepTime: "",
    cookTime: "",
    difficulty: "easy",
    servings: "",
    category: "Breakfast",
    ingredients: "",
    image: null,
  }
  );
  const { tokens, user } = useContext(AuthContext)

  useEffect(() => {
    // console.log(user);
    if (user && user.role == "user") {
      navigate("/")
    }
  }, [tokens, user])


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setRecipeData({ ...recipeData, [name]: e.target.files[0] });
    }
    else {
      setRecipeData({ ...recipeData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Recipe submitted:', recipeData);
    const formData = new FormData();

    formData.append("name", recipeData.name);
    formData.append("isVegetarian", recipeData.isVegetarian);
    formData.append("prepTime", recipeData.prepTime);
    formData.append("cookTime", recipeData.cookTime);
    formData.append("difficulty", recipeData.difficulty);
    formData.append("servings", recipeData.servings);
    formData.append("category", recipeData.category);
    formData.append("ingredients", recipeData.ingredients);
    formData.append("image", recipeData.image);

    try {
      const res = await axios.post("https://backend-recipe-w4hy.onrender.com/addRecipe", formData, {
        headers: {
          Authorization: `Bearer ${tokens}`,
          "Content-Type": "multipart/form-data"
        }
      })
      if (res.data) {
        console.log(res.data.rec);
        setRecipeData({
          name: "",
          isVegetarian: "vegetarian",
          prepTime: "",
          cookTime: "",
          difficulty: "easy",
          servings: "",
          category: "Breakfast",
          ingredients: "",
          image: null,
        });
        toast.success("new Recipe added")
      }
    } catch (error) {
      console.log(error);
    }

    // Here you would typically send the data to your backend
  };

  return (
    <div className="bg-gradient-to-r w-full from-amber-50 py-8 to-yellow-50">

      <div className="bg-white border border-amber-100 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">

        <div className="relative">
          <h2 className="flex justify-center text-2xl text-center text-gray-800 font-bold items-center mb-6">
            <Utensils className="text-amber-500 mr-2" size={20} />
            Add New Recipe
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipe Name */}
            <div className="space-y-2">
              <label className="text-gray-700 text-sm block font-medium items-center">
                <Edit className="text-gray-600 mr-2" size={16} />
                Recipe Name
              </label>
              <input
                type="text"
                name="name"
                value={recipeData.name || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-md shadow-sm w-full focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 px-3 py-2"
                placeholder="Enter recipe name"
                required
              />
            </div>

            {/* Vegetarian Option */}
            <div className="space-y-2">
              <label className="text-gray-700 text-sm block font-medium items-center">
                <Leaf className="text-green-600 mr-2" size={16} />
                Dietary Type
              </label>
              <select
                name="isVegetarian"
                defaultValue={"vegetarian"}
                onChange={handleChange}
                className="border border-gray-300 rounded-md shadow-sm w-full focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 px-3 py-2"
                required
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            {/* Time and Difficulty Section */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-gray-700 text-sm block font-medium items-center">
                  <Clock className="text-blue-600 mr-2" size={16} />
                  Prep Time (min)
                </label>
                <input
                  type="number"
                  name="prepTime"
                  value={recipeData.prepTime}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md shadow-sm w-full focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 px-3 py-2"
                  placeholder="15"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-700 text-sm block font-medium items-center">
                  <Clock className="text-red-600 mr-2" size={16} />
                  Cook Time (min)
                </label>
                <input
                  type="number"
                  name="cookTime"
                  value={recipeData.cookTime}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md shadow-sm w-full focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 px-3 py-2"
                  placeholder="30"
                />
              </div>

              {/*  */}
              <div className="space-y-2">
                <label className="text-gray-700 text-sm block font-medium items-center">
                  <Flame className="text-orange-600 mr-2" size={16} />
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={recipeData.difficulty}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md shadow-sm w-full focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 px-3 py-2"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Servings and Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-gray-700 text-sm block font-medium items-center">
                  <Utensils className="text-gray-600 mr-2" size={16} />
                  Servings
                </label>
                <input
                  type="number"
                  name="servings"
                  value={recipeData.servings}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md shadow-sm w-full focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 px-3 py-2"
                  placeholder="4"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-700 text-sm block font-medium">
                  <Tag className="text-purple-600 mr-2" size={16} />
                  Category
                </label>
                <select
                  name="category"
                  value={recipeData.category}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md shadow-sm w-full focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 px-3 py-2"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Snack">Snack</option>
                  {/* <option value="Beverage">Beverage</option> */}
                </select>
              </div>

            </div>

            {/* Ingredients */}
            <div className="space-y-2">
              <label className="text-gray-700 text-sm block font-medium items-center">
                <List className="text-yellow-600 mr-2" size={16} />
                Ingredients
              </label>
              <textarea
                name="ingredients"
                value={recipeData.ingredients}
                onChange={handleChange}
                rows="5"
                className="border border-gray-300 rounded-md shadow-sm w-full focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 px-3 py-2"
                placeholder="Enter ingredients, one per line (e.g., 2 cups flour)"
                required
              />
            </div>

            {/* Instructions */}

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-gray-700 text-sm block font-medium items-center">
                <Camera className="text-gray-600 mr-2" size={16} />
                Recipe Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="border border-gray-300 rounded-md shadow-sm w-full focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 px-3 py-2"
                accept="image/*"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="flex bg-amber-500 justify-center rounded-md text-white w-full duration-150 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 hover:bg-amber-600 items-center px-4 py-2 transition"
              >
                <Utensils className="mr-2" size={16} />
                Save Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RecipeForm;