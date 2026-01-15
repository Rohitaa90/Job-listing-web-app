# Mployee.me Job Listing Portal

A professional, full-stack job listing application designed for the Mployee.me technical assessment. This application features a high-performance interface with backend-driven filtering for a dataset of over 10,000 jobs.

## 🚀 Live Application
- **Frontend:** [Deployment Link Here]
- **Backend API:** [Deployment Link Here]

## 🛠️ Technical Stack
- **Frontend:** Next.js 15 (App Router), Tailwind CSS, Responsive UI.
- **Backend:** Node.js, Express.js (REST API).
- **Database:** MongoDB Atlas (Mongoose ODM).
- **Data Volume:** 10,500+ real job records.

## ✨ Key Features & Implementations
1. **Split-Screen Interface:** Optimized for productivity with a side-by-side view of job listings and full details—reducing navigation friction.
2. **Backend-Side Filtering:** Implemented efficient location-based filtering using MongoDB **Regex indexing**. No large data processing happens on the client side, ensuring scalability.
3. **Data Normalization:** Handled inconsistent JSON formatting (like special character keys) at the API level to provide a clean, reliable data structure to the frontend.
4. **Resilient UI:** Implemented a robust "Initial-based" fallback for broken or missing company logos and dynamic placeholders for missing job descriptions.
5. **Modern Design:** Focused on a clean, professional aesthetic using a Slate-Indigo color palette and Inter typography.

## ⚙️ Local Setup for Verification

### 1. Clone & Install
```bash
# Backend repository
cd backend
npm install

# Frontend repository
cd frontend
npm install
```

### 2. Environment Configuration
Create the following environment files in their respective directories:

- **Backend (`backend/.env`):**
  ```env
  PORT=5000
  MONGODB_URI=your_mongodb_atlas_uri
  NODE_ENV=production
  ```

- **Frontend (`frontend/.env.local`):**
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:5000/api
  ```

### 3. Run Application
```bash
# Start Backend
cd backend && npm run dev

# Start Frontend
cd frontend && npm run dev
```

## 📝 Assumptions & Logic
- **Data Consistency:** The provided dataset had inconsistent keys (e.g., spaces in labels). The backend maps these to a standardized schema for frontend stability.
- **Performance:** For the 10k+ dataset, I utilized MongoDB `.lean()` queries and server-side limits to maintain fast response times.
- **User Experience:** Click-to-view detail updates are handled via client-side state management for an "app-like" fluid experience.
