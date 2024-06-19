import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [priceFilterValue, setPriceFilterValue] = useState();
  const [ratingFilterValue, setRatingFilterValue] = useState();

  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    alert("Please login to add or fetch products");
  }

  const fetchProducts = async () => {
    axios
      // .get("https://se-apis.onrender.com/api/products", {
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
        // alert(error.response.data.message)
        if (error.response.status == "401") {
          localStorage.removeItem("token");
          navigate("/login");
        }
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

  const fetchFeaturedProducts = () => {
    axios
      .get("https://se-apis.onrender.com/api/products/featured", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res.data)
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching featured product:", error);
        alert(error.response.data.message);
      });
  };

  const fetchProductsWithPriceLessThan = () => {
    if (priceFilterValue) {
      setRatingFilterValue("")
      axios
        .get(
          `https://se-apis.onrender.com/api/products/price/${priceFilterValue}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          setProducts(res.data);
        })
        .catch((error) => {
          console.error("Error filtering:", error);
          alert(error.response.data.message);
        });
    }else{
      alert("Enter some value")
    }
  };

   const fetchProductsWithRatingHigherThan = ()=>{
    if (ratingFilterValue) {
      setPriceFilterValue("")
      axios
        .get(
          `https://se-apis.onrender.com/api/products/rating/${ratingFilterValue}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          setProducts(res.data);
        })
        .catch((error) => {
          console.error("Error filtering:", error);
          alert(error.response.data.message);
        });
    }else{
      alert("Enter some value")
    }
   }

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
              navigate("/");
            }}
          >
            Log out
          </button>
        </div>
      </div>
      <div className="my-2 flex flex-col gap-3">
        <button
          className={`bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-fit`}
          onClick={fetchFeaturedProducts}
        >
          Featured Products
        </button>
        <div>
        Filter products with price less than:{" "}
          <input
            className="border-purple-500 border-2 rounded-md w-20 h-10"
            value={priceFilterValue}
            type="number"
            onChange={(e) => {
              setPriceFilterValue(e.target.value);
            }}
          />{" "}
          <button
            className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-fit`}
            onClick={fetchProductsWithPriceLessThan}
          >
            ➜
          </button>
        </div>
        <div>
          Filter products with rating higher than than:{" "}
          <input
            className="border-purple-500 border-2 rounded-md w-20 h-10"
            value={ratingFilterValue}
            type="number"
            min={0}
            max={5}
            onChange={(e) => {
              setRatingFilterValue(e.target.value);
            }}
          />{" "}
          <button
            className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-fit`}
            onClick={fetchProductsWithRatingHigherThan}
          >
            ➜
          </button>
        </div>
      </div>

      <button
        className={`bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded`}
        onClick={() => {
          setPriceFilterValue("")
          setRatingFilterValue("")
          fetchProducts();
        }}
      >
        Clear Filters
      </button>
      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product._id}
            className="border p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <span className="font-semibold">{product.name}</span> - $
              {product.price} ({product.rating}⭐)
            </div>
            <div className="flex gap-2">
              <button
                className="border-red-500 border-2 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleDelete(product._id)}
              >
                ❌
              </button>
              <Link
                to={`/edit/${product._id}`}
                className="border-yellow-500 border-2 text-white font-bold py-1 px-2 rounded"
              >
                ✏️
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
