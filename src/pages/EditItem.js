import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { set, ref, get } from "firebase/database";
import database from "../config/firebase-Config";
import { toast } from "react-toastify";
import { useParams, useLocation, Link } from "react-router-dom";

const UpdateForm = ({ handleUpdate }) => {
  const { id } = useParams();
  const location = useLocation();

  const [formState, setFormState] = useState({
    category: "",
    name: "",
    selectedSize: "",
    prices: "",
    cost: "",
    stock: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.state && location.state.itemData) {
          setFormState(location.state.itemData);
        } else {
          const itemRef = ref(database, `Items/${id}`);
          const snapshot = await get(itemRef);

          if (snapshot.exists()) {
            setFormState(snapshot.val());
          } else {
            console.log("Item not found");
          }
        }
      } catch (error) {
        toast.error("Error fetching item data:", error);
      }
    };

    fetchData();
  }, [id, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update Firebase database
      await set(ref(database, `Items/${id}`), formState);

      // Clear the form after submission
      setFormState({
        category: "",
        name: "",
        selectedSize: "",
        prices: "",
        cost: "",
        stock: "",
      });

      if (handleUpdate) {
        handleUpdate(formState);
      } else {
        toast.success("Item Updated Successfully!");
      }
    } catch (error) {
      toast.error("Error updating item:", error);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Edit Item</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Select
                name="category"
                value={formState.category || ""}
                required
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
                value={formState.name || ""}
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Size:</Form.Label>
              <Form.Select
                name="selectedSize"
                value={formState.selectedSize || ""}
                required
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
                value={formState.prices || ""}
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Cost:</Form.Label>
              <Form.Control
                type="number"
                name="cost"
                value={formState.cost || ""}
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Stock:</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formState.stock || ""}
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Button className="mt-3 w-40 ms-auto me-5" type="submit">
              Update
            </Button>

            <Button
              className="mt-3 w-40 ms-auto me-5"
              as={Link}
              to="/Admin"
              exact="true"
            >
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
