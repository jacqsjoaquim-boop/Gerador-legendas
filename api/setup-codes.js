// Rode este endpoint UMA VEZ (acessando a URL no navegador) para carregar todos os
// códigos válidos no banco de dados. Depois disso pode deixar como está.
// Protegido por uma chave simples para ninguém mais conseguir rodar de novo sem querer.

const CODIGOS = [
  "LEG-HYUM-WLPB","LEG-H1TK-UC42","LEG-KTFK-S79G","LEG-E9NT-ZP80","LEG-U2GD-1I1A",
  "LEG-Y16K-FT9W","LEG-V830-MHZ2","LEG-81D1-I82P","LEG-0TZT-KQSX","LEG-F07Y-YWOB",
  "LEG-YLJ9-5UF9","LEG-7YYH-C30G","LEG-HMEL-DCOY","LEG-32J9-0KAD","LEG-WGMD-GR43",
  "LEG-Q9HK-I75U","LEG-684F-A8OX","LEG-6RIR-PJLE","LEG-QYSI-EGD3","LEG-CPHQ-BUYY",
  "LEG-VJSG-CXMQ","LEG-BHXC-ZBA0","LEG-ZFM1-MLVR","LEG-5KME-JZRO","LEG-KEU8-IBF8",
  "LEG-D0SR-3OTS","LEG-O1J4-L7YH","LEG-L772-PIPL","LEG-AO2W-CUDC","LEG-VV4C-MJ02",
  "LEG-59N4-IY19","LEG-93N9-H15H","LEG-3DJ1-N9JC","LEG-FB7X-9DIV","LEG-QFBI-IYHX",
  "LEG-EPQW-2CPN","LEG-DOET-54BV","LEG-P62L-SSDR","LEG-TVTV-HXSO","LEG-G4KG-SKRU",
  "LEG-2YF1-0RBZ","LEG-YOM1-HE0G","LEG-ZMKD-0T08","LEG-IAL1-HZU3","LEG-ER7S-Q1D9",
  "LEG-9GQP-YT9A","LEG-QGN6-801C","LEG-AC29-CZNW","LEG-7MEH-5MXT","LEG-9JYU-Y6O5",
  "LEG-OSZR-CWG2","LEG-H8SK-RL9J","LEG-WRRG-668J","LEG-OAPK-RRTW","LEG-DMAY-1DF1",
  "LEG-5TOX-T54R","LEG-SYW2-V9NZ","LEG-8AZF-VSIX","LEG-HOQU-O9XT","LEG-920O-MG2Y",
  "LEG-64V4-FOV0","LEG-TQF7-SLK2","LEG-IM1M-SDTD","LEG-RJPA-57YA","LEG-37VG-LQE1",
  "LEG-5211-ZY8U","LEG-J52G-9ZW8","LEG-IO1L-QM82","LEG-RGQL-25BD","LEG-AB15-O1XX",
  "LEG-KEOJ-OQZS","LEG-4PP9-MCGQ","LEG-VP4J-EDAB","LEG-XV8T-0UWM","LEG-VHLI-ECXV",
  "LEG-E9JC-487P","LEG-UNZ2-GAR8","LEG-WPR1-179K","LEG-BU67-DHQL","LEG-Q20D-XGQ3",
  "LEG-LO6J-653D","LEG-FZ03-AK3A","LEG-EY3B-K2BM","LEG-RNLZ-T9EJ","LEG-DYJY-X5KE",
  "LEG-F8O0-L2IV","LEG-ZLHD-WCOW","LEG-7LKQ-NWV0","LEG-DLPC-7XEL","LEG-6HLT-YXM1",
  "LEG-B9Q6-D2RX","LEG-9BO4-SAUB","LEG-3PNF-5G8C","LEG-JO45-13FP","LEG-GJUQ-4BS1",
  "LEG-078I-ZNN2","LEG-M5Q1-GIMD","LEG-88JR-5GY6","LEG-A63A-698M","LEG-OMZR-G7CO"
];

export default async function handler(req, res) {
  const { key } = req.query;

  if (key !== process.env.SETUP_SECRET) {
    return res.status(403).json({ error: "Chave de configuração incorreta." });
  }

  const restUrl = process.env.KV_REST_API_URL;
  const restToken = process.env.KV_REST_API_TOKEN;

  if (!restUrl || !restToken) {
    return res.status(500).json({ error: "Banco de dados não configurado ainda." });
  }

  try {
    for (const codigo of CODIGOS) {
      await fetch(`${restUrl}/sadd/codigos_validos/${codigo}`, {
        headers: { Authorization: `Bearer ${restToken}` },
      });
    }
    return res.status(200).json({ message: `${CODIGOS.length} códigos carregados com sucesso!` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao carregar códigos." });
  }
}
