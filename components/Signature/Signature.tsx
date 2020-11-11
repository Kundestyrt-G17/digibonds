import React, { useState } from "react";
import {IVote} from "@/schemas/vote";
import {Button} from "@material-ui/core";
// const { IdfyClient } = require('@idfy/sdk');

interface SignatureProps {
    isin: string;
    ballot: IVote;
}

let documentOptions = {
    signers: [
        {
            "externalSignerId": "uoiahsd321982983jhrmnec2wsadm32",
            "redirectSettings": {
                "redirectMode": "donot_redirect"
            },
            "signatureType": {
                "mechanism": "pkisignature"
            },
        }
    ],
    title: "Upload test 9",
    description: "Upload of document using the idfy SDK",
    externalId: "ae7b9ca7-3839-4e0d-a070-9f14bffbbf55",
    dataToSign: {
        "base64Content": "VGhpcyB0ZXh0IGNhbiBzYWZlbHkgYmUgc2lnbmVk",
        "fileName": "sample.txt"
    },
    contactDetails: {
        "email": "test@test.com",
        "url": "https://idfy.io"
    }
}
/*
async function uploadBallot() {
    const client = new IdfyClient(
        "tc8d80e3ad1f34c308bbe92dacd13eade",
        "bqhDrNzeOfophmhx3D6noVwh9IrXVJ2B",
        ['document_read', 'document_write']
    )

    const documentUpload = await client.signature.createDocument(documentOptions);
    console.log(documentUpload);
}
*/
let signicatUrl = "https://www.vg.no";

const Signature = (props: SignatureProps) => {
    const { isin, ballot } = props;
    const [urlReady, setUrlReady] = useState(false);

    if (!urlReady) {
        ApiFetchTest().finally()
        return <div>Loading...</div>;
    }

    async function ApiFetchTest(){
        const response = await fetch("api/signature", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(documentOptions)
        }).then(res => res.json()).then((data) => {
            signicatUrl = data;
            setUrlReady(true);
        });

    }

    return (
        <div>
            <Button
                color={"primary"}
                onClick={() => {
                    window.open(signicatUrl, "_blank");
                }}
            >
                Click here to start signing
            </Button>
        </div>
    )
}

export default Signature;
