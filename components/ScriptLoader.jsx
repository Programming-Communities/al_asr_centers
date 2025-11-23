// components/ScriptLoader.jsx - Handle missing scripts
import { useEffect } from 'react';

export default function ScriptLoader() {
  useEffect(() => {
    // Check if script exists before loading
    const scriptUrl = '/js/your-script.js';
    
    fetch(scriptUrl)
      .then(response => {
        if (response.ok) {
          const script = document.createElement('script');
          script.src = scriptUrl;
          document.body.appendChild(script);
        } else {
          console.warn('Script not found:', scriptUrl);
        }
      })
      .catch(error => {
        console.error('Error loading script:', error);
      });
  }, []);

  return null;
}