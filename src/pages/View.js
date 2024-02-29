import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { ref, get } from "firebase/database";
import database from "../config/firebase-Config";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "../App.css";

const View = ({ handleView }) => {
  const location = useLocation();

  const { id } = useParams();

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

  return (
    <div className="card">
      <div className="card-header text-center">
        <div className="col-md-6"></div>
        <div className="container mt-5 text-center">
          <div className="row justify-content-center">
            <h2>View Item</h2>
            {formState && (
              <>
                <strong>Category:</strong>
                <span>{formState.category}</span>
                <br />
                <br />
                <strong>Name:</strong>
                <span>{formState.name}</span>
                <br />
                <br />
                <strong>Sizes:</strong>
                <span>{formState.selectedSize}</span>
                <br />
                <br />
                <strong>Price:</strong>
                <span>{parseFloat(formState.prices).toFixed(2)}</span>
                <br />
                <br />
                <strong>Cost:</strong>
                <span>{parseFloat(formState.cost).toFixed(2)}</span>
                <br />
                <br />
                <strong>Stock:</strong>
                <span>{formState.stock}</span>
                <br />
                <br />
                <Button
                  className="mt-3 w-40 mx-auto"
                  as={Link}
                  to="/Admin"
                  exact="true"
                >
                  Close
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
