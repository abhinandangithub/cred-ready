import * as actionTypes from "../actions/actionTypes/candidate";
import { updateObject } from "../utility";

const initialState = {
    jobApplications: {
        "message": "Resume uploaded successfully",
        "data": {
            "appliedJobs": [
                // {
                //     "jobId": 84,
                //     "jobAppId": 28,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 29,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 30,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 31,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 111,
                //     "jobAppId": 35,
                //     "readinessIndex": 82,
                //     "jobTitle": "Test Job For Jobseeker",
                //     "orgName": "Innovatorssbay tech",
                //     "minExp": 3,
                //     "maxExp": 7,
                //     "location": "bangaluru, Karnataka",
                //     "jobDescription": "- test job description\n- test job description\n",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 111,
                //     "jobAppId": 36,
                //     "readinessIndex": 82,
                //     "jobTitle": "Test Job For Jobseeker",
                //     "orgName": "Innovatorssbay tech",
                //     "minExp": 3,
                //     "maxExp": 7,
                //     "location": "bangaluru, Karnataka",
                //     "jobDescription": "- test job description\n- test job description\n",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 111,
                //     "jobAppId": 37,
                //     "readinessIndex": 82,
                //     "jobTitle": "Test Job For Jobseeker",
                //     "orgName": "Innovatorssbay tech",
                //     "minExp": 3,
                //     "maxExp": 7,
                //     "location": "bangaluru, Karnataka",
                //     "jobDescription": "- test job description\n- test job description\n",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 111,
                //     "jobAppId": 38,
                //     "readinessIndex": 82,
                //     "jobTitle": "Test Job For Jobseeker",
                //     "orgName": "Innovatorssbay tech",
                //     "minExp": 3,
                //     "maxExp": 7,
                //     "location": "bangaluru, Karnataka",
                //     "jobDescription": "- test job description\n- test job description\n",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 111,
                //     "jobAppId": 39,
                //     "readinessIndex": 82,
                //     "jobTitle": "Test Job For Jobseeker",
                //     "orgName": "Innovatorssbay tech",
                //     "minExp": 3,
                //     "maxExp": 7,
                //     "location": "bangaluru, Karnataka",
                //     "jobDescription": "- test job description\n- test job description\n",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 111,
                //     "jobAppId": 40,
                //     "readinessIndex": 82,
                //     "jobTitle": "Test Job For Jobseeker",
                //     "orgName": "Innovatorssbay tech",
                //     "minExp": 3,
                //     "maxExp": 7,
                //     "location": "bangaluru, Karnataka",
                //     "jobDescription": "- test job description\n- test job description\n",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 111,
                //     "jobAppId": 41,
                //     "readinessIndex": 82,
                //     "jobTitle": "Test Job For Jobseeker",
                //     "orgName": "Innovatorssbay tech",
                //     "minExp": 3,
                //     "maxExp": 7,
                //     "location": "bangaluru, Karnataka",
                //     "jobDescription": "- test job description\n- test job description\n",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 111,
                //     "jobAppId": 42,
                //     "readinessIndex": 82,
                //     "jobTitle": "Test Job For Jobseeker",
                //     "orgName": "Innovatorssbay tech",
                //     "minExp": 3,
                //     "maxExp": 7,
                //     "location": "bangaluru, Karnataka",
                //     "jobDescription": "- test job description\n- test job description\n",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 44,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 111,
                //     "jobAppId": 45,
                //     "readinessIndex": 82,
                //     "jobTitle": "Test Job For Jobseeker",
                //     "orgName": "Innovatorssbay tech",
                //     "minExp": 3,
                //     "maxExp": 7,
                //     "location": "bangaluru, Karnataka",
                //     "jobDescription": "- test job description\n- test job description\n",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 46,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 47,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 48,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 49,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 50,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 22,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Applied"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 23,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Applied"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 51,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 52,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 24,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Applied"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 25,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Applied"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 26,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Applied"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 53,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Draft"
                // },
                // {
                //     "jobId": 84,
                //     "jobAppId": 27,
                //     "readinessIndex": 82,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job",
                //     "currentAppStatus": "Applied"
                // }
            ],
            "relatedJobs": [
                // {
                //     "jobId": 84,
                //     "readinessIndex": 0,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Adding some meaningful job description for the job"
                // },
                // {
                //     "jobId": 85,
                //     "readinessIndex": 0,
                //     "jobTitle": "Senior Nursing Assistant",
                //     "orgName": "Test Senior Living",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Provide basic patient care under direction of nursing staff."
                // },
                // {
                //     "jobId": 90,
                //     "readinessIndex": 0,
                //     "jobTitle": "Certificate Nursing Assistant",
                //     "orgName": "Amen Clinics",
                //     "minExp": 4,
                //     "maxExp": 1,
                //     "location": "New York, NY",
                //     "jobDescription": "Some nice job description"
                // }
            ]
        },
        "status": "OK"
    },
    jobDetails: {
        "data": {
            "jobDetails": {
                "jobId": 111,
                "readinessIndex": 0,
                "jobTitle": "Test Job For Jobseeker",
                "orgName": "Innovatorssbay tech",
                "minExp": 3,
                "maxExp": 7,
                "location": "bangaluru, Karnataka",
                "jobDescription": "- test job description\n- test job description\n"
            },
            "candidateJobApplication": {
                "id": 35,
                "candidate_id": 0,
                "job_id": 0,
                "status": "Draft",
                "readiness_index": 82,
                "marginal_associations": [
                    {
                        "id": 85,
                        "candidate_job_id": 35,
                        "metric": "Metric 01",
                        "score": 48
                    },
                    {
                        "id": 87,
                        "candidate_job_id": 35,
                        "metric": "Metric 21",
                        "score": 73
                    },
                    {
                        "id": 88,
                        "candidate_job_id": 35,
                        "metric": "Metric 31",
                        "score": 27
                    },
                    {
                        "id": 86,
                        "candidate_job_id": 35,
                        "metric": "Metric 11",
                        "score": 57
                    }
                ]
            },
            "candidate": {
                "candidate_id": 24,
                "username": "mike@gmail.com",
                "first_name": "Tim",
                "last_name": "test",
                "current_employment_status": 5,
                "available_within": "Less than 2 weeks",
                "address_id": 87,
                "address": {
                    "id": 87,
                    "street_address": "Texas",
                    "city": "NY",
                    "state": "UK",
                    "zip_code": 263153
                },
                "role_id": 1,
                "role": {
                    "role_id": 1,
                    "role_name": "jobseeker",
                    "is_active": true,
                    "privileges": [
                        {
                            "privilege_id": 2,
                            "role_id": 1
                        },
                        {
                            "privilege_id": 2,
                            "role_id": 1
                        }
                    ]
                },
                "contacts": [
                    {
                        "id": 56,
                        "contact_type": "phone",
                        "contact": "+16173837817",
                        "is_verified": true
                    },
                    {
                        "id": 55,
                        "contact_type": "email",
                        "contact": "mike@gmail.com",
                        "is_verified": false
                    }
                ],
                "education_experience": [
                    {
                        "id": 143,
                        "candidate_id": 24,
                        "title": "1",
                        "institution": 2,
                        "attended_from": "Oct 5, 2020, 12:00:00 AM",
                        "attended_till": "Oct 20, 2020, 12:00:00 AM",
                        "education_description": "Test",
                        "education_major": [
                            {
                                "id": 731,
                                "name": "Animal/Livestock Husbandry and Production.",
                                "is_active": true,
                                "is_approved": true
                            },
                            {
                                "id": 732,
                                "name": "Aquaculture.",
                                "is_active": true,
                                "is_approved": true
                            }
                        ],
                        "education_minor": [
                            {
                                "id": 741,
                                "name": "Dog/Pet/Animal Grooming.",
                                "is_active": true,
                                "is_approved": true
                            },
                            {
                                "id": 742,
                                "name": "Animal Training.",
                                "is_active": true,
                                "is_approved": true
                            }
                        ],
                        "created_on": "Oct 13, 2020, 11:11:17 AM",
                        "modified_on": "Oct 13, 2020, 11:11:17 AM"
                    },
                    {
                        "id": 153,
                        "candidate_id": 24,
                        "title": "1",
                        "institution": 2,
                        "attended_from": "Sep 28, 2020, 12:00:00 AM",
                        "attended_till": "Sep 28, 2020, 12:00:00 AM",
                        "education_description": "asd",
                        "education_major": [
                            {
                                "id": 731,
                                "name": "Animal/Livestock Husbandry and Production.",
                                "is_active": true,
                                "is_approved": true
                            },
                            {
                                "id": 732,
                                "name": "Aquaculture.",
                                "is_active": true,
                                "is_approved": true
                            }
                        ],
                        "education_minor": [
                            {
                                "id": 741,
                                "name": "Dog/Pet/Animal Grooming.",
                                "is_active": true,
                                "is_approved": true
                            },
                            {
                                "id": 742,
                                "name": "Animal Training.",
                                "is_active": true,
                                "is_approved": true
                            }
                        ],
                        "created_by": "Sachin test",
                        "created_on": "Oct 16, 2020, 1:41:59 PM",
                        "modified_by": "Sachin test",
                        "modified_on": "Oct 16, 2020, 1:41:59 PM"
                    }
                ],
                "additional_experiences": [
                    {
                        "id": 74,
                        "career_path": "work",
                        "candidate_id": 24,
                        "experience_type": 1,
                        "organization_name": "sacsa",
                        "title": "test title",
                        "location": "bbb",
                        "employed_from": "Mar 16, 2020, 12:00:00 AM",
                        "employed_till": "Oct 4, 2020, 12:00:00 AM",
                        "description": "test desc",
                        "skills": [],
                        "created_by": "Samay Cook",
                        "created_on": "Oct 15, 2020, 12:52:13 PM",
                        "modified_by": "Samay Cook",
                        "modified_on": "Oct 15, 2020, 12:52:13 PM"
                    },
                    {
                        "id": 94,
                        "career_path": "EDUCATION",
                        "candidate_id": 24,
                        "experience_type": 6,
                        "organization_name": "Test",
                        "title": "Test",
                        "location": "test",
                        "employed_from": "Sep 9, 2020, 12:00:00 AM",
                        "employed_till": "Oct 5, 2020, 12:00:00 AM",
                        "description": "Test",
                        "skills": [],
                        "created_by": "Sachin test",
                        "created_on": "Oct 18, 2020, 6:30:00 AM",
                        "modified_by": "Sachin test",
                        "modified_on": "Oct 18, 2020, 6:30:00 AM"
                    },
                    {
                        "id": 65,
                        "career_path": "work",
                        "candidate_id": 24,
                        "experience_type": 1,
                        "organization_name": "techHub",
                        "title": "UI developer",
                        "location": "Bangalore",
                        "employed_from": "Oct 5, 2020, 12:00:00 AM",
                        "employed_till": "Oct 14, 2020, 12:00:00 AM",
                        "description": "Test",
                        "skills": [],
                        "created_on": "Oct 13, 2020, 11:09:35 AM",
                        "modified_on": "Oct 13, 2020, 11:09:35 AM"
                    },
                    {
                        "id": 66,
                        "career_path": "EDUCATION",
                        "candidate_id": 24,
                        "experience_type": 5,
                        "organization_name": "TechHub",
                        "title": "UI developer",
                        "location": "Bangalore",
                        "employed_from": "Oct 7, 2020, 12:00:00 AM",
                        "employed_till": "Oct 24, 2020, 12:00:00 AM",
                        "description": "Test",
                        "skills": [],
                        "created_on": "Oct 13, 2020, 11:10:14 AM",
                        "modified_on": "Oct 13, 2020, 11:10:14 AM"
                    }
                ],
                "work_experience": [
                    {
                        "work_ex_id": 123,
                        "candidate_id": 24,
                        "title": "UI developer",
                        "company": "XYZ",
                        "location": "Bangalore",
                        "employment_from": "Oct 7, 2020, 12:00:00 AM",
                        "employment_to": "Oct 14, 2020, 12:00:00 AM",
                        "job_description": "Test",
                        "employer_website": "Test",
                        "created_by": "mike@gmail.com",
                        "created_on": "Oct 13, 2020, 11:08:52 AM",
                        "modified_by": "mike@gmail.com",
                        "modified_on": "Oct 13, 2020, 11:08:52 AM"
                    },
                    {
                        "work_ex_id": 126,
                        "candidate_id": 24,
                        "title": "Tester",
                        "company": "zyx",
                        "location": "Bangalore",
                        "employment_from": "Oct 5, 2020, 12:00:00 AM",
                        "employment_to": "Oct 20, 2020, 12:00:00 AM",
                        "job_description": "Test",
                        "employer_website": "Test",
                        "created_by": "mike@gmail.com",
                        "created_on": "Oct 13, 2020, 7:52:40 PM",
                        "modified_by": "mike@gmail.com",
                        "modified_on": "Oct 13, 2020, 7:52:40 PM"
                    },
                    {
                        "work_ex_id": 127,
                        "candidate_id": 24,
                        "title": "Data Scientist",
                        "company": "XYZ",
                        "location": "Bangalore",
                        "employment_from": "Oct 7, 2020, 12:00:00 AM",
                        "employment_to": "Oct 5, 2020, 12:00:00 AM",
                        "job_description": "Test",
                        "employer_website": "Test",
                        "created_by": "mike@gmail.com",
                        "created_on": "Oct 14, 2020, 2:45:41 AM",
                        "modified_by": "mike@gmail.com",
                        "modified_on": "Oct 14, 2020, 2:45:41 AM"
                    },
                    {
                        "work_ex_id": 129,
                        "candidate_id": 24,
                        "title": "UI developer2",
                        "company": "XYZ",
                        "location": "Bangalore",
                        "employment_from": "Oct 5, 2020, 12:00:00 AM",
                        "employment_to": "Oct 14, 2020, 12:00:00 AM",
                        "job_description": "Test",
                        "employer_website": "Test",
                        "created_by": "mike@gmail.com",
                        "created_on": "Oct 14, 2020, 11:28:18 AM",
                        "modified_by": "mike@gmail.com",
                        "modified_on": "Oct 14, 2020, 11:28:18 AM"
                    },
                    {
                        "work_ex_id": 136,
                        "candidate_id": 24,
                        "title": "Quality engineer",
                        "company": "cred ready",
                        "location": "usa",
                        "employment_from": "Oct 13, 2020, 12:00:00 AM",
                        "employment_to": "Oct 19, 2020, 12:00:00 AM",
                        "job_description": "aassasa",
                        "employer_website": "aassasa",
                        "created_by": "mike@gmail.com",
                        "created_on": "Oct 16, 2020, 8:18:41 AM",
                        "modified_by": "mike@gmail.com",
                        "modified_on": "Oct 16, 2020, 8:18:41 AM"
                    },
                    {
                        "work_ex_id": 137,
                        "candidate_id": 24,
                        "title": "Medical supplier",
                        "company": "innovators",
                        "location": "Bangalore",
                        "employment_from": "Feb 2, 2010, 12:00:00 AM",
                        "employment_to": "Feb 2, 2014, 12:00:00 AM",
                        "job_description": "software develpoment",
                        "employer_website": "software develpoment",
                        "created_by": "mike@gmail.com",
                        "created_on": "Oct 16, 2020, 9:18:09 AM",
                        "modified_by": "mike@gmail.com",
                        "modified_on": "Oct 16, 2020, 9:18:09 AM"
                    }
                ],
                "certificate": [
                    {
                        "id": 88,
                        "candidate_id": 24,
                        "title_id": 10601,
                        "issuer": "XYZ Inc.",
                        "issued_date": "Oct 9, 2019, 2:00:38 AM",
                        "industry_id": 2,
                        "function_id": 2,
                        "certificate_link": "https://somelinl.com/file",
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        "created_by": "Tim Cook",
                        "created_on": "Oct 14, 2020, 6:12:50 AM",
                        "modified_by": "Tim Cook",
                        "modified_on": "Oct 14, 2020, 6:12:50 AM"
                    },
                    {
                        "id": 89,
                        "candidate_id": 24,
                        "title_id": 1,
                        "issuer": "xyz.com",
                        "issued_date": "Sep 28, 2020, 12:00:00 AM",
                        "industry_id": 75,
                        "function_id": 3,
                        "certificate_link": "http://localhost:3000/profile/education",
                        "description": "Test",
                        "created_by": "Tim Cook",
                        "created_on": "Oct 14, 2020, 6:14:12 AM",
                        "modified_by": "Tim Cook",
                        "modified_on": "Oct 14, 2020, 6:14:12 AM"
                    },
                    {
                        "id": 90,
                        "candidate_id": 24,
                        "title_id": 1,
                        "issuer": "XYZ",
                        "issued_date": "Sep 28, 2020, 12:00:00 AM",
                        "industry_id": 3,
                        "function_id": 2,
                        "certificate_link": "http://localhost:3000/profile/education",
                        "description": "Test",
                        "created_by": "Tim Cook",
                        "created_on": "Oct 15, 2020, 3:15:08 AM",
                        "modified_by": "Tim Cook",
                        "modified_on": "Oct 15, 2020, 3:15:08 AM"
                    },
                    {
                        "id": 91,
                        "candidate_id": 24,
                        "title_id": 1,
                        "issuer": "InnovatorsBay",
                        "issued_date": "Sep 29, 2020, 12:00:00 AM",
                        "industry_id": 3,
                        "function_id": 2,
                        "certificate_link": "http://localhost:3000/profile/education",
                        "description": "Test",
                        "created_by": "Tim Cook",
                        "created_on": "Oct 15, 2020, 3:56:11 AM",
                        "modified_by": "Tim Cook",
                        "modified_on": "Oct 15, 2020, 3:56:11 AM"
                    },
                    {
                        "id": 92,
                        "candidate_id": 24,
                        "title_id": 1,
                        "issuer": "InnovaotrsBay",
                        "issued_date": "Oct 27, 2020, 12:00:00 AM",
                        "industry_id": 15,
                        "function_id": 3,
                        "certificate_link": "http://localhost:3000/profile/education",
                        "description": "Test",
                        "created_by": "Tim Cook",
                        "created_on": "Oct 15, 2020, 3:58:10 AM",
                        "modified_by": "Tim Cook",
                        "modified_on": "Oct 15, 2020, 3:58:10 AM"
                    },
                    {
                        "id": 93,
                        "candidate_id": 24,
                        "title_id": 5,
                        "issuer": "InnovatorsBay",
                        "issued_date": "Sep 28, 2020, 12:00:00 AM",
                        "industry_id": 14,
                        "function_id": 2,
                        "certificate_link": "http://localhost:3000/profile/education",
                        "description": "Test",
                        "created_by": "Tim Cook",
                        "created_on": "Oct 15, 2020, 3:59:16 AM",
                        "modified_by": "Tim Cook",
                        "modified_on": "Oct 15, 2020, 3:59:16 AM"
                    },
                    {
                        "id": 94,
                        "candidate_id": 24,
                        "title_id": 1,
                        "issuer": "InnovatorsBay",
                        "issued_date": "Sep 28, 2020, 12:00:00 AM",
                        "industry_id": 3,
                        "function_id": 3,
                        "certificate_link": "http://localhost:3000/profile/education",
                        "description": "TESTING",
                        "created_by": "Tim Cook",
                        "created_on": "Oct 15, 2020, 4:00:45 AM",
                        "modified_by": "Tim Cook",
                        "modified_on": "Oct 15, 2020, 4:00:45 AM"
                    },
                    {
                        "id": 95,
                        "candidate_id": 24,
                        "title_id": 3,
                        "issuer": "CredReady",
                        "issued_date": "Oct 27, 2020, 12:00:00 AM",
                        "industry_id": 2,
                        "function_id": 50,
                        "certificate_link": "http://localhost:3000/profile/education",
                        "description": "Test",
                        "created_by": "Tim Cook",
                        "created_on": "Oct 15, 2020, 4:23:15 AM",
                        "modified_by": "Tim Cook",
                        "modified_on": "Oct 15, 2020, 4:23:15 AM"
                    },
                    {
                        "id": 98,
                        "candidate_id": 24,
                        "title_id": 14,
                        "issuer": "qqqq",
                        "issued_date": "May 10, 2020, 12:00:00 AM",
                        "industry_id": 1,
                        "function_id": 1,
                        "certificate_link": "http://localhost:3000/profile/education",
                        "description": "test desc",
                        "created_by": "Mike test",
                        "created_on": "Oct 15, 2020, 1:24:12 PM",
                        "modified_by": "Mike test",
                        "modified_on": "Oct 15, 2020, 1:24:12 PM"
                    },
                    {
                        "id": 113,
                        "candidate_id": 24,
                        "title_id": 10601,
                        "issuer": "XYZ Inc.",
                        "issued_date": "Oct 9, 2019, 12:00:00 AM",
                        "industry_id": 2,
                        "function_id": 2,
                        "certificate_link": "http://localhost:3000/profile/education",
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        "created_by": "Sachin test",
                        "created_on": "Oct 17, 2020, 11:18:45 AM",
                        "modified_by": "Sachin test",
                        "modified_on": "Oct 17, 2020, 11:18:45 AM"
                    }
                ],
                "created_by": "mike@gmail.com",
                "created_on": "Oct 13, 2020, 10:51:46 AM",
                "modified_by": "mike@gmail.com",
                "modified_on": "Oct 13, 2020, 10:51:46 AM"
            },
            "submittedAnswer": {
                "generalQuestions": {
                    "id": 265,
                    "candidate_id": 24,
                    "category": "general_questions",
                    "answer": "[{\"answer\":\"10/20/90\",\"question_id\":1},{\"answer\":1,\"question_id\":2},{\"answer\":1,\"question_id\":3},{\"answer\":2,\"question_id\":4},{\"answer\":2,\"question_id\":5},{\"answer\":2,\"sub_answer\":2,\"question_id\":6,\"followup_sub_answer\":\"10/20/90\"}]",
                    "created_by": "Mike test",
                    "created_on": "Oct 16, 2020, 4:59:49 AM",
                    "modified_by": "Mike test",
                    "modified_on": "Oct 16, 2020, 4:59:49 AM"
                },
                "personalityQuestions": {
                    "id": 266,
                    "candidate_id": 24,
                    "category": "personality_assessment",
                    "answer": "[{\"answer\":1,\"question_id\":1},{\"answer\":3,\"question_id\":2},{\"answer\":5,\"question_id\":3},{\"answer\":2,\"question_id\":4},{\"answer\":3,\"question_id\":5},{\"answer\":1,\"question_id\":6},{\"answer\":4,\"question_id\":7},{\"answer\":1,\"question_id\":8},{\"answer\":3,\"question_id\":9},{\"answer\":2,\"question_id\":10},{\"answer\":1,\"question_id\":11},{\"answer\":4,\"question_id\":12},{\"answer\":5,\"question_id\":13},{\"answer\":2,\"question_id\":14},{\"answer\":3,\"question_id\":15},{\"answer\":4,\"question_id\":16}]",
                    "created_by": "Mike test",
                    "created_on": "Oct 16, 2020, 4:59:49 AM",
                    "modified_by": "Mike test",
                    "modified_on": "Oct 16, 2020, 4:59:49 AM"
                },
                "courseworkQuestions": {
                    "id": 267,
                    "candidate_id": 24,
                    "category": "coursework",
                    "answer": "[{\"answer\":1,\"question_id\":1},{\"answer\":[{\"sub_question_id\":1,\"sub_answer\":2},{\"sub_question_id\":3,\"sub_answer\":2}],\"question_id\":2},{\"answer\":1,\"question_id\":3},{\"answer\":[{\"sub_question_id\":1,\"sub_answer\":4},{\"sub_question_id\":3,\"sub_answer\":4}],\"question_id\":4},{\"answer\":1,\"question_id\":5}]",
                    "created_by": "Mike test",
                    "created_on": "Oct 16, 2020, 4:59:49 AM",
                    "modified_by": "Mike test",
                    "modified_on": "Oct 16, 2020, 4:59:49 AM"
                },
                "commuteQuestions": {
                    "id": 269,
                    "candidate_id": 24,
                    "category": "commute",
                    "answer": "[{\"answer\":\"\",\"question_id\":1},{\"answer\":1,\"question_id\":2},{\"answer\":{\"city_0\":\"\",\"street_0\":\"\",\"state_0\":\"\",\"zip_0\":\"\"},\"question_id\":3}]",
                    "created_by": "Mike test",
                    "created_on": "Oct 16, 2020, 4:59:49 AM",
                    "modified_by": "Mike test",
                    "modified_on": "Oct 16, 2020, 4:59:49 AM"
                },
                "employerQuestions": [
                    {
                        "question_id": 3,
                        "question_name": "What are you preferred timings?",
                        "category": "Employer Questions",
                        "question_type": "mcq",
                        "is_public": true,
                        "for_public_review": true,
                        "job_title": "CNA",
                        "org_id": 15,
                        "option_choices": [
                            {
                                "id": 3,
                                "question_id": 3,
                                "option_choice_name": "8 AM - 1 PM",
                                "question_type": "checkbox",
                                "created_by": "admin",
                                "created_on": "Oct 6, 2020, 5:59:44 PM",
                                "modified_by": "admin",
                                "modified_on": "Oct 6, 2020, 5:59:44 PM"
                            },
                            {
                                "id": 4,
                                "question_id": 3,
                                "option_choice_name": "1 PM - 5 PM",
                                "question_type": "checkbox",
                                "created_by": "admin",
                                "created_on": "Oct 6, 2020, 5:59:44 PM",
                                "modified_by": "admin",
                                "modified_on": "Oct 6, 2020, 5:59:44 PM"
                            },
                            {
                                "id": 5,
                                "question_id": 3,
                                "option_choice_name": "5 PM - 11 PM",
                                "question_type": "checkbox",
                                "created_by": "admin",
                                "created_on": "Oct 6, 2020, 5:59:44 PM",
                                "modified_by": "admin",
                                "modified_on": "Oct 6, 2020, 5:59:44 PM"
                            },
                            {
                                "id": 6,
                                "question_id": 3,
                                "option_choice_name": "11 PM - 5 AM",
                                "question_type": "checkbox",
                                "created_by": "admin",
                                "created_on": "Oct 6, 2020, 5:59:44 PM",
                                "modified_by": "admin",
                                "modified_on": "Oct 6, 2020, 5:59:44 PM"
                            }
                        ],
                        "created_by": "admin",
                        "created_on": "Oct 6, 2020, 5:55:33 PM",
                        "modified_by": "Jonah Bernstein",
                        "modified_on": "Oct 16, 2020, 11:11:50 AM"
                    },
                    {
                        "question_id": 25,
                        "question_name": "Do you have other job offers?",
                        "category": "Employer Questions",
                        "question_type": "mcq",
                        "is_public": true,
                        "for_public_review": true,
                        "job_title": "CNA",
                        "org_id": 15,
                        "option_choices": [
                            {
                                "id": 12,
                                "question_id": 25,
                                "option_choice_name": "Yes",
                                "question_type": "boolean",
                                "created_by": "Jay Ralph",
                                "created_on": "Oct 10, 2020, 12:12:34 PM",
                                "modified_by": "Jay Ralph",
                                "modified_on": "Oct 10, 2020, 12:12:34 PM"
                            },
                            {
                                "id": 13,
                                "question_id": 25,
                                "option_choice_name": "No",
                                "question_type": "boolean",
                                "created_by": "Jay Ralph",
                                "created_on": "Oct 10, 2020, 12:12:34 PM",
                                "modified_by": "Jay Ralph",
                                "modified_on": "Oct 10, 2020, 12:12:34 PM"
                            }
                        ],
                        "created_by": "Jay Ralph",
                        "created_on": "Oct 10, 2020, 12:12:34 PM",
                        "modified_by": "Jo",
                        "modified_on": "Oct 16, 2020, 5:32:36 PM"
                    }
                ]
            }
        },
        "status": "OK"
    }
};

let stateCopy = JSON.parse(JSON.stringify(initialState));


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_JOB_APPLICATIONS:
            return updateObject(state, {
                jobApplications: action.value
            }
            );

        case actionTypes.SET_CANDID_JOB_DETAILS:
            return updateObject(state, {
                jobDetails: action.value
            }
            );

        case actionTypes.CLEAR_CANDIDATE_STATE:
            return stateCopy;

        default:
            return state;
    }
}

export default reducer;
