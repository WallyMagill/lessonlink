import './profile_view.css';

function ProfileView() {
  return (
    <div className="manage-account-container">
      <header className="header">
        <div className="logo">LESSONLINK</div>
        <div className="header-actions">
          <button type="button" className="user-icon">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Eo_circle_blue_letter-a.svg/1024px-Eo_circle_blue_letter-a.svg.png" alt="user" />
          </button>
        </div>
      </header>

      <div className="account-content">
        <h1>Hello, Sarah</h1>

        <div className="account-details">
          <div className="user-preferences">
            <div className="preference-section">
              <h3>Selected Grade Levels:</h3>
              <div className="tag-container">
                <div className="tag">
                  grade 3
                  <button type="button">✏️</button>
                </div>
                <div className="tag">
                  grade 4
                  <button type="button">✏️</button>
                </div>
              </div>
            </div>

            <div className="preference-section">
              <h3>Selected Subjects:</h3>
              <div className="tag-container">
                <div className="tag">
                  math
                  <button type="button">✏️</button>
                </div>
                <div className="tag">
                  science
                  <button type="button">✏️</button>
                </div>
                <div className="tag">
                  reading
                  <button type="button">✏️</button>
                </div>
              </div>
            </div>

            <div className="preference-section">
              <h3>Dark Mode:</h3>
              <div className="toggle-switch">
                <div className="toggle-slider" />
              </div>
            </div>
          </div>

          <div className="account-settings">
            <div className="setting-item">
              <h3>Username:</h3>
              <input
                type="text"
                placeholder="name@school.org"

              />
            </div>

            <div className="setting-item">
              <h3>Password:</h3>
              <input
                type="password"
                placeholder="xxxxxxxxxx"

              />
            </div>

            <div className="profile-photo">
              <h3>Profile Photo:</h3>
              <div className="photo-container">
                <div className="photo-placeholder">F</div>
                <button type="button" className="edit-icon">✏️</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
