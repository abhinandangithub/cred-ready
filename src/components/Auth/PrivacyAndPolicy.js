import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

import Img_TnC_Close from "../../assets/tnc_close.jpg";

let scrollBarStyle = {
	width: "100%",
	height: "100vh",
};

function PrivacyAndPolicy(props) {
	return (
		<div className="terms_n_conditions">
			<Scrollbars
				className="custom-scrollbar"
				style={scrollBarStyle}
				// autoHide
				autoHideTimeout={1000}
				autoHideDuration={600}
				renderTrackVertical={({ style, ...props }) => (
					<div
						{...props}
						className="bar"
						style={{
							...style,
						}}
					/>
				)}
			>
				<div className="text">
					<h1>
						Privacy Policy
						<button onClick={() => props.show_pnp(false)}>
							<img src={Img_TnC_Close} alt="close button" />
						</button>
					</h1>
					<h2>1. Job Ads or Job Listings</h2>
					<p>
						CredReady, which is free to those individuals searching for
						employment openings (“Job Seekers”), may make available Job Ads
						advertising employment opportunities and other job-related content,
						including links to third-party websites (“Job Listings” or “Job
						Ads”), through CredReady’s search results or otherwise through the
						Site. Searching for Job Ads on CredReady is free for Job Seekers.
						Job Ads are created and provided by third parties over whom
						CredReady exercises no control; you acknowledge and understand that
						CredReady has no control over the content of Job Ads, links to or
						from Job Ads, or any conditions third parties might impose once a
						Job Seeker has submitted an application or left the Site. For
						example, some of these third parties may attempt to charge Job
						Seekers a fee to apply to a particular job, although CredReady
						endeavors not to make such Job Ads available on the Site. If you
						leave the CredReady Site and choose to enter a third-party website,
						you accept any terms and conditions imposed by that third-party.
						Except for sponsored, featured or paid placements, the Job Ads
						contained on, or linked from, the Site are indexed or posted in an
						automated manner. CredReady has no obligation to screen any Job Ads,
						or to include any Job Ads in its search results or other listings,
						and may exclude or remove any Job Ads from the Site for any or no
						reason. We cannot confirm the accuracy or completeness of any Job Ad
						or other information submitted by any Employer or other user,
						including the identity of such Employer or other user. CredReady
						assumes no responsibility, and disclaims all liability for the
						content, accuracy, completeness, legality, reliability, or
						availability of any Job Ads, Company Pages, screener questions and
						responses, and assessments. Additionally, CredReady may provide
						search options to narrow down Job Ads search results by job type
						categories (i.e. full-time, part-time, etc.), and such categories
						are created independently and entirely by CredReady, and may not
						directly or accurately reflect the content of the Job Ads. CredReady
						may reformat Job Listings so that you may read them more clearly on
						a mobile phone. While CredReady may in some circumstances be
						compensated by employers who post Job Ads, helping keep CredReady
						job search free for Job Seekers, all Job Ads are considered
						advertising. CredReady displays Job Ads based on a combination of
						employer bids and relevance, such as search terms and other activity
						on CredReady. You are not permitted to use CredReady’s Site or its
						content other than for non-commercial purposes. For purposes of this
						Section A of the CredReady General Terms of Service, all references
						to “you” or “your” shall mean you, the individual or organization
						accessing this Site in your capacity as a Job Seeker. CredReady may
						provide functionality to call a telephone number contained in a Job
						Ad using the phone app on a mobile device. CredReady cannot
						guarantee that the extracted phone number is the correct phone
						number for the Employer or for the Job Ad you are viewing.
					</p>
					<h2>2. Resumes and Recommended Jobs</h2>
					<p>
						By creating a public resume through the Site, you are requesting and
						authorizing CredReady to make available your resume to third
						parties, such as Employers, that CredReady believes may have an
						interest in your resume. By creating or uploading a resume on
						CredReady (an “CredReady Resume”), CredReady may share with you Job
						Listings that match the contents of your CredReady Resume. CredReady
						assumes no responsibility and disclaims all liability for the resume
						or application information you post, send or receive through the
						Site. If you see any inaccuracy in any such material, it is your
						responsibility to correct such information or to contact CredReady
						to do so. To protect your privacy, CredReady may mask or hide your
						contact information, such as your email address, from your resume
						and may substitute it with an alias. CredReady may also
						automatically send you recommended jobs via the email address you
						use to create an CredReady account or apply to a job. CredReady may
						determine what these recommended jobs are on the basis of a variety
						of factors, including but not limited to, any information you input
						on the Site about yourself (including in your CredReady Resume),
						searches you run on the Site, jobs you click on, jobs you apply to,
						or the materials you provide in a job application to an Employer
						through CredReady.
					</p>
					<h2>3. Applying to Jobs Through CredReady</h2>
					<p>
						Any resume or application information that you submit through the
						Site, including Personal Data included in a resume, application or
						responses to screener questions and assessments (“CredReady Apply”),
						is subject to this Agreement (including Section D.3.) and to
						CredReady’s Privacy Policy. Once you provide information to an
						Employer (whether in the form of a job application, resume, email,
						or otherwise), CredReady does not have control over the Employer’s
						use or disclosure of that information. If you want to request the
						Employer delete, modify, or maintain confidence over any such
						information, you must make such a request directly to the Employer.
						(All references on the Site to “Apply Now”, “Easily Apply”, “Simple
						Apply”, “Apply from your phone”, “Apply with CredReady”, “RSVP to
						hiring event” or any similar references mean “CredReady Apply.”)
						CredReady may use your application materials to determine whether
						you may be interested in a Job Listing, and CredReady may reach out
						to you about such Job Listing. CredReady may store such information
						regardless of whether a Job Listing has been closed or is no longer
						available on the Site. To maintain the quality of the Site and
						Services, CredReady in its sole discretion may impose limits on your
						ability to apply to Job Listings or to other CredReady services. In
						addition, when you indicate your interest in a Job Listing through
						CredReady Apply or by RSVPing to a hiring event you are sending your
						resume and application information to CredReady, and you are
						requesting and authorizing CredReady to make available such
						application information to the applicable Employer(s) for such Job
						Listing(s). When you ask CredReady to transmit an application or a
						message, including, but not limited to, a signed offer letter, to an
						Employer via CredReady Apply or CredReady’s relay system, or store
						such application, you understand that this is without warranty, and
						that CredReady reserves the right to reformat such application or
						message. <br /> You acknowledge and agree that Employers may request
						that CredReady assemble your application materials, resume, answers
						to screener questions, assessment responses and other information
						you provide to CredReady into one document, and you agree that in
						doing so, CredReady assembles these application materials on your
						behalf. When you apply for a job on CredReady you agree to
						CredReady’s performance of automated processing in relation to your
						application, as such processing is an essential part of this
						Agreement. Additionally, you consent to your application and any
						responses sent to you by the Employer (including offer letters)
						through CredReady being processed and analyzed by CredReady
						according to this Agreement and CredReady’s Privacy Policy. When you
						apply to a job using CredReady Apply, CredReady will attempt to send
						your application to the contact information provided to us by an
						Employer or their Agent. We cannot guarantee that such messages and
						applications will be delivered, received, accessed, read or acted
						upon. CredReady also does not guarantee that any Employer will
						receive, be notified about, access, read or respond to any such
						resume or other application material, or that there will be no
						mistakes in the transmission or storage of the data. However,
						CredReady may alert you when any of the above events occur. Please
						note that Job Ads may expire between the time you submit your
						application and from the time it is received. CredReady has no
						responsibility for expired Job Ads or for delivering applications
						prior to a Job Ad’s expiration. In addition we cannot vouch for the
						validity of the contact information provided to us by Employers. We
						also cannot vouch for the technical capabilities of any third party
						sites, including but not limited to Applicant Tracking Systems
						(ATSs). If you do not feel comfortable sending an application or
						messages in this manner, or having your application or messages
						stored on CredReady, do not use the CredReady Apply or CredReady
						relay functions and please send your application or messages
						directly to the Employer by whatever other method you so choose,
						including the public mail system. You may contact the Employer
						directly to find alternative methods of application if you do not
						wish to apply through CredReady. By using the CredReady Apply
						system, you fully consent to the above. If you require alternative
						methods of screening or application you must approach the Employer
						directly to request such as CredReady is not responsible for the
						Employer application process. By using CredReady, you agree that
						CredReady is not responsible for the content of the Employer’s job
						application, messages, screener questions, skills assessments or
						their format or method of delivery, and that CredReady does not
						guarantee receipt of your application by the Employer, or your
						receipt of messages from the Employer. Please note that CredReady
						does not choose the questions asked by Employers or decide the job
						qualification criteria of Employers. Some questions may be labeled
						as Optional, indicating only that the application may be submitted
						to the Employer without providing an answer. CredReady cannot
						guarantee that the Employer will consider such an application or
						make a particular determination with regard to such an application.
						CredReady may inform Job Seekers that an Employer’s requirement from
						a job description does not appear to be present on a resume or
						application; this information is presented without warranty and
						CredReady does not guarantee that updating a resume or application
						will result in any job offer. CredReady does not guarantee the
						identity of an Employer or any individuals working for any
						Employers, and cautions Job Seekers when applying to jobs. CredReady
						cannot make any guarantee regarding health and safety measures in an
						Employer’s hiring or interviewing process. CredReady recommends Job
						Seekers follow personal health and safety best practices as
						recommended by the World Health Organization or similar institution.
						CredReady does not guarantee the validity of a job offer and
						cautions Job Seekers to verify the validity of a job offer before
						taking an adverse action regarding their current employment
						situations. Job Seekers are solely responsible for verifying the
						accuracy of any Employer or job offer. CredReady may use your
						application materials (including resumes and responses to screener
						questions) and the recency of your activity on CredReady to
						determine whether the words of any Job Seeker’s resume and answers
						to screener questions match the words of a Job Listing or Resume
						query, and vice-versa. You agree and consent that CredReady may
						differentiate those matching resumes and screener questions from
						those that do not match, and present them to Employers as matches or
						not matches. CredReady may also use such information in order to
						improve the Site or any other CredReady product or service
						(including by displaying or otherwise making available potentially
						relevant Job Listings and resumes to Job Seekers and Employers). By
						using CredReady Apply and answering screener questions, you
						acknowledge that Employers may have instructed CredReady to send out
						rejection notices if your answers do not match the answers sought by
						the Employer, and you acknowledge that CredReady has no discretion
						in the transmission of these rejections. CredReady may offer
						Employers the ability to activate a feature on their account called
						Employer Assist. Activating Employer Assist means the Employer is
						instructing CredReady to send a message on the Employer’s behalf to
						the Job Seeker informing them that the Employer has determined not
						to move forward with their application. These notices are
						automatically sent after a period of time selected by the Employer,
						unless the Employer indicates to CredReady their interest in your
						application. You acknowledge and agree that CredReady has no
						discretion in the sending of these messages, and that any such
						messages are solely a result of the Employer’s decision to activate
						Employer Assist and to not take an action on your application on
						CredReady within the time period selected by the Employer. Any
						interactions the Employer has directly with you and not through a
						tool provided by CredReady (for example, calling or emailing you
						directly instead of through an CredReady Relay Service) are not
						visible to CredReady, and would not by themselves prevent an
						Employer Assist rejection notice from being sent. When you search
						for jobs on the CredReady Job Search app and proceed to apply for a
						job, including jobs on third party sites, CredReady may suggest
						information from your CredReady profile to include in your
						application. It is your responsibility to review suggestions before
						accepting them and including them on your application. For job
						seekers located in the UK, you acknowledge that when contacted by
						CredReady, presented as CredReady Hire (hereinafter referred to as
						“CredReady Hire”), CredReady is acting as an Employment Agency (as
						defined under applicable law). The services CredReady Hire offers
						are set out in these terms. CredReady Hire will only send you Job
						Listings that CredReady Hire determines may be of interest to you.
						You further acknowledge that CredReady Hire is not authorised to
						receive any money on your behalf and/or to enter into any contracts
						on your behalf. You may also end your relationship with CredReady
						Hire at any time.
					</p>
					<h2>4. Communications and Other Actions on the Site</h2>
					<p className="mb_0">
						When you view, send, store or receive materials (including Job
						Listings, resumes, and messages) through or using the Site,
						CredReady may, for example, use such materials for data analysis,
						quality control, or to refine the Site or any other CredReady
						product or service (including to provide better search results and
						other listings for Job Seekers and Employers), whether via automated
						means or otherwise. When an Employer views, sends, stores or
						receives materials through or using the Site, CredReady may inform
						you about such actions. Additionally, we may also inform you that an
						Employer has taken other actions with regards to a Job Ad, your
						Resume, or your application, such as pausing or closing a Job Ad,
						opening your Resume or application, viewing your Resume or
						application, responding to your Resume or application, and making a
						decision with regards to your application or Job Ad. CredReady may
						inform the Employer about activities you take on the Site or your
						use of the Site, for example, whether you are online on CredReady,
						and you hereby consent to CredReady taking such actions. If you have
						turned on browser push notification and wish to turn them off, you
						may do so by visiting the settings on your browser. CredReady may
						offer you the opportunity to receive a text message interview
						reminder from CredReady when an Employer has scheduled interviews
						with you. In such an event you will enter your phone number on the
						CredReady consent form and by entering your phone number you are
						representing and confirming it is your phone number and that you
						have the right to accept text messages at the number. CredReady will
						only send you a text message reminder for such interview and you
						agree to accept such text message reminder on your cell phone,
						including messages sent by automated telephone dialing system.
						Please note that since these text message services depend on the
						functionality of third-party providers, there may be technical
						delays on the part of those providers. We also cannot vouch for the
						technical capabilities of any third parties to receive such text
						messages. CredReady may also insert functionality into messages
						relating to your application allowing you to place calls directly to
						third parties. Please note this functionality is provided solely as
						a courtesy and that such calls are not placed through or tracked by
						CredReady. Your standard calling rates with your phone provider will
						apply. You may receive messages, including but not limited to text
						messages, emails or email notifications corresponding with your or
						an Employer’s (in the event you applied for a job) activity on or
						use of the Site, CredReady Apply, CredReady Chat, or any other
						communications service, product, or feature provided on or through
						the Site. In all cases, such messages or notifications are provided
						solely as a courtesy, and you should not rely on them. For example,
						if you accept an interview request, it is your responsibility to
						follow up with the employer separately to ensure they know your
						response, do not rely on notifications through CredReady. CredReady
						may use your email address to create an alias email address for your
						communication, in lieu of displaying your actual email address to
						the Employer. Should you choose to send an email from a third party
						email client, the person with whom you’re communicating may be able
						to see your email address, rather than the alias. CredReady
						disclaims all warranties with regards to the transmission or storage
						of such courtesy notices, does not guarantee their delivery or
						receipt, and does not guarantee the date or time at which they may
						be sent. In the event a message being sent is intended for a closed
						account, these messages will not be deliverable. CredReady reserves
						the right to turn on or enable CredReady Chat or other communication
						options for select Employers or Job Listings, in its sole
						discretion, and to notify you that CredReady Chat or other
						communication options are available for a particular job or
						Employer. For CredReady Chat, you may access or view your messages
						by visiting your CredReady Chat messages dashboard. CredReady may,
						in its sole discretion, turn off or disable CredReady Chat for any
						Employer or Job Seeker at any time without prior notice. Please note
						that if you are using CredReady Chat to communicate with an
						Employer, CredReady will deliver your messages as instructed by the
						Employer. 5. Virtual Communications Employers may offer you the
						opportunity to participate in virtual and remote communications
						using CredReady products, including but not limited to, phone
						interviews, virtual meetings, and video interviews (“Virtual
						Interviews”). You understand that CredReady is not a
						telecommunications service provider and that CredReady is only
						providing the option for you to communicate with Employers via
						services that may be offered by third-party providers. Please note
						that since these telecommunication services may depend on the
						functionality of third-party providers, there may be technical
						delays or malfunctions on the part of those providers. We cannot
						vouch for the technical capabilities of any third parties to
						receive, transmit, or support such phone or video communications.
						CredReady does not guarantee any aspect of your Virtual Interview
						experience including transmission of phone or video communications,
						quality of audio/visual content, data security, or data usage and
						restrictions. CredReady is not liable for any claims arising out of
						your use of Virtual Interviews and you release CredReady from any
						such claims. You understand that CredReady does not guarantee the
						Employer’s schedule or availability for conducting Virtual
						Interviews and cannot vouch for the validity of the contact
						information provided to us. You also understand that the Employer is
						responsible for any and all questions, comments, or hiring decisions
						made. Further, Employers are responsible for any accommodations you
						need during Virtual Interviews. YOU UNDERSTAND AND AGREE THAT THERE
						IS NO PROTECTION FOR ANY INFORMATION YOU SHARE OR DATA THAT YOU
						TRANSMIT WHILE PARTICIPATING IN VIRTUAL INTERVIEWS INCLUDING, BUT
						NOT LIMITED TO, AUDIO/VISUAL CONTENT, INTERVIEW QUESTIONS AND
						ANSWERS, OR YOUR IMAGE OR LIKENESS. YOU ACKNOWLEDGE AND AGREE THAT
						CredReady IS NOT RESPONSIBLE FOR SECURING OR PROTECTING ANY DATA OR
						INFORMATION THAT YOU SHARE OR TRANSMIT DURING YOUR USE OF VIRTUAL
						INTERVIEWS. CredReady ASSUMES NO LIABILITY FOR THE MISUSE OF ANY
						DATA YOU SHARE OR TRANSMIT THROUGH USE OF VIRTUAL INTERVIEWS. YOU
						UNDERSTAND AND AGREE THAT YOU ACCESS AND USE VIRTUAL INTERVIEWS AT
						YOUR OWN DISCRETION AND RISK AND THAT CredReady DISCLAIMS ALL
						LIABILITY ARISING OUT OF YOUR USE OF VIRTUAL INTERVIEWS. 6.
						CredReady Assessments CredReady Assessments is an online tool for
						the provision and review of skills assessments selected by Employers
						(“Assessments”) and responses from Job Seekers (“Responses”) through
						the Site. Employers may use the CredReady Assessments tool to send
						you Assessments, to which you may provide Responses. After you
						provide a Response, the Employer will be able to use the CredReady
						Assessments platform to review the Response. If there are multiple
						versions of the same Assessment, the Response percentile for any Job
						Seeker will be determined only in relation to other Responses to the
						same version of that Assessment. An Assessment only evaluates a
						particular skill. It does not evaluate a Job Seeker’s qualification
						for any job. Whether a particular skill is relevant to a job, or
						whether a Job Seeker is qualified or appropriate for a job, is
						decided solely by the Employer sending the Assessment and reviewing
						your Response. Receiving or responding to an Assessment does not
						guarantee a job or job offer, or a job offer at any particular
						salary, or any further communication or action by any Employer. An
						Employer is the sole party to determine whether a Response indicates
						a qualified Job Seeker. Employers may have instructed CredReady to
						send out rejection notices if you have not responded to Assessments
						in a manner acceptable to the Employer, and you acknowledge that
						CredReady has no discretion in the transmission of these rejections.
						The Employer is the sole party to determine whether to consider any
						retaken Assessments as part of their hiring process. You acknowledge
						and understand that Employers select which Assessments to associate
						with their job openings, and that CredReady does not choose the
						Assessments sent by Employers and has no control over Employers’
						selection or use of Assessments. You agree that the questions in any
						Assessment are solely being asked by the Employer sending the
						Assessment and are not being asked by CredReady. You further agree
						that CredReady is not responsible for offering alternative methods
						of screening, if so required by the Americans with Disabilities Act
						or any other equivalent state act, and that the responsibility for
						offering any such alternative method lies solely with Employers. If
						you require an accommodation, or any alternative method(s) of
						Assessment, screening or application, you must indicate it to the
						Employer. CredReady may provide a means by which you may request
						such an alternative method or other accommodation from the Employer;
						CredReady does not guarantee the Employer’s receipt of, or response
						to, any such request. CredReady does not warrant that the method of
						delivery of any Assessment question would be compliant with the
						Americans with Disabilities Act or any equivalent state act. You
						agree and acknowledge that the usefulness and value of Assessments
						and Responses depend on their contents being kept confidential. You
						therefore agree to keep the content of Assessments and Responses
						confidential and to not reproduce or discuss them with anyone,
						except that you may communicate with an Employer about an Assessment
						they have sent to you and your Response. CredReady does not have any
						obligation to screen any Assessment or Response, or to include any
						Assessment or Response in the Site, and may exclude or remove any
						Assessment or Response from the Site for any or no reason without
						liability or notice. Assessment links sent to you may continue to be
						active after an Employer has paused or closed their job campaign on
						CredReady. Once an Employer pauses or closes their Job Ad (for
						example, after the Employer has made a hire), CredReady cannot
						guarantee that the Employer will view any related notices or
						updates, including Assessments, Responses, and accommodation
						requests. You may still choose to take the Assessment for the
						purpose of adding its results to your CredReady Profile or for
						another job application. CredReady may also offer you the option to
						select an Assessment to complete independent of a particular job,
						and your Response will be associated with your CredReady Profile.
						You may choose whether the Response is available to Employers
						viewing your CredReady Profile, though CredReady will count the
						Response for purposes of generating aggregate Response statistics
						even if Your Response is hidden. As a Job Seeker, you consent to
						your Responses, applications, and any other communications sent
						through CredReady Assessments being processed and analyzed by
						CredReady according to this Agreement and CredReady’s Privacy
						Policy. You are requesting and authorizing CredReady to make your
						Response available to the Employer providing the Assessment, or (in
						the case of Assessments selected by you) to any Employer viewing
						Your CredReady Profile. You understand that this is without
						warranty, and that CredReady reserves the right to display or
						reformat Responses in a manner to permit Employers to review your
						Response together with Responses from other Job Seekers. CredReady
						may aggregate the results of all Job Seeker-selected Assessments for
						the purpose of displaying the percentile for Your Response. You also
						acknowledge that once you have requested that CredReady transmit
						your Response to an Employer, that request cannot be canceled.
						CredReady does not guarantee that any Employer will receive, access,
						read or respond to any Response, or that there will be no mistakes
						in the transmission of the data. However, CredReady may alert you
						when any of the above events occur. As a Job Seeker, you shall not
						create or send any Response which: (i) contains any highly
						confidential personal information, such as bank account or credit
						card information, online account information, social security
						numbers (or similar counterparts outside the United States of
						America), health information, or other categories of data subject to
						special breach notification requirements in any country; (ii)
						contains proprietary information, trade secrets, confidential
						information, advertisements, solicitations, chain letters, pyramid
						schemes, investment opportunities, or other unsolicited commercial
						communication (except as otherwise expressly permitted by us in
						writing); or (iii) directly or indirectly violates the Site Rules.
						CredReady does not act as an employment agency by offering the
						CredReady Assessments tool. By using CredReady Assessments, you
						acknowledge and agree that CredReady is not procuring employees for
						Employers or procuring opportunities to work for Job Seekers.
						CredReady merely provides a tool enabling Employers and Job Seekers
						to exchange Assessments and Responses as they determine. The sole
						responsibility for the content of any Assessment or Response, any
						requests for interviews or offers made, any issues arising from an
						acceptance or denial of employment, and any other issues arising
						from the use of CredReady Assessments, is solely with Employers or
						Job Seekers as applicable. As a Job Seeker, you agree that any
						rights you have under any applicable employment, equality or
						discrimination laws, the US Fair Credit Reporting Act, any
						corresponding state laws, or any similar laws regulating consumer or
						credit reporting agencies in other countries, may only be asserted
						against the Employer. CredReady is not a third party beneficiary of
						or liable for any agreements between an Employer and Job Seeker,
						regardless of whether or not CredReady receives a fee from the
						Employer in connection with the transaction. CredReady will not be
						liable for any costs or damages arising out of or related to such
						transaction. CredReady assumes no responsibility, and disclaims all
						liability, for the content, accuracy, validity, completeness,
						legality, reliability, or availability of the Site, the CredReady
						Assessments tool, and any Assessment or Response. 7. Salary, Career,
						Hiring and Other Information Provided by CredReady CredReady may
						provide some information and content to users for informational
						purposes only. For example, CredReady may provide you with data
						regarding estimated salaries for a given Job Listing, or number of
						applies to a Job Listing, or the likelihood that a particular event
						will occur such as being selected for an interview. This information
						provided by CredReady is based on estimates given for informational
						purposes only and without warranty, and is subject to change or
						varying levels of accuracy. CredReady may also include salary
						estimations on pages other than Job Listings on the Site. Please
						note that all salary figures are approximations based upon multiple
						third party submissions to CredReady, including from CredReady
						affiliates. These figures are given to CredReady users for the
						purpose of generalized comparison only. Minimum wage may differ by
						jurisdiction and you should consult the employer for actual salary
						figures. Similarly, career-related or hiring-related information
						provided by CredReady is for informational purposes only, and is in
						no way to be construed as professional career counseling or staffing
						services. You understand that CredReady may give suggestions or
						information regarding best-practices, however, you understand that
						it is ultimately your responsibility to determine how to pursue your
						job search or candidate search. You further understand that in
						providing any such career or hiring guides, CredReady is not acting
						as a job placement agency or staffing firm. You also understand that
						by referring to or using such career or hiring guides, you are not
						guaranteed job interviews, job placement, or assurance of being
						hired, and you take full responsibility for use of these services or
						guides. As a user of the Site, CredReady may, from time to time,
						send you emails from the career or hiring guides as part of its
						services to you. These emails may include but not be limited to,
						tips on improving your resume or how to use your resume effectively
						in the job application process, commonly asked interview questions,
						next steps after you have submitted an application, and how to
						prepare for a new job after you have been hired. CredReady may
						offer, as part of the Services, the opportunity for you to engage
						with third parties, sometimes referred to as career coaches or
						professional writers, to discuss job search, resume writing,
						or career strategies, either through the Site or in person.
						Regardless of how you interact with them, you acknowledge that these
						third parties are not employees of CredReady and that CredReady is
						not responsible for the content of any such discussion. Do not share
						any information you consider confidential or personally sensitive
						with these third parties. CredReady does not guarantee the quality
						or effectiveness of any advice, recommendations, or guidance you may
						receive from these third parties. You agree that, to the maximum
						extent permitted by law, CredReady will have no liability arising
						from any discussion you have with such a third party. 8. Your Job
						Seeker Data As a Job Seeker, you take a variety of actions on our
						Site. For example, you search for jobs, and CredReady knows and
						stores the titles of jobs you search for and click on, where those
						jobs are located, the general salary range or experience level of
						the jobs you view (if indicated on the Job Listings), the Job
						Listings you apply to, your amount of activity or time of most
						recent activity on CredReady, information you provide directly to
						CredReady including desired salary or past experience, or any of
						your other behavior on the Site. You know exactly what this data is
						because you are the person who undertook the activity and the data
						pertains only to your activity. If you have an CredReady account or
						an CredReady Resume, you agree that CredReady may associate this
						data with your CredReady Profile and use this observed factual data
						to suggest jobs to you and to suggest you or your public resume to
						Employers that might be interested in a person who matches your
						behavior on CredReady. You also agree that CredReady may contact you
						based on this observed behavior on behalf of Employers or CredReady
						itself. Please note, the aforementioned actions do not include
						information sent to you by a third party, however, CredReady may
						publicly display the fact that you have recently used the CredReady
						Site to correspond with a third party. In addition, if you set your
						Resume to public, this means that CredReady may share all of the
						aforementioned information about yourself with third-party
						Employers. If you do not wish to share such information, you may set
						your Resume to private. 9. Screening Tools CredReady may make
						screening tools available to Employers for Employer use in the
						application process, including screener questions, phone screen
						tools and assessments. CredReady is licensing these tools for
						Employers’ use as determined by Employers. As a Job Seeker you agree
						that the Employer has made the determination to use these tools as
						part of its application process, and the questions asked are solely
						determined by the Employer, and are not being asked by CredReady.
						The Employer is the sole party to determine which answers will
						qualify a candidate and is solely responsible for the use of the
						screening tool including any results which are considered to have a
						“disparate impact”. You further acknowledge that only the Employer
						is responsible for offering alternative methods of screening, if so
						required by the Americans with Disabilities Act or any other
						equivalent state act. CredReady does not warrant that the method of
						delivery of these questions would be compliant with the Americans
						with Disabilities Act or any equivalent state act. 10. India and
						Brazil If you are located in India or Brazil, CredReady may provide
						limited applicant screening and filtering services to Employers that
						request that CredReady perform this processing on their behalf. 11.
						Governing Law and Dispute Resolution This Agreement and any dispute
						arising out of or in connection with this Agreement or related in
						any way to the Site (“Dispute”) will be governed as to all matters,
						including, but not limited to the validity, construction and
						performance of this Agreement, by and under the laws of the State of
						Texas, United States of America, if you are located in the United
						States, or the laws of the Republic of Ireland, if you are located
						elsewhere, without giving effect to conflicts of law principles
						thereof. Any and all actions, lawsuits, or other legal proceedings
						related to such Dispute shall be filed only in courts located in
						Travis County, Texas, U.S.A., if you are located in the United
						States, or Dublin, Ireland, if you are located elsewhere. Each of
						the Parties hereby consent to the exclusive personal jurisdiction of
						the federal or state courts located in Travis County, Texas, U.S.A,
						if you are located in the United States of America, or Dublin,
						Ireland, if you are located elsewhere. You also hereby waive any
						right to a jury trial in connection with any action or litigation in
						any way arising out of or related to your use of the Site or these
						terms of service, if you are located in the United States.
						<br />
						12. Class Action Waiver <br />
						By using the Site and in return for the services offered by
						CredReady, you acknowledge that CredReady can only offer you these
						services under the terms and conditions as presented herein. As
						partial consideration for your use of the Site and these services,
						you agree not to sue CredReady as a class plaintiff or class
						representative, join as a class member, or participate as an adverse
						party in any way in a class-action lawsuit against CredReady
						regarding your use of the Site. Additionally, as a Job Seeker, your
						use of job search on the Site is at no charge and you acknowledge
						that part of the price you are paying to use this Site is your
						acceptance of these terms of service including this Class Action
						Waiver. If you do not agree to any part of these terms, do not
						continue your use of the Site. Nothing in this paragraph, however,
						limits your rights to bring a lawsuit as an individual plaintiff,
						including in small claims court, subject to Section 9 above.
					</p>
					<div className="cta">
						<button
							className="primary-btn blue"
							onClick={() => props.show_pnp(false)}
						>
							Back
						</button>
					</div>
				</div>
			</Scrollbars>
		</div>
	);
}

export default PrivacyAndPolicy;
