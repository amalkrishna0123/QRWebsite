import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../components/Firebase';

const CategoryPage = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsRef = ref(db, `items/${category}`);
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setItems(itemList);
      }
    });
  }, [category]);

  return (
    <div>
      <h1>{category} Items</h1>
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
