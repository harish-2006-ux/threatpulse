import anthropic
import os
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

def analyze_threat(data):

    prompt = f"""
You are a cybersecurity analyst.

Analyze this data:
{data}

Return:
1. Risk Score (0-100)
2. Explanation
3. Suggested Action
"""

    response = client.messages.create(
        model="claude-3-haiku-20240307",
        max_tokens=200,
        messages=[{"role": "user", "content": prompt}]
    )

    return response.content[0].text