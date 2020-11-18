import {NextApiRequest, NextApiResponse} from "next";
const { IdfyClient } = require('@idfy/sdk');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;

    switch (method) {
        case "POST":
            try {
                const documentUpload = await client.signature.createDocument(req.body)
                    .then(results => {
                        return results.signers[0].url;
                    });
                res.status(200).json(JSON.stringify(documentUpload));
            } catch (e) {
                res.status(500).send(e);
            }
            break;
        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }

}

const client = new IdfyClient(
    "tc8d80e3ad1f34c308bbe92dacd13eade",
    "bqhDrNzeOfophmhx3D6noVwh9IrXVJ2B",
    ['document_read', 'document_write', 'document_file']
)