import React, { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Load products from localStorage on initial render
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const createdAt = new Date(); // Record the creation time
    const estimatedDeliveryTime = new Date(createdAt.getTime() + 8 * 60 * 60 * 1000); // Add 8 hours
    const newProduct = { ...product, createdAt, estimatedDeliveryTime };
    setProducts([...products, newProduct]);
  };

  const findProductByTrackingId = (trackingId) => {
    return products.find((product) => product.trackingNumber === trackingId);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, findProductByTrackingId }}>
      {children}
    </ProductContext.Provider>
  );
};