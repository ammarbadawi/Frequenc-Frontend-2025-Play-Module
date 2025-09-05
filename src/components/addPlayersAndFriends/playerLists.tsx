// @ts-nocheck
import React, { useState } from "react";
import usersService from "../../services/usersService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../styles/playerLists.scss";

const PlayerLists = ({ PlayerLists, gameType }) => {
  const [selectedRoles, setSelectedRoles] = useState({});

  const roleOptions = gameType === 'Doubles'
    ? ["Captain", "Vice Captain", "Batsman", "All Rounder"]
    : ["Captain", "Vice Captain"];

  const handleRoleChange = (index, role) => {
    setSelectedRoles({
      ...selectedRoles,
      [index]: role
    });
  };

  return (
    <div className="friends-container">
      <div className="friends-list">
        <h3>Friends List</h3>
        <div className="friends-items">
          {PlayerLists.map((friend, index) => (
            <div key={index} className="friend-item">
              <div className="friend-info">
                <div className="friend-avatar">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <span className="friend-name">{friend.name}</span>
              </div>
              <select
                className="role-selector"
                value={selectedRoles[index] || roleOptions[0]}
                onChange={(e) => handleRoleChange(index, e.target.value)}
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <button className="delete-btn" onClick={async () => {
                try {
                  if (friend.id) {
                    await usersService.removeFriend(friend.id);
                  }
                } catch { }
              }}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerLists;
