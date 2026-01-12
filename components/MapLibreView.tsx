import React from 'react';
import UniversalWebView from './UniversalMap';

// A high-performance MapLibre component optimized for Expo WebView
export default function  MapLibreView({ checkpoints,current }:{checkpoints:any,current:any}) {

  const mapHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <script src="https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.js"></script>
    <link href="https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css" rel="stylesheet" />
    <style>
      body { margin: 0; padding: 0; }
      #map { position: absolute; top: 0; bottom: 0; width: 100%; }
      .marker-container {
        display: flex; flex-direction: column; align-items: center;
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      .marker-card {
        width: 50px; height: 50px; 
        border-radius: 12px; 
        background-size: cover;
        background-position: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      }
      .marker-label {
        background: white; padding: 2px 8px; border-radius: 8px;
        font-size: 10px; font-weight: 800; margin-top: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        color: #1e293b; white-space: nowrap;
      }
      .user-dot {
        width: 15px; height: 15px; background: #3b82f6;
        border: 3px solid white; border-radius: 50%;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
    (function(){
    const cacheKeyCheckPoint = 'social_dine_checkpoints';
  const cachedData = localStorage.getItem(cacheKeyCheckPoint);
  let points = ${JSON.stringify(checkpoints)};
  
  if (points && points.length > 0) {
    localStorage.setItem(cacheKeyCheckPoint, JSON.stringify(points));
  } else if (cachedData) {
    points = JSON.parse(cachedData);
  }

      const map = new maplibregl.Map({
        container: 'map',
        style: 'https://tiles.openfreemap.org/styles/liberty',
        center: [${current[0]}, ${current[1]}], 
        zoom: 14,
        pitch: 0,
        dragRotate: false,
      });

      // Add Blue User Dot
      const userEl = document.createElement('div');
      userEl.className = 'user-dot';
      new maplibregl.Marker({ element: userEl })
        .setLngLat([${current[0]}, ${current[1]}])
        .addTo(map);


      map.on('load', () => {
        points.forEach(p => {
          const el = document.createElement('div');
          el.className = 'marker-container';
          
          const themeColor = p.type === 'hotel' ? '#3b82f6' : '#f97316';

          el.innerHTML = \`
            <div class="marker-card" onclick="sendToNative('\${p.id}')" style="border: 3px solid \${themeColor}; background-image: url('\${p.imageUrl}');"></div>
            <div class="marker-label">\${p.title}</div>
          \`;

          const marker = new maplibregl.Marker({ element: el })
            .setLngLat([p.coords.longitude, p.coords.latitude])
            .addTo(map);

          // Semantic Zoom: Hide details when zooming out past 12
          map.on('zoom', () => {
            const zoom = map.getZoom();
            el.style.opacity = zoom < 12.5 ? '0' : '1';
          });
        });

        const userEl = document.createElement('div');
    userEl.className = 'user-dot';
    new maplibregl.Marker({ element: userEl })
      .setLngLat([${current[0]}, ${current[1]}])
      .addTo(map);
        })
      }) ();

      window.sendToNative = function(id) {
  if (window.ReactNativeWebView) {
    // MOBILE: React Native WebView logic
    window.ReactNativeWebView.postMessage(id);
  } else {
    // WEB: Standard browser postMessage logic
    window.parent.postMessage({ type: 'HOTEL_CLICK', id: id }, '*');
  }
};
    </script>
  </body>
</html>
  `;

  return <UniversalWebView html={mapHtml} />;
}