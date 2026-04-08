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
        system="Respond with ONLY valid JSON in this exact format: {\"risk_score\": number 0-100, \"level\": \"low|medium|high\", \"explanation\": \"string\", \"action\": \"string\"}",
        messages=[{"role": "user", "content": prompt}]
    )

    import json
    try:
        return json.loads(response.content[0].text)
    except:
        return {"risk_score": 50, "level": "medium", "explanation": "JSON parse failed", "action": "Review manually"}
