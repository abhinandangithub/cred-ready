import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./index.scss";
import Spinner from "../../_Elements/Spinner";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Certificate({ certificate }) {
	const [numPages, setNumPages] = React.useState(null);
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	return (
		certificate.split(".").pop() !== "pdf" ? <div className="certificate">
			<img src={certificate} alt="Certificate" />
		</div> : <Document
			file={certificate}
			onLoadSuccess={onDocumentLoadSuccess}
			loading={
				<div className="spinner_outer">
					<Spinner />
				</div>
			}
		>
				{Array.from(new Array(numPages), (el, index) => (
					<Page
						// size="A4"
						loading=""
						key={`page_${index + 1}`}
						pageNumber={index + 1}
					/>
				))}
			</Document>

	);
}

export default Certificate;
