import React from 'react';
// A generic modal wrapper

const ProfileModal = ({ isOpen, onClose, profile }) => {
    return (
        <div className={`profile-modal ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className="profile-content" onClick={e => e.stopPropagation()}>
                <div className="profile-header">
                    <h3>User Profile</h3>
                    <button className="close-modal" onClick={onClose}>&times;</button>
                </div>
                <div className="profile-avatar">{profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}</div>
                <div className="profile-details">
                    <div className="profile-detail"><span>Full Name:</span><span>{profile.name}</span></div>
                    <div className="profile-detail"><span>Role:</span><span>{profile.role}</span></div>
                    <div className="profile-detail"><span>Email:</span><span>{profile.email}</span></div>
                    <div className="profile-detail"><span>Phone:</span><span>{profile.phone}</span></div>
                    <div className="profile-detail"><span>Department:</span><span>{profile.department}</span></div>
                    <div className="profile-detail"><span>Last Login:</span><span>{profile.lastLogin}</span></div>
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '25px' }}>
                    <button type="button" className="btn btn-outline" onClick={onClose}>Close</button>
                    <button type="button" className="btn btn-primary">Edit Profile</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;