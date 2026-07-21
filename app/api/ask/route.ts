export const runtime = 'edge';

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

const PROFILE_CONTEXT = `
Kashvi Pundir is a UI Engineer and Product Designer building AI-native products.
She works with Next.js, React, TypeScript, Tailwind CSS, GSAP, Framer Motion, Vercel, and Gemini API integrations.
Featured projects include OmniPost AI, LuxeGen, Pslyther, JISSI, and Sortedd.
OmniPost AI is an AI content distribution dashboard with semantic retrieval and real-time monitoring.
LuxeGen is an AI design-to-code workspace that turns prompts into production-ready UI.
Kashvi is based in India and works remotely with product teams.
`;

function localAnswer(question: string) {
  const input = question.toLowerCase();

  if (input.includes('where') || input.includes('based') || input.includes('location')) {
    return 'Kashvi is based in India and works remotely with AI-native product teams.';
  }

  if (input.includes('gemini') || input.includes('ai')) {
    return 'Kashvi uses the Gemini API in AI-native products like OmniPost AI and LuxeGen, pairing prompt workflows with polished product interfaces.';
  }

  if (input.includes('skill') || input.includes('stack') || input.includes('tech')) {
    return 'Her stack includes Next.js, React, TypeScript, Tailwind CSS, GSAP, Framer Motion, Vercel, and Gemini API integrations.';
  }

  if (input.includes('project') || input.includes('work')) {
    return 'Her featured work includes OmniPost AI, LuxeGen, Pslyther, JISSI, and Sortedd, with a strong focus on AI interfaces and frontend performance.';
  }

  return 'Ask about Kashvi\'s location, AI work, Gemini API projects, skills, or featured products like OmniPost AI and LuxeGen.';
}

export async function POST(request: Request) {
  const { question } = (await request.json().catch(() => ({}))) as { question?: string };
  const cleanedQuestion = question?.trim().slice(0, 240);

  if (!cleanedQuestion) {
    return Response.json({ answer: 'Ask me about Kashvi\'s projects, skills, location, or AI-native product work.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ answer: localAnswer(cleanedQuestion), source: 'local' });
  }

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Answer in one concise sentence using only this portfolio context.\n\n${PROFILE_CONTEXT}\n\nQuestion: ${cleanedQuestion}`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      return Response.json({ answer: localAnswer(cleanedQuestion), source: 'local-fallback' });
    }

    const data = (await response.json()) as GeminiResponse;
    const answer = data.candidates?.[0]?.content?.parts?.map((part) => part.text).filter(Boolean).join(' ').trim();

    return Response.json({ answer: answer || localAnswer(cleanedQuestion), source: answer ? 'gemini' : 'local-fallback' });
  } catch {
    return Response.json({ answer: localAnswer(cleanedQuestion), source: 'local-fallback' });
  }
}
