# School Project (Next.js + MySQL)

Two pages:
- `addSchool` – form to add school with image upload (stored in `/public/schoolImages`).
- `showSchools` – displays schools like product cards (name, address, city, image).

## Prerequisites
- Node 18+
- MySQL running locally

## Setup
1. Create DB/table:
   ```sql
   SOURCE schoolDB.sql;
   ```

2. Install deps and run:
   ```bash
   npm install
   npm run dev
   ```

3. Open:
   - Add: http://localhost:3000/addSchool
   - Show: http://localhost:3000/showSchools
   - API test: http://localhost:3000/api/getSchools

## MySQL Credentials
Configured in API routes:
- user: `root`
- password: `sart@26102002`
- host: `localhost`
- database: `schoolDB`

> Change these in: `pages/api/addSchool.js` and `pages/api/getSchools.js` if needed.

## Notes
- Uploaded images are saved in `public/schoolImages/` and then served as `/schoolImages/<filename>`.
- The form uses `react-hook-form` for client validation + server-side checks in the API.
- The UI is responsive via simple CSS (no Tailwind needed).
