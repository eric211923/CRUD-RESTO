import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { ref, push, onValue, set } from "firebase/database";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import database from "../config/firebase-Config";

const AddItem = () => {
  const initialState = {
    category: "",
    name: "",
    selectedSize: "",
    prices: "",
    cost: "",
    stock: "",
  };

  const [formData, setFormData] = useState(initialState);
  const { id } = useParams();

  useEffect(() => {
    const fetchItemData = async () => {
      const itemsRef = ref(database, `Items/${id}`);

      if (id) {
        try {
          const itemRef = ref(itemsRef, id);
          const snapshot = await onValue(itemRef);

          if (snapshot.exists()) {
            setFormData({ ...snapshot.val() });
          } else {
            toast.error("Item not found.");
          }
        } catch (error) {
          console.error("Error fetching item data:", error);
          console.error("Error details:", error.details);
        }
      }
    };

    fetchItemData();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { category, name, selectedSize, prices, cost, stock } = formData;

    if (
      !category ||
      !name ||
      !selectedSize ||
      isNaN(prices) ||
      isNaN(cost) ||
      isNaN(stock)
    ) {
      toast.error("Please fill in valid values for each input field.");
      return;
    }

    try {
      const menuRef = ref(database, "Items");

      if (id) {
        const itemRef = ref(menuRef, id);
        await set(itemRef, {
          category,
          name,
          selectedSize,
          prices,
          cost,
          stock,
        });
      } else {
        const newItemRef = push(menuRef);
        await set(newItemRef, {
          category,
          name,
          selectedSize,
          prices,
          cost,
          stock,
        });
      }

      setFormData(initialState);

      toast.success(
        id ? "Item Updated Successfully" : "Item Added Successfully"
      );
    } catch (error) {
      console.error(
        `Error ${id ? "updating" : "adding"} item to database:`,
        error
      );
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>{id ? "Edit Item" : "Add Item"}</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Select
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="Sandwiches">Sandwiches</option>
                <option value="Sides">Sides</option>
                <option value="Beverage">Beverage</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Product Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Size:</Form.Label>
              <Form.Select
                name="selectedSize"
                value={formData.selectedSize || ""}
                onChange={handleChange}
              >
                <option value="">Select size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                name="prices"
                value={formData.prices || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Cost:</Form.Label>
              <Form.Control
                type="number"
                name="cost"
                value={formData.cost || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Stock:</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Button className="mt-3 w-100" type="submit">
              {id ? "Update Item" : "Add Item"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
