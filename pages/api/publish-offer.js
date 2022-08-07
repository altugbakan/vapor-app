import { File, Web3Storage } from "web3.storage"

const handler = async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).send({ message: "Only POST requests allowed" })
        return
    }
    const client = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
    const buffer = Buffer.from(JSON.stringify(req.body));
    const cid = await client.put([new File([buffer], "offer.json")]);
    res.status(200).send(cid);
}

export default handler;