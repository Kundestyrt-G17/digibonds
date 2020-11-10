import React, { useState } from "react";
const { IdfyClient } = require('@idfy/sdk');

const Signature = async () => {

    const client = new IdfyClient(
        "tc8d80e3ad1f34c308bbe92dacd13eade",
        "bqhDrNzeOfophmhx3D6noVwh9IrXVJ2B",
        ['document_read', 'document_write']
    )

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
        title: "Upload test 2",
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

    const documentUpload = await client.signature.createDocument(documentOptions);
    console.log(documentUpload);

    return (
        <div></div>
    )
}
