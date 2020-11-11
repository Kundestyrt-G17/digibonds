import React, { useState } from "react";
import {IVote} from "@/schemas/vote";
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
    title: "Upload test 6",
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
async function ApiFetchTest(){
    const response = await fetch("api/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(documentOptions)
    })
    if (response.ok){
        console.log("success");
    }
}

const Signature = (props: SignatureProps) => {
    const { isin, ballot } = props;

    ApiFetchTest();

    return (
        <div>

        </div>
    )
}

export default Signature;
