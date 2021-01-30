import React, { useState } from "react";
import Input from "../../_Elements/Input";
import { connect, useDispatch } from "react-redux";
import { postJob } from "../../../store/thunks/employer";
import { Link, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

function CopyLink(props) {
	let { jobId } = useParams();
	const parent = React.useRef();
	const dispatch = useDispatch();
	const [URL, setURL] = useState("www.credready.com/jobs/chelsea/2367");
	const { addToast } = useToasts();

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
		setURL(props.jobURL);
	}, [props]);

	const copyLinkHandler = () => {
		addToast("Link is copied.", {
			appearance: "success",
			autoDismiss: true,
		});

		var copyText = document.getElementById("copy-link-track");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand("copy");
	};

	const copyCodeHandler = () => {
		var copyText = document.getElementById("link");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand("copy");
	};

	return (
		<>
			<div className="copy-link" ref={parent} id="copyLink">
				<div className="heading">
					<h2>
						Add to Your Website and Job Postings <span>*</span>
					</h2>
				</div>
				<div className="content">
					<h2 className="thank-you">
						{/* Thank you, You have successfully posted “C.N.A in Warren New Jersey” */}
						Thank you, You have successfully {jobId ? " updated " : " posted "} {props.newJob.jobTitle}
					</h2>
					<p className="status verify-message">We have sent you a confirmation email.</p>
					<p className="link">Here is the link to the post on CredReady.com</p>
					<div className="copy_link_button">
						<Input
							value={props.jobURL}
							id="copy-link-track"
							onChange={(e) => setURL(e.target.value)}
						/>
						<button
							className="upload-btn"
							onClick={copyLinkHandler}
							id="uploadBtn"
						>
							Copy to clipboard
						</button>
					</div>
					<p className="status">
						Please paste this link in your job post. So that they may apply
						through CredReady.
					</p>
					<p className="link">
						Here are the steps to add this link to your website{" "}
					</p>
					<p className="status">
						Let the world know you`re hiring! Add the job to any page on
						your website to promote your open positions!{" "}
					</p>
					<div className="copy_the_code">
						<p className="link">1. Copy the code: </p>{" "}
						<button
							className="upload-btn"
							onClick={copyCodeHandler}
							id="uploadBtn"
						>
							Copy
						</button>
					</div>
					<textarea
						name="link"
						id="link"
						defaultValue={`<a href=${props.jobURL} id='jobs_embed_link' target='_black'> ${props.newJob.jobTitle}</a>`}
					></textarea>
					{/* <a href="www.credready.com/jobs/chelsea/2367" id="jobs_embed_link" tartget="_black">
						{props.newJob.jobTitle}</a> */}
					<p className="link">
						2. Paste into your job post to direct applicants to CredReady.
					</p>
				</div>
			</div>
			<div className="cta">
				<Link to="/jobs" className="primary-btn blue">
					View Job
				</Link>
			</div>
		</>
	);
}

function mapStateToProps(state) {
	return {
		//jobURL: state.employerReducer.jobURL.replace("https://dev.innovatorsbay.in/credready/jobs/", "http://localhost:3000/postings/")
		jobURL: state.employerReducer.jobURL,
		newJob: state.employerReducer.newJob,
	};
}

// export default CopyLink;

export default connect(mapStateToProps)(CopyLink);
