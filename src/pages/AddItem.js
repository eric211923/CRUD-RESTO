import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import database from "../config/firebase-Config";
import { ref, push, set } from "firebase/database";

const categories = ["", "Sandwiches", "Sides", "Beverage", "Others"];

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
  const navigate = useNavigate();
  const id = useParams().id;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const checkIfHasSizesIsDisabled = () => {
    if (formData.category === "" || formData.category === "Others") {
      if (formData.selectedSize !== "") {
        setFormData({
          ...formData,
          selectedSize: "",
        });
      }
      return true;
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { category, name, selectedSize, prices, cost, stock } = formData;

    if (!category || !name || isNaN(prices) || isNaN(cost) || isNaN(stock)) {
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
      toast.success("Item Added Successfully");
      navigate("/admin");
    } catch (error) {
      console.error("Error adding item to database:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <div className="row justify-content-end">
        <div className="col-auto">
          <Link to={`/admin`}>
            <i className="bi bi-x bi-smaller"></i>
          </Link>
        </div>
      </div>
      <h2>Add Item</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat || "Select category"}
                  </option>
                ))}
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
                disabled={checkIfHasSizesIsDisabled()}
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
              Add Item
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
