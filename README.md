<!-- Save this content as README.md -->
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: #f7f7f7; padding: 30px; border-radius: 10px;">

  <h1 style="color: #0f172a; font-size: 2.5em; text-align: center;">🚀 Crossroads Technical Fest Website</h1>

  <p style="font-size: 1.2em; text-align: center;">
    A modern and fully responsive MERN stack web application built for <strong>HIET College's Crossroads Technical Fest</strong>.<br />
    <a href="https://crossroadhiet.netlify.app/" target="_blank" style="color: #3b82f6;">🌐 Live Project Link</a>
  </p>

  <hr style="border: none; border-top: 2px solid #ddd;" />

  <h2 style="color: #1e3a8a;">📌 About the Project</h2>
  <p>
    The Crossroads Fest website enables students to explore the list of exciting technical events, register with personalized team details, and reach out to the organizers via a contact form. It also proudly showcases our <strong>Tech Titans</strong> – the brilliant student organizers and leaders behind the fest.
  </p>

  <h2 style="color: #1e3a8a;">💡 Key Features</h2>
  <ul>
    <li>Event showcase with animated cards and timelines</li>
    <li>Dynamic registration form (team, leader, Aadhaar, event-based)</li>
    <li>Admin login portal for teachers and students (dashboard access)</li>
    <li>Smooth scroll and animation effects using AOS, GSAP, and Framer Motion</li>
    <li>3D carousel timeline & "Add to Google Calendar" feature</li>
    <li>Contact form for user queries</li>
    <li>MongoDB backend with Express.js and file upload (Multer + Cloudinary)</li>
  </ul>

  <h2 style="color: #1e3a8a;">📁 Folder Structure</h2>
  <pre style="background: #e2e8f0; padding: 15px; border-radius: 8px; overflow-x: auto;">
event/
│
├── BACKEND/
│   ├── app.js
│   ├── .env
│   ├── package.json
│   └── Schema/
│       └── schema.js
│
└── FRONTEND/
    ├── public/
    │   └── images
    ├── src/
        └── assets/
    │   └── Components/
    │       ├── Home.js
    │       ├── Event.jsx
    │       ├── EventDetails.jsx
    │       ├── Schedule.jsx
    │       ├── Registration.jsx
    │       └── Contact.jsx
    ├── index.html
    └── main.jsx (Vite + Tailwind base)
  </pre>

  <h2 style="color: #1e3a8a;">⚙️ Technologies Used</h2>
  <ul>
    <li><strong>Frontend:</strong> React.js, Vite, Tailwind CSS, GSAP, AOS, Framer Motion</li>
    <li><strong>Backend:</strong> Node.js, Express.js, MongoDB, Multer, Cloudinary, Nodemailer</li>
    <li><strong>Authentication:</strong> Admin login for dashboard access</li>
    <li><strong>Hosting:</strong> Netlify (Frontend), Render (Backend)</li>
  </ul>

  <h2 style="color: #1e3a8a;">📦 Frontend Dependencies</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background: #e0f2fe;">
        <th style="padding: 10px; border: 1px solid #ddd;">Package</th>
        <th style="padding: 10px; border: 1px solid #ddd;">Version</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="padding: 8px; border: 1px solid #ddd;">react</td><td>^19.1.0</td></tr>
      <tr><td>react-dom</td><td>^19.1.0</td></tr>
      <tr><td>react-router-dom</td><td>^7.4.1</td></tr>
      <tr><td>axios</td><td>^1.8.4</td></tr>
      <tr><td>tailwindcss</td><td>^4.1.2</td></tr>
      <tr><td>@tailwindcss/vite</td><td>^4.1.2</td></tr>
      <tr><td>react-icons</td><td>^5.5.0</td></tr>
      <tr><td>react-hook-form</td><td>^7.55.0</td></tr>
      <tr><td>framer-motion</td><td>^12.6.3</td></tr>
      <tr><td>react-toastify</td><td>^11.0.5</td></tr>
      <tr><td>gsap</td><td>^3.12.7</td></tr>
      <tr><td>aos</td><td>^2.3.4</td></tr>
      <tr><td>three</td><td>^0.175.0</td></tr>
      <tr><td>react-responsive-carousel</td><td>^3.2.23</td></tr>
    </tbody>
  </table>

  <h2 style="color: #1e3a8a;">🛠️ Backend Dependencies</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background: #e0f2fe;">
        <th style="padding: 10px; border: 1px solid #ddd;">Package</th>
        <th style="padding: 10px; border: 1px solid #ddd;">Version</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>express</td><td>^5.1.0</td></tr>
      <tr><td>mongoose</td><td>^8.13.2</td></tr>
      <tr><td>cors</td><td>^2.8.5</td></tr>
      <tr><td>dotenv</td><td>^16.4.7</td></tr>
      <tr><td>multer</td><td>^1.4.5-lts.2</td></tr>
      <tr><td>cloudinary</td><td>^2.6.0</td></tr>
      <tr><td>uuid</td><td>^11.1.0</td></tr>
      <tr><td>nodemailer</td><td>^6.10.0</td></tr>
      <tr><td>nodemon</td><td>^3.1.9</td></tr>
    </tbody>
  </table>

  <h2 style="color: #1e3a8a;">🧩 How to Run Locally</h2>
  <ol>
    <li>Clone the repo:
      <pre><code>git clone https://github.com/your-username/crossroads.git</code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>cd event/FRONTEND
npm install
cd ../BACKEND
npm install</code></pre>
    </li>
    <li>Configure environment variables in <code>.env</code></li>
    <li>Run the backend:
      <pre><code>nodemon app.js</code></pre>
      or
      <pre><code>npm run dev</code></pre>
    </li>
    <li>Run the frontend:
      <pre><code>npm run dev</code></pre>
    </li>
  </ol>

  <h2 style="color: #1e3a8a;">👥 Contributors</h2>
  <ul>
    <li><strong>Aman Gupta</strong> - MERN DEVELOPER, UI/UX, Project Lead</li>
    <li><strong>Manish Dargan</strong> - BACKEND DEVELOPER, UI/UX, </li>
    
  </ul>

  <h2 style="color: #1e3a8a;">📫 Contact</h2>
  <p>
    Have questions or suggestions? Reach out via the <strong>Contact</strong> section on the website or email at <strong>ag0567688@gmail.com</strong>.
  </p>

  <h2 style="color: #1e3a8a;">🌟 Show your support</h2>
  <p>If you like this project, consider starring the repository ⭐ on GitHub and sharing it with your friends!</p>
</div>
