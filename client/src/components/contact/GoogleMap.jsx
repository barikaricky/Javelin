import React from 'react';
import './GoogleMap.css';

const GoogleMap = () => {
    // Google Maps embed URL pointing to Javelin Associates business location
    // No. 58 Aker Road, opposite Renew Empire Iwofe, Port Harcourt
    // Search for "Javelin Associates Port Harcourt" on Google Maps to get the exact embed URL
    // For now using the address coordinates
    
    const mapEmbedUrl = "https://maps.app.goo.gl/s8KXaKHmmyLc2KcG9";

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
