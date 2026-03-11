# PaperMint

AI-powered exam paper generator for teachers and coaching institutes.

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Setup env files:
   - `cp server/.env.example server/.env`
   - `cp client/.env.example client/.env`
3. Setup DB schema:
   ```bash
   npm run prisma:migrate -w server
   ```
4. Run app:
   ```bash
   npm run dev
   ```

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## Notes
- Claude generation automatically falls back to deterministic mock generation if API key is missing in local dev.
- Local storage is used for uploads/PDFs unless AWS credentials are configured.
