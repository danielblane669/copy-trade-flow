import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    TradingView: any;
  }
}

interface TradingViewChartProps {
  symbol?: string;
  theme?: 'light' | 'dark';
  height?: number;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({ 
  symbol = 'COINBASE:BTCUSD', 
  theme = 'light',
  height = 400
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
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: "D",
          timezone: "Etc/UTC",
          theme: theme,
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: containerRef.current.id,
          hide_side_toolbar: false,
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
  }, [symbol, theme]);
  
  return (
    <div className="w-full rounded-lg border border-border overflow-hidden">
      <div 
        ref={containerRef} 
        id="tradingview_widget" 
        className="w-full" 
        style={{ height: `${height}px` }}
      />
    </div>
  );
};

export default TradingViewChart;
