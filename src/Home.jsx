import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  if(!localStorage.getItem("token")){
alert("Please login to add or fetch products")
  }

  const fetchProducts = async () => {
    axios
      .get("https://se-apis.onrender.com/api/products", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    // axios.get('https://se-apis.onrender.com/api/products')
    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    axios
      .delete(`https://se-apis.onrender.com/api/products/${productId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        fetchProducts(); // Refresh products after deletion
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert(error.response.data.message);
      });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Stock Express</h1>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="mb-4 flex justify-between items-center">
        <Link
          to="/addProduct"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </Link>
        <div>
          <Link
            to="/login"
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 ${
              localStorage.getItem("token") ? "hidden" : ""
            }`}
          >
            Login
          </Link>

          <Link
            to="/register"
            className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ${
              localStorage.getItem("token") ? "hidden" : ""
            }`}
          >
            Register
          </Link>

          <button
            className={`bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ${
              localStorage.getItem("token") ? "" : "hidden"
            }`}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/")
            }}
          >
            Log out
          </button>
        </div>
      </div>
      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product._id}
            className="border p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <span className="font-semibold">{product.name}</span> - $
              {product.price}
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
