import React from 'react';
import './GoogleMap.css';

const GoogleMap = () => {
    // Actual Google Maps embed URL - You need to replace this with your real location
    // Get your embed URL from: https://www.google.com/maps
    // 1. Search for your business address
    // 2. Click "Share" button
    // 3. Click "Embed a map" tab
    // 4. Copy the iframe src URL
    
    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2176415079243!2d-73.98823492346678!3d40.75797037139097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123";

    return (
        <section className="google-map-section">
            <div className="google-map-container">
                <iframe
                    src={mapEmbedUrl}
                    className="google-map-iframe"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Javelin Associates Location"
                ></iframe>
            </div>
        </section>
    );
};

export default GoogleMap;
