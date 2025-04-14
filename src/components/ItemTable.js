import React, { useEffect } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function ItemTable({ setLoading }) {
  const [items, setItems] = React.useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setItems(response.data);
        console.log(items);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th data>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.website}</td>
            <td>
              <a className="icon-links link-success link-underline-success" style={{ marginRight: "9px" }} href={`#`}>
              <i class="bi bi-pencil-fill"></i>
              </a>
              <a className="icon-links link-danger r" href={`#`}>
              <i className="bi bi-trash-fill"></i>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default ItemTable;