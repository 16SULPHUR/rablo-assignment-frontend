import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    productId: "",
    name: "",
    price: "",
    featured: false,
    rating: "",
    createdAt: getCurrentDate(),
    company: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.productId) newErrors.productId = "Product ID is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.price || !/^[0-9]+(\.[0-9]{1,2})?$/.test(formData.price)) {
      newErrors.price = "Price must be a valid number";
    }
    if (
      formData.rating &&
      (!/^\d+(\.\d{1,2})?$/.test(formData.rating) ||
        formData.rating < 0 ||
        formData.rating > 5)
    ) {
      newErrors.rating = "Rating must be a number between 0 and 5";
    }
    if (!formData.createdAt) newErrors.createdAt = "Created At is required";
    if (!formData.company) newErrors.company = "Company is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        // .post("https://se-apis.onrender.com/api/products", formData)
        .post("https://se-apis.onrender.com/api/products/add", formData, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then(() => {
            navigate('/');
          })
          .catch((error) => {
            console.error('Error adding product:', error);
          });
      }
    };

  return (
    <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Stock Express</h1>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Product ID</label>
          <input
            name="productId"
            type="text"
            value={formData.productId}
            onChange={handleChange}
            className={`shadow appearance-none border ${errors.productId ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.productId && <p className="text-red-500 text-xs italic">{errors.productId}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`shadow appearance-none border ${errors.name ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <input
            name="price"
            type="text"
            value={formData.price}
            onChange={handleChange}
            className={`shadow appearance-none border ${errors.price ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Featured</label>
          <input
            name="featured"
            type="checkbox"
            checked={formData.featured}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
          <input
            name="rating"
            type="text"
            value={formData.rating}
            onChange={handleChange}
            className={`shadow appearance-none border ${errors.rating ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.rating && <p className="text-red-500 text-xs italic">{errors.rating}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Created At</label>
          <input
            name="createdAt"
            type="date"
            value={formData.createdAt}
            onChange={handleChange}
            className={`shadow appearance-none border ${errors.createdAt ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.createdAt && <p className="text-red-500 text-xs italic">{errors.createdAt}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Company</label>
          <input
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className={`shadow appearance-none border ${errors.company ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.company && <p className="text-red-500 text-xs italic">{errors.company}</p>}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
