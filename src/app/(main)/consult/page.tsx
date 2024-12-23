"use client";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { PatientSchema } from "@/packages/api/patient";
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
	CONSULT_DATE: string;
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

interface Diagnosis {
	DATE: string | null;
	LATERALITY: string | null;
	STAGE: string | null;
}

interface HormonalTherapy {
	YN: string;
	COMPLIANCE: string | null;
}

interface Chemotherapy {
	YN: string;
	COMPLETION: string | null;
}

interface Name {
	MIDDLENAME: string;
	LASTNAME: string;
	FIRSTNAME: string;
}

interface Operation {
	SURGERY: string | null;
	DATE: string | null;
}

interface Radiotherapy {
	YN: string;
	COMPLETION: string | null;
}

interface PatientConsultInfo {
	DIAGNOSIS: Diagnosis;
	PATIENT_SISX_REPORT: string | null;
	PATIENT_REPORT_DATE: string | null;
	HORMONAL_THERAPY: HormonalTherapy;
	CHEMOTHERAPY: Chemotherapy;
	NAME: Name;
	STATUS: string;
	LATEST_LAB_SUBMITTED: string | null;
	OPERATION: Operation;
	LATEST_LAB_DATE: string | null;
	RADIOTHERAPY: Radiotherapy;
	LATEST_CONSULT_DATE: string | null;
	AGE: number;
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
		CONSULT_DATE: new Date()
			.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }),
	});

	const [patientConsultInfo, setPatientConsultInfo] = useState<PatientConsultInfo | null>(null);

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

	const { toast } = useToast()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		const requestBody = {
			PATIENT_ID: Number(formData.PATIENT_ID),
			CONSULT_SUBJECTIVE: formData.CONSULT_SUBJECTIVE.trim(),
			CONSULT_OBJECTIVE: formData.CONSULT_OBJECTIVE.trim(),
			CONSULT_ASSESSMENT: formData.CONSULT_ASSESSMENT.trim(),
			CONSULT_SURVWORKUP: formData.CONSULT_SURVWORKUP.trim(),
			CONSULT_RXPLAN: formData.CONSULT_RXPLAN.trim(),
			CONSULT_PATIENTSTATUS: 3,
			CONSULT_DATE: formData.CONSULT_DATE,
		};

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/consult/add`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestBody),
			});

			if (response.ok) {
				toast({ title: "Consult added successfully!" });
				setFormData({
					PATIENT_ID: 0,
					CONSULT_SUBJECTIVE: "",
					CONSULT_OBJECTIVE: "",
					CONSULT_ASSESSMENT: "",
					CONSULT_SURVWORKUP: "",
					CONSULT_RXPLAN: "",
					CONSULT_PATIENTSTATUS: 1,
					CONSULT_DATE: new Date()
						.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }),
				});
				try {
					const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/patient/getConsultInfo/${Number(formData.PATIENT_ID)}`);
					if (response.ok) {
						const data = await response.json();
						setPatientConsultInfo(data);
					} else {
						console.error("Failed to fetch consultation details.");
						setPatientConsultInfo(null);
					}
				} catch (error) {
					console.error("Error fetching consultation details:", error);
					setPatientConsultInfo(null);
				}
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
	const [, setDoctorInfo] = useState("");

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

	const handleSelectPatient = async (patientId: number, firstname: string, lastname: string, email: string) => {
		setSearchFormData({ ...searchFormData, lastname: lastname, patientId: patientId.toString(), email: email });
		setFormData({ ...formData, PATIENT_ID: patientId })
		setPatientSearchTerm(`${firstname} ${lastname} (${email})`);
		setPatientDropdownOpen(false);

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/patient/getConsultInfo/${patientId}`);
			if (response.ok) {
				const data = await response.json();
				setPatientConsultInfo(data);
			} else {
				console.error("Failed to fetch consultation details.");
				setPatientConsultInfo(null);
			}
		} catch (error) {
			console.error("Error fetching consultation details:", error);
			setPatientConsultInfo(null);
		}
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
					const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/onboard/getPatientsByDoctor/${parsedUserData.doctorId}`);
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

	useEffect(() => {
		const fetchPatientDetails = async () => {
			try {
				const userData = localStorage.getItem('user');
				if (userData) {
					const parsedUserData = JSON.parse(userData);
					const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}css/patient/get/latest?doctorID=${parsedUserData.doctorId}`;

					const response = await fetch(apiUrl);
					if (!response.ok) {
						throw new Error(`Failed to fetch data: ${response.statusText}`);
					}

					const data = await response.json();

					const patientData = PatientSchema.parse(data);

					if (patientData) {
						setSearchFormData({
							...searchFormData,
							lastname: patientData.user.userLastname,
							patientId: patientData.patientId.toString(),
							email: patientData.user.userEmail,
						});

						setPatientSearchTerm(
							`${patientData.user.userFirstname} ${patientData.user.userLastname} (${patientData.user.userEmail})`
						);

						try {
							const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/patient/getConsultInfo/${patientData.patientId}`);
							if (response.ok) {
								const data = await response.json();
								setPatientConsultInfo(data);
							} else {
								console.error("Failed to fetch consultation details.");
								setPatientConsultInfo(null);
							}
						} catch (error) {
							console.error("Error fetching consultation details:", error);
							setPatientConsultInfo(null);
						}
					}
				}
			} catch (error) {
				console.error("Error fetching patients:", error);
			}
		};

		fetchPatientDetails();
	}, []);

	return (
		<div className="w-5/6 bg-white flex flex-col items-center justify-center gap-4">
			<div className="w-6/12 h-auto mt-12 p-2 text-center">
				<p className="font-bold text-6xl text-red-900 text-nowrap	tracking-wide">CONSULT</p>
			</div>

			<div className="flex w-8/12 flex-col">
				<div className="flex flex-col w-full relative" ref={dropdownRefPatient}>
					<label htmlFor="lastname" className="text-sm font-semibold text-black">Search Patient</label>
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
				<div className="flex flex-col w-full py-4">
					<div className="flex flex-col w-full gap-6 p-8 my-4 rounded-3xl shadow-lg border border-zinc-100">
						<div className="w-full">
							<div className="flex flex-col w-full gap-6">
								<div className="flex w-full gap-4">
									{/* Name */}
									<div className="w-8/12 flex flex-col">
										<label className="text-sm font-semibold text-gray-800">Name:</label>
										<span className="mt-1 p-2 border border-gray-300 rounded text-gray-900 bg-zinc-100">
											{patientConsultInfo?.NAME
												? `${patientConsultInfo.NAME.FIRSTNAME || ""} ${patientConsultInfo.NAME.MIDDLENAME || ""} ${patientConsultInfo.NAME.LASTNAME || ""}`.trim() || "Unknown Patient"
												: "Unknown Patient"}
										</span>
									</div>
									{/* Age */}
									<div className="flex flex-col w-4/12">
										<label className="text-sm font-semibold text-gray-800">Age:</label>
										<span className="mt-1 p-2 border border-gray-300 rounded text-gray-900 bg-zinc-100">
											{patientConsultInfo?.AGE || "N/A"}
										</span>
									</div>
								</div>

								<div className="flex w-full gap-4">
									{/* Diagnosis */}
									<div className="flex flex-col w-1/2">
										<label className="text-sm font-semibold text-gray-800">Diagnosis:</label>
										<span className="mt-1 p-2 border border-gray-300 rounded text-gray-900 bg-zinc-100">
											{patientConsultInfo?.DIAGNOSIS ? (
												!patientConsultInfo.DIAGNOSIS.STAGE && !patientConsultInfo.DIAGNOSIS.LATERALITY ? (
													"No diagnosis profile"
												) : (
													`Stage ${patientConsultInfo.DIAGNOSIS.STAGE || "N/A"} - ${{
														1: "Left Laterality",
														2: "Right Laterality",
														3: "Bilateral Laterality",
														4: "Mid Laterality",
														5: "Not Stated",
														6: "Not Applicable",
													}[patientConsultInfo.DIAGNOSIS.LATERALITY as keyof typeof patientConsultInfo.DIAGNOSIS.LATERALITY] || "N/A"
													}`
												)
											) : (
												"N/A"
											)}
										</span>
									</div>

									{/* Date of Diagnosis */}
									<div className="flex flex-col w-1/2">
										<label className="text-sm font-semibold text-gray-800">Date of Diagnosis:</label>
										<span className="mt-1 p-2 border border-gray-300 rounded text-gray-900 bg-zinc-100">
											{patientConsultInfo?.DIAGNOSIS
												? (!patientConsultInfo.DIAGNOSIS.DATE
													? "No diagnosis profile"
													: `${patientConsultInfo.DIAGNOSIS.DATE || "N/A"}`)
												: "N/A"}
										</span>
									</div>

									{/* Operation */}
									<div className="flex flex-col w-1/2">
										<label className="text-sm font-semibold text-gray-800">Operation:</label>
										<span className="mt-1 p-2 border border-gray-300 rounded text-gray-900 bg-zinc-100">
											{patientConsultInfo?.OPERATION
												? (!patientConsultInfo.OPERATION.SURGERY &&
													!patientConsultInfo.OPERATION.DATE
													? "No scheduled surgery"
													: `${patientConsultInfo.OPERATION.SURGERY || "N/A"} - ${patientConsultInfo.OPERATION.DATE || "N/A"}`)
												: "N/A"}
										</span>
									</div>
								</div>

								<div className="flex gap-4 w-full">
									{/* Chemotherapy */}
									<div className="flex flex-col w-1/3">
										<label className="text-sm font-semibold text-gray-800">Chemotherapy:</label>
										<span className="mt-1 p-2 border border-gray-300 rounded text-gray-900 bg-zinc-100">
											{patientConsultInfo?.CHEMOTHERAPY
												? patientConsultInfo.CHEMOTHERAPY.YN === "No" && !patientConsultInfo.CHEMOTHERAPY.COMPLETION
													? "No assigned chemotherapy"
													: `${patientConsultInfo.CHEMOTHERAPY.YN}, ${patientConsultInfo.CHEMOTHERAPY.COMPLETION || "N/A"}`
												: "N/A"}
										</span>
									</div>

									{/* Radiotherapy */}
									<div className="flex flex-col w-1/3">
										<label className="text-sm font-semibold text-gray-800">Radiotherapy:</label>
										<span className="mt-1 p-2 border border-gray-300 rounded text-gray-900 bg-zinc-100">
											{patientConsultInfo?.RADIOTHERAPY
												? patientConsultInfo.RADIOTHERAPY.YN === "No" && !patientConsultInfo.RADIOTHERAPY.COMPLETION
													? "No assigned radiotherapy"
													: `${patientConsultInfo.RADIOTHERAPY.YN}, ${patientConsultInfo.RADIOTHERAPY.COMPLETION || "N/A"}`
												: "N/A"}
										</span>
									</div>

									{/* Hormonal Therapy */}
									<div className="flex flex-col w-1/3">
										<label className="text-sm font-semibold text-gray-800">Hormonal Therapy:</label>
										<span className="mt-1 p-2 border border-gray-300 rounded text-gray-900 bg-zinc-100">
											{patientConsultInfo?.HORMONAL_THERAPY
												? patientConsultInfo.HORMONAL_THERAPY.YN === "No" && !patientConsultInfo.HORMONAL_THERAPY.COMPLIANCE
													? "No assigned hormonal therapy"
													: `${patientConsultInfo.HORMONAL_THERAPY.YN}, ${patientConsultInfo.HORMONAL_THERAPY.COMPLIANCE || "N/A"}`
												: "N/A"}
										</span>
									</div>

								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2 mt-4">
							<h2 className="text-xl font-bold text-black">Consult Information</h2>
							<Separator className='' />
						</div>
						<div className="w-full">
							<div className="flex flex-col gap-6">
								{/* Patient Status */}
								<div className="flex flex-col">
									<label className="text-sm font-semibold text-gray-800">Patient Status:</label>
									<span className="mt-1 p-2 border border-gray-300 rounded text-gray-900 bg-zinc-100">
										{patientConsultInfo?.STATUS || "N/A"}
									</span>
								</div>

								<div className="flex gap-4">
									{/* Latest Consult Date */}
									<div className="flex flex-col w-1/3">
										<label className="text-sm font-semibold text-gray-800">Latest Consult Date:</label>
										<span className="mt-1 p-2 border border-gray-300 rounded text-gray-900 bg-zinc-100">
											{patientConsultInfo?.LATEST_CONSULT_DATE || "N/A"}
										</span>
									</div>

									{/* Latest Labs Submitted */}
									<div className="flex flex-col w-1/3">
										<label className="text-sm font-semibold text-gray-800">Latest Labs Submitted:</label>
										<span className="mt-1 p-2 border border-gray-300 rounded text-gray-900 bg-zinc-100">
											{patientConsultInfo?.LATEST_LAB_SUBMITTED || "N/A"}
										</span>
									</div>

									{/* Submission Date */}
									<div className="flex flex-col w-1/3">
										<label className="text-sm font-semibold text-gray-800">Submission Date:</label>
										<span className="mt-1 p-2 border border-gray-300 rounded text-gray-900 bg-zinc-100">
											{patientConsultInfo?.LATEST_LAB_DATE ?
												new Date(patientConsultInfo.LATEST_LAB_DATE).toISOString().split("T")[0]
												: "N/A"}
										</span>
									</div>
								</div>

								<div className="flex gap-4 w-full">
									{/* Patient Si/Sx Report */}
									<div className="flex flex-col w-1/2">
										<label className="text-sm font-semibold text-gray-800">Patient Si/Sx Report:</label>
										<span className="mt-1 p-2 border border-gray-300 rounded text-gray-900 bg-zinc-100">
											{patientConsultInfo?.PATIENT_SISX_REPORT || "No signs and symptoms"}
										</span>
									</div>

									{/* Patient Report Date */}
									<div className="flex flex-col w-1/2">
										<label className="text-sm font-semibold text-gray-800">Patient Report Date:</label>
										<span className="mt-1 p-2 border border-gray-300 rounded text-gray-900 bg-zinc-100">
											{patientConsultInfo?.PATIENT_REPORT_DATE || "N/A"}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>


					<div className="flex w-full py-8">
						{/* SUBMISSION box */}
						<form className="flex flex-col gap-6 w-3/4 pb-20" onSubmit={handleSubmit}>
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
		</div>
	);
};

export default ConsultPage;
