import json
from datetime import date
from fastapi import HTTPException
from groq import Groq
from config import settings

_client = Groq(api_key=settings.GROQ_API_KEY)


async def generate_plan(title: str, description: str | None, deadline: str) -> dict:
    """
    Call Groq API to generate a structured study plan for an assignment.
    Returns parsed JSON with difficulty_score, estimated_hours, reasoning, and subtasks.
    """
    today = date.today().isoformat()
    description_text = description or "No additional details provided."

    prompt = f"""You are an academic workload analyzer.
Return ONLY valid JSON. No explanation. No markdown. No code fences.

Assignment: {title}
Details: {description_text}
Deadline: {deadline}
Today: {today}

Return exactly:
{{
  "difficulty_score": <integer 1-10>,
  "estimated_hours": <float>,
  "reasoning": <one sentence>,
  "subtasks": [
    {{
      "title": <string>,
      "estimated_hours": <float>,
      "suggested_day_offset": <int, days from today>
    }}
  ]
}}"""

    chat_completion = _client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="llama-3.3-70b-versatile",
        temperature=0.3,
    )

    raw = chat_completion.choices[0].message.content

    try:
        parsed = json.loads(raw)
    except (json.JSONDecodeError, TypeError):
        raise HTTPException(
            status_code=500,
            detail="AI returned invalid response",
        )

    return parsed
