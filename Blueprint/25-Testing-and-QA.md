# Testing and QA

## Required test areas
- Authentication
- Gym selection
- Role-based access
- Tenant isolation
- CRUD operations
- Membership lifecycle
- Payment states
- Attendance
- Lead pipeline
- Trainer permissions
- Member permissions
- WhatsApp actions
- Discovery search
- Gym claiming
- Public profile data

## Security tests
Verify that:
- User cannot access another gym's records.
- Trainer cannot access owner-only data.
- Member cannot access other members.
- Payment/webhook operations are authenticated and verified.
- File uploads are validated.

## Business tests
Test the closed loop:
Pending payment → reminder → payment received → revenue updated.

Test:
Inactive member → retention alert → outreach → attendance returns.
