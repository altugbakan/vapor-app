import { Web3Storage } from "web3.storage"

const handler = async (req, res) => {
    const client = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
    const offers = [];
    for await (const item of client.list()) {
        offers.push(await (await fetch(`https://${item.cid}.ipfs.dweb.link/offer.json`)).json());
    }
    res.status(200).json(offers);
}

export default handler;