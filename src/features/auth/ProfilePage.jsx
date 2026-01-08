import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';
import { Camera, Edit2, Save, X, Loader2 } from 'lucide-react';
import { formatError } from '../../utils/renderUtils';
import ModeSwitchRequestModal from './ModeSwitchRequestModal';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user, checkAuth, switchMode } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [switchingMode, setSwitchingMode] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const fileInputRef = useRef(null);

    if (!user) return <div style={{ padding: '40px' }}>Loading profile...</div>;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setError('');
        try {
            await authService.uploadAvatar(file);
            await checkAuth(); // Refresh user data to get new avatar URL
            setSuccess('Profile picture updated successfully');
        } catch (err) {
            setError('Failed to upload profile picture');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const updateData = {};
            if (formData.username !== user.username) updateData.username = formData.username;
            if (formData.email !== user.email) updateData.email = formData.email;
            if (formData.password) updateData.password = formData.password;

            if (Object.keys(updateData).length > 0) {
                await authService.updateProfile(updateData);
                await checkAuth();
                setSuccess('Profile updated successfully');
                setIsEditing(false);
            } else {
                setIsEditing(false);
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const [showRequestModal, setShowRequestModal] = useState(null);

    const handleSwitchMode = (mode) => {
        if (user.view_mode === mode) return;
        setShowRequestModal(mode);
    };

    const onRequestSuccess = () => {
        setShowRequestModal(null);
        setSuccess('Your request has been sent to the Master Admin for approval.');
        setTimeout(() => setSuccess(''), 5000);
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar-container">
                        <div className="profile-avatar-large" onClick={handleAvatarClick}>
                            {user.profile_pic ? (
                                <img src={`/api${user.profile_pic}`} alt={user.username} className="avatar-img" />
                            ) : (
                                user.username.charAt(0).toUpperCase()
                            )}
                            <div className="avatar-overlay">
                                <Camera size={24} />
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="profile-title-area">
                        <div className="profile-name-row">
                            <div className="name-with-banner">
                                <h1>{user.username}</h1>
                                {user.is_master_admin && (
                                    <span className="master-admin-badge" title="Full System Access">
                                        🛡️ Master Administrator
                                    </span>
                                )}
                            </div>
                            {!isEditing && (
                                <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                                    <Edit2 size={16} /> Edit Profile
                                </button>
                            )}
                        </div>
                        <span className="profile-role-badge">{user.role}</span>
                    </div>
                </div>

                {user.is_master_admin && (
                    <div className="master-admin-banner">
                        <div className="banner-icon">🛡️</div>
                        <div className="banner-content">
                            <h3>Master Administrator</h3>
                            <p>You have full access to all projects and users in the system.</p>
                        </div>
                    </div>
                )}

                {error && <div className="profile-alert error">{formatError(error)}</div>}
                {success && <div className="profile-alert success">{success}</div>}

                <div className="profile-body">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="profile-edit-form">
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password (leave blank to keep current)</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="********"
                                />
                            </div>
                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
                                    <X size={16} /> Cancel
                                </button>
                                <button type="submit" className="save-btn" disabled={loading}>
                                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="profile-details">
                            {!user.is_master_admin && (
                                <section className="profile-section mode-switch-section">
                                    <h3>View Mode</h3>
                                    <p className="mode-description">
                                        Switch between roles to manage your own projects or view assigned tasks.
                                    </p>
                                    <div className="mode-toggle-group">
                                        <button
                                            className={`mode-btn ${user.view_mode === 'DEVELOPER' ? 'active' : ''}`}
                                            onClick={() => handleSwitchMode('DEVELOPER')}
                                            disabled={switchingMode}
                                        >
                                            <div className="mode-btn-content">
                                                <span className="mode-icon">👨‍💻</span>
                                                <div className="mode-text">
                                                    <span className="mode-label">Developer Mode</span>
                                                    <span className="mode-sublabel">See projects where you're assigned</span>
                                                </div>
                                            </div>
                                        </button>
                                        <button
                                            className={`mode-btn ${user.view_mode === 'ADMIN' ? 'active' : ''}`}
                                            onClick={() => handleSwitchMode('ADMIN')}
                                            disabled={switchingMode}
                                        >
                                            <div className="mode-btn-content">
                                                <span className="mode-icon">🏗️</span>
                                                <div className="mode-text">
                                                    <span className="mode-label">Admin Mode</span>
                                                    <span className="mode-sublabel">See projects you own/created</span>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </section>
                            )}

                            <section className="profile-section">
                                <h3>Account Information</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>User ID</label>
                                        <p>{user.id}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Username</label>
                                        <p>{user.username}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Email</label>
                                        <p>{user.email}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Joined</label>
                                        <p>{new Date(user.created_at).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </div>
            {showRequestModal && (
                <ModeSwitchRequestModal
                    requestedMode={showRequestModal}
                    onClose={() => setShowRequestModal(null)}
                    onSuccess={onRequestSuccess}
                />
            )}
        </div>
    );
};

export default ProfilePage;
