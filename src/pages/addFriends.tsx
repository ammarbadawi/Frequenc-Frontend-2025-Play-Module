// @ts-nocheck
import React, { use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/addFriends.scss";
import addFriend from "../assets/images/addFriend.svg";
import AddFriendPopUp from "../components/addPlayersAndFriends/addFriendPopUp";
import PlayerLists from "../components/addPlayersAndFriends/playerLists";
import usersService from "../services/usersService";
import notificationsService from "../services/notificationsService";
import bookingsService from "../services/bookingsService";

const AddFriends = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const gameType = location.state?.gameType || 'Singles';
  const bookingId = location.state?.bookingId;

  const [showAddFriendPopUp, setShowAddFriendPopUp] = useState(false);
  const toggleAddFriendPopUp = () => setShowAddFriendPopUp(!showAddFriendPopUp);
  const [friendsList, setFriendsList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // for showing player list
  const [hide, setHide] = useState(true);

  // Calculate max players and current count
  const maxPlayers = gameType === 'Doubles' ? 4 : 2;
  const currentCount = friendsList.length + (isPlaying ? 1 : 0);
  const maxCanAdd = gameType === 'Doubles' ? (isPlaying ? 3 : 4) : (isPlaying ? 1 : 2);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSaveAndNext = async () => {
    try {
      // Send invites to selected friends
      for (const friend of friendsList) {
        try {
          await notificationsService.sendEmail({
            to: friend.email,
            subject: 'Game Invite',
            message: `You've been invited to a ${gameType} match${bookingId ? ` (Booking: ${bookingId})` : ''}.`,
          });
        } catch { }
      }
      if (bookingId) {
        const existing = JSON.parse(localStorage.getItem('bookingInvites') || '{}');
        existing[bookingId] = friendsList.map(f => ({ id: f.id, name: f.name, email: f.email }));
        localStorage.setItem('bookingInvites', JSON.stringify(existing));
        try {
          const playerIds = friendsList.map(f => f.id).filter(Boolean);
          if (playerIds.length) {
            await bookingsService.addInvites(bookingId, playerIds);
          }
        } catch { }
      }
      navigate('/');
    } catch (e) {
      alert(e.message || 'Failed to send invites');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const friends = await usersService.getFriends();
        const normalized = Array.isArray(friends)
          ? friends.map(f => ({
            id: f.id || f.userId || f.friendId,
            name: f.profile?.firstName ? `${f.profile.firstName} ${f.profile?.lastName || ''}`.trim() : (f.email || 'Friend'),
            email: f.email,
          }))
          : [];
        setFriendsList(normalized);
      } catch (e) {
        // fallback: leave empty; user can add local entries via popup
      }
    })();
  }, []);

  useEffect(() => {
    if (friendsList.length != 0) setHide(false);
    else setHide(true);
  }, [friendsList]);

  return (
    <>
      <div className="add-friends">
        <div class="player-container">
          <div class="player-header">
            <span class="players-count global-h1">Players ({currentCount}/{maxPlayers})</span>
            <div class="toggle-switch">
              <span class="toggle-label">Are you Playing?</span>
              <label class="switch">
                <input
                  type="checkbox"
                  checked={isPlaying}
                  onChange={(e) => setIsPlaying(e.target.checked)}
                />
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <div className="break"></div>

          {!hide ? (
            <>
              <PlayerLists PlayerLists={friendsList} gameType={gameType} />
              {friendsList.length < maxCanAdd && (
                <div className="add-player-bottom">
                  <button className="add-player-btn-bottom" onClick={toggleAddFriendPopUp}>
                    👤 Add Player
                  </button>
                </div>
              )}
            </>
          ) : (
            <div class="add-player-section">
              <div class="player-icon">
                <img src={addFriend} alt="Add Player Icon" />
              </div>
              {friendsList.length < maxCanAdd && (
                <button class="add-player-btn" onClick={toggleAddFriendPopUp}>
                  Add Player
                </button>
              )}
            </div>
          )}

          <div
            class="save-and-back"
            style={{ display: hide ? "none" : "flex" }}
          >
            <button onClick={handleBack}>Back</button>
            <button className="save" onClick={handleSaveAndNext}>Save and Next</button>
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
          maxCanAdd={maxCanAdd}
          gameType={gameType}
          isPlaying={isPlaying}
        />
      )}
    </>
  );
};

export default AddFriends;
