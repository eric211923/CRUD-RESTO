import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import database from "../config/firebase-Config";

const initialState = {
  category: "",
  name: "",
  selectedSize: "",
  prices: "",
  cost: "",
  stock: "",
};

const View = () => {
  const [item, setItem] = useState(initialState);
  const { id } = useParams();

  useEffect(() => {
    const itemRef = ref(database, `items/${id}`);

    const fetchData = async () => {
      try {
        await onValue(itemRef, (snapshot) => {
          if (snapshot.exists()) {
            const itemData = snapshot.val();
            setItem({
              category: itemData.child("category").val() || "",
              name: itemData.child("name").val() || "",
              selectedSize: itemData.child("selectedSize").val() || "",
              prices: itemData.child("prices").val() || "",
              cost: itemData.child("cost").val() || "",
              stock: itemData.child("stock").val() || "",
            });
          } else {
            console.log("Document does not exist for ID:", id);
            setItem(initialState);
          }
        });
      } catch (error) {
        console.error("Error getting document:", error);
        setItem(initialState);
      }
    };

    fetchData();
  }, [id]);

  console.log("item", item);

  return (
    <div className="card">
      <div className="card-header text-center">
        <h2>View Item</h2>
      </div>
      <div className="container">
        <strong>ID</strong>
        <span>{id}</span>
        <br />
        <br />
        {/* Check if item exists before accessing its properties */}
        {item && (
          <>
            <strong>Category</strong>
            <span>{item.category}</span>
            <br />
            <br />
            <strong>Name</strong>
            <span>{item.name}</span>
            <br />
            <br />
            <strong>Sizes</strong>
            <span>{item.selectedSize}</span>
            <br />
            <br />
            <strong>Price</strong>
            <span>{item.prices}</span>
            <br />
            <br />
            <strong>Cost</strong>
            <span>{item.cost}</span>
            <br />
            <br />
            <strong>Stock</strong>
            <span>{item.stock}</span>
            <br />
            <br />
          </>
        )}
      </div>
    </div>
  );
};

export default View;
