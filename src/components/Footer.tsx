import React from 'react';

interface FooterProps {
  version?: string;
}

export const Footer: React.FC<FooterProps> = ({ version = '1.0.0' }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p className="footer-text">Merchant Portal</p>
          <p className="footer-version">Version {version}</p>
        </div>
        <div className="footer-section">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Paysurity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;