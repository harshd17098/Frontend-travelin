import React, { useContext, useEffect, useState } from 'react';
import { Search, ChevronDown, Bookmark, BookmarkCheck } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {


  const [recipes, setrecipes] = useState([])
  const [category, setcategory] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [isVeg, setisVeg] = useState(["vegetarian", "non-vegetarian"])
  const [isVegSearch, setisVegSearch] = useState("")
  const navigate = useNavigate();
  const { tokens, user } = useContext(AuthContext)


  useEffect(() => {
    const filteredRecipe = async () => {
      let res = await axios.get("https://backend-recipe-w4hy.onrender.com/getCategory")
      // console.log(res.data.recipe);
      setcategory(res.data.recipe)
    }
    filteredRecipe()
  }, [])

  useEffect(() => {
    const allRecipe = async () => {
      let res = await axios.get(`https://backend-recipe-w4hy.onrender.com/getRecipe?category=${searchTerm}`)
      // console.log(res.data.allRecipe);
      setrecipes(res.data.allRecipes)
    }
    allRecipe()
  }, [searchTerm])

  useEffect(() => {
    try {
      let getIsVeg = async () => {
        let res = await axios.get(`https://backend-recipe-w4hy.onrender.com/getIsVegetarian?isVegetarian=${isVegSearch}`);
        if (res.data) {
          // console.log(res.data);
          setrecipes(res.data.allRecipe)
        }
      }
      getIsVeg()
    } catch (error) {
      console.log(error); s
    }
  }, [isVegSearch])

  const viewSingle = (id) => {
    // console.log(id);
    navigate(`/viewsinglerecipe/${id}`)
  }

  const handleFavourite = async (id) => {
    try {
      if (user === null) {
        console.log(tokens);
        toast.error("login please")
        navigate("/login")
      }
      else {
        const res = await axios.get(`https://backend-recipe-w4hy.onrender.com/selectFavourite/${id}`, {
          headers: { Authorization: `Bearer ${tokens}` }
        })
        if (res.data) {
          toast.info("Recipe has been added to your favorites! Check it");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.warn("Recipe has already been added!");
      } else {
        console.log(error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  }
  return (
    <div className="bg-gradient-to-br from-amber-50 min-h-screen to-orange-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r p-8 text-orange-400 md:p-16 to-amber-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 md:text-6xl">Delicious Recipes For Every Occasion</h1>
          <p className="text-xl mb-6 md:text-2xl">Discover amazing meals that will delight your taste buds</p>
          {/* Search Bar */}
          {/* <div className="max-w-lg relative">
            <input
              type="text"
              placeholder="Search for recipes or categories..."
              className="rounded-full shadow-lg text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-orange-300 pr-12 px-4 py-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="text-gray-500 absolute right-4 top-3" size={24} />
          </div> */}
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* <h2 className="text-2xl text-gray-800 font-bold mb-6">Explore Categories</h2> */}
        <div className="flex">
          <div className="w-full max-w-xs relative">
            <h2 className="text-xl text-gray-800 font-bold mb-6">Select type</h2>
            <select
              className="bg-gradient-to-r border border-gray-300 rounded-lg shadow-lg text-gray-800 w-full appearance-none block focus:border-amber-500 focus:ring-2 focus:ring-amber-500 from-yellow-100 px-4 py-3 to-amber-300"
              onChange={(e) => setSearchTerm(e.target.value)}
            >
              <option value="" disabled>Select a Category</option>
              <option value={"all"}>All</option>
              {category.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="h-6 text-gray-600 w-6 absolute pointer-events-none right-3 top-16" />
          </div>


          <div className="w-full max-w-xs relative ms-9">
            <h2 className="text-xl text-gray-800 font-bold mb-6">Select Veg or Non-Veg</h2>
            <select
              className="bg-gradient-to-r border border-gray-300 rounded-lg shadow-lg text-gray-800 w-full appearance-none block focus:border-amber-500 focus:ring-2 focus:ring-amber-500 from-yellow-100 px-4 py-3 to-amber-300"
              onChange={(e) => setisVegSearch(e.target.value)}
            >
              <option value="" disabled>Select a Category </option>
              <option value={"all"}>All</option>
              {isVeg.map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
            <ChevronDown className="h-6 text-gray-600 w-6 absolute pointer-events-none right-3 top-16" />
          </div>


        </div>
      </div>


      {/* Recipes Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl text-gray-800 font-bold mb-6">
          {/* {searchTerm ? `Recipes matching "${searchTerm}"` : "All Recipes"} */}
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden transition-shadow">
              <img
                src={`https://backend-recipe-w4hy.onrender.com${recipe.image}`}
                alt={recipe.title}
                className="h-80 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-gray-800 text-xl font-bold mb-2">{recipe.title}</h3>
                <h3 className="text-gray-800 text-xl font-bold mb-2">{recipe.name}</h3>
                <div className="flex justify-between text-gray-600 mb-4">
                  <span className="bg-amber-100 rounded-full text-amber-700 text-sm px-2 py-1">{recipe.category}</span>
                  <span className="flex text-sm items-center">{recipe.prepTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Difficulty: {recipe.difficulty}</span>
                  <button onClick={() => viewSingle(recipe._id)} className="bg-orange-500 rounded-full text-sm text-white font-medium hover:bg-orange-600 px-4 py-2 transition-colors">
                    View Recipe
                  </button>
                  <button onClick={() => handleFavourite(recipe._id)} className="px-4 py-2 rounded-full text-white font-medium bg-orange-500 hover:bg-orange-600 transition-transform duration-300">
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 p-8 text-white mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Delicious Recipes</h3>
            <p className="mb-4">Your destination for amazing food ideas</p>
            <div className="flex justify-center space-x-4">
              <button className="hover:text-orange-300 transition-colors">About</button>
              <button className="hover:text-orange-300 transition-colors">Contact</button>
              <button className="hover:text-orange-300 transition-colors">Privacy Policy</button>
            </div>
            <p className="text-gray-400 mt-8">© 2025 Delicious Recipes. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default Home;