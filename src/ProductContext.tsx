import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("products.db");

export interface Product {
  id: number;
  name: string;
  price: number;
  location: string;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (name: string, price: number, location: string) => void;
  updateProduct: (id: number, name: string, price: number, location: string) => void;
  deleteProduct: (id: number) => void;
}

const defaultContextValue: ProductsContextType = {
  products: [],
  addProduct: () => { },
  updateProduct: () => { },
  deleteProduct: () => { }
};

export const ProductsContext = createContext<ProductsContextType>(defaultContextValue);

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const serverUrl = "ws://localhost:8080/ws"


  // Initialize the database
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists products (id integer primary key not null, name text, price real, location text);",
        [],
        () => { console.log('Table created successfully') },
      );
    }, (err) => console.log('Transaction error: ' + err.message));
  }, []);

  // Fetch products when the component is mounted
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "select * from products;",
        [],
        (_, { rows: { _array } }) => setProducts(_array),
      );
    });
  }, []);

  const addProduct = (name: string, price: number, location: string) => {
    db.transaction(tx => {
      tx.executeSql("insert into products (name, price, location) values (?, ?, ?)", [name, price, location],
        (_, { insertId }) => {
          setProducts([...products, { id: insertId!!, name, price, location }]);
        }
      );
    });
  };

  const updateProduct = (id: number, name: string, price: number, location: string) => {
    db.transaction(tx => {
      tx.executeSql("update products set name = ?, price = ?, location = ? where id = ?", [name, price, location, id],
        () => {
          setProducts(
            products.map((product) => (product.id === id ? { ...product, name, price, location } : product))
          );
        }
      );
    });
  };

  const deleteProduct = (id: number) => {
    db.transaction(tx => {
      tx.executeSql("delete from products where id = ?", [id],
        () => {
          setProducts(products.filter((product) => product.id !== id));
        }
      );
    });
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
