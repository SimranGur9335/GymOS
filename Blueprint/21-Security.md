# Security

## Required
- Multi-tenant isolation
- Supabase RLS
- JWT validation
- Role-based permissions
- Secure payment webhook verification
- Secure API keys
- Input validation
- Rate limiting
- Secure file uploads
- Secure member data
- Secure WhatsApp credential handling

## Future
- Audit logs

## Security principle
Security must be enforced at the data/API layer, not only at the UI layer.

## Tenant isolation
A user from one gym must not be able to access another gym's data even by manipulating requests.
