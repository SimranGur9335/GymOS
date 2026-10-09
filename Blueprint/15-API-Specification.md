# API Specification

## Backend
FastAPI + Python.

## API domains
The backend should be organized around product domains:
- Auth/session support
- Gyms
- Members
- Memberships
- Payments
- Attendance
- Leads
- Trainers
- Workouts
- Campaigns
- WhatsApp
- Retention
- Analytics
- AI Insights
- Discovery

## Design rule
Use the backend where needed; do not over-engineer.

## API contract requirements
Each implemented endpoint should document:
- Method
- Path
- Authentication requirement
- Role requirement
- gym_id/tenant scope
- Request schema
- Response schema
- Validation
- Errors
- Audit/security requirements

## Source limitation
The supplied document does not define exact endpoint paths, so those should be finalized during API implementation rather than invented here.
