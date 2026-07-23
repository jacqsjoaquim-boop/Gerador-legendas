// Este arquivo verifica se um código de acesso é válido e ainda tem usos disponíveis.
// Usa o Upstash Redis (conectado via Vercel Marketplace) para guardar quantos usos já foram feitos.

const LIMITE_USOS = 50;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { code } = req.body;

  if (!code || !code.trim()) {
    return res.status(400).json({ error: "Código não informado." });
  }

  const codigo = code.trim().toUpperCase();

  const restUrl = process.env.KV_REST_API_URL;
  const restToken = process.env.KV_REST_API_TOKEN;

  if (!restUrl || !restToken) {
    return res.status(500).json({ error: "Banco de dados não configurado ainda." });
  }

  try {
    // Verifica se o código está na lista de códigos válidos
    const checkValid = await fetch(`${restUrl}/sismember/codigos_validos/${codigo}`, {
      headers: { Authorization: `Bearer ${restToken}` },
    });
    const validData = await checkValid.json();

    if (!validData.result) {
      return res.status(403).json({ error: "Código inválido." });
    }

    // Incrementa o contador de usos desse código
    const incrKey = `usos:${codigo}`;
    const incrResp = await fetch(`${restUrl}/incr/${incrKey}`, {
      headers: { Authorization: `Bearer ${restToken}` },
    });
    const incrData = await incrResp.json();
    const usosAtuais = incrData.result;

    if (usosAtuais > LIMITE_USOS) {
      return res.status(403).json({ error: "Este código já atingiu o limite de usos." });
    }

    return res.status(200).json({
      valid: true,
      usosRestantes: LIMITE_USOS - usosAtuais,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao verificar código. Tenta de novo." });
  }
}
