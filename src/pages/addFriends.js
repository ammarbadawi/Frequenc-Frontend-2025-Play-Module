import React, { use, useEffect, useState } from "react";
import "../styles/addFriends.scss";
import addFriend from "../assets/images/addFriend.svg";
import AddFriendPopUp from "../components/addPlayersAndFriends/addFriendPopUp";
import PlayerLists from "../components/addPlayersAndFriends/playerLists";
const AddFriends = () => {
  const [showAddFriendPopUp, setShowAddFriendPopUp] = useState(false);
  const toggleAddFriendPopUp = () => setShowAddFriendPopUp(!showAddFriendPopUp);
  const [friendsList, setFriendsList] = useState([]);

  // for showing player list
  const [hide, setHide] = useState(true);

  useEffect(() => {
    if (friendsList.length != 0) setHide(false);
    else setHide(true);
  }, [friendsList]);

  return (
    <>
      <div className="add-friends">
        <div class="player-container">
          <div class="player-header">
            <span class="players-count global-h1">Players (1/4)</span>
            <div class="toggle-switch">
              <span class="toggle-label">Are you Playing?</span>
              <label class="switch">
                <input type="checkbox" />
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <div className="break"></div>

          {!hide ? (
            <PlayerLists PlayerLists={friendsList} />
          ) : (
            <div class="add-player-section">
              <div class="player-icon">
                <img src={addFriend} alt="Add Player Icon" />
              </div>
              <button class="add-player-btn" onClick={toggleAddFriendPopUp}>
                Add Player
              </button>
            </div>
          )}

          <div
            class="save-and-back"
            style={{ display: hide ? "none" : "flex" }}
          >
            <button>Back</button>
            <button className="save">Save and Next</button>
          </div>
        </div>
      </div>

      {/* add Friend Pop Up */}
      {showAddFriendPopUp && (
        <AddFriendPopUp
          showAddFriendPopUp={showAddFriendPopUp}
          setShowAddFriendPopUp={setShowAddFriendPopUp}
          friendsList={friendsList}
          setFriendsList={setFriendsList}
        />
      )}
    </>
  );
};

export default AddFriends;
