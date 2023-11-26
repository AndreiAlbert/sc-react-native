import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  location: string;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (name: string, image: string, price: number, location: string) => void;
  updateProduct: (id: number, name: string, image: string, price: number, location: string) => void;
  deleteProduct: (id: number) => void;
}

const defaultContextValue: ProductsContextType = {
  products: [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {}
};

export const ProductsContext = createContext<ProductsContextType>(defaultContextValue);

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (name: string, image: string, price: number, location: string) => {
    setProducts([...products, { id: Date.now(), name, image, price, location}]);
  };

  const updateProduct = (id: number, name: string, image: string, price: number, location: string) => {
    setProducts(
      products.map((product) => (product.id === id ? { ...product, name, image, price, location } : product))
    );
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
