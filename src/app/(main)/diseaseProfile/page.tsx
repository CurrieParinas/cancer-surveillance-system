"use client";

import { Separator } from "@/components/ui/separator";
import React, { useEffect, useRef, useState } from "react";
import { DiseaseFormDataSchema, DiseaseErrorsSchema } from "@/packages/api/add-disease";
import { PatientsResponseSchema } from "@/packages/api/patient-list";
import { z } from "zod";

interface FilteredPatient {
  patientId: number;
  userFirstname: string;
  userLastname: string;
  userEmail: string;
}

type FormData = z.infer<typeof DiseaseFormDataSchema>;
type Errors = z.infer<typeof DiseaseErrorsSchema>;


const DiseaseProfile = () => {
  const [doctorInfo, setDoctorInfo] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setDoctorInfo(parsedUserData.doctorId);
    }
  }, []);

  const [formData, setFormData] = useState<FormData>({
    patientId: "",
    lastname: "",
    email: "",
    primary_site: "",
    date_of_diagnosis: "",
    basis_of_diagnosis: "",
    basis_of_diagnosis_option: "Non-Microscopic",
    basis_of_diagnosis_suboption: "",
    laterality: "1",
    histo_pathology: "",
    histo_tumorSize: "",
    histo_tumorExtension: "",
    histo_tumorGrade: "",
    histo_nodePositive: "",
    histo_nodeHarvest: "",
    histo_negativeMargins: "",
    histo_stage: "I",
    histo_positiveMargins: "",
    disease_extent: "1",
    disease_tumor_size: "",
    disease_lymph_node: "",
    disease_metastatic: "",
    metastatic_distant_ln: "N",
    metastatic_bone: "N",
    metastatic_liver: "N",
    metastatic_lung: "N",
    metastatic_brain: "N",
    metastatic_ovary: "N",
    metastatic_skin: "N",
    metastatic_intestine: "N",
    metastatic_others: "N",
    metastatic_unknown: "N",
    metastatic_notes: "",
    multiple_primaries: [],
    stage: "I",
    stage_type: "",
    disease_tstage: "",
    disease_nstage: "",
    disease_mstage: "",
    disease_gstage: "",
    dxstatus_alive: "N",
    dxstatus_symptoms: "N",
    dxstatus_recurrence: "N",
    dxstatus_metastatic: "N",
    dxstatus_curative: "N",
    disease_encoder: "",
  });

  type BasisOfDiagnosisMap = {
    [key: string]: number;
  };

  const basisOfDiagnosisValues: BasisOfDiagnosisMap = {
    "Non-Microscopic_death_certificates": 1,
    "Non-Microscopic_clinical_investigation": 2,
    "Non-Microscopic_clinical_only": 3,
    "Non-Microscopic_specific_tumor_markers": 4,
    "Microscopic_cytology_or_hematology": 5,
    "Microscopic_histology_of_metastasis": 6,
    "Microscopic_histology_of_primary": 7,
    "Unknown": 8,
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setDoctorInfo(parsedUserData.doctorId);
    }
  }, []);

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      disease_encoder: doctorInfo,
    }));
  }, [doctorInfo]);

  const [errors, setErrors] = useState<Errors>({});
  const [diagnosisType, setDiagnosisType] = useState<string>("Non-Microscopic");
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [bodySites, setBodySites] = useState<{ bodysiteId: number; bodysiteName: string }[]>([]);
  const [filteredSites, setFilteredSites] = useState<{ bodysiteId: number; bodysiteName: string }[]>([]);
  const [primarySearchTerm, setPrimarySearchTerm] = useState("");
  const [multipleSearchTerm, setMultipleSearchTerm] = useState("");
  const [primaryDropdownOpen, setPrimaryDropdownOpen] = useState(false);
  const [multipleDropdownOpen, setMultipleDropdownOpen] = useState(false);
  const [selectedSites, setSelectedSites] = useState<{ bodysiteId: number; bodysiteName: string }[]>([]);
  const [pathologies, setPathologies] = useState<{ pathologyDimId: number; term: string }[]>([]);
  const [filteredPathologies, setFilteredPathologies] = useState<{ pathologyDimId: number; term: string }[]>([]);
  const [pathologySearchTerm, setPathologySearchTerm] = useState("");
  const [pathologyDropdownOpen, setPathologyDropdownOpen] = useState(false);
  const dropdownRefPathology = useRef<HTMLDivElement>(null);
  const dropdownRefPrimary = useRef<HTMLDivElement>(null);
  const dropdownRefMultiple = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBodySites = async () => {
      try {
        const response = await fetch("http://localhost:8080/css/bodysite/all");
        const data = await response.json();
        setBodySites(data);
        setFilteredSites(data);
      } catch (error) {
        console.error("Error fetching body sites:", error);
      }
    };

    fetchBodySites();
  }, []);

  const handlePrimarySearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setPrimarySearchTerm(search);
    setPrimaryDropdownOpen(true);
    const filtered = bodySites.filter((site) =>
      site.bodysiteName.toLowerCase().includes(search)
    );
    setFilteredSites(filtered);
  };

  const handleMultipleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setMultipleSearchTerm(search);
    setMultipleDropdownOpen(true);
    const filtered = bodySites.filter((site) =>
      site.bodysiteName.toLowerCase().includes(search)
    );
    setFilteredSites(filtered);
  };

  const handleSelectPrimarySite = (siteId: number, siteName: string) => {
    setFormData({ ...formData, primary_site: String(siteId) });
    setPrimarySearchTerm(siteName);
    setPrimaryDropdownOpen(false);
  };

  const handleSelectMultipleSite = (siteId: number, siteName: string) => {
    const exists = selectedSites.find((site) => site.bodysiteId === siteId);
    if (!exists) {
      setSelectedSites((prev) => [...prev, { bodysiteId: siteId, bodysiteName: siteName }]);

      setFormData((prevData) => ({
        ...prevData,
        multiple_primaries: [...(prevData.multiple_primaries || []), String(siteId)],
      }));
    }
    setMultipleSearchTerm("");
    setMultipleDropdownOpen(false);
  };

  const handleRemoveSite = (siteId: number) => {
    setSelectedSites((prev) => prev.filter((site) => site.bodysiteId !== siteId));

    setFormData((prevData) => ({
      ...prevData,
      multiple_primaries: (prevData.multiple_primaries || []).filter((id) => id !== String(siteId)),
    }));
  };


  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRefPrimary.current && !dropdownRefPrimary.current.contains(event.target as Node)
      ) {
        setPrimaryDropdownOpen(false);
      }
      if (
        dropdownRefMultiple.current && !dropdownRefMultiple.current.contains(event.target as Node)
      ) {
        setMultipleDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDiagnosisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      basis_of_diagnosis_option: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: value,
        ...(name === "non_microscopic_options" || name === "microscopic_options"
          ? { basis_of_diagnosis_suboption: value }
          : {}),
      };

      const key =
        newData.basis_of_diagnosis_option === "Unknown"
          ? "Unknown"
          : `${newData.basis_of_diagnosis_option}_${newData.basis_of_diagnosis_suboption}`;

      return {
        ...newData,
        basis_of_diagnosis: (basisOfDiagnosisValues[key as keyof BasisOfDiagnosisMap] || null)?.toString() || null, // Convert to string if necessary
      };
    });
  };

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCheckAll(checked);

    const newValue = checked ? "Y" : "N";
    setFormData((prevData) => ({
      ...prevData,
      metastatic_distant_ln: newValue,
      metastatic_bone: newValue,
      metastatic_liver: newValue,
      metastatic_lung: newValue,
      metastatic_brain: newValue,
      metastatic_ovary: newValue,
      metastatic_skin: newValue,
      metastatic_intestine: newValue,
      metastatic_others: newValue,
    }));
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof FormData] && key !== "other_primary") {
        newErrors[key as keyof Errors] = `${key} is required`;
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      console.log(formErrors)
      return;
    }

    const convertDateFormat = (dateString: string) => {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    };

    const requestBody = {
      PATIENT_ID: Number(formData.patientId),
      DISEASE_PRIMARY_SITE: Number(formData.primary_site),
      DISEASE_DIAGNOSIS_DATE: convertDateFormat(formData.date_of_diagnosis),
      DISEASE_BASIS: Number(formData.basis_of_diagnosis),
      DISEASE_LATERALITY: formData.laterality,
      HISTO_PATHOLOGY: Number(formData.histo_pathology),
      HISTO_TUMOR_SIZE: Number(formData.histo_tumorSize),
      HISTO_TUMOR_EXTENSION: formData.histo_tumorExtension,
      HISTO_GRADE: Number(formData.histo_tumorGrade),
      HISTO_NODE_POSITIVE: Number(formData.histo_nodePositive),
      HISTO_NODE_HARVEST: Number(formData.histo_nodeHarvest),
      HISTO_MARGINS_NEGATIVE: formData.histo_negativeMargins,
      HISTO_POSITIVE_MARGINS: formData.histo_positiveMargins,
      HISTO_STAGE: formData.histo_stage,
      DISEASE_EXTENT: formData.disease_extent,
      DISEASE_TUMOR_SIZE: Number(formData.disease_tumor_size),
      DISEASE_LYMPH_NODE: Number(formData.disease_lymph_node),
      DISEASE_METASTATIC: formData.disease_metastatic,
      METS_DISTANTLN: formData.metastatic_distant_ln,
      METS_BONE: formData.metastatic_bone,
      METS_LIVER: formData.metastatic_liver,
      METS_LUNG: formData.metastatic_lung,
      METS_BRAIN: formData.metastatic_brain,
      METS_OVARY: formData.metastatic_ovary,
      METS_SKIN: formData.metastatic_skin,
      METS_INTESTINE: formData.metastatic_intestine,
      METS_OTHERS: formData.metastatic_others,
      METS_UNKNOWN: formData.metastatic_unknown,
      METS_NOTES: formData.metastatic_notes,
      DISEASE_MULTIPLE_PRIMARY: Number(formData.multiple_primaries?.length),
      DISEASE_OTHER_SITES: formData.multiple_primaries?.map(Number),
      DISEASE_TSTAGE: Number(formData.disease_tstage),
      DISEASE_NSTAGE: Number(formData.disease_nstage),
      DISEASE_MSTAGE: Number(formData.disease_mstage),
      DISEASE_GSTAGE: Number(formData.disease_gstage),
      DISEASE_STAGE: formData.stage,
      DISEASE_STAGE_TYPE: formData.stage_type,
      DXSTATUS_ALIVE: formData.dxstatus_alive,
      DXSTATUS_SYMPTOMS: formData.dxstatus_symptoms,
      DXSTATUS_RECURRENCE: formData.dxstatus_recurrence,
      DXSTATUS_METASTATIC: formData.dxstatus_metastatic,
      DXSTATUS_CURATIVE: formData.dxstatus_curative,
      DISEASE_ENCODER: Number(formData.disease_encoder),
    };

    try {
      const response = await fetch("http://localhost:8080/css/disease/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Form submitted successfully", result);

      setFormData({
        patientId: "",
        lastname: "",
        email: "",
        primary_site: "",
        date_of_diagnosis: "",
        basis_of_diagnosis: "",
        basis_of_diagnosis_option: "Non-Microscopic",
        basis_of_diagnosis_suboption: "",
        laterality: "1",
        histo_pathology: "",
        histo_tumorSize: "",
        histo_tumorExtension: "",
        histo_tumorGrade: "",
        histo_nodePositive: "",
        histo_nodeHarvest: "",
        histo_negativeMargins: "",
        histo_stage: "I",
        histo_positiveMargins: "",
        disease_extent: "1",
        disease_tumor_size: "",
        disease_lymph_node: "",
        disease_metastatic: "",
        metastatic_distant_ln: "N",
        metastatic_bone: "N",
        metastatic_liver: "N",
        metastatic_lung: "N",
        metastatic_brain: "N",
        metastatic_ovary: "N",
        metastatic_skin: "N",
        metastatic_intestine: "N",
        metastatic_others: "N",
        metastatic_unknown: "N",
        metastatic_notes: "",
        multiple_primaries: [],
        stage: "I",
        stage_type: "",
        disease_tstage: "",
        disease_nstage: "",
        disease_mstage: "",
        disease_gstage: "",
        dxstatus_alive: "N",
        dxstatus_symptoms: "N",
        dxstatus_recurrence: "N",
        dxstatus_metastatic: "N",
        dxstatus_curative: "N",
        disease_encoder: "",
      });
      setErrors({});
      setSelectedSites([]);
      setPrimarySearchTerm("");
      setMultipleSearchTerm("");
      setPathologySearchTerm("");
      setPatientSearchTerm("");

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  const allChecked = [
    formData.metastatic_distant_ln,
    formData.metastatic_bone,
    formData.metastatic_liver,
    formData.metastatic_lung,
    formData.metastatic_brain,
    formData.metastatic_ovary,
    formData.metastatic_skin,
    formData.metastatic_intestine,
    formData.metastatic_others,
  ].every(value => value === "Y");

  useEffect(() => {
    const fetchPathologies = async () => {
      try {
        const response = await fetch("http://localhost:8080/css/pathologydim/all");
        const data = await response.json();
        setPathologies(data);
        setFilteredPathologies(data);
      } catch (error) {
        console.error("Error fetching pathologies:", error);
      }
    };

    fetchPathologies();
  }, []);

  const handlePathologySearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setPathologySearchTerm(search);
    setPathologyDropdownOpen(true);
    const filtered = pathologies.filter((pathology) =>
      pathology.term.toLowerCase().includes(search)
    );
    setFilteredPathologies(filtered);
  };

  const handleSelectPathology = (pathologyId: number, term: string) => {
    setFormData({ ...formData, histo_pathology: String(pathologyId) });
    setPathologySearchTerm(term);
    setPathologyDropdownOpen(false);
  };

  const [patientSearchTerm, setPatientSearchTerm] = useState("");
  const [patientDropdownOpen, setPatientDropdownOpen] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState<FilteredPatient[]>([]);

  const dropdownRefPatient = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:8080/css/onboard/getPatientsByDoctor/8");
        const data = await response.json();

        const parsedData = PatientsResponseSchema.parse(data);

        const patients = parsedData.map(relation => ({
          patientId: relation.patient.patientId,
          userFirstname: relation.patient.user.userFirstname,
          userLastname: relation.patient.user.userLastname,
          userEmail: relation.patient.user.userEmail,
        }));

        setFilteredPatients(patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
        if (error instanceof z.ZodError) {
          console.error("Validation errors:", error.errors);
        }
      }
    };

    fetchPatients();
  }, []);

  const handlePatientSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setPatientSearchTerm(search);
    setPatientDropdownOpen(true);
    const filtered = filteredPatients.filter(patient =>
      patient.userLastname.toLowerCase().includes(search)
    );
    setFilteredPatients(filtered);
  };

  const handleSelectPatient = (patientId: number, firstname: string, lastname: string, email: string) => {
    setFormData({ ...formData, lastname: lastname, patientId: patientId.toString(), email: email });
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


  return (
    <div className="w-5/6">
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-5xl bg-white rounded-lg p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-900 mb-16 tracking-wide">DISEASE PROFILE</h1>
          </div>

          <form className="gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="flex flex-col w-full relative" ref={dropdownRefPatient}>
                  <label htmlFor="lastname" className="text-sm font-semibold text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={patientSearchTerm}
                    onChange={handlePatientSearchChange}
                    onClick={() => setPatientDropdownOpen(true)}
                    className={`mt-1 p-2 border ${errors.lastname ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Select or search Last Name"
                  />
                  {patientDropdownOpen && (
                    <ul className="absolute z-10 top-16 bg-white border border-gray-300 w-full mt-1 rounded shadow-lg max-h-40 overflow-y-auto">
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
                  {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col w-1/4">
                  <label htmlFor="date_of_diagnosis" className="text-sm font-semibold text-gray-700">Date of Diagnosis</label>
                  <input
                    type="date"
                    name="date_of_diagnosis"
                    value={formData.date_of_diagnosis}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.date_of_diagnosis ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  />
                  {errors.date_of_diagnosis && <p className="text-red-500 text-xs mt-1">{errors.date_of_diagnosis}</p>}
                </div>

                <div className="flex flex-col w-1/4">
                  <label htmlFor="basis_of_diagnosis_option" className="text-sm font-semibold text-gray-700">
                    Basis of Diagnosis
                  </label>
                  <select
                    name="basis_of_diagnosis_option"
                    value={formData.basis_of_diagnosis_option}
                    onChange={handleDiagnosisChange}
                    className={`mt-1 p-2 border ${errors.basis_of_diagnosis_option ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  >
                    <option value="Non-Microscopic">Non-Microscopic</option>
                    <option value="Microscopic">Microscopic</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>

                <div className="flex flex-col w-1/4 relative" ref={dropdownRefPrimary}>
                  <label htmlFor="primary_site" className="text-sm font-semibold text-gray-700">
                    Primary Site
                  </label>
                  <input
                    type="text"
                    name="primary_site"
                    placeholder="Select or search Primary Site"
                    value={primarySearchTerm}
                    onChange={handlePrimarySearchChange}
                    onClick={() => setPrimaryDropdownOpen(true)}
                    className={`mt-1 p-2 border ${errors.primary_site ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  />
                  {primaryDropdownOpen && (
                    <ul className="absolute z-10 top-16 bg-white border border-gray-300 w-full mt-1 rounded shadow-lg max-h-40 overflow-y-auto">
                      {filteredSites.length > 0 ? (
                        filteredSites.map((site) => (
                          <li
                            key={site.bodysiteId}
                            className="p-2 text-black hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectPrimarySite(site.bodysiteId, site.bodysiteName)}
                          >
                            {site.bodysiteName}
                          </li>
                        ))
                      ) : (
                        <li className="p-2 text-gray-500">No sites found</li>
                      )}
                    </ul>
                  )}
                  {errors.primary_site && <p className="text-red-500 text-xs mt-1">{errors.primary_site}</p>}
                </div>

                <div className="flex flex-col w-1/4">
                  <label htmlFor="laterality" className="text-sm font-semibold text-gray-700">Laterality</label>
                  <select
                    name="laterality"
                    value={formData.laterality}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.laterality ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  >
                    <option value="1">Left</option>
                    <option value="2">Right</option>
                    <option value="3">Bilateral</option>
                    <option value="4">Mid</option>
                    <option value="5">Not Stated</option>
                    <option value="6">Not Applicable</option>
                  </select>
                  {errors.laterality && <p className="text-red-500 text-xs mt-1">{errors.laterality}</p>}
                </div>
              </div>

              {formData.basis_of_diagnosis_option === "Non-Microscopic" && (
                <div className="flex mt-1 h-7 gap-8 items-center">
                  <label className="text-sm font-semibold text-gray-700">Non-Microscopic Options: </label>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="death_certificates"
                      name="non_microscopic_options"
                      value="death_certificates"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="death_certificates" className="text-black">Death Certificates Only</label>
                  </div>
                  <div className="flex items-center mt-1">
                    <input
                      type="radio"
                      id="clinical_investigation"
                      name="non_microscopic_options"
                      value="clinical_investigation"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="clinical_investigation" className="text-black">Clinical Investigation</label>
                  </div>
                  <div className="flex items-center mt-1">
                    <input
                      type="radio"
                      id="clinical_only"
                      name="non_microscopic_options"
                      value="clinical_only"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="clinical_only" className="text-black">Clinical</label>
                  </div>
                  <div className="flex items-center mt-1">
                    <input
                      type="radio"
                      id="specific_tumor_markers"
                      name="non_microscopic_options"
                      value="specific_tumor_markers"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="specific_tumor_markers" className="text-black">Specific Tumor Markers</label>
                  </div>
                </div>
              )}

              {formData.basis_of_diagnosis_option === "Microscopic" && (
                <div className="flex mt-1 h-7 gap-8 items-center">
                  <label className="text-sm font-semibold text-gray-700">Microscopic Options: </label>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="microscopic_options"
                      id="cytology_or_hematology"
                      value="cytology_or_hematology"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="cytology_or_hematology" className="text-black">Cytology or Hematology</label>
                  </div>
                  <div className="flex items-center mt-1">
                    <input
                      type="radio"
                      name="microscopic_options"
                      id="histology_of_metastasis"
                      value="histology_of_metastasis"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="histology_of_metastasis" className="text-black">Histology of Metastasis</label>
                  </div>
                  <div className="flex items-center mt-1">
                    <input
                      type="radio"
                      name="microscopic_options"
                      id="histology_of_primary"
                      value="histology_of_primary"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="histology_of_primary" className="text-black">Histology of Primary</label>
                  </div>
                </div>
              )}

              {formData.basis_of_diagnosis_option === "Unknown" && (
                <div className="flex mt-1 h-7 gap-8 items-center">
                  <label className="text-sm font-semibold text-gray-700">Unknown Basis: </label>
                  <p className="text-base text-gray-500">No additional options available.</p>
                </div>
              )}


              <div className="flex justify-center mt-8">
                <label className="text-lg text-black font-bold">HISTOLOGY</label>
              </div>
              <Separator className="" />

              <div className="flex gap-4">
                <div className="flex flex-col w-8/12 relative" ref={dropdownRefPathology}>
                  <label htmlFor="histo_pathology" className="text-sm font-semibold text-gray-700">
                    Pathology
                  </label>
                  <input
                    type="text"
                    name="histo_pathology"
                    placeholder="Select or search Pathology"
                    value={pathologySearchTerm}
                    onChange={handlePathologySearchChange}
                    onClick={() => setPathologyDropdownOpen(true)}
                    className={`mt-1 p-2 border ${errors.histo_pathology ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  />
                  {pathologyDropdownOpen && (
                    <ul className="absolute z-10 top-16 bg-white border border-gray-300 w-full mt-1 rounded shadow-lg max-h-40 overflow-y-auto">
                      {filteredPathologies.length > 0 ? (
                        filteredPathologies.map((pathology) => (
                          <li
                            key={pathology.pathologyDimId}
                            className="p-2 text-black hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectPathology(pathology.pathologyDimId, pathology.term)}
                          >
                            {pathology.term}
                          </li>
                        ))
                      ) : (
                        <li className="p-2 text-gray-500">No pathologies found</li>
                      )}
                    </ul>
                  )}
                  {errors.histo_pathology && <p className="text-red-500 text-xs mt-1">{errors.histo_pathology}</p>}
                </div>


                <div className="flex flex-col w-2/12">
                  <label htmlFor="histo_tumorSize" className="text-sm font-semibold text-gray-700">
                    Tumor Size
                  </label>
                  <input
                    type="number"
                    name="histo_tumorSize"
                    value={formData.histo_tumorSize}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.histo_tumorSize ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Tumor Size"
                  />
                  {errors.histo_tumorSize && <p className="text-red-500 text-xs mt-1">{errors.histo_tumorSize}</p>}
                </div>

                <div className="flex flex-col w-2/12">
                  <label htmlFor="histo_tumorGrade" className="text-sm font-semibold text-gray-700">
                    Tumor Grade
                  </label>
                  <input
                    type="number"
                    name="histo_tumorGrade"
                    value={formData.histo_tumorGrade}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.histo_tumorGrade ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Tumor Grade"
                  />
                  {errors.histo_tumorGrade && <p className="text-red-500 text-xs mt-1">{errors.histo_tumorGrade}</p>}
                </div>

                <div className="flex flex-col w-2/12">
                  <label htmlFor="histo_tumorExtension" className="text-sm font-semibold text-gray-700">
                    Tumor Extension
                  </label>
                  <div className="flex items-center text-black h-11 gap-4">
                    <label className="mr-2">
                      <input
                        type="radio"
                        name="histo_tumorExtension"
                        value="Y"
                        checked={formData.histo_tumorExtension === "Y"}
                        onChange={handleChange}
                        className="mr-1"
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="histo_tumorExtension"
                        value="N"
                        checked={formData.histo_tumorExtension === "N"}
                        onChange={handleChange}
                        className="mr-1"
                      />
                      No
                    </label>
                  </div>
                  {errors.histo_tumorExtension && <p className="text-red-500 text-xs mt-1">{errors.histo_tumorExtension}</p>}
                </div>
              </div>


              <div className="flex gap-4 w-full justify-between">
                <div className="flex flex-col w-1/5">
                  <label htmlFor="histo_nodePositive" className="text-sm font-semibold text-gray-700">
                    Node Positive
                  </label>
                  <input
                    type="number"
                    name="histo_nodePositive"
                    value={formData.histo_nodePositive}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.histo_nodePositive ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Node Positive"
                  />
                  {errors.histo_nodePositive && <p className="text-red-500 text-xs mt-1">{errors.histo_nodePositive}</p>}
                </div>

                <div className="flex flex-col w-1/5">
                  <label htmlFor="histo_nodeHarvest" className="text-sm font-semibold text-gray-700">
                    Node Harvest
                  </label>
                  <input
                    type="number"
                    name="histo_nodeHarvest"
                    value={formData.histo_nodeHarvest}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.histo_nodeHarvest ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Node Harvest"
                  />
                  {errors.histo_nodeHarvest && <p className="text-red-500 text-xs mt-1">{errors.histo_nodeHarvest}</p>}
                </div>

                <div className="flex flex-col w-1/5">
                  <label htmlFor="histo_stage" className="text-sm font-semibold text-gray-700">
                    Stage
                  </label>
                  <select
                    name="histo_stage"
                    value={formData.histo_stage}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.histo_stage ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  >
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                  </select>
                  {errors.histo_stage && <p className="text-red-500 text-xs mt-1">{errors.histo_stage}</p>}
                </div>

                <div className="flex flex-col w-1/5">
                  <label htmlFor="histo_positiveMargins" className="text-sm font-semibold text-gray-700">
                    Positive Margins
                  </label>
                  <div className="flex items-center text-black h-11 gap-4 justify-between px-8">
                    <label className="mr-2">
                      <input
                        type="radio"
                        name="histo_positiveMargins"
                        value="Y"
                        checked={formData.histo_positiveMargins === "Y"}
                        onChange={handleChange}
                        className="mr-1"
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="histo_positiveMargins"
                        value="N"
                        checked={formData.histo_positiveMargins === "N"}
                        onChange={handleChange}
                        className="mr-1"
                      />
                      No
                    </label>
                  </div>
                  {errors.histo_positiveMargins && <p className="text-red-500 text-xs mt-1">{errors.histo_positiveMargins}</p>}
                </div>

                <div className="flex flex-col w-1/5">
                  <label htmlFor="histo_negativeMargins" className="text-sm font-semibold text-gray-700">
                    Negative Margins
                  </label>
                  <div className="flex items-center text-black h-11 gap-4 justify-between px-8">
                    <label className="mr-2">
                      <input
                        type="radio"
                        name="histo_negativeMargins"
                        value="Y"
                        checked={formData.histo_negativeMargins === "Y"}
                        onChange={handleChange}
                        className="mr-1"
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="histo_negativeMargins"
                        value="N"
                        checked={formData.histo_negativeMargins === "N"}
                        onChange={handleChange}
                        className="mr-1"
                      />
                      No
                    </label>
                  </div>
                  {errors.histo_negativeMargins && <p className="text-red-500 text-xs mt-1">{errors.histo_negativeMargins}</p>}
                </div>
              </div>


              <div className="flex justify-center mt-8">
                <label className="text-lg text-black font-bold">DISEASE</label>
              </div>
              <Separator className="" />

              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="disease_extent" className="text-sm font-semibold text-gray-700">Extent of Disease</label>
                  <select
                    name="disease_extent"
                    value={formData.disease_extent}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.disease_extent ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  >
                    <option value="1">In-Situ</option>
                    <option value="2">Localized</option>
                    <option value="3">Direct Extension</option>
                    <option value="4">Regional Lymph Node</option>
                    <option value="5">Direct Extension and Regional Lymph Node</option>
                    <option value="6">Distant Metastasis</option>
                    <option value="7">Unknown</option>
                  </select>
                  {errors.disease_extent && <p className="text-red-500 text-xs mt-1">{errors.disease_extent}</p>}
                </div>


                <div className="flex flex-col w-1/2">
                  <label htmlFor="disease_tumor_size" className="text-sm font-semibold text-gray-700">Tumor Size</label>
                  <input
                    type="text"
                    name="disease_tumor_size"
                    value={formData.disease_tumor_size}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.disease_tumor_size ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Enter tumor size"
                  />
                  {errors.disease_tumor_size && <p className="text-red-500 text-xs mt-1">{errors.disease_tumor_size}</p>}
                </div>

                <div className="flex flex-col w-2/12">
                  <label htmlFor="disease_lymph_node" className="text-sm font-semibold text-gray-700">Lymph Node</label>
                  <input
                    type="number"
                    name="disease_lymph_node"
                    value={formData.disease_lymph_node}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.disease_lymph_node ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Lymph Node"
                  />
                  {errors.disease_lymph_node && <p className="text-red-500 text-xs mt-1">{errors.disease_lymph_node}</p>}
                </div>

                <div className="flex flex-col w-2/12">
                  <label htmlFor="disease_metastatic" className="text-sm font-semibold text-gray-700">
                    Metastatic
                  </label>

                  <div className="flex items-center text-black h-11 gap-4">
                    <label className="mr-2">
                      <input
                        type="radio"
                        name="disease_metastatic"
                        value="Y"
                        checked={formData.disease_metastatic === "Y"}
                        onChange={handleChange}
                        className="mr-1"
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="disease_metastatic"
                        value="N"
                        checked={formData.disease_metastatic === "N"}
                        onChange={handleChange}
                        className="mr-1"
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <label className="text-lg text-black font-bold">METASTATIC</label>
              </div>
              <Separator className="" />

              <div className="flex h-full">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="disease_extent" className="text-sm font-semibold text-gray-700">Metastatic Involvement</label>
                  <div className="flex py-4">
                    <div className="flex flex-col w-1/2 gap-4">
                      <div className="flex flex-col">
                        <label htmlFor="metastatic_distant_ln" className="text-sm font-normal pl-4 text-gray-700">
                          <input
                            id="metastatic_distant_ln"
                            type="checkbox"
                            name="metastatic_distant_ln"
                            checked={formData.metastatic_distant_ln === "Y"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                metastatic_distant_ln: e.target.checked ? "Y" : "N",
                              })
                            }
                            className="mr-2"
                          />
                          Distant Lymph Node
                        </label>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="metastatic_bone" className="text-sm font-normal pl-4 text-gray-700">
                          <input
                            id="metastatic_bone"
                            type="checkbox"
                            name="metastatic_bone"
                            checked={formData.metastatic_bone === "Y"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                metastatic_bone: e.target.checked ? "Y" : "N",
                              })
                            }
                            className="mr-2"
                          />
                          Bone
                        </label>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="metastatic_liver" className="text-sm font-normal pl-4 text-gray-700">
                          <input
                            id="metastatic_liver"
                            type="checkbox"
                            name="metastatic_liver"
                            checked={formData.metastatic_liver === "Y"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                metastatic_liver: e.target.checked ? "Y" : "N",
                              })
                            }
                            className="mr-2"
                          />
                          Liver
                        </label>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="metastatic_lung" className="text-sm font-normal pl-4 text-gray-700">
                          <input
                            id="metastatic_lung"
                            type="checkbox"
                            name="metastatic_lung"
                            checked={formData.metastatic_lung === "Y"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                metastatic_lung: e.target.checked ? "Y" : "N",
                              })
                            }
                            className="mr-2"
                          />
                          Lung
                        </label>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="metastatic_brain" className="text-sm font-normal pl-4 text-gray-700">
                          <input
                            id="metastatic_brain"
                            type="checkbox"
                            name="metastatic_brain"
                            checked={formData.metastatic_brain === "Y"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                metastatic_brain: e.target.checked ? "Y" : "N",
                              })
                            }
                            className="mr-2"
                          />
                          Brain
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col w-1/2 gap-4">
                      <div className="flex flex-col">
                        <label htmlFor="metastatic_ovary" className="text-sm font-normal pl-4 text-gray-700">
                          <input
                            id="metastatic_ovary"
                            type="checkbox"
                            name="metastatic_ovary"
                            checked={formData.metastatic_ovary === "Y"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                metastatic_ovary: e.target.checked ? "Y" : "N",
                              })
                            }
                            className="mr-2"
                          />
                          Ovary
                        </label>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="metastatic_skin" className="text-sm font-normal pl-4 text-gray-700">
                          <input
                            id="metastatic_skin"
                            type="checkbox"
                            name="metastatic_skin"
                            checked={formData.metastatic_skin === "Y"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                metastatic_skin: e.target.checked ? "Y" : "N",
                              })
                            }
                            className="mr-2"
                          />
                          Skin
                        </label>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="metastatic_intestine" className="text-sm font-normal pl-4 text-gray-700">
                          <input
                            id="metastatic_intestine"
                            type="checkbox"
                            name="metastatic_intestine"
                            checked={formData.metastatic_intestine === "Y"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                metastatic_intestine: e.target.checked ? "Y" : "N",
                              })
                            }
                            className="mr-2"
                          />
                          Intestine
                        </label>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="metastatic_others" className="text-sm font-normal pl-4 text-gray-700">
                          <input
                            id="metastatic_others"
                            type="checkbox"
                            name="metastatic_others"
                            checked={formData.metastatic_others === "Y"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                metastatic_others: e.target.checked ? "Y" : "N",
                              })
                            }
                            className="mr-2"
                          />
                          Others
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap mb-4">
                    <div className="flex flex-col w-full">
                      <label htmlFor="check_all" className="text-sm font-normal pl-4 text-gray-700">
                        <input
                          id="check_all"
                          type="checkbox"
                          checked={allChecked}
                          onChange={handleCheckAll}
                          className="mr-2"
                        />
                        Check/Uncheck All Metastatic Sites
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-1/2 h-60">
                  <label htmlFor="metastatic_notes" className="text-sm font-semibold text-gray-700">
                    Notes
                  </label>
                  <textarea
                    name="metastatic_notes"
                    value={formData.metastatic_notes}
                    onChange={handleChange}
                    className={`mt-1 p-2 border h-full ${errors.metastatic_notes ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <label className="text-lg text-black font-bold">MULTIPLE DISEASE</label>
              </div>
              <Separator className="" />

              <div className="relative" ref={dropdownRefMultiple}>
                <label htmlFor="multiple_primary_sites" className="text-sm font-semibold text-gray-700">
                  Multiple Primary Sites
                </label>
                <div className="flex flex-wrap border border-gray-300 rounded mt-1 p-2 ">
                  {selectedSites.map((site) => (
                    <span
                      key={site.bodysiteId}
                      className="bg-red-200 text-black px-2 py-1 rounded mr-2 flex items-center"
                    >
                      {site.bodysiteName}
                      <button
                        className="ml-2 text-red-600 hover:text-red-800"
                        onClick={() => handleRemoveSite(site.bodysiteId)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    name="multiple_primaries"
                    placeholder="Select Other Primary Sites"
                    value={multipleSearchTerm}
                    onChange={handleMultipleSearchChange}
                    onClick={() => setMultipleDropdownOpen(true)}
                    className={`border-0 outline-none flex-1 text-black`}
                  />
                </div>
                {multipleDropdownOpen && (
                  <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow-lg max-h-40 overflow-y-auto">
                    {filteredSites.length > 0 ? (
                      filteredSites.map((site) => (
                        <li
                          key={site.bodysiteId}
                          className="p-2 hover:bg-gray-200 text-black cursor-pointer"
                          onClick={() => handleSelectMultipleSite(site.bodysiteId, site.bodysiteName)}
                        >
                          {site.bodysiteName}
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-gray-500">No sites found</li>
                    )}
                  </ul>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col w-1/4">
                  <label htmlFor="disease_tstage" className="text-sm font-semibold text-gray-700">T Stage</label>
                  <input
                    type="number"
                    name="disease_tstage"
                    value={formData.disease_tstage}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.disease_tstage ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="T Stage"
                  />
                  {errors.disease_tstage && <p className="text-red-500 text-xs mt-1">{errors.disease_tstage}</p>}
                </div>

                <div className="flex flex-col w-1/4">
                  <label htmlFor="disease_nstage" className="text-sm font-semibold text-gray-700">N Stage</label>
                  <input
                    type="number"
                    name="disease_nstage"
                    value={formData.disease_nstage}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.disease_nstage ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="N Stage"
                  />
                  {errors.disease_nstage && <p className="text-red-500 text-xs mt-1">{errors.disease_nstage}</p>}
                </div>

                <div className="flex flex-col w-1/4">
                  <label htmlFor="disease_mstage" className="text-sm font-semibold text-gray-700">M Stage</label>
                  <input
                    type="number"
                    name="disease_mstage"
                    value={formData.disease_mstage}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.disease_mstage ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="M Stage"
                  />
                  {errors.disease_mstage && <p className="text-red-500 text-xs mt-1">{errors.disease_mstage}</p>}
                </div>

                <div className="flex flex-col w-1/4">
                  <label htmlFor="disease_gstage" className="text-sm font-semibold text-gray-700">G Stage</label>
                  <input
                    type="number"
                    name="disease_gstage"
                    value={formData.disease_gstage}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.disease_gstage ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="G Stage"
                  />
                  {errors.disease_gstage && <p className="text-red-500 text-xs mt-1">{errors.disease_gstage}</p>}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col w-2/4">
                  <label htmlFor="stage" className="text-sm font-semibold text-gray-700">Stage</label>
                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.stage ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  >
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                  </select>
                  {errors.stage && <p className="text-red-500 text-xs mt-1">{errors.stage}</p>}
                </div>

                <div className="flex flex-col w-2/4">
                  <label htmlFor="stage_type" className="text-sm font-semibold text-gray-700">Stage Type</label>
                  <input
                    type="text"
                    name="stage_type"
                    value={formData.stage_type}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.stage_type ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Enter stage type"
                  />
                  {errors.stage_type && <p className="text-red-500 text-xs mt-1">{errors.stage_type}</p>}
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <label className="text-lg text-black font-bold">PATIENT STATUS</label>
              </div>
              <Separator className="" />

              <div className="flex flex-col">
                <div className="flex py-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="dxstatus_alive" className="text-sm font-normal pl-4 text-gray-700">
                        <input
                          id="dxstatus_alive"
                          type="checkbox"
                          name="dxstatus_alive"
                          checked={formData.dxstatus_alive === "Y"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dxstatus_alive: e.target.checked ? "Y" : "N",
                            })
                          }
                          className="mr-2"
                        />
                        Alive
                      </label>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="dxstatus_symptoms" className="text-sm font-normal pl-4 text-gray-700">
                        <input
                          id="dxstatus_symptoms"
                          type="checkbox"
                          name="dxstatus_symptoms"
                          checked={formData.dxstatus_symptoms === "Y"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dxstatus_symptoms: e.target.checked ? "Y" : "N",
                            })
                          }
                          className="mr-2"
                        />
                        Symptoms
                      </label>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="dxstatus_recurrence" className="text-sm font-normal pl-4 text-gray-700">
                        <input
                          id="dxstatus_recurrence"
                          type="checkbox"
                          name="dxstatus_recurrence"
                          checked={formData.dxstatus_recurrence === "Y"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dxstatus_recurrence: e.target.checked ? "Y" : "N",
                            })
                          }
                          className="mr-2"
                        />
                        Recurrence
                      </label>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="dxstatus_metastatic" className="text-sm font-normal pl-4 text-gray-700">
                        <input
                          id="dxstatus_metastatic"
                          type="checkbox"
                          name="dxstatus_metastatic"
                          checked={formData.dxstatus_metastatic === "Y"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dxstatus_metastatic: e.target.checked ? "Y" : "N",
                            })
                          }
                          className="mr-2"
                        />
                        Metastatic
                      </label>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="dxstatus_curative" className="text-sm font-normal pl-4 text-gray-700">
                        <input
                          id="dxstatus_curative"
                          type="checkbox"
                          name="dxstatus_curative"
                          checked={formData.dxstatus_curative === "Y"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dxstatus_curative: e.target.checked ? "Y" : "N",
                            })
                          }
                          className="mr-2"
                        />
                        Curative
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex mt-8 mb-8">
              <div className="w-1/2 flex justify-center">
                <button type="submit"
                  className={`bg-red-900 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded transition`}
                >
                  SUBMIT
                </button>
              </div>
              <div className="w-1/2 flex justify-center">
                <button type="button"
                  className={`bg-red-900 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded transition`}
                >
                  SUBMIT & ADD TREATMENT HISTORY
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DiseaseProfile;