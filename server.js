const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const HOST = '0.0.0.0';

const server = http.createServer((req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Content-Type', 'text/html');
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Envision - React Native App</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 40px;
      max-width: 600px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 {
      color: #333;
      margin-bottom: 10px;
      font-size: 2rem;
    }
    .badge {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      margin-bottom: 20px;
    }
    .info-box {
      background: #f8f9fa;
      border-left: 4px solid #667eea;
      padding: 16px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }
    .info-box h3 {
      color: #667eea;
      margin-bottom: 8px;
    }
    .info-box p {
      color: #555;
      line-height: 1.6;
    }
    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 20px 0;
    }
    .tech-tag {
      background: #e9ecef;
      color: #495057;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.85rem;
    }
    .warning {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 16px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }
    .warning h3 {
      color: #856404;
      margin-bottom: 8px;
    }
    .warning p {
      color: #856404;
      line-height: 1.6;
    }
    ul {
      color: #555;
      padding-left: 20px;
      margin: 10px 0;
    }
    li {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Envision</h1>
    <span class="badge">React Native Mobile App</span>
    
    <div class="info-box">
      <h3>About This Project</h3>
      <p>Envision is a React Native mobile application designed for iOS and Android platforms. It features user authentication, product browsing, order management, and more.</p>
    </div>
    
    <h3 style="color: #333; margin-bottom: 10px;">Technology Stack</h3>
    <div class="tech-stack">
      <span class="tech-tag">React Native 0.58</span>
      <span class="tech-tag">MobX</span>
      <span class="tech-tag">React Navigation</span>
      <span class="tech-tag">Keycloak Auth</span>
      <span class="tech-tag">iOS</span>
      <span class="tech-tag">Android</span>
    </div>
    
    <div class="warning">
      <h3>Development Note</h3>
      <p>This is a native mobile application that requires iOS/Android development tools to run:</p>
      <ul>
        <li>For iOS: Xcode on macOS</li>
        <li>For Android: Android Studio with SDK</li>
        <li>React Native CLI for building and running</li>
      </ul>
      <p style="margin-top: 10px;">The app cannot be previewed in a web browser as it uses native mobile components and APIs.</p>
    </div>
    
    <div class="info-box">
      <h3>Project Structure</h3>
      <p><strong>js/</strong> - React Native components and business logic</p>
      <p><strong>android/</strong> - Android native project files</p>
      <p><strong>ios/</strong> - iOS native project files</p>
      <p><strong>assets/</strong> - Fonts and static resources</p>
    </div>
  </div>
</body>
</html>`;

  res.writeHead(200);
  res.end(html);
});

server.listen(PORT, HOST, () => {
  console.log(`Envision project info server running at http://${HOST}:${PORT}`);
});
