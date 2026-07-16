// Este arquivo roda no servidor da Vercel, nunca no navegador do usuário.
// Por isso a chave da API fica protegida (o usuário do app nunca vê ela).

export default async function handler(req, res) {
  // Só aceita requisições do tipo POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { produto, tom } = req.body;

  if (!produto || !produto.trim()) {
    return res.status(400).json({ error: "Descreva o produto/post antes de gerar." });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY, // vem das variáveis de ambiente da Vercel
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `Você é especialista em social media para pequenos negócios brasileiros. Gere 3 legendas de Instagram diferentes entre si, tom "${tom}", para o seguinte produto/post: "${produto}".

Cada legenda deve ter entre 2 e 4 linhas, incluir 1 emoji relevante no máximo, terminar com uma chamada pra ação natural, e vir seguida de uma linha com 5 hashtags relevantes em português.

Responda APENAS em JSON puro, sem markdown, sem crases, no formato:
{"captions": ["legenda 1 completa com hashtags no final", "legenda 2...", "legenda 3..."]}`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro da Anthropic:", data);
      return res.status(500).json({ error: "Erro ao gerar legendas. Tenta de novo." });
    }

    const text = data.content.map((b) => b.text || "").join("\n");
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json({ captions: parsed.captions || [] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro inesperado. Tenta novamente." });
  }
}
