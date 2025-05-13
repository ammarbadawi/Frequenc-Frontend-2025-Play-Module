import React, { useEffect, useState } from "react";
import "../../styles/create.scss";

export const CreatePopUp = ({ setIsPopUpEnabled, setIsMatchPopUpEnabled }) => {
  const [selectedContainer, setSelectedContainer] = React.useState(true);

  useEffect(() => {
    handlePopUp(1);

    return () => {
      // Cleanup overlay if component unmounts
      const existingOverlay = document.getElementById("global-overlay");
      if (existingOverlay) existingOverlay.remove();
      document.body.style.overflow = "unset";
    };
  }, []);

  const handlePopUp = (state) => {
    if (state === 1) {
      setIsPopUpEnabled(true);
      // Create overlay and add it to body
      document.body.style.overflow = "hidden";
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      overlay.id = "global-overlay";
      document.body.appendChild(overlay);
    } else {
      setIsPopUpEnabled(false);
      // Remove overlay when popup closes
      const existingOverlay = document.getElementById("global-overlay");
      if (existingOverlay) existingOverlay.remove();
      document.body.style.overflow = "unset";
    }
  };

  const handleMatchPopUp = () => {
    setIsMatchPopUpEnabled(true);
  };

  return (
    <div className="createPopUp1 detail-popUp">
      <div className="close-btn global-h1" onClick={() => handlePopUp(0)}>
        ✖
      </div>
      <h1 className="global-h1">Where are you Playing?</h1>
      <div
        className={
          selectedContainer
            ? "createPopUp-container createPopUp-container-bg"
            : "createPopUp-container"
        }
        onClick={() => setSelectedContainer(true)}
      >
        <h5>In a FrequenC Club</h5>
        <p>
          Pick a club from our list and publish your match so any player can
          join.
        </p>
      </div>
      <div
        className={
          !selectedContainer
            ? "createPopUp-container createPopUp-container-bg"
            : "createPopUp-container"
        }
        onClick={() => setSelectedContainer(false)}
      >
        <h5>I already know where I’m Playing</h5>
        <p>
          Arrange a match at a venue that is not within the option offered by
          frequenC.
        </p>
      </div>

      <button onClick={handleMatchPopUp}>Continue</button>
    </div>
  );
};

// create match popUP
export const CreateMatchPopUp = ({
  setIsSuccessPopUpEnabled,
  setIsMatchPopUpEnabled,
  setIsPopUpEnabled,
}) => {
  const [isPublic, setIsPublic] = useState(false);
  const [isFree, setIsFree] = useState(true);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("doubles");
  return (
    <div className="create-match detail-popUp">
      <div className="play-selector">
        <div className="toggle-section">
          <label className="label">Do you want to play?</label>
          <div className="toggle-wrapper">
            <span className="option-text">Private</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
              />
              <span className="slider"></span>
            </label>
            <span className="option-text">Public</span>
          </div>
        </div>

        <div className="dropdown-section">
          <label className="label">What sport do you want to play?</label>
          <select className="custom-dropdown">
            <option value="">Type game Name</option>
            <option value="football">Football</option>
            <option value="tennis">Tennis</option>
            <option value="badminton">Badminton</option>
          </select>
        </div>
      </div>

      <div className="break"></div>

      <div className="game-type">
        <label className="label">
          Are you going to make the game free or Paid?
        </label>
        <div className="options">
          <label className="radio-wrapper">
            <input
              type="radio"
              name="gameType"
              value="free"
              checked={isFree}
              onChange={() => setIsFree(true)}
            />
            <span className="custom-radio"></span>
            <span className="option-label">Free</span>
          </label>

          <label className="radio-wrapper">
            <input
              type="radio"
              name="gameType"
              value="paid"
              checked={!isFree}
              onChange={() => setIsFree(false)}
            />
            <span className="custom-radio"></span>
            <span className="option-label">Paid</span>
          </label>

          {!isFree && (
            <input
              type="number"
              className="amount-input"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="break"></div>

      <div className="player-mode">
        <label className="label">Add Players to your match</label>
        <div className="mode-buttons">
          <button
            className={`mode-btn ${mode === "singles" ? "active-singles" : ""}`}
            onClick={() => setMode("singles")}
          >
            Singles
          </button>
          <button
            className={`mode-btn ${mode === "doubles" ? "active-doubles" : ""}`}
            onClick={() => setMode("doubles")}
          >
            Doubles
          </button>
        </div>
      </div>

      <div className="break"></div>
      <AddPlayers />
      <div className="break"></div>
      <DateSelector />
      <div className="break"></div>
      <DurationSelector />
      <div className="break"></div>

      <div className="location-container">
        <label className="location-label">Location</label>
        <div className="location-input-group">
          <input
            type="text"
            placeholder="Location"
            className="location-input"
          />
          <span className="icon search-icon">🔍</span>
          <span className="icon gps-icon">📍</span>
        </div>
      </div>

      <div className="break"></div>
      <SkillLevel />
      <div className="break"></div>
      <MessageForm
        setIsSuccessPopUpEnabled={setIsSuccessPopUpEnabled}
        setIsMatchPopUpEnabled={setIsMatchPopUpEnabled}
        setIsPopUpEnabled={setIsPopUpEnabled}
      />
    </div>
  );
};

// create match popUp components
const players = [
  {
    name: "Aadil",
    image: "https://i.pravatar.cc/100?img=10", // Replace with actual image
    available: false,
  },
  { name: "", image: "", available: true },
  { name: "", image: "", available: true },
  { name: "", image: "", available: true },
  { name: "", image: "", available: true },
];

const dates = [
  { day: "Wed", date: "Aug 30" },
  { day: "Thu", date: "Sep 01" },
  { day: "Fri", date: "Sep 02" },
  { day: "Sat", date: "Sep 03" },
  { day: "Sun", date: "Sep 04" },
];

export const AddPlayers = () => {
  return (
    <div className="add-players-wrapper">
      {players.map((player, index) => (
        <div key={index} className="player-slot">
          {player.available ? (
            <>
              <div className="empty-slot">+</div>
              <span className="available-text">Available</span>
            </>
          ) : (
            <>
              <img
                className="player-image"
                src={player.image}
                alt={player.name}
              />
              <span className="player-name">{player.name}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState("Sep 02");

  return (
    <div className="date-time-wrapper">
      <h3>Date & Time</h3>

      <div className="month-select">
        <span>September , 2024</span>
        <span className="arrow">&#9662;</span>
      </div>

      <div className="date-scroll">
        <span className="nav-arrow">&#8249;</span>
        {dates.map(({ day, date }) => (
          <div
            key={date}
            className={`date-box ${selectedDate === date ? "active" : ""}`}
            onClick={() => setSelectedDate(date)}
          >
            <strong>{day}</strong>, {date}
          </div>
        ))}
        <span className="nav-arrow">&#8250;</span>
      </div>

      <div className="select-date">
        <label>Choose Date</label>
        <select>
          <option>Select date</option>
          {dates.map(({ date }) => (
            <option key={date}>{date}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const DurationSelector = () => {
  const [hours, setHours] = useState(1);

  const decrease = () => {
    if (hours > 1) setHours(hours - 1);
  };

  const increase = () => {
    setHours(hours + 1);
  };

  return (
    <div className="duration-wrapper">
      <label className="title">Duration</label>
      <div className="duration-control">
        <button onClick={decrease}>−</button>
        <span>{hours} Hr</span>
        <button onClick={increase}>+</button>
      </div>
    </div>
  );
};

export const SkillLevel = () => {
  const [selected, setSelected] = useState("Advance");

  const handleChange = (level) => {
    setSelected(level);
  };

  return (
    <div className="skill-level">
      <label className="title">Skill Level</label>
      <div className="options">
        {["Beginner", "Intermediate", "Advance"].map((level) => (
          <label className="checkbox-label" key={level}>
            <input
              type="checkbox"
              checked={selected === level}
              onChange={() => handleChange(level)}
            />
            <span className="custom-checkbox" />
            <span className="label-text">{level}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export const MessageForm = ({
  setIsSuccessPopUpEnabled,
  setIsMatchPopUpEnabled,
  setIsPopUpEnabled,
}) => {
  const handleCancelBtn = () => {
    const existingOverlay = document.getElementById("global-overlay");
    if (existingOverlay) existingOverlay.remove();
    document.body.style.overflow = "unset";
  };

  const handleClick = () => {
    setIsSuccessPopUpEnabled(true);
    setIsMatchPopUpEnabled(false);
    setIsPopUpEnabled(false);

    document.body.style.overflow = "hidden";
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.id = "global-overlay";
    document.body.appendChild(overlay);
  };

  return (
    <div className="message-form">
      <label htmlFor="message" className="label">
        Message
      </label>
      <textarea
        id="message"
        className="textarea"
        placeholder="Write your additional Information"
        rows={4}
      ></textarea>

      <div className="buttons">
        <button className="cancel" onClick={handleCancelBtn}>
          Cancel
        </button>
        <button className="submit" onClick={handleClick}>
          Create Match
        </button>
      </div>
    </div>
  );
};
