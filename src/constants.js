import LocalizedStrings from 'react-localization';



/*  
PH ---> Place Holder Text,
TT ---> TootlTip Text 
*/


export const strings = new LocalizedStrings({
    en: {

        /* candidate_sign_up page variables */

        CANDIDATE_SIGN_UP: {
            PAGE_TITLE: "Create your account",

            PAGE_TITLE_MOBILE: {
                TITLE: "Welcome !",
                SUB_TITLE: "Create your account"
            },

            ARE_YOU_A: {
                CANDIDATE: "CANDIDATE",
                EMPLOYER: "EMPLOYER"
            },

            EMAIL_PH: "Enter your Email ID",

            PHONE_PH: "123-456-7890",

            PASSWORD_PH: "Enter your password",

            PASSWORD_DESCRIPTION_TEXT: "Use 8 or more characters with at least one upper case letter, one lower case letter, one number and one special character.",

            BUTTON_TO_CREATE_ACCOUNT: "Create",

            WELCOME_NOTE: {
                WELCOME: "Welcome to",
                PLATFORM_NAME: "CredReady",
                DESCRIPTION: "CredReady is the first career platform to apply the revolutionary Data Science and AI called Pathway Analytics to connect individuals and employers. CredReady produces a measure called CredReadiness for a range of job opportunities and career goals."
            },
            ERROR: {
                EMAIL_ERROR: "Enter a valid Email ID",
                PHONE_ERROR: "Enter a valid phone number",
                PASSWORD_ERROR: "The password needs 8 or more characters with at least one upper case letter, one lower case letter, one number and one special character.",
                TERMS_AND_CONDITIONS_ERROR: "Accept Terms And Conditions.",
                SAME_EMAIL_ID: "An account with same email already exists. Please try to login or reset your password"
            }
        },

        /* candidate_Verify_account page variables */

        CANDIDATE_VERIFY_ACCOUNT: {
            SUCCESS_TOAST_MESSAGE: "A verification code has been sent to your email and phone. Please enter to verify.",
            PAGE_TITLE: "Verify your account",
            DESCRIPTIVE_TEXT: "We have sent a verification code on your phone and email.Enter the verification code to proceed. ",
            SUB_DESCRIPTIVE_TEXT: "If you don't receive the email, check your spam folder.",
            TO_ENTER_VERIFICATION_CODE: "Verification code",
            BUTTON_TO_VALIDATE: "Validate",
            ALERT_TO_USER: "Verification Code Expires in ",
            RESEND_CODE: "Resend Verification Code",
            ERROR: {
                MESSAGE: "Code is incorrect, Please try again!",
                ERROR_TOAST_MESSAGE: "Invalid verification code. Please check your code and try again.",
                SUCCESS_TOAST_MESSAGE: "Your verification code has been verified.You account has been created successfully."
            }

        },

        /* candidate_Sign_in page variables */

        CANDIDATE_SIGN_IN: {
            PAGE_TITLE: "Login to your account",
            PAGE_TITLE_MOBILE: {
                TITLE: "Welcome !",
                SUB_TITLE: "Login to your account"
            },
            EMAIL_PH: "Enter your Email ID",
            PASSWORD_PH: "Enter your password",
            BUTTON_TO_LOGIN: "Login",
            LINK_TO_FORGOT_PASSWORD_PAGE: "Forgot password?",
            LINK_TO_CREATE_ACCOUNT: "Create an account",
            ERROR: "Failed to login. Please try again with valid credentials."

        },

        /* candidate_Forgot_Password page variables */

        CANDIDATE_FORGOT_PASSWORD: {
            FORGOT_PASSWORD: "Enter your registered email address below and we will send you a verification code to reset your password.",
            EMAIL_PH: "Enter your Email ID",
            BUTTON_TO_NAVIGATE_BACK: "Back to Login",
            BUTTON_TO_SEND_VERIFICATION_CODE: "Send verification code",
            ERROR: {
                ERROR_TOAST_MESSAGE: "You have entered the wrong username. Please try again with a valid username.",
                SUCCESS_TOAST_MESSAGE: "A verification code has been sent to your email and phone. Please enter to verify."
            }
        },

        /* candidate_Forgot_Password_Verification page variables */

        CANDIDATE_FORGOT_PASSWORD_VERIFICATION: {
            PAGE_TITLE: "Forgot Password",
            DESCRIPTIVE_TEXT: "A verification code has been sent to your email. Please enter to verify.",
            TO_ENTER_VERIFICATION_CODE: "Email code",
            ALERT_TO_USER: "Verification Code Expires in",
            RESENT_CODE: "Resend Verification Code",
            BUTTON_TO_SEND_VERIFY_CODE: "Verify Code",
            ERROR: {
                SUCCESS_TOAST_MESSAGE: "Your verification code has been verified.",
                ERROR_TOAST_MESSAGE: "Invalid verification code. Please check your code and try again."
            }
        },

        /* candidate_Reset_Password page variables */

        CANDIDATE_RESET_PASSWORD: {
            PAGE_TITLE: "Reset Password",
            NEW_PASSWORD_PH: "Enter your password",
            CONFIRM_PASSWORD_PH: "Confirm your password",
            BUTTON_TYO_RESET_PASSWORD: "Reset Password",
            ERROR: {
                SUCCESS_TOAST_MESSAGE: "Your password has been reset successfully. Please login to continue.",
                ERROR_TOAST_MESSAGE: "Password does not match."
            },
            PAGE_TITLE_SUCCESS: {
                TITLE: "Password Changed",
                DESCRIPTIVE_TEXT: "Your password has been changed successfully ",
                SUB_DESCRIPTIVE_TEXT: "Login using your new password.",
                BACK_TO_LOGIN: "Login"
            }
        },

        /* candidate_Onboarding page variables */

        CANDIDATE_ONBOARDING: {
            OVERLAY: {
                MENU_FOR_CANDIDATE_ONBOARDING: "Profile",
                MENU_FOR_NAVIGATING_DASHBOARD: "Dashboard",
                MENU_TO_NAVIGATE_TO_EMPLOYER_POSTED_JOB: "My Job Posts",
                NAVIGATE_TO_HOME: "Home",
                NAVIGATE_TO_CHANGE_PROFILE: "Edit Profile",
                MENU_TO_CANDIDATE_JOBS: "My Jobs",
                MENU_FOR_CANDIDATE_GOALS: "My Goals",
                MENU_FOR_CANDIDATE_APPLICATION: "Applications",
                TO_LOG_OUT: "Log out",
            },

            PROFILE_OVERVIEW: {
                SUCCESS_MESSAGE_AFTER_UPDATING_PROFILE_PICTURE: "Image uploaded successfully",
                PHONE_NO_UPDATE_UPDATE_SUCCESS_MESSAGE: "Phone number updated successfully",
                ERROR_MESSAGE_FOR_PHONE_NUMBER: "Invalid Format",
                ABOUT_ME_SUCCESS_MESSAGE: "About Me updated successfully",
                DOWNLOADING_USER_PERSONAL_DETAILS: "Export Personal Information",
                SUCCESS_MESSAGE_FOR_PERSONAL_INFORMATION_DOWNLOAD: "Profile downloaded successfully.",
                ERROR_MESSAGE_FOR_PERSONAL_INFORMATION_DOWNLOAD: "Error downloading your profile before completion.",
                DELETING_ACCOUNT: "Delete Account",
                CONFIRMATION_FOR_DELETING_ACCOUNT: "Delete your account",
                DESCRIPTIVE_DELETE_ACCOUNT: "Are you sure?",
                SUB_DESCRIPTIVE_DELETE_ACCOUNT: "Once you confirm, all of your account data will be permanently deleted.",
                BUTTON_TO_CANCEL: "Cancel",
                BUTTON_TO_DELETE_ACCOUNT: "Delete",
                ERROR_MESSAGE_FOR_DELETE_ACCOUNT: "Failed to delete. Please try again. ",
                SUCCESS_MESSAGE_FOR_DELETE_ACCOUNT: "Account deleted successfully.",

            },

            RESUME: {
                DESCRIPTIVE_TEXT: "Attach Resume. ",
                SUB_DESCRIPTIVE_TEXT: " Uploading your resume saves time completing your profile.",
                FILE_UPLOAD_CONTROL: "Select file to upload",
                FILE_UPLOAD_CONTROL_DESCRIPTION: "doc, docx, pdf - Max 6 MB",
                ERROR_MESSAGE: "Unsupported resume format. Please upload in PDF or Word (.docx) format.",
                FILE_UPLOAD_CONTROL_TO_CHANGE: "Re-upload Resume",
                RESUME_UPDATE_DATE: "Updated on ",
                NAVIGATION_TO_NEXT_PAGE: "Next",
                EXTRA_NAVIGATION_BUTTON_ON_MOBILE: "Skip for now",
            },

            PERSONAL_INFORMATION: {
                TO_FILL_PERSONAL_DETAILS: "Personal Details",
                PAGE_TITLE_MOBILE: "Personal Details",
                PAGE_SUB_TITLE_MOBILE: "Let's get your profile set up",
                SECTION_NUMBER_MOBILE: "1/4",
                FIRST_NAME: "First name",
                LAST_NAME: "Last name",
                MOST_RECENT_JOB_TITLE: "Title",
                CURRENT_EMPLOYEMENT_STATUS: "Current employment status",
                WHEN_WOULD_YOU_BE_READY_TO_BEGIN_A_NEW_ROLE: "When will you be ready to begin a new role?",
                STREET_ADDRESS: "Street address",
                CITY: "City",
                STATE: "State ",
                ZIP_CODE: "Zip code ",
                NAVIGATION_ON_NEXT_PAGE: "Next",
                NAVIGATION_ON_PREVIOUS_PAGE: "Previous",
                ERROR_MESSAGE_ON_PAGE: "Required",
                SUCCESS_MESSAGE_FOR_PROFILE_ONBOARDING: "Personal Details updated successfully"
            },

            WORK_EXPERIENCE: {
                NAVIGATION_TO_FILL_WORK_EXPERIENCE_DETAILS: "Work Experience",
                PAGE_TITLE_ON_MOBILE_FOR_WORK_EXPERIENCE: "Work Experience",
                SECTION_NUMBER_ON_WORK_EXPERIENCE_MOBILE: "2/4",
                BUTTON_FOR_ADDING_WORK_EXPERIENCE: "Add Work Experience",
                WORK_EXPERIENCE_PAGE_TITLE_FOR_ADDING: "Add Work Experience",
                SECTION_FIRST: {
                    JOB_TITLE: "Job title",
                    COMPANY: "Company",
                    CITY: "City",
                    STATE: "State",
                    IS_THIS_YOUR_CURRENT_COMPNAY: "Current company?",
                    EMPLOYMENT: "Employment",
                    EMPLOYER_WEBSITE: "Employer website",
                    DESCRIPTION: "Description",
                    BUTTON_TO_NAVIGATE: "Next",
                    ERROR_MESSAGE_ON_PAGE: "Required",
                },
                SECTION_SECOND: {
                    SUPERVISOR_NAME: "Supervisor Name",
                    TITLE: "Supervisor's Title",
                    PHONE_NUMBER: "Supervisor's Phone Number",
                    EMAIL: "Supervisor's Email",
                    CHECKBOX_FOR_USERS_PERMISSION: "Allow recruiters to contact your Supervisor",
                    BUTTON_TO_ADD_WORK_DETAILS: "Done",
                    BUTTON_TO_NAVIGATE_BACK: "Back",
                },
                SUCCESS_MESSAGE_FOR_ADDING_WORK_EXPERIENCE: "Work Experience added successfully",
                BUTTON_TO_CANCEL: "Cancel",
                NAVIGATION_TO_FILL_OTHER_EXPERIENCES: "Other Experience",
                BUTTON_TO_ADD_OTHER_EXPERIENCE: "Add Other Experience",
                OTHER_EXPERIENCE_PAGE_TITLE_FOR_ADDING: "Add Other Experience",
                NAVIGATE_TO_NEXT_PAGE: "Next",
                NAVIGATE_TO_PREVIOUS_PAGE: "Previous",
            },

            OTHER_EXPERIENCE: {
                EXPERIENCE_TYPE: "Experience Type",
                ORGANIZATION_NAME: "Organization Name",
                TITLE: "Title",
                IS_IT_ONGOING: "Is it ongoing? ",
                DATE: "Date",
                LOCATION: "Location",
                DESCRIPTION: "Description",
                BUTTON_TO_CONFIRM_ADDING_DETAILS: "Done",
                ERROR_MESSAGE_ON_PAGE: "Required",
            },

            EDUCATIONAL_EXPERIENCE: {
                PAGE_TITLE_MOBILE: "Education",
                SECTION_NUMBER_OF_PAGE_MOBILE: "3/4",
                NAVIGATION_TO_FILL_EDUCATIONAL_DETAILS: "Education",
                BUTTON_FOR_ADDING_EDUCATION: "Add Education",
                EDUCATION_DETAILS_PAGE_TITLE_FOR_ADDING: "Add Education",
                DEGREE_OF_HIGH_SCHOOL_DIPLOMA: "Degree or High School Diploma",
                INSTITUTION: "Institution ",
                ATTENDED: "Attended",
                MAJOR: "Major",
                MINOR: "Minor",
                ADDITIONAL_COMMENTS: "Additional Comments",
                DEGREE_GRANTED: "Degree granted?",
                BUTTON_TO_CONFIRM_ADDING_DETAILS: "Done",
                ERROR_MESSAGE_ON_PAGE: "Required",
                NAVIGATION_TO_FILL_CERTIFICATION_DETAILS: "Certification",
                BUTTON_FOR_ADDING_CERTIFICATE_DETAILS: "Add Certificate",

                CERTIFICATE: {
                    CERTIFICATION_DETAILS_PAGE_TITLE_FOR_ADDING: "Add Certificate",
                    INDUSTRY: "Industry",
                    CERTIFICATE_TITLE: "Certificate Title",
                    ISSUER: "Issuer",
                    ISSUE_DATE: "Issue Date",
                    CERTIFICATE_LINK: "Certificate Link",
                    CERTIFICATE_LINK_PH: "Paste URL link in this box",
                    CERTIFICATE_IMAGE: "Certificate Image",
                    DESCRIPTION: "Description",
                    BUTTON_TO_CONFIRM_ADDING_DETAILS: "Done",
                    ERROR_MESSAGE_ON_PAGE: "Required",
                },
                NAVIGATION_TO_NEXT_PAGE: "Next",
                NAVIGATION_TO_PREVIOUS_PAGE: "Previous",
                NAVIGATION_TO_CHECK_PREVIEW_OF_ADDED_DETAILS: "Preview",

            },

            PREVIEW: {
                SECTION_NUMBER_OF_PAGE_MOBILE: "4/4",
                RESUME: {
                    TITLE: "Resume",
                    NO_RESUME: "No resumes uploaded yet.We accept doc, docx, pdf formats upto 6 MB",
                },
                PERSONAL_DETAILS: {
                    NAME: "Name",
                    LAST_NAME: "Last Name",
                    CURRENT_EMPLOYEMENT_STATUS: "Current Employment Status",
                    HOW_LONG_WOULD_YOU_BEGIN_A_NEW_ROLE: "How long would you begin a new role? ",
                },
                WORK_EXPERIENCE: "Work Experience",
                EDUCATION: "Education",
                CERTIFICATE: "Certifications",
                OTHER_EXPERIENCE: "Other Experiences",
                PERMISSION_CHECK_FROM_USER: "Allow recruiters to contact you for more details",
                CONFIRMATION_CHECKBOX_FROM_USER: "I confirm that the information given in this form is true, complete and accurate.",
                BUTTON_TO_NAVIGATING_TO_JOBS: "Save Profile",
                BUTTON_TO_PREVIEW_PAGE_MOBILE: "Complete Profile"
            }

        },

        /* candidate_MYJOBS_ page variables */

        CANDIDATE_MYJOBS: {
            PAGE_TITLE: "My Jobs",
            SEARCH_JOB_BY_TITLES_PH: "Search by Job Title",
            SEARCH_JOB_BY_LOCATION_PH: "Search by Job Location",
            ALERT_MESSAGE_IN_APPLIED_JOBS: "No records found.",
            ALERT_MESSAGE_IN_RELATED_JOBS: "No records found.",
            TO_CHECK_APPLIED_JOBS_BY_CANDIDATE: "Applied Jobs",
            TO_CHECK_RELATED_JOBS_BY_CANDIDATE: "Related Jobs",
            NAVIGATION_TO_APPLY_JOB: "Related Jobs",
            MESSAGE_FOR_USER_BEFORE_APPLYING_FOR_THE_JOB: "You need to answer questions to see your CredReadiness",
            MESSAGE_BEFORE_APPLYING_FOR_JOBS: "Interested in Applying?",
            BUTTON_TO_GET_THE_QUESTION_PAGE: "Proceed",
            APPLYING_FOR_JOB: {
                PAGE_TITLE: "You Are Applying For",
                NAVIGATION_FOR_GENERAL_QUESTION: "General Questions",
                NAVIGATION_FOR_PERSONAL_EXPERIENCE_QUESTION: "Your Personal Experiences",
                NAVIGATION_FOR_COURSEWORK_QUESTION: "Course Work",
                NAVIGATION_FOR_WORKHISTORY_QUESTION: "Work History",
                NAVIGATION_FOR_COMMUTE_QUESTION: "Commute",
                NAVIGATION_FOR_EMPLOYER_QUESTION: "Employer Questions",
                BUTTON_TO_SUBMIT_ANSWERS: "View CredReadiness and apply next",
                ERROR_MESSAGE_ON_PAGE: "Required",
                ERROR_MESSAGE_WHILE_APPLYING_FOR_JOB: "Please fill all the required fields.",
            },
            USER_CREDREADINESS: "Your CredReadiness",
            INDICATORS: ["GetStarted", "AlmostReady", "Ready"],
            POTENTIALS_TEXT: "Potential for improving CredReadiness Builders",
            MESSAGE_TO_USER: "Are you interested in applying for this position?",
            ALERT_TO_USER: "Your CredReadiness is lower than the required score for the position. Are you sure you want to apply?",
            BUTTON_TO_APPLY_FOR_JOB: "Apply for the job",
            APPLIED_JOB_VIEW: "Applied Jobs",
            APPLICATION_PREVIEW: {
                RESUME: "Resume",
                PERSONAL_DETAILS: "Personal Details",
                WORK_EXPERIENCE: "Work Experience",
                EDUCATION: "Education",
                CERTIFICATIONS: "Certifications",
                GENERAL_QUESTIONS: "General Questions",
                YOUR_PERSONAL_EXPERIENCE: "Your Personal Experiences",
                COURSEWORK: "Coursework",
                WORK_HISTORY: "Work History",
                COMMUTE: "Commute",
                EMPLOYER_QUESTIONS: "Employer Questions",
            },
            BUTTON_TO_UPDATE_CREDREADINESS_OF_APPLICATION: "Update my CredReadiness",

            APPLIED_JOB_VIEW: {
                USER_SUBMITTED_DETAILS_SECTION_TITLE: "Submitted Application ",
                USER_SUBMITTED_DETAILS_SECTION_TITLE_DRAFTED: "Drafted Application",
                RESUME: "Resume",
                RESUME_NOT_FOUND: "Not Found",
                PERSONAL_DETAILS: "Personal Details",
                WORK_EXPERIENCE: "Work Experience",
                OTHER_EXPERIENCE: "Other Experiences",
                EDUCATION: "Education",
                CERTIFICATE: "Certifications",
                OTHER_EXPERIENCE: "Other Experiences",
                BUTTON_RO_UPDATE_JOB_APPLICATION: "",
                BUTTON_TO_APPLY_DRAFTED_JOB: "Apply"
            }


        },


        /* candidate_Appplication_ page variables */

        CANDIDATEAPPLICATION: {
            PAGE_TITLE: "Application",
            TO_SEARCH_APPLICATION_BY_TITLE_PH: "Search by Job Title",
            TO_SEARCH_APPLICATION_BY_LOCATION_PH: "Search by Location",
            ALERT_MESSSAGE_FOR_CURRENT_GOALS: "No Goals Found.",
            ALERT_MESSSAGE_FOR_APPLICATION_STATUS: "No Applications Found.",
            USER_APPLICATION_STATUS: "Application Status",
            GOALS_DETAILS: "Current Goals",
            LATEST_JOB_DETAILS: "Latest Openings",
            BUTTON_TO_SEE_THE_JOB_DETAILS: "View",

        },


        /* candidate_MyGoals_ page variables */

        CANDIDATE_MYGOALS: {
            PAGE_TITLE: "My Goals",
            SEARCH_THE_GOALS: "Search by Goal Title",
            CURRENT_GOALS_DETAILS: "Current Goals",
            ALTERNATE_GOALS_DETAILS: "Alternate Goals",
            NAVIGATE_ON_ALTERNATE_GOAL_DETAILS_PAGE: "Select",
            BUTTON_TO_ADD_CURRENT_GOALS: "Add to My Goals",
            MORE_OPTIONS_RELATED_TO_THE_GOALS: "Click here for Explore Career Options",
            EXPLORE_GOALS: {
                PAGE_TITLE: "Explore Career Options",
                SEARCH_THE_JOBS_PH: "Search by Job Title",
                GOALS_OPTIONS: [
                    {
                        title: "Building and fixing things",
                        child: [],
                    },
                    {
                        title: "Computers",
                        child: [],
                    },
                    {
                        title: "Food",
                        child: [],
                    },
                    {
                        title: "Healthcare",
                        child: [
                            "Pharmacist",
                            "Certified Nursing Assistant",
                            "Registered Nurse",
                            "Optometrist",
                            "Doctor",
                        ],
                    },
                    {
                        title: "Helping your community",
                        child: [],
                    },
                    {
                        title: "Law",
                        child: [],
                    },
                    {
                        title: "Managing Money",
                        child: [],
                    },
                    {
                        title: "Maths",
                        child: [],
                    },
                    {
                        title: "Music and art",
                        child: [],
                    },
                    {
                        title: "Nature",
                        child: [],
                    },
                    {
                        title: "Reading",
                        child: [],
                    },
                    {
                        title: "Science",
                        child: [],
                    },
                    {
                        title: "Social Studies",
                        child: [],
                    },
                    {
                        title: "Sports",
                        child: [],
                    },
                    {
                        title: "Teaching",
                        child: [],
                    },
                    {
                        title: "Transportation",
                        child: [],
                    },
                ],
                NAVIGATION_TO_GOALS_DETAILS: "Select",
                BUTTON_TO_ADD_CURRENT_GOAL: "Add to My Goals"
            }

        },

        /* Employer_onboarding Variable */


        EMPLOYER_ONBOARDING: {
            PROFILE_UPDATE: "Welcome! Please fill in the details about your company.",
            FULL_NAME: "Full Name",
            TITLE: "Title",
            COMPANY_WEBSITE: "Company Website",
            HIRING_NEEDS: "Hires needed in the next 6 months",
            COMPANY_SIZE: "Current employees",
            HOW_DID_YOU_HEAR_ABOUT_US: "How did you hear about us?",
            ERROR_MEESAGE_FOR_INVALID_ZIP_CODE: "Please enter your Zipcode",
            ERROR_MESSAGE_ON_PAGE: "Required",
            ADD_MULTIPLE_ADDRESS: "Add multiple address",
            BUTTON_TO_SUBMIT_DETAILS: "Submit",
        },

        /* Employer_Dashboard Variable */

        EMPLOYER_DASHBOARD: {
            PAGE_TITLE: "Dashboard",
            JOB_POSTED: "Job Posted",
            OPEN_POSITIONS: "Open Positions",
            NEW_APPLICATIONS: "New Applications",
            INTERVIEWED: "Interviewed",
            OFFER_PLACED: "Offer Placed",
            ALERT_NO_JOBS: "No Jobs Posted Yet.",
            BUTTON_TO_POST_JOB: "Post Job",
        },

        EMPLOYER_POST_JOB: {
            BASIC_JOB_DETAILS: "Basic job details",
            JOB_TITLE: "Job Title",
            TITLE: "Let's get started",
            DESCRIPTION_TEXT: "Add basic job details below as they will help the applicants understand the job requirements.",
            JOB_LOCATIONS: "Job Location",
            EMPLOYMENT_TYPE: "Employment Type",
            JOB_FUNCTION_CLASSIFICATION: "Job Function Classification",
            NUMBER_OF_POSITIONS: "Number of open positions?",
            JOB_DESCRIPTION: "Job Description",
            CERTIFICATES: "Certificates",
            EXPERIENCE_REQUIRED: "Desired Relevant Experience required",
            SELECT_EXPERIENCE: "Select the desired relevant experience an applicant needs to apply for the job"
        },

        EMPLOYER_POSTED_JOB: {
            NO_POSTED_JOB: "No Posted Jobs",
            SUGGESTIONS_TO_POST_JOB: "No jobs have been created yet.",
            SUB_SUGGESTIONS_TO_POST_JOB_TEXT: " Why don't you post the job by clicking on the button below?",
            PAGE_TITLE: "My Posted Jobs",
            JOB_OPENINGS: "Job Openings",
            BUTTON_TO_POST_JOB: "Post Job",
            RECIEVE_EMAIL_NOTIFICATIONS: "Receive Email Notification",
            RECIEVE_SMS_NOTIFICATIONS: "Receive SMS Notification",
            VIEW_CANDIDATES: "View Candidates",
            CERTIFICATES: "Certificates",
            DESCRIPTION: "Description",
            COPY_LINK: "Copy Link",
        }
    },
});