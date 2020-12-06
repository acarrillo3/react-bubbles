import React, { useState, useEffect } from "react";
import axiosWithAuth from "./AxiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [editedColor, setEditedColor] = useState({});
  const [colorDeleted, setColorDeleted] = useState({});
  const [colorToAdd, setColorToAdd] = useState(initialColor);
  const [colorAdded, setColorAdded] = useState({});

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  // Save edited color
  const saveEdit = (e, id) => {
    e.preventDefault();

    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${id}`, colorToEdit)
      .then(res => {
        console.log(res.data);
        setEditedColor(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    setEditing(false);
  };

  // Delete color
  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        console.log(res);
        setColorDeleted(res);
      })
      .catch(err => {
        console.log(err);
      });
    updateColors(colors);
  };

  // Add color
  const AddColor = color => {
    axiosWithAuth()
      .post("http://localhost:5000/api/colors", color)
      .then(res => {
        console.log(res.data);
        setColorAdded(color);
      })
      .catch(err => {
        console.log(err);
      });
    setColorToAdd(initialColor);
  };

  // Fetch updated data after color deleted or edited.
  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(res => {
        console.log(res.data);
        updateColors(res.data);
      });
  }, [colorDeleted, editedColor, colorAdded]);

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={e => saveEdit(e, colorToEdit.id)}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* <div className="spacer" /> */}
      {/* stretch - build another form here to add a color */}
      <form
        onSubmit={e => {
          e.preventDefault();
          AddColor(colorToAdd);
        }}
      >
        <legend>Add color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
