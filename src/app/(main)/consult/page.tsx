"use client";
import { PatientsResponseSchema } from "@/packages/api/patient-list";
import React, { useEffect, useRef, useState } from "react";

interface ConsultFormData {
	PATIENT_ID: number;
	CONSULT_SUBJECTIVE: string;
	CONSULT_OBJECTIVE: string;
	CONSULT_ASSESSMENT: string;
	CONSULT_SURVWORKUP: string;
	CONSULT_RXPLAN: string;
	CONSULT_PATIENTSTATUS: number;
}

interface ValidationErrors {
	PATIENT_ID?: string;
	CONSULT_SUBJECTIVE?: string;
	CONSULT_OBJECTIVE?: string;
	CONSULT_ASSESSMENT?: string;
	CONSULT_SURVWORKUP?: string;
	CONSULT_RXPLAN?: string;
	CONSULT_PATIENTSTATUS?: string;
}

interface FormData {
	patientId?: string;
	lastname?: string;
	email?: string;
}

interface FilteredPatient {
	patientId: number;
	userFirstname: string;
	userLastname: string;
	userEmail: string;
}


const ConsultPage = () => {
	const [formData, setFormData] = useState<ConsultFormData>({
		PATIENT_ID: 0,
		CONSULT_SUBJECTIVE: "",
		CONSULT_OBJECTIVE: "",
		CONSULT_ASSESSMENT: "",
		CONSULT_SURVWORKUP: "",
		CONSULT_RXPLAN: "",
		CONSULT_PATIENTSTATUS: 1,
	});

	const [errors, setErrors] = useState<ValidationErrors>({});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "PATIENT_ID" || name === "CONSULT_PATIENTSTATUS" ? Number(value) : value,
		}));
	};

	const validateForm = (): boolean => {
		const newErrors: ValidationErrors = {};

		if (!formData.PATIENT_ID) newErrors.PATIENT_ID = "Patient ID is required.";
		if (!formData.CONSULT_SUBJECTIVE)
			newErrors.CONSULT_SUBJECTIVE = "Subjective information is required.";
		if (!formData.CONSULT_OBJECTIVE)
			newErrors.CONSULT_OBJECTIVE = "Objective information is required.";
		if (!formData.CONSULT_ASSESSMENT)
			newErrors.CONSULT_ASSESSMENT = "Assessment is required.";
		if (!formData.CONSULT_SURVWORKUP)
			newErrors.CONSULT_SURVWORKUP = "Surveillance/Workup is required.";
		if (!formData.CONSULT_RXPLAN)
			newErrors.CONSULT_RXPLAN = "RX Plan is required.";
		if (!formData.CONSULT_PATIENTSTATUS)
			newErrors.CONSULT_PATIENTSTATUS = "Patient status is required.";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		// Construct the request body
		const requestBody = {
			PATIENT_ID: Number(formData.PATIENT_ID),
			CONSULT_SUBJECTIVE: formData.CONSULT_SUBJECTIVE.trim(),
			CONSULT_OBJECTIVE: formData.CONSULT_OBJECTIVE.trim(),
			CONSULT_ASSESSMENT: formData.CONSULT_ASSESSMENT.trim(),
			CONSULT_SURVWORKUP: formData.CONSULT_SURVWORKUP.trim(),
			CONSULT_RXPLAN: formData.CONSULT_RXPLAN.trim(),
			CONSULT_PATIENTSTATUS: formData.CONSULT_PATIENTSTATUS,
		};

		try {
			const response = await fetch("http://localhost:8080/css/consult/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestBody), // Use the constructed request body
			});

			if (response.ok) {
				alert("Consult added successfully!");
				setFormData({
					PATIENT_ID: 0,
					CONSULT_SUBJECTIVE: "",
					CONSULT_OBJECTIVE: "",
					CONSULT_ASSESSMENT: "",
					CONSULT_SURVWORKUP: "",
					CONSULT_RXPLAN: "",
					CONSULT_PATIENTSTATUS: 0,
				});
				setErrors({});
			} else {
				alert("Failed to add consult.");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred. Please try again.");
		}
	};

	// for fetch patients
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

	const dropdownRefPatient = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const userData = localStorage.getItem('user');
		if (userData) {
			const parsedUserData = JSON.parse(userData);
			setDoctorInfo(parsedUserData.doctorId);
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

	const handleSelectPatient = (patientId: number, firstname: string, lastname: string, email: string) => {
		setSearchFormData({ ...searchFormData, lastname: lastname, patientId: patientId.toString(), email: email });
		setFormData({ ...formData, PATIENT_ID: patientId })
		setPatientSearchTerm(`${firstname} ${lastname} (${email})`);
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
						patientId: relation.patient.patientId,
						userFirstname: relation.patient.user.userFirstname,
						userLastname: relation.patient.user.userLastname,
						userEmail: relation.patient.user.userEmail,
					}));

					setAllPatients(patients); // Store all patients
					setFilteredPatients(patients); // Initially display all patients
				}
			} catch (error) {
				console.error("Error fetching patients:", error);
			}
		};

		fetchPatients();
	}, []);

	return (
		<div className="w-screen-minus-1-6 bg-white flex flex-col items-center justify-center gap-4">
			<div className="w-6/12 h-auto p-2 text-center">
				<p className="mt-10 font-bold text-5xl text-red-900">CONSULT</p>
			</div>

			<div className="h-auto flex-none">
				<div className="flex flex-col w-full relative" ref={dropdownRefPatient}>
					<label htmlFor="lastname" className="text-sm font-semibold text-black">Last Name</label>
					<input
						type="text"
						name="lastname"
						value={patientSearchTerm}
						onChange={handlePatientSearchChange}
						onClick={() => setPatientDropdownOpen(true)}
						className="mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black"
						placeholder="Select or search Last Name"
					/>
					{patientDropdownOpen && (
						<ul className="absolute z-10 top-16 bg-white border border-gray-300 w-full mt-1 hover:border-red-200 rounded shadow-lg max-h-40 overflow-y-auto">
							{filteredPatients.length > 0 ? (
								filteredPatients.map(patient => (
									<li
										key={patient.patientId}
										className="flex gap-2 p-2 text-black hover:bg-gray-200 cursor-pointer"
										onClick={() => handleSelectPatient(patient.patientId, patient.userFirstname, patient.userLastname, patient.userEmail)}
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
				<div className="grid grid-cols-4 gap-4 flex-none">
					{/* TOP LEFT box */}
					<div className="col-span-2 bg-white p-4 text-center  rounded">
						<div className="grid grid-cols-2 grid-flow-col ">
							{/* label column */}
							<div className="p-4 pl-12 grid grid-flow-row  cols-span-1 justify-items-start">
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Age:
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Diagnosis:
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Operation:
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Chemotherapy:
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Radiotherapy:
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Hormonal Therapy:
									</label>
								</div>
							</div>
							{/* patient info */}
							<div className="pt-4 pb-4 pr-2 grid grid-flow-row  justify-items-start">
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Currentdate - Birthdate
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Diagnosis + Stage + Laterality
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Surgery + Date
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Yes/No, Completed/Not Completed
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Yes/No, Completed/Not Completed
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Yes/No, Completed/Not Completed
									</label>
								</div>
							</div>
						</div>
					</div>

					{/* TOP RIGHT box*/}
					<div className="col-span-2 bg-white p-4 text-center  rounded">
						<div className="grid grid-cols-2 grid-flow-col ">
							{/* Patient Status Labels */}
							<div className="p-4 pl-12 grid grid-flow-row  cols-span-1 justify-items-start gap-1">
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Patient Status:
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Latest Consult Date:
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Latest Labs submitted:
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Submission Date:
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Patient Si/Sx Report:
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Patient Report Date:
									</label>
								</div>
							</div>
							{/* Patient Status infos */}
							<div className="p-4 pl-12 grid grid-flow-row  cols-span-1 justify-items-start gap-1">
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Placeholder
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Placeholder
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Placeholder
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Placeholder
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Placeholder
									</label>
								</div>
								<div className="">
									<label className="font-bold text-left text-sm text-black ">
										Placeholder
									</label>
								</div>
							</div>
						</div>
					</div>

					{/* SUBMISSION box */}
					<form className="flex flex-col gap-6 col-span-3 pb-20" onSubmit={handleSubmit}>
						<div className="flex flex-col">
							<label className="text-sm font-semibold text-black">Subjective</label>
							<input
								name="CONSULT_SUBJECTIVE"
								value={formData.CONSULT_SUBJECTIVE}
								onChange={handleChange}
								className={`mt-1 p-2 text-black border ${errors.CONSULT_SUBJECTIVE ? "border-red-500" : "border-gray-300"} rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
							/>
							{errors.CONSULT_SUBJECTIVE && <p className="text-red-500 text-xs mt-1">{errors.CONSULT_SUBJECTIVE}</p>}
						</div>
						<div className="flex flex-col">
							<label className="text-sm font-semibold text-black">Objective</label>
							<textarea
								name="CONSULT_OBJECTIVE"
								value={formData.CONSULT_OBJECTIVE}
								onChange={handleChange}
								className={`mt-1 p-2 min-h-40 text-black border ${errors.CONSULT_OBJECTIVE ? "border-red-500" : "border-gray-300"} rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
								rows={10}
							/>
							{errors.CONSULT_OBJECTIVE && <p className="text-red-500 text-xs mt-1">{errors.CONSULT_OBJECTIVE}</p>}
						</div>
						<div className="flex flex-col">
							<label className="text-sm font-semibold text-black">Assessment</label>
							<input
								name="CONSULT_ASSESSMENT"
								value={formData.CONSULT_ASSESSMENT}
								onChange={handleChange}
								className={`mt-1 p-2 text-black border ${errors.CONSULT_ASSESSMENT ? "border-red-500" : "border-gray-300"} rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
							/>
							{errors.CONSULT_ASSESSMENT && <p className="text-red-500 text-xs mt-1">{errors.CONSULT_ASSESSMENT}</p>}
						</div>
						<div className="flex flex-col">
							<label className="text-sm font-semibold text-black">RX Plan</label>
							<textarea
								name="CONSULT_RXPLAN"
								value={formData.CONSULT_RXPLAN}
								onChange={handleChange}
								className={`mt-1 p-2 min-h-40 text-black border ${errors.CONSULT_RXPLAN ? "border-red-500" : "border-gray-300"} rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
								rows={10}
							/>
							{errors.CONSULT_RXPLAN && <p className="text-red-500 text-xs mt-1">{errors.CONSULT_RXPLAN}</p>}
						</div>
						<div className="flex flex-col">
							<label className="text-sm font-semibold text-black">Surveillance/Workup</label>
							<input
								name="CONSULT_SURVWORKUP"
								value={formData.CONSULT_SURVWORKUP}
								onChange={handleChange}
								className={`mt-1 p-2 text-black border ${errors.CONSULT_SURVWORKUP ? "border-red-500" : "border-gray-300"} rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
							/>
							{errors.CONSULT_SURVWORKUP && <p className="text-red-500 text-xs mt-1">{errors.CONSULT_SURVWORKUP}</p>}
						</div>

						<div className="flex flex-col">
							<label className="text-sm font-semibold text-black">Patient Status</label>
							<select
								name="CONSULT_PATIENTSTATUS"
								value={formData.CONSULT_PATIENTSTATUS}
								onChange={handleChange}
								className={`mt-1 p-2 border ${errors.CONSULT_PATIENTSTATUS ? "border-red-500" : "border-gray-300"} rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
							>
								<option value="1">Alive</option>
								<option value="2">Symptoms</option>
								<option value="3">Recurrence</option>
								<option value="4">Metastatic</option>
								<option value="5">Curative</option>
								<option value="6">Recovered</option>
								<option value="7">Improved</option>
								<option value="8">Unimproved</option>
								<option value="9">Died</option>
							</select>
							{errors.CONSULT_PATIENTSTATUS && <p className="text-red-500 text-xs mt-1">{errors.CONSULT_PATIENTSTATUS}</p>}
						</div>
						<div className="flex justify-center mt-6">
							<button type="submit" className="bg-red-900 text-white py-2 px-6 rounded">
								Submit
							</button>
						</div>
					</form>


					{/* BUTTONS*/}
					<div className="col-span-1 bg-white p-4">
						<div className="grid grid-cols-1 grid-flow-col ">
							<div className="flex flex-col gap-4">
								<button type="submit" className="hover:bg-primary/90 font-semibold bg-red-900 text-white p-4 rounded shadow">UPDATE PATIENT INFO</button>
								<button type="submit" className="hover:bg-primary/90 font-semibold bg-red-900 text-white p-4 rounded shadow">PRESCRIPTION</button>
								<button type="submit" className="hover:bg-primary/90 font-semibold bg-red-900 text-white p-4 rounded shadow">LAB REQUEST</button>
								<button type="submit" className="hover:bg-primary/90 font-semibold bg-red-900 text-white p-4 rounded shadow">CLINICAL ABSTRACT</button>
								<button type="submit" className="hover:bg-primary/90 font-semibold bg-red-900 text-white p-4 rounded shadow">MED CERTIFICATE</button>
								<button type="submit" className="hover:bg-primary/90 font-semibold bg-red-900 text-white p-4 rounded shadow">REFERRAL FORM</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConsultPage;
