import React, { useRef } from "react";
import Button from '@material-ui/core/Button';
import { IVote } from '../../schemas/vote';

const { Parser, transforms: { flatten } } = require('json2csv');
interface ExportResultProps {
    votes: IVote[];
    exportName: string;
}

export default function ExportAsCSV(props: ExportResultProps) {
    const anchorRef = useRef<HTMLDivElement>(null);
    const votes = [...props.votes];
    const fields = ['company.name', 'bondsOwned', 'pohStatus', 'favor'];
    const options = { fields };
    const csvParser = new Parser(options);
    let csv = null;
  
    const handleClick = () => {
        console.info(votes)
        try {
            csv = csvParser.parse(votes);
            const element = document.createElement("a")
            const downloadFile = new Blob([csv], {type: "text/csv;charset=UTF-8"});
            element.href = URL.createObjectURL(downloadFile)
            element.download = `Results ${props.exportName}.csv`
            document.body.appendChild(element)  
            element.click()
        } catch (err) {
            console.error(err);
        }
    };
  
    return (
        <Button onClick={handleClick}
        variant="contained"
        color="primary"
        style={{maxHeight: '36px', minHeight: '36px'}}
        >
            Export Results
        </Button>
    );
};
  