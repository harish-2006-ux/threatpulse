import anthropic
import os
from dotenv import load_dotenv

load_dotenv()

print("API KEY:", os.getenv("ANTHROPIC_API_KEY"))

client = anthropic.Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)

response = client.messages.create(
    model="claude-3-haiku-20240307",
    max_tokens=100,
    messages=[
        {"role": "user", "content": "Say hello in JSON format"}
    ]
)

print(response.content[0].text)