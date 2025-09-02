// @ts-nocheck
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEdit, 
  faCamera, 
  faUser, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faCalendarAlt,
  faTrophy,
  faGamepad,
  faUsers,
  faStar,
  faCog,
  faSignOutAlt,
  faHeart,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "../styles/profile.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - in a real app, this would come from an API or context
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "January 2024",
    bio: "Passionate tennis player with 5+ years of experience. Love playing competitive matches and helping others improve their game.",
    avatar: "/images/usser.png",
    stats: {
      gamesPlayed: 127,
      gamesWon: 89,
      friends: 45,
      rating: 4.8
    },
    achievements: [
      { title: "Tennis Champion", description: "Won local tournament", icon: faTrophy },
      { title: "Team Player", description: "Led team to victory", icon: faUsers },
      { title: "Rising Star", description: "Most improved player", icon: faStar }
    ],
    recentGames: [
      { opponent: "Mike Johnson", result: "Won", score: "6-4, 7-5", date: "2024-01-15" },
      { opponent: "Sarah Wilson", result: "Lost", score: "4-6, 6-7", date: "2024-01-12" },
      { opponent: "David Brown", result: "Won", score: "6-2, 6-1", date: "2024-01-10" }
    ]
  });

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to an API
    setIsEditing(false);
  };

  const renderOverview = () => (
    <div className="profile-overview">
      <div className="profile-header">
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            <img src={userData.avatar} alt="Profile" />
            <button className="avatar-edit-btn">
              <FontAwesomeIcon icon={faCamera} />
            </button>
          </div>
          <div className="profile-info">
            <h2>{userData.name}</h2>
            <p className="user-location">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {userData.location}
            </p>
            <p className="user-join-date">
              <FontAwesomeIcon icon={faCalendarAlt} /> Member since {userData.joinDate}
            </p>
          </div>
        </div>
        <div className="profile-actions">
          <button className="btn btn-primary" onClick={handleEditProfile}>
            <FontAwesomeIcon icon={faEdit} /> Edit Profile
          </button>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <FontAwesomeIcon icon={faGamepad} className="stat-icon" />
          <div className="stat-content">
            <h3>{userData.stats.gamesPlayed}</h3>
            <p>Games Played</p>
          </div>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faTrophy} className="stat-icon" />
          <div className="stat-content">
            <h3>{userData.stats.gamesWon}</h3>
            <p>Games Won</p>
          </div>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faUsers} className="stat-icon" />
          <div className="stat-content">
            <h3>{userData.stats.friends}</h3>
            <p>Friends</p>
          </div>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faStar} className="stat-icon" />
          <div className="stat-content">
            <h3>{userData.stats.rating}</h3>
            <p>Rating</p>
          </div>
        </div>
      </div>

      <div className="profile-bio">
        <h3>About Me</h3>
        <p>{userData.bio}</p>
      </div>

      <div className="profile-achievements">
        <h3>Achievements</h3>
        <div className="achievements-grid">
          {userData.achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <FontAwesomeIcon icon={achievement.icon} className="achievement-icon" />
              <h4>{achievement.title}</h4>
              <p>{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGames = () => (
    <div className="profile-games">
      <h3>Recent Games</h3>
      <div className="games-list">
        {userData.recentGames.map((game, index) => (
          <div key={index} className={`game-card ${game.result.toLowerCase()}`}>
            <div className="game-result">
              <span className={`result-badge ${game.result.toLowerCase()}`}>
                {game.result}
              </span>
            </div>
            <div className="game-details">
              <h4>vs {game.opponent}</h4>
              <p className="game-score">{game.score}</p>
              <p className="game-date">{game.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="profile-settings">
      <h3>Account Settings</h3>
      <div className="settings-section">
        <h4>Personal Information</h4>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" defaultValue={userData.name} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" defaultValue={userData.email} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" defaultValue={userData.phone} />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" defaultValue={userData.location} />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea defaultValue={userData.bio} rows="4"></textarea>
        </div>
        <button className="btn btn-primary">Save Changes</button>
      </div>

      <div className="settings-section">
        <h4>Social Media</h4>
        <div className="social-links">
          <div className="social-link">
            <FontAwesomeIcon icon={faFacebook} />
            <input type="text" placeholder="Facebook URL" />
          </div>
          <div className="social-link">
            <FontAwesomeIcon icon={faTwitter} />
            <input type="text" placeholder="Twitter URL" />
          </div>
          <div className="social-link">
            <FontAwesomeIcon icon={faInstagram} />
            <input type="text" placeholder="Instagram URL" />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h4>Account Actions</h4>
        <button className="btn btn-danger">
          <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="sidebar-section">
              <h3>Profile Menu</h3>
              <nav className="profile-nav">
                <button 
                  className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <FontAwesomeIcon icon={faUser} />
                  Overview
                </button>
                <button 
                  className={`nav-item ${activeTab === 'games' ? 'active' : ''}`}
                  onClick={() => setActiveTab('games')}
                >
                  <FontAwesomeIcon icon={faGamepad} />
                  Games
                </button>
                <button 
                  className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <FontAwesomeIcon icon={faCog} />
                  Settings
                </button>
              </nav>
            </div>
          </div>

          <div className="profile-main">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'games' && renderGames()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 