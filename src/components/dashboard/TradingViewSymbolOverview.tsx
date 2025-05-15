import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    TradingView: any;
  }
}

interface TradingViewSymbolOverviewProps {
  height?: number;
  theme?: 'light' | 'dark';
}

const TradingViewSymbolOverview: React.FC<TradingViewSymbolOverviewProps> = ({
  height = 400,
  theme = 'light'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  
  useEffect(() => {
    // Clean up any previous instance
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    
    // Create script element if it doesn't exist yet
    if (!scriptRef.current) {
      scriptRef.current = document.createElement('script');
      scriptRef.current.src = 'https://s3.tradingview.com/tv.js';
      scriptRef.current.async = true;
      document.head.appendChild(scriptRef.current);
    }
    
    const onScriptLoad = () => {
      if (window.TradingView && containerRef.current) {
        new window.TradingView.MediumWidget({
          "symbols": [
            ["Bitcoin", "COINBASE:BTCUSD|1M"],
            ["Ethereum", "COINBASE:ETHUSD|1M"],
            ["XRP", "COINBASE:XRPUSD|1M"]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": height,
          "locale": "en",
          "colorTheme": theme,
          "autosize": true,
          "showVolume": false,
          "hideDateRanges": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "12",
          "noTimeScale": false,
          "valuesTracking": "1",
          "chartType": "line",
          "container_id": containerRef.current.id,
        });
      }
    };
    
    // If TradingView is already loaded, initialize widget
    if (window.TradingView) {
      onScriptLoad();
    } else {
      // Otherwise wait for script to load
      scriptRef.current!.addEventListener('load', onScriptLoad);
    }
    
    return () => {
      if (scriptRef.current) {
        scriptRef.current.removeEventListener('load', onScriptLoad);
      }
    };
  }, [theme, height]);
  
  return (
    <div className="w-full rounded-lg border border-border overflow-hidden">
      <div 
        ref={containerRef} 
        id="tradingview_symbol_overview" 
        className="w-full" 
        style={{ height: `${height}px` }}
      />
    </div>
  );
};

export default TradingViewSymbolOverview;
