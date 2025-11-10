import React, { useState } from 'react';

const Settings = ({ user, onSaveProfile }) => {
    const [profile, setProfile] = useState(user);
    const handleChange = (e) => setProfile({ ...profile, [e.target.id]: e.target.value });

    return (
        <div className="module-content active" id="settings">
            <h2 className="page-title">Account Settings</h2>
            <div className="card">
                <div className="card-header"><div className="card-title">Personal Information</div></div>
                <div className="settings-form">
                    <div className="form-group"><label>Full Name</label><input type="text" id="name" className="form-control" value={profile.name} onChange={handleChange} /></div>
                    <div className="form-group"><label>Email</label><input type="email" id="email" className="form-control" value={profile.email} onChange={handleChange} /></div>
                    <div className="form-group"><label>Phone</label><input type="tel" id="phone" className="form-control" value={profile.phone} onChange={handleChange} /></div>
                    <div className="form-group"><label>Department</label><input type="text" id="department" className="form-control" value={profile.department} onChange={handleChange} /></div>
                    <div className="form-group"><label>Position</label><input type="text" id="position" className="form-control" value={profile.position} onChange={handleChange} /></div>
                    <button className="btn btn-primary" onClick={() => onSaveProfile(profile)}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};
export default Settings;