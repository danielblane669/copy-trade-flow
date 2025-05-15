
import React, { useEffect } from 'react';

declare global {
  interface Window {
    $crisp: any;
    CRISP_WEBSITE_ID: string;
    smartsupp: any;
  }
}

const LiveChat = () => {
  useEffect(() => {
    // Smartsupp live chat code
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      var _smartsupp = _smartsupp || {};
      _smartsupp.key = 'YOUR_SMARTSUPP_KEY';
      window.smartsupp||(function(d) {
        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
        s=d.createElement('script');c=d.getElementsByTagName('script')[0];
        s.type='text/javascript';s.charset='utf-8';s.async=true;
        s.src='https://www.smartsuppchat.com/loader.js?';c.parentNode.insertBefore(s,c);
      })(document);
    `;

    // Add script to document
    document.head.appendChild(script);

    // Optional: Configure Smartsupp
    window.smartsupp('theme:set', 'indigo');
    window.smartsupp('name', 'CryptoBroker Support');
    
    return () => {
      // Remove script on unmount if needed
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default LiveChat;
