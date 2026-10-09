# GymOS — Master Blueprint

This is the master index for the GymOS product blueprint.

## Product thesis
GymOS combines **GymOS Business** and **GymOS Discover** into one multi-tenant ecosystem.

## Core loop
**See → Understand → Act → Measure**

## Build order
1. Validation
2. Foundation + multi-tenancy
3. Owner core
4. Growth/communication
5. Trainer/member portals
6. Discovery
7. Intelligence
8. Pilot
9. Sales

## Critical architectural rule
Multi-tenancy is not a later migration. It is a day-one requirement. Every gym-specific record must be scoped to `gym_id`, with Supabase RLS enforcing isolation.

## Critical product rule
Do not build the platform as a feature checklist. Each major feature should create measurable value through revenue increase, revenue recovery, churn reduction, time savings or lead generation.

## Critical UX pattern
Action Center: identify an issue → explain it → provide action → show result.

## Critical V1 boundary
V1 is a sellable MVP. Advanced AI, face recognition, wearables, social features, microservices and complex native apps are deliberately deferred.
