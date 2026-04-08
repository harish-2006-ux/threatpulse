import anthropic
import os
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

def analyze_threat(data):
    prompt = f"""
You are cybersecurity Sentinel AI.

Analyze this threat data and return VALID JSON only (no other text):

{{
  "risk_score": number 0-100,
  "level": "low" | "medium" | "high",
  "explanation": "Detailed analysis...",
  "action": "Recommended response..."
}}

Data: {data}
Time: {data.get('time', 'N/A')}
"""

    response = client.messages.create(
        model="claude-3-haiku-20240307",
        max_tokens=300,
        json_mode=True,
        messages=[{"role": "user", "content": prompt}]
    )

    return response.content[0].json()
