
import React, { useEffect } from 'react';

const LiveChat: React.FC = () => {
  useEffect(() => {
    // Add Smartsupp chat widget script
    const script = document.createElement('script');
    script.innerHTML = `
      var _smartsupp = _smartsupp || {};
      _smartsupp.key = 'YOUR_SMARTSUPP_KEY';
      window.smartsupp||(function(d) {
        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
        c.type='text/javascript';c.charset='utf-8';c.async=true;
        c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
      })(document);
    `;
    document.head.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      document.head.removeChild(script);
    };
  }, []);
  
  return null; // This component doesn't render anything visible
};

export default LiveChat;
