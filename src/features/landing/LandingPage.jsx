import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            {/* Navbar */}
            <nav className="landing-nav">
                <div className="landing-logo-container">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.2 4H4V13.8C4 16.7823 6.41766 19.2 9.4 19.2C10.3941 19.2 11.2 18.3941 11.2 17.4V4ZM19.2 4H12V11.2H19.2V4ZM19.2 12H12V17.4C12 18.3941 12.8059 19.2 13.8 19.2C16.7823 19.2 19.2 16.7823 19.2 13.8V12Z" fill="#0052CC" />
                    </svg>
                    <span className="landing-logo-text">Jira</span>
                </div>
                <div className="landing-nav-links">
                    <button className="landing-login-btn" onClick={() => navigate("/login")}>Log In</button>
                    <button className="landing-signup-btn" onClick={() => navigate("/signup")}>Get it free</button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="landing-hero">
                <div className="landing-hero-content">
                    <h1 className="landing-hero-title">Move fast, stay aligned, and build better - together</h1>
                    <p className="landing-hero-subtitle">
                        The #1 software development tool used by agile teams. Plan, track, and release world-class software.
                    </p>
                    <div className="landing-cta-group">
                        <button className="landing-cta-primary" onClick={() => navigate("/signup")}>Get it free</button>
                    </div>
                </div>
                <div className="landing-hero-image">
                    {/* Abstract UI Representation */}
                    <div className="landing-abstract-ui">
                        <div className="landing-ui-header">
                            <div className="landing-dot"></div>
                            <div className="landing-dot"></div>
                            <div className="landing-dot"></div>
                        </div>
                        <div className="landing-ui-body">
                            <div className="landing-ui-sidebar"></div>
                            <div className="landing-ui-content">
                                <div className="landing-ui-row"></div>
                                <div className="landing-ui-row"></div>
                                <div className="landing-ui-card"></div>
                                <div className="landing-ui-card"></div>
                                <div className="landing-ui-card landing-ui-card-yellow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Trusted By Section */}
            <section className="landing-trusted-section">
                <p className="landing-trusted-title">TRUSTED BY 100,000+ TEAMS</p>
                <div className="landing-logo-grid">
                    <div className="landing-company-logo">SQUARE</div>
                    <div className="landing-company-logo">EBAY</div>
                    <div className="landing-company-logo">SPOTIFY</div>
                    <div className="landing-company-logo">CISCO</div>
                    <div className="landing-company-logo">AIRBNB</div>
                </div>
            </section>

            {/* Features Section */}
            <section className="landing-features-section">
                <h2 className="landing-features-header">All the features you need</h2>
                <div className="landing-cards-grid">
                    <div className="landing-feature-card">
                        <div className="landing-icon-container">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#0052cc" strokeWidth="2" /><path d="M9 3V21" stroke="#0052cc" strokeWidth="2" /></svg>
                        </div>
                        <h3 className="landing-card-title">Plan</h3>
                        <p className="landing-card-text">Create user stories and issues, plan sprints, and distribute tasks across your software team.</p>
                    </div>
                    <div className="landing-feature-card">
                        <div className="landing-icon-container">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M4 12H20" stroke="#0052cc" strokeWidth="2" /><path d="M15 7L20 12L15 17" stroke="#0052cc" strokeWidth="2" /></svg>
                        </div>
                        <h3 className="landing-card-title">Track </h3>
                        <p className="landing-card-text">Prioritize and discuss your team’s work in full context with complete visibility.</p>
                    </div>
                    <div className="landing-feature-card">
                        <div className="landing-icon-container">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M18 20V10" stroke="#0052cc" strokeWidth="2" /><path d="M12 20V4" stroke="#0052cc" strokeWidth="2" /><path d="M6 20V14" stroke="#0052cc" strokeWidth="2" /></svg>
                        </div>
                        <h3 className="landing-card-title">Report</h3>
                        <p className="landing-card-text">Improve team performance based on real-time, visual data that your team can put to use.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="landing-footer-content">
                    <div className="landing-footer-logo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.2 4H4V13.8C4 16.7823 6.41766 19.2 9.4 19.2C10.3941 19.2 11.2 18.3941 11.2 17.4V4ZM19.2 4H12V11.2H19.2V4ZM19.2 12H12V17.4C12 18.3941 12.8059 19.2 13.8 19.2C16.7823 19.2 19.2 16.7823 19.2 13.8V12Z" fill="#0052CC" />
                        </svg>
                        <span className="landing-footer-logo-text">Jira</span>
                    </div>
                    <div className="landing-copyright">
                        © 2026 Jira Copy. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;

