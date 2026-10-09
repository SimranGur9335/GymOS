# Supabase RLS

## Core requirement
Tenant data must be isolated from day one.

Example:
PowerFit → only PowerFit data
IronCore → only IronCore data

## Rule
Gym-specific tables must be protected by `gym_id`-based tenant policies.

## Authentication
Supabase Auth provides authentication with JWT/session handling.

## Roles
- OWNER
- MANAGER/STAFF
- TRAINER
- MEMBER
- Future: GYMOS_ADMIN

## RLS design requirement
Policies must ensure authenticated users can only read/write records belonging to gyms and resources they are authorized to access.

## Implementation note
Exact SQL policies are not specified in the source and should be written after the final schema and role-to-gym relationship are established.
