import React, { useState, useEffect } from "react";
import "../../styles/addFriendPopUp.scss";

const AddFriendPopUp = ({
  showAddFriendPopUp,
  setShowAddFriendPopUp,
  friendsList,
  setFriendsList,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // for hiding friend lists
  const [hide, setHide] = useState(true);
  useEffect(() => {
    if (friendsList.length > 0) {
      setHide(false);
    } else {
      setHide(true);
    }
  }, [friendsList]);

  useEffect(() => {
    if (showAddFriendPopUp) {
      document.body.style.overflow = "hidden";
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      overlay.id = "global-overlay-2";
      document.body.appendChild(overlay);
    } else {
      const existingOverlay = document.getElementById("global-overlay-2");
      if (existingOverlay) existingOverlay.remove();
      document.body.style.overflow = "unset";
    }

    return () => {
      const existingOverlay = document.getElementById("global-overlay-2");
      if (existingOverlay) existingOverlay.remove();
      document.body.style.overflow = "unset";
    };
  }, [showAddFriendPopUp]);

  const handleClick = () => {
    setShowAddFriendPopUp(false);
  };

  const handleAddPlayer = () => {
    if (name && email && phone) {
      const newPlayer = { name, email, phone };
      setFriendsList([...friendsList, newPlayer]);
      setName("");
      setEmail("");
      setPhone("");
    }
  };

  return (
    <div className="add-friend-popup">
      <div className="close-btn global-h1" onClick={handleClick}>
        ✖
      </div>
      <h2>Add Friend</h2>

      {/* add either as frnd or as guest */}
      <div className="friend-type" style={hide ? { display: "none" } : {}}>
        <button>Add a Player</button>
        <button className="guest">Add a Guest</button>
      </div>

      <div className="input-row">
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="ex. Warish"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="ex. warish@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="ex. 0000000000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button className="add-player-btn" onClick={handleAddPlayer}>
          Add Player
        </button>
      </div>

      {/* Friends List */}
      <h3 style={hide ? { display: "none" } : {}}>Friends List</h3>
      <ul>
        {friendsList.map((friend, index) => (
          <li key={index} className="friend-item">
            <div className="friend-info">
              <img
                src={`https://ui-avatars.com/api/?name=${friend.name}`}
                alt={friend.name}
                className="friend-avatar"
              />
              <span>{friend.name}</span>
            </div>

            <div className="friend-btns">
              <button className="add-btn">Add</button>
              <button
                className="delete-btn"
                onClick={() =>
                  setFriendsList(friendsList.filter((_, i) => i !== index))
                }
              >
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="save-next-btn">
        <button
          style={
            hide
              ? {
                  background: "rgba(121, 48, 216, 0.07)",
                  color: "grey",
                  border: "0.48px solid rgba(121, 48, 216, 0.50)",
                }
              : {}
          }
          disabled={hide}
          onClick={handleClick}
        >
          Save & Next
        </button>
      </div>
    </div>
  );
};

export default AddFriendPopUp;
