import React, { useState } from "react";
import Input from "../../../_Elements/Input";
import { connect, useDispatch, useSelector } from "react-redux";
import { postJob } from "../../../../store/thunks/employer";
import { Link, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import FBIcon from "../../../../assets/facebook.svg";
import TWIcon from "../../../../assets/twitter.svg";
import EMIcon from "../../../../assets/email.svg";
import CPIcon from "../../../../assets/copy.svg";

function JobLinks(props) {
	let { jobId } = useParams();
	const parent = React.useRef();
	const dispatch = useDispatch();
	const [URL, setURL] = useState("www.credready.com/jobs/chelsea/2367");
	const { addToast } = useToasts();
	const jobContent = 'Your job has been successfully posted. Use the link below to share the job post to which potential candidates can apply. \n';
	const content_1 = " is Hiring on CredReady. Click on the link ";
	const content_2 = " to view your CredReadiness and apply for the job";
	const employerProfile = useSelector((state) => state.employerReducer.profile);

	React.useEffect(() => {
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
		<div className="job_links" ref={parent} id="copyLink">
			<div className="heading">
				{!props.noHeading && (
					<>
						<h2>Great, your job post has been published successfully on CredReady.com</h2>
						<p>
							Use the link below to add this job post to your website, other platforms, or post it where your potential
							applicants will see it.
						</p>
					</>
				)}
			</div>
			<div className="content">
				<p className="link">Here is the link to your job post</p>
				<div className="copy_link_button">
					<Input value={props.jobURL} id="copy-link-track" onChange={(e) => setURL(e.target.value)} />
					<button className="upload-btn" onClick={copyLinkHandler} id="uploadBtn">
						<img src={CPIcon} alt="Copy to clipboard" /> Copy to clipboard
					</button>
				</div>
			</div>
			<div className="content post_on">
				<ul>
					<li>Post On</li>
					{/* <li className="email">
						<a href={"mailto:?Subject=" + "PAGE_TITLE" + "&Body=" + "MAIL_BODY"}>
						<a href={"mailto:?Subject=Job link" + "&Body=" + URL}>
							<img src={EMIcon} alt="Email job link" />
							Email job link
						</a>
					</li> */}
					<li onClick={() => {
						let subject = "Job post";
						window.open(
							`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${subject}&body=${employerProfile.data && employerProfile.data.org.org_name}${content_1}${URL}${content_2}&ui=2&tf=1&pli=1`,
							'sharer', 'toolbar=0,status=0,width=648,height=395'
						);
						return false;
					}}>
						<img src={EMIcon} alt="Email job link" />
						Email job link
					</li>
					<li
						onClick={() => {
							window.open(
								// "https://www.facebook.com/sharer/sharer.php?u=https://stackoverflow.com&t=TITLE",
								"https://www.facebook.com/sharer/sharer.php?u=" + URL + '&t=' + jobContent,
								"facebook-share-dialog",
								"width=800,height=600"
							);
							return false;
						}}
					>
						<img src={FBIcon} alt="Facebook" /> Facebook
					</li>
					<li onClick={() => {
						window.open(
							// "https://twitter.com/intent/tweet?text=" + URL
							// `https://twitter.com/share?url=${URL}&text=${employerProfile.data && employerProfile.data.org.org_name}${content_1}${URL}${content_2}`
							`https://twitter.com/share?url= &text=${employerProfile.data && employerProfile.data.org.org_name}${content_1}${URL}${content_2}`
						);
						return false;
					}}
					>
						<img src={TWIcon} alt="Twitter" />
						Twitter

					</li>
				</ul>
			</div>
		</div >
	);
}

function mapStateToProps(state) {
	return {
		jobURL: state.employerReducer.jobURL,
		newJob: state.employerReducer.newJob,
	};
}

export default connect(mapStateToProps)(JobLinks);
