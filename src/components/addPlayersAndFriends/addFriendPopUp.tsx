// @ts-nocheck
import React, { useState, useEffect } from "react";
import usersService from "../../services/usersService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../styles/addFriendPopUp.scss";

const AddFriendPopUp = ({
  showAddFriendPopUp,
  setShowAddFriendPopUp,
  friendsList,
  setFriendsList,
  maxCanAdd,
  gameType,
  isPlaying,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

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

  const handleAddPlayer = async () => {
    if (!name || !email || !phone || friendsList.length >= maxCanAdd) return;
    try {
      // Try API-based add by searching user, else add locally
      const results = await usersService.searchUsers(name, { email });
      let added = null;
      if (Array.isArray(results) && results.length > 0) {
        const match = results[0];
        try {
          await usersService.addFriend(match.id);
        } catch { }
        added = { id: match.id, name: match.profile?.firstName ? `${match.profile.firstName} ${match.profile?.lastName || ''}`.trim() : (match.email || name), email: match.email };
      } else {
        added = { name, email, phone };
      }
      setFriendsList([...(friendsList || []), added]);
      setName("");
      setEmail("");
      setPhone("");
    } catch {
      const added = { name, email, phone };
      setFriendsList([...(friendsList || []), added]);
      setName("");
      setEmail("");
      setPhone("");
    }
  };

  // Search users by name/email
  const handleSearch = async () => {
    try {
      if (!search.trim()) { setResults([]); return; }
      setSearchLoading(true);
      const r = await usersService.searchUsers(search.trim());
      const normalized = Array.isArray(r) ? r.map(f => ({
        id: f.id || f.userId || f.friendId,
        name: f.profile?.firstName ? `${f.profile.firstName} ${f.profile?.lastName || ''}`.trim() : (f.email || 'User'),
        email: f.email,
      })) : [];
      setResults(normalized);
    } catch {
      setResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCopyLink = () => {
    const inviteLink = `${window.location.origin}/invite?game=${gameType}&host=${encodeURIComponent(name || 'Host')}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert('Invitation link copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy link');
    });
  };

  return (
    <div className="add-friend-popup">
      <div className="close-btn global-h1" onClick={handleClick}>
        ×
      </div>
      <h2>Add Friend</h2>

      <div className="input-row">
        <div className="input-group" style={{ flex: 1 }}>
          <label>Search users</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch} disabled={searchLoading}>
              {searchLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </div>

      {Array.isArray(results) && results.length > 0 && (
        <div className="search-results">
          <h3>Results</h3>
          <ul>
            {results.map((u, idx) => (
              <li key={u.id || idx} className="friend-item">
                <div className="friend-info">
                  <div className="friend-avatar"><FontAwesomeIcon icon={faUser} /></div>
                  <span>{u.name}</span>
                </div>
                <div className="friend-btns">
                  <button className="add-btn" onClick={async () => {
                    try { if (u.id) await usersService.addFriend(u.id); } catch { }
                    setFriendsList([...(friendsList || []), u]);
                  }}>Add</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

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

        <button
          className="add-player-btn"
          onClick={handleAddPlayer}
          disabled={friendsList.length >= maxCanAdd}
          style={{
            opacity: friendsList.length >= maxCanAdd ? 0.5 : 1,
            cursor: friendsList.length >= maxCanAdd ? 'not-allowed' : 'pointer'
          }}
        >
          {friendsList.length >= maxCanAdd ? 'Maximum Players Reached' : 'Add Player'}
        </button>
      </div>

      {/* Friends List */}
      <h3 style={hide ? { display: "none" } : {}}>Friends List</h3>
      <ul>
        {friendsList.map((friend, index) => (
          <li key={index} className="friend-item">
            <div className="friend-info">
              <div className="friend-avatar">
                <FontAwesomeIcon icon={faUser} />
              </div>
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
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="popup-footer">
        <button className="copy-link-btn" onClick={handleCopyLink}>
          Copy Link
        </button>
        <button
          className="save-next-btn"
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
