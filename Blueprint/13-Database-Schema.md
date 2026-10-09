# Database Schema

## Multi-tenant root
GYMS

Every gym-specific record should include `gym_id`.

## Core entities
- gyms
- users
- members
- staff
- trainers
- memberships
- payments
- attendance
- leads
- workouts
- campaigns
- whatsapp_messages
- ai_insights

## Member example
members:
- id
- gym_id
- name
- phone
- membership_id
- trainer_id
- status
- joined_at
- expires_at

## Membership states
- ACTIVE
- EXPIRING SOON
- EXPIRED
- SUSPENDED
- CANCELLED

## Lead states
NEW → CONTACTED → TRIAL → INTERESTED → CONVERTED → MEMBER

## Important
The source establishes the core entities and fields above. Exact foreign keys, indexes, constraints, audit columns and normalization details should be finalized during implementation.
