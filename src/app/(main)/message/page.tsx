"use client";
import { PatientsResponseSchema } from "@/packages/api/patient-list";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

interface FormData {
  patientId?: string;
  lastname?: string;
  email?: string;
}

interface FilteredPatient {
  patientUserId: number,
  patientId: number;
  userFirstname: string;
  userLastname: string;
  userEmail: string;
}

interface EmailFormData {
  subject: string;
  messageBody: string;
  recieverID: number;
  senderID: number;
  recieverEmail: string;
  senderEmail: string;
  notificationType: number;
}

const MessagePage = () => {
  const [formData, setFormData] = useState<EmailFormData>({
    subject: '',
    messageBody: '',
    recieverID: 1, // Default value (this should be dynamically set if needed)
    senderID: 1,  // Default value (this should be dynamically set if needed)
    recieverEmail: '',
    senderEmail: '',
    notificationType: 1, // Assuming a default notification type
  });

  const [errors, setErrors] = useState<Partial<EmailFormData>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<EmailFormData> = {};
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.messageBody) newErrors.messageBody = 'Message body is required';
    if (!formData.recieverEmail) newErrors.recieverEmail = 'Receiver email is required';
    if (!formData.senderEmail) newErrors.senderEmail = 'Sender email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //patient search
  const [searchFormData, setSearchFormData] = useState<FormData>({
    patientId: "",
    lastname: "",
    email: "",
  });
  const [patientSearchTerm, setPatientSearchTerm] = useState("");
  const [patientDropdownOpen, setPatientDropdownOpen] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState<FilteredPatient[]>([]);
  const [allPatients, setAllPatients] = useState<FilteredPatient[]>([]); // Store all patients initially
  const [doctorInfo, setDoctorInfo] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");

  const dropdownRefPatient = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      console.log("hello", parsedUserData)
      setDoctorInfo(parsedUserData.user.userId);
      setDoctorEmail(parsedUserData.user.userEmail)
      setFormData({ ...formData, senderEmail: parsedUserData.user.userEmail, senderID: parsedUserData.user.userId })
    }
  }, []);

  const handlePatientSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setPatientSearchTerm(search);
    setPatientDropdownOpen(true);
    if (search === "") {
      setFilteredPatients(allPatients); // Show all patients if the search term is empty
    } else {
      const filtered = allPatients.filter((patient) =>
        patient.userLastname.toLowerCase().includes(search)
      );
      setFilteredPatients(filtered);
    }
  };

  const handleSelectPatient = (userpatientid: number, patientId: number, firstname: string, lastname: string, email: string) => {
    setSearchFormData({ ...searchFormData, lastname: lastname, patientId: patientId.toString(), email: email });
    setPatientSearchTerm(`${email}`);
    setFormData({ ...formData, recieverEmail: email, recieverID: userpatientid })
    setPatientDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRefPatient.current && !dropdownRefPatient.current.contains(event.target as Node)) {
        setPatientDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          const response = await fetch(`http://localhost:8080/css/onboard/getPatientsByDoctor/${parsedUserData.doctorId}`);
          const data = await response.json();
          const parsedData = PatientsResponseSchema.parse(data);

          const patients = parsedData.map(relation => ({
            patientUserId: relation.patient.user.userId,
            patientId: relation.patient.patientId,
            userFirstname: relation.patient.user.userFirstname,
            userLastname: relation.patient.user.userLastname,
            userEmail: relation.patient.user.userEmail,
          }));
          console.log("patient", patients)
          setAllPatients(patients); // Store all patients
          setFilteredPatients(patients); // Initially display all patients
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("hello")
    if (!validate()) return;

    // Build the request body
    const requestBody = {
      subject: formData.subject,
      messageBody: formData.messageBody,
      recieverID: formData.recieverID,
      senderID: formData.senderID,
      recieverEmail: formData.recieverEmail,
      senderEmail: formData.senderEmail,
      notificationType: formData.notificationType,
    };

    console.log(requestBody)

    try {
      const response = await fetch('http://localhost:8080/css/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error('Failed to send email');
      } else {
        console.log('Email sent successfully');
        setFormData({
          subject: '',
          messageBody: '',
          recieverID: 1,
          senderID: 1,
          recieverEmail: '',
          senderEmail: '',
          notificationType: 1,
        })
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-5/6 bg-white flex flex-col items-center px-6">
      <div className="w-6/12 h-auto mt-12 p-2 text-center">
        <p className="font-bold text-6xl text-red-900 text-nowrap	tracking-wide">MESSAGE</p>
      </div>
      <div className="w-full max-w-4xl bg-white rounded-lg ">
        <div className="grid grid-cols-1 gap-6">
          {/* Form Inputs */}
          <form className="p-6 rounded-lg " onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* TO Input */}
              <div className="flex flex-col w-full relative " ref={dropdownRefPatient}>
                <label htmlFor="lastname" className="text-sm pb-2 font-semibold text-black">TO:</label>
                <input
                  type="text"
                  name="lastname"
                  value={patientSearchTerm}
                  onChange={handlePatientSearchChange}
                  onClick={() => setPatientDropdownOpen(true)}
                  className="mt-1 hover:border-red-200 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                  placeholder="Select or search Last Name"
                />
                {patientDropdownOpen && (
                  <ul className="absolute z-10 top-16 bg-white border border-gray-300 w-full mt-1 hover:border-red-200 rounded shadow-lg max-h-40 overflow-y-auto">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map(patient => (
                        <li
                          key={patient.patientId}
                          className="flex gap-2 p-2 text-black hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSelectPatient(patient.patientUserId, patient.patientId, patient.userFirstname, patient.userLastname, patient.userEmail)}
                        >
                          {patient.userFirstname} {patient.userLastname} <p className="text-zinc-400">({patient.userEmail})</p>
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-gray-500">No patients found</li>
                    )}
                  </ul>
                )}
              </div>

              {/* SUBJECT Input */}
              <div className="flex flex-col">
                <label className="font-semibold text-sm text-black mb-2">SUBJECT:</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`mt-1 p-2 text-black border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  placeholder="Subject of the Message"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              {/* MESSAGE Input */}
              <div className="flex flex-col col-span-2">
                <label className="font-semibold text-sm text-black mb-2">MESSAGE:</label>
                <textarea
                  name="messageBody"
                  value={formData.messageBody}
                  onChange={handleChange}
                  className={`mt-1 p-2 min-h-40 text-black border ${errors.messageBody ? 'border-red-500' : 'border-gray-300'} rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  placeholder="Type your message here"
                  rows={20}
                />
                {errors.messageBody && <p className="text-red-500 text-xs mt-1">{errors.messageBody}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button type="submit" className="bg-red-900 text-white font-semibold py-2 px-8 rounded-lg shadow-lg hover:bg-red-800 transition duration-200">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
