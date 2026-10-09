# User Roles and Permissions

## OWNER
Owner-level access to gym business operations, dashboard, members, memberships, payments, attendance, leads, analytics, marketing, WhatsApp and settings.

## MANAGER / STAFF
Staff role exists in the product role model. Exact permission granularity beyond the source document should be defined during implementation.

## TRAINER
Can:
- View assigned members
- Assign workouts
- Track progress
- Record measurements
- Add notes
- View attendance
- Manage sessions
- Message members

Trainer must not automatically access:
- Gym revenue
- Owner settings
- All payments
- Business analytics

## MEMBER
Can access:
- Home
- Membership
- Attendance
- Workout
- Progress
- Payments
- Trainer
- Messages
- Profile

## FUTURE
GYMOS_ADMIN is a potential future role.

## Security rule
Permissions must be enforced server-side and through tenant isolation, not only hidden in UI.
