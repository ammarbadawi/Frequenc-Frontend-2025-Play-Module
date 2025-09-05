// @ts-nocheck
import React, { useEffect, useState } from "react";
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
import usersService from "../services/usersService";
import paymentsService from "../services/paymentsService";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState<any>(null);
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const profile = await usersService.getProfile();
        // Normalize profile with safe defaults to avoid undefined property access
        const normalized = {
          name: profile?.name ?? 'User',
          email: profile?.email ?? '',
          phone: profile?.phone ?? '',
          location: profile?.location ?? '',
          joinDate: profile?.joinDate ?? '',
          bio: profile?.bio ?? '',
          avatar: profile?.avatar ?? '/images/usser.png',
          stats: {
            gamesPlayed: profile?.stats?.gamesPlayed ?? 0,
            gamesWon: profile?.stats?.gamesWon ?? 0,
            friends: profile?.stats?.friends ?? 0,
            rating: profile?.stats?.rating ?? 0,
          },
          achievements: Array.isArray(profile?.achievements) ? profile.achievements : [],
          recentGames: Array.isArray(profile?.recentGames) ? profile.recentGames : [],
        };
        setUserData(normalized);
        try {
          const ph = await paymentsService.getPaymentHistory(1, 10);
          const list = Array.isArray(ph?.payments) ? ph.payments : (Array.isArray(ph) ? ph : []);
          setPayments(list);
        } catch { }
        try {
          const st = await usersService.getUserStats();
          setStats(st);
        } catch { }
        try {
          const ach = await usersService.getUserAchievements();
          const listA = Array.isArray(ach?.achievements) ? ach.achievements : (Array.isArray(ach) ? ach : []);
          setAchievements(listA);
        } catch { }
      } catch (e) {
        setUserData({
          name: 'User',
          email: '',
          phone: '',
          location: '',
          joinDate: '',
          bio: '',
          avatar: '/images/usser.png',
          stats: { gamesPlayed: 0, gamesWon: 0, friends: 0, rating: 0 },
          achievements: [],
          recentGames: [],
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      const payload = {
        name: (document.querySelector('input[name="name"]') as HTMLInputElement)?.value || userData.name,
        email: (document.querySelector('input[name="email"]') as HTMLInputElement)?.value || userData.email,
        phone: (document.querySelector('input[name="phone"]') as HTMLInputElement)?.value || userData.phone,
        location: (document.querySelector('input[name="location"]') as HTMLInputElement)?.value || userData.location,
        bio: (document.querySelector('textarea[name="bio"]') as HTMLTextAreaElement)?.value || userData.bio,
      };
      if (!payload.name?.trim()) { alert('Name is required'); setSaving(false); return; }
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (payload.email && !emailRe.test(payload.email)) { alert('Enter a valid email'); setSaving(false); return; }
      if (payload.phone && payload.phone.length < 6) { alert('Enter a valid phone'); setSaving(false); return; }
      const updated = await usersService.updateProfile(payload);
      setUserData(updated);
      setIsEditing(false);
    } catch (e) {
      alert(e.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !userData) {
    return <div style={{ padding: 20 }}>Loading profile...</div>;
  }

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
            <h3>{(stats?.gamesPlayed) ?? userData?.stats?.gamesPlayed ?? 0}</h3>
            <p>Games Played</p>
          </div>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faTrophy} className="stat-icon" />
          <div className="stat-content">
            <h3>{(stats?.gamesWon) ?? userData?.stats?.gamesWon ?? 0}</h3>
            <p>Games Won</p>
          </div>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faUsers} className="stat-icon" />
          <div className="stat-content">
            <h3>{(stats?.friends) ?? userData?.stats?.friends ?? 0}</h3>
            <p>Friends</p>
          </div>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faStar} className="stat-icon" />
          <div className="stat-content">
            <h3>{(stats?.rating) ?? userData?.stats?.rating ?? 0}</h3>
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
          {(achievements.length ? achievements : (userData?.achievements ?? [])).map((achievement, index) => (
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
        {(userData?.recentGames ?? []).map((game, index) => (
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
          <input name="name" type="text" defaultValue={userData.name} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input name="email" type="email" defaultValue={userData.email} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input name="phone" type="tel" defaultValue={userData.phone} />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input name="location" type="text" defaultValue={userData.location} />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea name="bio" defaultValue={userData.bio} rows="4"></textarea>
        </div>
        <button className="btn btn-primary" onClick={handleSaveProfile} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
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

      <div className="settings-section">
        <h4>Payments</h4>
        {payments.length === 0 ? (
          <p>No payments yet.</p>
        ) : (
          <div>
            {payments.map((p, i) => (
              <div key={p.id || i} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div><strong>Amount:</strong> ${p.amount}</div>
                    <div style={{ color: '#666', fontSize: 12 }}>{new Date(p.createdAt || p.date).toLocaleString()}</div>
                  </div>
                  <div>
                    <button onClick={async () => {
                      try { await paymentsService.requestRefund(p.id, 'Requested by user'); alert('Refund requested'); }
                      catch (e) { alert(e.message || 'Failed to request refund'); }
                    }} style={{ background: 'transparent', border: '1px solid #7930d8', color: '#7930d8', padding: '6px 10px', borderRadius: 6, cursor: 'pointer' }}>Request Refund</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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