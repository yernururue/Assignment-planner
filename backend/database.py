from supabase import create_client, Client
from config import settings

# Initialize Supabase client with service key (full admin access)
_supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)


def get_db() -> Client:
    """Returns the Supabase client instance."""
    return _supabase
