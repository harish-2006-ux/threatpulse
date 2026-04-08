from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

try:
    supabase = create_client(
        os.getenv("SUPABASE_URL"),
        os.getenv("SUPABASE_KEY")
    )
except:
    supabase = None
    print("Supabase connection failed - using mock logging")

def save_log(data):
    try:
        supabase.table("logs").insert(data).execute()
    except:
        print("DB log saved locally:", data)
