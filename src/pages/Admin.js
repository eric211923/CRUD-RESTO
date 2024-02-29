import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import database from "../config/firebase-Config";
import { ref, get, remove } from "firebase/database";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ViewMenu = () => {
  const [menuData, setMenu] = useState([]);

  const handleDeleteItem = async (itemId) => {
    try {
      const menuRef = ref(database, `Items/${itemId}`);
      await remove(menuRef);
      toast.success(`Deleted successfully.`);
      setMenu((prevMenu) => prevMenu.filter((item) => item.id !== itemId));
    } catch (error) {
      toast.error(`Error deleting item with ID ${itemId}:`, error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuRef = ref(database, "Items");
        const snapshot = await get(menuRef);

        if (snapshot.exists()) {
          const menuData = snapshot.val();
          const menuArray = Object.entries(menuData || {}).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );

          setMenu(menuArray);
        }
      } catch (error) {
        toast.error("Error fetching data from Firebase:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">Admin Dashboard</h1>

      {/* Table displaying menu items */}
      <div className="table-responsive">
        <Table className="mt-3" striped bordered hover>
          {/* Table headers */}
          <thead>
            <tr className="text-center">
              <th>No.</th>
              <th>Category</th>
              <th>Product Name</th>
              <th>Sizes</th>
              <th>Price</th>
              <th>Cost</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table body with menu items */}
          <tbody className="text-center">
            {menuData.map((data, index) => (
              <tr key={data.id}>
                <td>{index + 1}</td>
                <td>{data.category}</td>
                <td>{data.name}</td>
                <td>{data.selectedSize}</td>
                <td>
                  {parseFloat(
                    data.prices && data.prices ? data.prices : "N/A"
                  ).toFixed(2)}
                </td>
                <td>{parseFloat(data.cost).toFixed(2)}</td>
                <td>
                  {data.stock && data.stock && data.stock ? data.stock : "N/A"}
                </td>

                {/* Actions column with edit, delete, and view buttons */}
                <td>
                  <div className="d-flex justify-content-center">
                    <Link
                      to={{
                        pathname: `/update/${data.id}`,
                        state: { itemData: data },
                      }}
                    >
                      <Button variant="primary" className="mx-1">
                        Edit
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      className="mx-1"
                      onClick={() => handleDeleteItem(data.id)}
                    >
                      Delete
                    </Button>

                    <Link to={`/view/${data.id}`}>
                      <Button variant="secondary" className="mx-1">
                        View
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default ViewMenu;
