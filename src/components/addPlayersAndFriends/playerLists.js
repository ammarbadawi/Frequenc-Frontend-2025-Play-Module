import React, { useState } from "react";
import "../../styles/playerLists.scss";
import img1 from "../../assets/images/friend1.svg";
import img2 from "../../assets/images/friend2.svg";
import img3 from "../../assets/images/friend3.svg";

const PlayerLists = ({ friendList }) => {
  const [activeTab, setActiveTab] = useState("players");

  const friends = [
    {
      id: 1,
      name: "Warish",
      role: "Captain",
      image: img1,
    },
    {
      id: 2,
      name: "Adil Raza",
      role: "Vice Captain",
      image: img2,
    },
    {
      id: 3,
      name: "Joya",
      role: "Batsman",
      image: img3,
    },
  ];

  return (
    <div className="friends-container">
      {/* Tab Buttons */}
      <div className="tabs">
        <button
          className={activeTab === "players" ? "active" : ""}
          onClick={() => setActiveTab("players")}
        >
          Player List
        </button>
        <button
          className={activeTab === "guests" ? "active" : ""}
          onClick={() => setActiveTab("guests")}
        >
          Guest List
        </button>
      </div>

      {/* Friends List */}
      <div className="friends-list">
        <h3>Friends List</h3>
        <ul>
          {friends.map((friend) => (
            <li key={friend.id} className="friend-item">
              <div className="friend-info">
                <img
                  src={friend.image}
                  alt={friend.name}
                  className="friend-avatar"
                />
                <span>{friend.name}</span>
              </div>
              <select className="role-selector">
                <option>{friend.role}</option>
              </select>
              <button className="delete-btn">🗑</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlayerLists;
