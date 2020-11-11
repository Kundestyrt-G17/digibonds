import React, { useState } from "react";
import {IVote} from "@/schemas/vote";
import {Button} from "@material-ui/core";

interface SignatureProps {
    isin: string;
    ballot: IVote;
    submitVote?: (ballot: IVote) => void;
}

let signicatUrl = "";

const Signature = (props: SignatureProps) => {
    const { isin, ballot, submitVote } = props;
    const [urlReady, setUrlReady] = useState(false);
    const [buttonPressed, setButtonPressed] = useState(false);

    let ballotText = "You, " + ballot.company.name.toUpperCase() + " with a holding of " +
        ballot.bondsOwned + ", are voting " + ballot.favor.toUpperCase() + " on the proposals concerning ISIN " +
        isin + ". Thanks for using DigiVote to cast your ballot."

    let ballotTextBase64 = btoa(ballotText);

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
        title: "Ballot",
        description: "Ballot to be signed by bondholder.",
        externalId: "ae7b9ca7-3839-4e0d-a070-9f14bffbbf55",
        dataToSign: {
            "base64Content": ballotTextBase64,
            "fileName": "ballot.txt",
            "convertToPDF": true,
        },
        contactDetails: {
            "email": "test@test.com",
            "url": "https://idfy.io"
        }
    }

    console.log(documentOptions);

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
                type={"button"}
                variant={"contained"}
                color={"primary"}
                onClick={() => {
                    window.open(signicatUrl, "_blank","toolbar=no,scrollbars=yes,menubar=no,titlebar=no,resizable=yes,width=750,height=900");
                    setButtonPressed(true);
                }}
            >
                Click here to start signing
            </Button>
            <Button
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                disabled={!buttonPressed}
                onClick={() => {submitVote(ballot)}}
            >
                Click here after you are done signing
            </Button>

        </div>
    )
}

export default Signature;
