import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const suppressHmrPlugin = {
  name: 'suppress-hmr-websocket',
  transformIndexHtml: {
    order: 'pre',
    handler() {
      return [
        {
          tag: 'script',
          children: `(function(){if(typeof window==='undefined')return;var _orig=console.error;console.error=function(){if(arguments[0]&&typeof arguments[0]==='string'&&(arguments[0].includes('[vite]')||arguments[0].includes('vite-hmr')||arguments[0].includes('WebSocket')))return;_orig.apply(console,arguments);};if(window.WebSocket){var R=window.WebSocket;window.WebSocket=function(u,p){if(typeof u==='string'&&(u.includes('vite-hmr')||u.includes('token='))){return{readyState:1,addEventListener:function(){},removeEventListener:function(){},send:function(){},close:function(){}};}return new R(u,p);};window.WebSocket.prototype=R.prototype;}})();`,
          injectTo: 'head-prepend'
        }
      ];
    }
  }
};

export default defineConfig({
  plugins: [react(), suppressHmrPlugin],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: 'all',
    hmr: false
  }
});