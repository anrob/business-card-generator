import React, { useState } from 'react';

export default function BusinessCardEditor() {
  const [businessInfo, setBusinessInfo] = useState({
    name: "Riley Hodgetts",
    title: "CEO",
    company: "Rileys Real Estate",
    description: "A boutique real estate agency...",
    email: "riley@rileysrealestate.com.au",
    website: "rileysrealestate.com.au",
    social: "twitter.com/rileysrealestate",
  });

  const saveToAirtable = async () => {
    try {
      const response = await fetch('/api/save-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(businessInfo),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      alert('Saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving card');
    }
  };

  // ... rest of your component code ...

  return (
    // ... your existing JSX ...
    <button onClick={saveToAirtable}>Save Changes</button>
    // ... rest of JSX ...
  );
}
