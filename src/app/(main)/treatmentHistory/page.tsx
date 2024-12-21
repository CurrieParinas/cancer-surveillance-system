"use client";

import { useToast } from "@/hooks/use-toast";
import { PatientSchema } from "@/packages/api/patient";
import { PatientsResponseSchema } from "@/packages/api/patient-list";
import usePageStore from "@/packages/stores/pageStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

interface FilteredPatient {
  patientId: number;
  userFirstname: string;
  userLastname: string;
  userEmail: string;
}

interface FormData {
  patientId?: string;
  lastname?: string;
  email?: string;
}

interface Address {
  addressId: number;
  addressNumber: string;
  addressStreet: string;
  addressCity: string;
  addressRegion: string;
  addressZipcode: string;
}

interface Hospital {
  hospitalId: number;
  hospitalName: string;
  address: Address;
  hospitalContactNo: string | null;
}

interface Address {
  addressId: number;
  addressNumber: string;
  addressStreet: string;
  addressCity: string;
  addressRegion: string;
  addressZipcode: string;
}

interface Role {
  roleId: number;
  roleName: string;
  roleDescription: string;
}

interface UserAccess {
  accessId: number;
  accessCanenrollpatient: string;
  accessCaneditpatientinfo: string;
  accessCanviewpatientinfo: string;
  accessCandeleteuser: string;
  accessCandeletepatientinfo: string;
}

interface User {
  userId: number;
  userLastname: string;
  userFirstname: string;
  userMiddlename: string;
  userEmail: string;
  userPassword: string;
  userGender: string;
  userMaritalStatus: string;
  userBirthdate: string;
  userBirthplace: string;
  userAddress: Address;
  userRole: Role;
  userAccess: UserAccess;
  userIsVerified: string;
  userStatus: string;
  userCreatedOn: string;
  userUpdatedOn: string;
}

interface Hospital {
  hospitalId: number;
  hospitalName: string;
  address: Address;
  hospitalContactNo: string | null;
}

interface Department {
  departmentId: number;
  departmentName: string;
}

interface Specialty {
  specialtyID: number;
  specialtyName: string;
  specialtyDescription: string;
}

interface Doctor {
  doctorId: number;
  user: User;
  hospital: Hospital;
  department: Department;
  specialty: Specialty;
  doctorESignature: string | null;
  doctorLicenseNumber: string;
  doctorLicenseExpDate: string;
  doctorSchedule: number;
}

const treatments = [
  { id: 'Surgery', name: 'Surgery' },
  { id: 'Chemotherapy', name: 'Chemotherapy' },
  { id: 'Radiotherapy', name: 'Radiotherapy' },
  { id: 'Immunotherapy', name: 'Immunotherapy' },
  { id: 'Hormonal Therapy', name: 'Hormonal Therapy' },
  { id: 'Others', name: 'Other Treatments' }
];

const TreatmentHistoryForm = () => {
  const [formData, setFormData] = useState<FormData>({
    patientId: "",
    lastname: "",
    email: "",
  });

  // TREATMENT CASE
  const [treatmentFormData, setTreatmentFormData] = useState({
    PATIENT_ID: "",
    TREATMENT_PRIMARYRXTYPE: "",
    TREATMENT_PRIMARYRXNAME: "",
    TREATMENT_INITIALRXDATE: "",
    TREATMENT_PURPOSE: "",
    TREATMENT_PLAN: "",
    TREATMENT_ENCODER: 1,
    RXTYPE_SURGERY: "0",
    RXTYPE_CHEMOTHERAPY: "0",
    RXTYPE_RADIOTHERAPY: "0",
    RXTYPE_IMMUNOTHERAPY: "0",
    RXTYPE_HORMONALTHERAPY: "0",
    RXTYPE_OTHERS: "0",
    RXTYPE_NOTES: "",
    RXTYPE_ENCODER: 1
  });

  const handleTreatmentChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setTreatmentFormData({ ...treatmentFormData, [name]: value });
  };

  const [treatmentDropdownOpen, setTreatmentDropdownOpen] = useState(false);
  const [treatmentOptions] = useState([
    "Surgery",
    "Radiotherapy",
    "Hormonal",
    "Immunotherapy",
    "Chemotherapy",
    "Others"
  ]);

  const [filteredTreatmentOptions, setFilteredTreatmentOptions] = useState(treatmentOptions);

  const handleSelectTreatment = (selectedTreatment: string) => {
    const event = {
      target: {
        name: "TREATMENT_PRIMARYRXTYPE",
        value: selectedTreatment,
      },
    } as ChangeEvent<HTMLInputElement>;

    handleTreatmentChange(event);
    setTreatmentDropdownOpen(false);
  };

  const dropdownRefTreatment = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRefTreatment.current && !dropdownRefTreatment.current.contains(event.target as Node)) {
        setTreatmentDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    handleTreatmentChange(event);
    setFilteredTreatmentOptions(
      treatmentOptions.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const [purposeDropdownOpen, setPurposeDropdownOpen] = useState(false);
  const [purposeOptions] = useState([
    "Curative-complete",
    "Curative-incomplete",
    "Palliative only",
    "Others"
  ]);
  const [filteredPurposeOptions, setFilteredPurposeOptions] = useState(purposeOptions);
  const dropdownRefPurpose = useRef<HTMLDivElement | null>(null);

  const handlePurposeSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    handleTreatmentChange(event);
    setFilteredPurposeOptions(
      purposeOptions.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleSelectPurpose = (selectedPurpose: string) => {
    handleTreatmentChange({ target: { name: "TREATMENT_PURPOSE", value: selectedPurpose } } as ChangeEvent<HTMLInputElement>);
    setPurposeDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRefPurpose.current && !dropdownRefPurpose.current.contains(event.target as Node)) {
        setPurposeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [selectedTreatments, setSelectedTreatments] = useState<{ id: string; name: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredTreatments = treatments.filter((treatment) =>
    treatment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMultipleSelectTreatment = (id: string, name: string) => {
    setSelectedTreatments((prev) => [...prev, { id, name }]);
    setTreatmentFormData((prev) => ({
      ...prev,
      [`RXTYPE_${id.toUpperCase().replace(" ", "")}`]: "1"
    }));
    setSearchTerm('');
    setDropdownOpen(false);
  };

  const handleRemoveTreatment = (id: string) => {
    setSelectedTreatments((prev) => prev.filter((treatment) => treatment.id !== id));
    setTreatmentFormData((prev) => ({
      ...prev,
      [`RXTYPE_${id.toUpperCase().replace(" ", "")}`]: "0"
    }));
  };

  const handleMultipleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as Node).contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { toast } = useToast();

  const handleTreatmentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestBody = {
      PATIENT_ID: Number(formData.patientId),
      TREATMENT_PRIMARYRXTYPE: treatmentFormData.TREATMENT_PRIMARYRXTYPE,
      TREATMENT_PRIMARYRXNAME: treatmentFormData.TREATMENT_PRIMARYRXNAME,
      TREATMENT_INITIALRXDATE: treatmentFormData.TREATMENT_INITIALRXDATE,
      TREATMENT_PURPOSE: treatmentFormData.TREATMENT_PURPOSE,
      TREATMENT_PLAN: Number(treatmentFormData.TREATMENT_PLAN),
      TREATMENT_ENCODER: Number(doctorInfo),
      RXTYPE_SURGERY: treatmentFormData.RXTYPE_SURGERY,
      RXTYPE_CHEMOTHERAPY: treatmentFormData.RXTYPE_CHEMOTHERAPY,
      RXTYPE_RADIOTHERAPY: treatmentFormData.RXTYPE_RADIOTHERAPY,
      RXTYPE_IMMUNOTHERAPY: treatmentFormData.RXTYPE_IMMUNOTHERAPY,
      RXTYPE_HORMONALTHERAPY: treatmentFormData.RXTYPE_HORMONALTHERAPY,
      RXTYPE_OTHERS: treatmentFormData.RXTYPE_OTHERS,
      RXTYPE_NOTES: treatmentFormData.RXTYPE_NOTES,
      RXTYPE_ENCODER: Number(doctorInfo),
    };

    try {
      const response = await fetch("http://localhost:8080/css/treatment/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Treatment information submitted successfully!");
        toast({ title: "Treatment information submitted successfully!" })
        setTreatmentFormData({
          PATIENT_ID: treatmentFormData.PATIENT_ID,
          TREATMENT_PRIMARYRXTYPE: "",
          TREATMENT_PRIMARYRXNAME: "",
          TREATMENT_INITIALRXDATE: "",
          TREATMENT_PURPOSE: "",
          TREATMENT_PLAN: "",
          TREATMENT_ENCODER: 1,
          RXTYPE_SURGERY: "0",
          RXTYPE_CHEMOTHERAPY: "0",
          RXTYPE_RADIOTHERAPY: "0",
          RXTYPE_IMMUNOTHERAPY: "0",
          RXTYPE_HORMONALTHERAPY: "0",
          RXTYPE_OTHERS: "0",
          RXTYPE_NOTES: "",
          RXTYPE_ENCODER: 1,
        })
        setSelectedTreatments([]);
      } else {
        console.log("An error occured in treatment information submission.")
      }
    } catch (error) {
      console.error("Error submitting treatment:", error);
    }
  };

  // SURGERY CASE
  const [surgeryFormData, setSurgeryFormData] = useState({
    PATIENT_ID: "",
    SURGERY_OPERATION: "",
    SURGERY_DATE: "",
    SURGERY_FINDINGS: "",
    SURGERY_INTENT: "",
    SURGERY_SURGEON: "",
    SURGERY_HOSPITAL: "",
    SURGERY_ENCODER: 1
  });

  const handleSurgeryChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setSurgeryFormData({ ...surgeryFormData, [name]: value });
  };

  const [surgeryIntentOptions] = useState([
    "Curative-complete",
    "Curative-incomplete",
    "Palliative only",
    "Others"
  ]);

  const [surgeryIntentDropdownOpen, setSurgeryIntentDropdownOpen] = useState<boolean>(false);
  const [filteredSurgeryIntentOptions, setFilteredSurgeryIntentOptions] = useState(surgeryIntentOptions);
  const dropdownRefSurgeryIntent = useRef<HTMLDivElement | null>(null);


  const handleSurgerySearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    handleSurgeryChange(event);
    setFilteredSurgeryIntentOptions(
      surgeryIntentOptions.filter(option =>
        option.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const handleSelectSurgeryIntent = (option: string): void => {
    setSurgeryFormData(prevData => ({
      ...prevData,
      SURGERY_INTENT: option,
    }));
    handleTreatmentChange({ target: { name: "SURGERY_INTENT", value: option } } as ChangeEvent<HTMLInputElement>);
    setSurgeryIntentDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (dropdownRefSurgeryIntent.current && !dropdownRefSurgeryIntent.current.contains(event.target as Node)) {
      setSurgeryIntentDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSurgerySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestBody = {
      PATIENT_ID: Number(surgeryFormData.PATIENT_ID),
      SURGERY_OPERATION: surgeryFormData.SURGERY_OPERATION,
      SURGERY_DATE: surgeryFormData.SURGERY_DATE,
      SURGERY_FINDINGS: surgeryFormData.SURGERY_FINDINGS,
      SURGERY_INTENT: surgeryFormData.SURGERY_INTENT,
      SURGERY_SURGEON: Number(surgeryFormData.SURGERY_SURGEON),
      SURGERY_HOSPITAL: Number(surgeryFormData.SURGERY_HOSPITAL),
      SURGERY_ENCODER: Number(doctorInfo),
    };

    try {
      const response = await fetch("http://localhost:8080/css/surgery/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Surgery information submitted successfully!");
        toast({ title: "Surgery information submitted successfully!" })
        setSurgeryFormData({
          PATIENT_ID: surgeryFormData.PATIENT_ID,
          SURGERY_OPERATION: "",
          SURGERY_DATE: "",
          SURGERY_FINDINGS: "",
          SURGERY_INTENT: "",
          SURGERY_SURGEON: "",
          SURGERY_HOSPITAL: "",
          SURGERY_ENCODER: 4, // Reset to the default value if needed
        });
      } else {
        console.log("An error occurred in surgery information submission.");
      }
    } catch (error) {
      console.error("Error submitting surgery:", error);
    }
  };

  // RADIATION CASE
  const [radiationFormData, setRadiationFormData] = useState({
    PATIENT_ID: "",
    RADRX_TYPE: "",
    RADRX_INITIALDATE: "",
    RADRX_LASTDATE: "",
    RADRX_DOSE: "",
    RADRX_BODYSITE: "",
    RADRX_STATUS: "",
    RADRX_ISCOMPLETED: "N",
    RADRX_FACILITY: "",
    RADRX_DOCTOR: "",
    RADRX_ENCODER: 1
  });

  const handleRadiationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRadiationFormData({ ...radiationFormData, [name]: value });
  };

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(radiationFormData.RADRX_STATUS || '');
  const dropdownRadRefStatus = useRef<HTMLDivElement | null>(null);

  const statusOptions = ["Ongoing", "Completed", "Not completed"] as const;

  const handleSelectStatus = (status: "Ongoing" | "Completed" | "Not completed") => {
    setSelectedStatus(status);
    setStatusDropdownOpen(false);

    const syntheticEvent = {
      target: { name: "RADRX_STATUS", value: status }
    } as ChangeEvent<HTMLInputElement>;

    handleRadiationChange(syntheticEvent);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRadRefStatus.current && !dropdownRadRefStatus.current.contains(event.target as Node)) {
        setStatusDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRadxSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestBody = {
      PATIENT_ID: Number(radiationFormData.PATIENT_ID),
      RADRX_TYPE: Number(radiationFormData.RADRX_TYPE),
      RADRX_INITIALDATE: radiationFormData.RADRX_INITIALDATE,
      RADRX_LASTDATE: radiationFormData.RADRX_LASTDATE,
      RADRX_DOSE: Number(radiationFormData.RADRX_DOSE),
      RADRX_BODYSITE: radiationFormData.RADRX_BODYSITE,
      RADRX_STATUS: radiationFormData.RADRX_STATUS,
      RADRX_ISCOMPLETED: radiationFormData.RADRX_ISCOMPLETED,
      RADRX_FACILITY: Number(radiationFormData.RADRX_FACILITY),
      RADRX_DOCTOR: Number(radiationFormData.RADRX_DOCTOR),
      RADRX_ENCODER: Number(doctorInfo),
    };

    console.log(JSON.stringify(requestBody))

    try {
      const response = await fetch("http://localhost:8080/css/radiotherapy/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        toast({ title: "Radiotherapy information submitted successfully!" })
        console.log("Radiotherapy information submitted successfully!");
        setRadiationFormData({
          PATIENT_ID: radiationFormData.PATIENT_ID,
          RADRX_TYPE: "",
          RADRX_INITIALDATE: "",
          RADRX_LASTDATE: "",
          RADRX_DOSE: "",
          RADRX_BODYSITE: "",
          RADRX_STATUS: "Pending",
          RADRX_ISCOMPLETED: "N",
          RADRX_FACILITY: "",
          RADRX_DOCTOR: "",
          RADRX_ENCODER: 1,
        });
      } else {
        console.log("An error occurred in radiotherapy information submission.");
      }
    } catch (error) {
      console.error("Error submitting radiotherapy:", error);
    }
  };

  // HORMONAL CASE
  const [hormonalFormData, setHormonalFormData] = useState({
    patientId: "",
    hormonalDrug: "",
    hormonalDose: "",
    hormonalInitialDate: "",
    hormonalEndDate: "",
    hormonalStatus: "",
    hormonalRxNotes: "",
    hormonalDoctorId: "",
    hormonalEncoderId: 1,
  });

  const handleHormonalChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setHormonalFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [statusDropdownOpenHormonal, setStatusDropdownOpenHormonal] = useState(false);
  const [selectedHormonalStatus, setSelectedHormonalStatus] = useState(hormonalFormData.hormonalStatus || "");
  const dropdownHormonalRefStatus = useRef<HTMLDivElement | null>(null);

  const handleSelectHormonalStatus = (status: "Ongoing" | "Completed" | "Not completed") => {
    setSelectedHormonalStatus(status);
    setStatusDropdownOpenHormonal(false);

    const syntheticEvent = {
      target: { name: "hormonalStatus", value: status }
    } as ChangeEvent<HTMLInputElement>;

    handleHormonalChange(syntheticEvent);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownHormonalRefStatus.current && !dropdownHormonalRefStatus.current.contains(event.target as Node)) {
        setStatusDropdownOpenHormonal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHormonalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestBody = {
      patientId: Number(hormonalFormData.patientId),
      hormonalDrug: hormonalFormData.hormonalDrug,
      hormonalDose: Number(hormonalFormData.hormonalDose),
      hormonalInitialDate: hormonalFormData.hormonalInitialDate,
      hormonalEndDate: hormonalFormData.hormonalEndDate,
      hormonalStatus: hormonalFormData.hormonalStatus,
      hormonalRxNotes: hormonalFormData.hormonalRxNotes,
      hormonalDoctorId: Number(hormonalFormData.hormonalDoctorId),
      hormonalEncoderId: Number(doctorInfo),
    };

    try {
      const response = await fetch("http://localhost:8080/css/hormonal/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        toast({ title: "Hormonal treatment information submitted successfully!" })
        console.log("Hormonal treatment information submitted successfully!");
        setHormonalFormData({
          patientId: hormonalFormData.patientId,
          hormonalDrug: "",
          hormonalDose: "",
          hormonalInitialDate: "",
          hormonalEndDate: "",
          hormonalStatus: "",
          hormonalRxNotes: "",
          hormonalDoctorId: "",
          hormonalEncoderId: 1,
        });
      } else {
        console.log("An error occurred in hormonal treatment information submission.");
      }
    } catch (error) {
      console.error("Error submitting hormonal treatment:", error);
    }
  };

  //IMMUNO CASE
  const [immunorxFormData, setImmunorxFormData] = useState({
    patientId: "",
    immunorxDrug: "",
    immunorxInitialDate: "",
    immunorxEndDate: "",
    immunorxStatus: "",
    immunorxNotes: "",
    immunorxIsCompleted: "Y",
    immunorxFacilityId: "",
    immunorxDoctorId: "",
    immunorxEncoderId: 1
  });

  const handleImmunorxChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setImmunorxFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [immunoRxDropdownOpen, setImmunoRxDropdownOpen] = useState(false);
  const [selectedImmunoRxStatus, setSelectedImmunoRxStatus] = useState(immunorxFormData.immunorxStatus || '');
  const dropdownRefImmunoRx = useRef<HTMLDivElement | null>(null);

  const immunoRxStatusOptions = ["Ongoing", "Completed", "Not completed"] as const;

  const handleSelectImmunoRxStatus = (status: "Ongoing" | "Completed" | "Not completed") => {
    setSelectedImmunoRxStatus(status);
    setImmunoRxDropdownOpen(false);

    const syntheticEvent = {
      target: { name: "immunorxStatus", value: status }
    } as ChangeEvent<HTMLInputElement>;

    handleImmunorxChange(syntheticEvent);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRefImmunoRx.current && !dropdownRefImmunoRx.current.contains(event.target as Node)) {
        setImmunoRxDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImmunoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestBody = {
      patientId: Number(immunorxFormData.patientId),
      immunorxDrug: immunorxFormData.immunorxDrug,
      immunorxInitialDate: immunorxFormData.immunorxInitialDate,
      immunorxEndDate: immunorxFormData.immunorxEndDate,
      immunorxStatus: immunorxFormData.immunorxStatus,
      immunorxNotes: immunorxFormData.immunorxNotes,
      immunorxIsCompleted: immunorxFormData.immunorxIsCompleted === "Yes" ? "Y" : "N",
      immunorxFacilityId: Number(immunorxFormData.immunorxFacilityId),
      immunorxDoctorId: Number(immunorxFormData.immunorxDoctorId),
      immunorxEncoderId: Number(doctorInfo),
    };

    try {
      const response = await fetch("http://localhost:8080/css/immunotherapy/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        toast({ title: "Immunotherapy information submitted successfully!" })
        console.log("Immunotherapy information submitted successfully!");
        setImmunorxFormData({
          patientId: immunorxFormData.patientId,
          immunorxDrug: "",
          immunorxInitialDate: "",
          immunorxEndDate: "",
          immunorxStatus: "",
          immunorxNotes: "",
          immunorxIsCompleted: "Yes",
          immunorxFacilityId: "",
          immunorxDoctorId: "",
          immunorxEncoderId: 1,
        });
      } else {
        console.log("An error occurred in immunotherapy information submission.");
      }
    } catch (error) {
      console.error("Error submitting immunotherapy:", error);
    }
  };

  // CHEMO CASE
  const [chemoFormData, setChemoFormData] = useState({
    PATIENT_ID: "",
    CHEMO_TYPE: "",
    CHEMO_PROTOCOL: "",
    CHEMO_INITIALDATE: "",
    CHEMO_ENDDATE: "",
    CHEMO_CYCLENUMBERGIVEN: "",
    CHEMO_STATUS: "",
    CHEMO_NOTES: "",
    CHEMO_ISCOMPLETED: "Yes",
    CHEMO_FACILITY: "",
    CHEMO_DOCTOR: "",
    CHEMO_ENCODER: 1
  });

  const handleChemoChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setChemoFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [chemoTypeDropdownOpen, setChemoTypeDropdownOpen] = useState(false);
  const [selectedChemoType, setSelectedChemoType] = useState(chemoFormData.CHEMO_TYPE || '');
  const dropdownRefChemoType = useRef<HTMLDivElement | null>(null);

  const chemoTypeOptions = ["Neoadjuvant", "Adjuvant", "Palliative"] as const;

  const handleSelectChemoType = (type: "Neoadjuvant" | "Adjuvant" | "Palliative") => {
    setSelectedChemoType(type);
    setChemoTypeDropdownOpen(false);
    const syntheticEvent = {
      target: { name: "CHEMO_TYPE", value: type }
    } as ChangeEvent<HTMLInputElement>;

    handleChemoChange(syntheticEvent);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRefChemoType.current && !dropdownRefChemoType.current.contains(event.target as Node)) {
        setChemoTypeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [chemoStatusDropdownOpen, setChemoStatusDropdownOpen] = useState(false);
  const [selectedChemoStatus, setSelectedChemoStatus] = useState(chemoFormData.CHEMO_STATUS || '');
  const dropdownRefChemoStatus = useRef<HTMLDivElement | null>(null);

  const chemoStatusOptions = ["Ongoing", "Completed", "Not completed", "Not done"] as const;

  const handleSelectChemoStatus = (status: "Ongoing" | "Completed" | "Not completed" | "Not done") => {
    setSelectedChemoStatus(status);
    setChemoStatusDropdownOpen(false);
    const syntheticEvent = {
      target: { name: "CHEMO_STATUS", value: status }
    } as ChangeEvent<HTMLInputElement>;

    handleChemoChange(syntheticEvent);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRefChemoStatus.current && !dropdownRefChemoStatus.current.contains(event.target as Node)) {
        setChemoStatusDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChemoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestBody = {
      PATIENT_ID: Number(chemoFormData.PATIENT_ID),
      CHEMO_TYPE: chemoFormData.CHEMO_TYPE,
      CHEMO_PROTOCOL: Number(chemoFormData.CHEMO_PROTOCOL),
      CHEMO_INITIALDATE: chemoFormData.CHEMO_INITIALDATE,
      CHEMO_ENDDATE: chemoFormData.CHEMO_ENDDATE,
      CHEMO_CYCLENUMBERGIVEN: Number(chemoFormData.CHEMO_CYCLENUMBERGIVEN),
      CHEMO_STATUS: chemoFormData.CHEMO_STATUS,
      CHEMO_NOTES: chemoFormData.CHEMO_NOTES,
      CHEMO_ISCOMPLETED: chemoFormData.CHEMO_ISCOMPLETED === "Yes" ? "Y" : "N",
      CHEMO_FACILITY: Number(chemoFormData.CHEMO_FACILITY),
      CHEMO_DOCTOR: Number(chemoFormData.CHEMO_DOCTOR),
      CHEMO_ENCODER: Number(doctorInfo),
    };

    try {
      const response = await fetch("http://localhost:8080/css/chemotherapy/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        toast({ title: "Chemotherapy information submitted successfully!" })
        console.log("Chemotherapy information submitted successfully!");
        setChemoFormData({
          PATIENT_ID: chemoFormData.PATIENT_ID,
          CHEMO_TYPE: "",
          CHEMO_PROTOCOL: "",
          CHEMO_INITIALDATE: "",
          CHEMO_ENDDATE: "",
          CHEMO_CYCLENUMBERGIVEN: "",
          CHEMO_STATUS: "",
          CHEMO_NOTES: "",
          CHEMO_ISCOMPLETED: "Yes",
          CHEMO_FACILITY: "",
          CHEMO_DOCTOR: "",
          CHEMO_ENCODER: 1,
        });
      } else {
        console.log("An error occurred in chemotherapy information submission.");
      }
    } catch (error) {
      console.error("Error submitting chemotherapy:", error);
    }
  };

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
      setTreatmentFormData({ ...treatmentFormData, TREATMENT_ENCODER: parsedUserData.doctorId })
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
    setTreatmentFormData({ ...treatmentFormData, PATIENT_ID: patientId.toString() })
    setFormData({ ...formData, lastname: lastname, patientId: patientId.toString(), email: email });
    setSurgeryFormData({ ...surgeryFormData, PATIENT_ID: patientId.toString() });
    setRadiationFormData({ ...radiationFormData, PATIENT_ID: patientId.toString() });
    setHormonalFormData({ ...hormonalFormData, patientId: patientId.toString() });
    setImmunorxFormData({ ...immunorxFormData, patientId: patientId.toString() })
    setChemoFormData({ ...chemoFormData, PATIENT_ID: patientId.toString() });
    setPatientSearchTerm(`${firstname} ${lastname} (${email})`);
    setPatientDropdownOpen(false);
  };
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          const apiUrl = `http://localhost:8080/css/patient/get/latest?doctorID=${parsedUserData.doctorId}`;

          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
          }

          const data = await response.json();

          const patientData = PatientSchema.parse(data);

          if (patientData) {
            setFormData({
              ...formData,
              lastname: patientData.user.userLastname,
              patientId: patientData.patientId.toString(),
              email: patientData.user.userEmail,
            });

            setPatientSearchTerm(
              `${patientData.user.userFirstname} ${patientData.user.userLastname} (${patientData.user.userEmail})`
            );
          }
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError("Failed to fetch patient details. Please try again.");
        console.log(error)
      }
    };

    fetchPatientDetails();
  }, [formData]);

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

  const { currentPage, handleNext, handleBack } = usePageStore();

  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:8080/css/hospital/all');
        const data: Hospital[] = await response.json();
        setHospitals(data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  const handleSurgeryChangeHospital = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSurgeryFormData({
      ...surgeryFormData,
      SURGERY_HOSPITAL: event.target.value,
    });
  };
  const handleradxChangeHospital = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRadiationFormData({
      ...radiationFormData,
      RADRX_FACILITY: event.target.value,
    });
  };
  const handleimuChangeHospital = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setImmunorxFormData({
      ...immunorxFormData,
      immunorxFacilityId: event.target.value,
    });
  };
  const handlechemoChangeHospital = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChemoFormData({
      ...chemoFormData,
      CHEMO_FACILITY: event.target.value,
    });
  };

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:8080/css/doctor/all');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSurgeryDoctor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSurgeryFormData({
      ...surgeryFormData,
      SURGERY_SURGEON: event.target.value,
    });
  };
  const handleradxDoctor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRadiationFormData({
      ...radiationFormData,
      RADRX_DOCTOR: event.target.value,
    });
  };
  const handleimuDoctor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setImmunorxFormData({
      ...immunorxFormData,
      immunorxDoctorId: event.target.value,
    });
  };
  const handlechemoDoctor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChemoFormData({
      ...chemoFormData,
      CHEMO_DOCTOR: event.target.value,
    });
  };
  const handlehormoDoctor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHormonalFormData({
      ...hormonalFormData,
      hormonalDoctorId: event.target.value,
    });
  };

  const renderPageTitle = () => {
    switch (currentPage) {
      case 1:
        return "TREATMENT HISTORY";
      case 2:
        return "SURGERY";
      case 3:
        return "RADIOTHERAPY";
      case 4:
        return "HORMONAL";
      case 5:
        return "IMMUNOTHERAPY";
      case 6:
        return "CHEMOTHERAPY";
      default:
        return "";
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <form className="h-[60vh] flex flex-col" onSubmit={handleTreatmentSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col w-full relative" ref={dropdownRefPatient}>
                <label htmlFor="lastname" className="text-sm font-semibold text-gray-700">Last Name</label>
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

              <div className="flex flex-col w-full rounded-md gap-6">
                <div className="flex gap-4">
                  <div className="flex flex-col w-full relative" ref={dropdownRefTreatment}>
                    <label className="text-sm font-semibold text-gray-700">Primary Treatment Type</label>
                    <input
                      required
                      type="text"
                      name="TREATMENT_PRIMARYRXTYPE"
                      value={treatmentFormData.TREATMENT_PRIMARYRXTYPE}
                      onClick={() => setTreatmentDropdownOpen(true)}
                      onChange={handleSearchChange}
                      className="mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-blue-500 text-gray-900"
                      placeholder="Select or search treatment type"
                    />
                    {treatmentDropdownOpen && (
                      <ul className="absolute z-10 top-16 bg-white border border-gray-300 w-full mt-1 hover:border-red-200 rounded shadow-lg max-h-40 overflow-y-auto">
                        {filteredTreatmentOptions.length > 0 ? (
                          filteredTreatmentOptions.map((option, index) => (
                            <li
                              key={index}
                              className="p-2 text-black hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleSelectTreatment(option)}
                            >
                              {option}
                            </li>
                          ))
                        ) : (
                          <li className="p-2 text-gray-500">No options found</li>
                        )}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-gray-700">Primary Treatment Name</label>
                    <input
                      required
                      type="text"
                      name="TREATMENT_PRIMARYRXNAME"
                      value={treatmentFormData.TREATMENT_PRIMARYRXNAME}
                      onChange={handleTreatmentChange}
                      className="mt-1 hover:border-red-200 p-2 border rounded text-sm text-gray-900"
                      placeholder="Enter primary RX name"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col w-full relative" ref={dropdownRefPurpose}>
                    <label className="text-sm font-semibold text-gray-700">Treatment Purpose</label>
                    <input
                      required
                      type="text"
                      name="TREATMENT_PURPOSE"
                      value={treatmentFormData.TREATMENT_PURPOSE}
                      onClick={() => setPurposeDropdownOpen(true)}
                      onChange={handlePurposeSearchChange}
                      className="mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-blue-500 text-gray-900"
                      placeholder="Select or search treatment purpose"
                    />
                    {purposeDropdownOpen && (
                      <ul className="absolute z-10 top-16 bg-white border border-gray-300 w-full mt-1 hover:border-red-200 rounded shadow-lg max-h-40 overflow-y-auto">
                        {filteredPurposeOptions.length > 0 ? (
                          filteredPurposeOptions.map((option, index) => (
                            <li
                              key={index}
                              className="p-2 text-black hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleSelectPurpose(option)}
                            >
                              {option}
                            </li>
                          ))
                        ) : (
                          <li className="p-2 text-gray-500">No options found</li>
                        )}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-gray-700">Treatment Plan</label>
                    <input
                      required
                      type="number"
                      name="TREATMENT_PLAN"
                      value={treatmentFormData.TREATMENT_PLAN}
                      onChange={handleTreatmentChange}
                      className="mt-1 hover:border-red-200 p-2 border rounded text-sm text-gray-900"
                      placeholder="Enter treatment plan"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-gray-700">Initial Treatment Date</label>
                    <input
                      required
                      type="date"
                      name="TREATMENT_INITIALRXDATE"
                      value={treatmentFormData.TREATMENT_INITIALRXDATE}
                      onChange={handleTreatmentChange}
                      className="mt-1 hover:border-red-200 p-2 border rounded text-sm text-gray-900"
                    />
                  </div>
                </div>

                <div className="relative" ref={dropdownRef}>
                  <label htmlFor="treatment_search" className="text-sm font-semibold text-gray-700">
                    Select Additional Treatments
                  </label>
                  <div className="flex flex-wrap border border-gray-300 rounded mt-1 hover:border-red-200 p-2">
                    {selectedTreatments.map((treatment) => (
                      <span
                        key={treatment.id}
                        className="bg-red-200 text-black px-2 py-1 rounded mr-2 flex items-center"
                      >
                        {treatment.name}
                        <button
                          className="ml-2 red-blue-600 hover:text-red-800"
                          onClick={() => handleRemoveTreatment(treatment.id)}
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      name="treatment_search"
                      placeholder="Select Treatment"
                      value={searchTerm}
                      onChange={handleMultipleSearchChange}
                      onClick={() => setDropdownOpen(true)}
                      className="border-0 outline-none flex-1 text-black"
                    />
                  </div>
                  {dropdownOpen && (
                    <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 hover:border-red-200 rounded shadow-lg max-h-40 overflow-y-auto">
                      {filteredTreatments.length > 0 ? (
                        filteredTreatments.map((treatment) => (
                          <li
                            key={treatment.id}
                            className="p-2 hover:bg-gray-200 text-black cursor-pointer"
                            onClick={() => handleMultipleSelectTreatment(treatment.id, treatment.name)}
                          >
                            {treatment.name}
                          </li>
                        ))
                      ) : (
                        <li className="p-2 text-gray-500">No treatments found</li>
                      )}
                    </ul>
                  )}
                </div>

                <div className="flex flex-col w-full max-h-[132px]">
                  <label className="text-sm font-semibold text-gray-700">Treatment Notes:</label>
                  <textarea
                    name="RXTYPE_NOTES"
                    value={treatmentFormData.RXTYPE_NOTES}
                    onChange={handleTreatmentChange}
                    className="mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black"
                    placeholder="Enter treatment notes"
                    rows={4}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center ">
              <button
                type="submit"
                className="mt-4 w-1/6 bg-red-900 text-white py-2 px-4 rounded-3xl hover:bg-red-800 transition-colors duration-300"
              >
                Submit Treatment
              </button>
            </div>
          </form>
        );

      case 2:
        return (
          <form className="h-[60vh] flex flex-col" onSubmit={handleSurgerySubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col w-full relative" ref={dropdownRefPatient}>
                <label htmlFor="lastname" className="text-sm font-semibold text-gray-700">Last Name</label>
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

              <div className="flex gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="surgerySurgeon" className="text-sm font-semibold text-gray-700">Surgeon ID</label>
                  <select
                    name="SURGERY_SURGEON"
                    value={surgeryFormData.SURGERY_SURGEON || ''}
                    onChange={handleSurgeryDoctor}
                    className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                  >
                    <option value="">Select a doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.doctorId} value={doctor.doctorId}>
                        {doctor.user.userFirstname} {doctor.user.userLastname} - {doctor.specialty.specialtyName} ({doctor.hospital.hospitalName})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="surgeryHospital" className="text-sm font-semibold text-gray-700">Hospital</label>
                  <select
                    name="SURGERY_HOSPITAL"
                    value={surgeryFormData.SURGERY_HOSPITAL}
                    onChange={handleSurgeryChangeHospital}
                    className="mt-1 h-10 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black"
                  >
                    <option value="">Select a hospital</option> {/* Optional placeholder */}
                    {hospitals.map((hospital) => (
                      <option key={hospital.hospitalId} value={hospital.hospitalId}>
                        {hospital.hospitalName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="surgeryOperation" className="text-sm font-semibold text-gray-700">Surgery Operation</label>
                  <input
                    type="text"
                    name="SURGERY_OPERATION"
                    value={surgeryFormData.SURGERY_OPERATION}
                    onChange={handleSurgeryChange}
                    className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Enter surgery operation"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="surgeryDate" className="text-sm font-semibold text-gray-700">Surgery Date</label>
                  <input
                    type="date"
                    name="SURGERY_DATE"
                    value={surgeryFormData.SURGERY_DATE}
                    onChange={handleSurgeryChange}
                    className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                  />
                </div>
              </div>

              <div className="flex flex-col w-full relative" ref={dropdownRefSurgeryIntent}>
                <label className="text-sm font-semibold text-gray-700">Surgery Intent</label>
                <input
                  type="text"
                  name="SURGERY_INTENT"
                  value={surgeryFormData.SURGERY_INTENT}
                  onClick={() => setSurgeryIntentDropdownOpen(true)}
                  onChange={handleSurgerySearchChange}
                  className="mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black"
                  placeholder="Select or search surgery intent"
                />
                {surgeryIntentDropdownOpen && (
                  <ul className="absolute z-10 top-16 bg-white border border-gray-300 w-full mt-1 hover:border-red-200 rounded shadow-lg max-h-40 overflow-y-auto">
                    {filteredSurgeryIntentOptions.length > 0 ? (
                      filteredSurgeryIntentOptions.map((option, index) => (
                        <li
                          key={index}
                          className="p-2 text-black hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSelectSurgeryIntent(option)}
                        >
                          {option}
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-gray-500">No options found</li>
                    )}
                  </ul>
                )}
              </div>

              <div className="flex flex-col w-full max-h-44">
                <label htmlFor="surgeryFindings" className="text-sm font-semibold text-gray-700">Surgery Findings</label>
                <textarea
                  name="SURGERY_FINDINGS"
                  value={surgeryFormData.SURGERY_FINDINGS}
                  onChange={handleSurgeryChange}
                  className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                  placeholder="Enter surgery findings"
                  rows={4}
                />
              </div>
            </div>
            <div className="flex w-full justify-center ">
              <button
                type="submit"
                className="mt-4 w-1/6 bg-red-900 text-white py-2 px-4 rounded-3xl hover:bg-red-800 transition-colors duration-300"
              >
                Submit Surgery
              </button>
            </div>
          </form>
        );

      case 3:
        return (
          <form onSubmit={handleRadxSubmit} className="h-[60vh] flex flex-col ">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col w-full relative" ref={dropdownRefPatient}>
                <label htmlFor="lastname" className="text-sm font-semibold text-gray-700">Last Name</label>
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

              <div className="flex gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="RADRX_DOCTOR" className="text-sm font-semibold text-gray-700">Doctor</label>
                  <select
                    name="RADRX_DOCTOR"
                    value={radiationFormData.RADRX_DOCTOR || ''}
                    onChange={handleradxDoctor}
                    className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                  >
                    <option value="">Select a doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.doctorId} value={doctor.doctorId}>
                        {doctor.user.userFirstname} {doctor.user.userLastname} - {doctor.specialty.specialtyName} ({doctor.hospital.hospitalName})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="RADRX_FACILITY" className="text-sm font-semibold text-gray-700">Facility</label>
                  <select
                    name="RADRX_FACILITY"
                    value={radiationFormData.RADRX_FACILITY}
                    onChange={handleradxChangeHospital}
                    className="mt-1 h-10 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black"
                  >
                    <option value="">Select a hospital</option> {/* Optional placeholder */}
                    {hospitals.map((hospital) => (
                      <option key={hospital.hospitalId} value={hospital.hospitalId}>
                        {hospital.hospitalName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="RADRX_TYPE" className="text-sm font-semibold text-gray-700">RADRX Type</label>
                  <input
                    type="number"
                    name="RADRX_TYPE"
                    value={radiationFormData.RADRX_TYPE}
                    onChange={handleRadiationChange}
                    className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Enter radiation type"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="RADRX_INITIALDATE" className="text-sm font-semibold text-gray-700">Initial Date</label>
                  <input
                    type="date"
                    name="RADRX_INITIALDATE"
                    value={radiationFormData.RADRX_INITIALDATE}
                    onChange={handleRadiationChange}
                    className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="RADRX_LASTDATE" className="text-sm font-semibold text-gray-700">Last Date</label>
                  <input
                    type="date"
                    name="RADRX_LASTDATE"
                    value={radiationFormData.RADRX_LASTDATE}
                    onChange={handleRadiationChange}
                    className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="RADRX_DOSE" className="text-sm font-semibold text-gray-700">Dose</label>
                  <input
                    type="number"
                    name="RADRX_DOSE"
                    value={radiationFormData.RADRX_DOSE}
                    onChange={handleRadiationChange}
                    className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Enter dose"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="RADRX_BODYSITE" className="text-sm font-semibold text-gray-700">Body Site</label>
                  <input
                    type="text"
                    name="RADRX_BODYSITE"
                    value={radiationFormData.RADRX_BODYSITE}
                    onChange={handleRadiationChange}
                    className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Enter body site"
                  />
                </div>

                <div className="flex flex-col w-full relative" ref={dropdownRadRefStatus}>
                  <label htmlFor="RADRX_STATUS" className="text-sm font-semibold text-gray-700">Status</label>
                  <input
                    type="text"
                    name="RADRX_STATUS"
                    value={selectedStatus}
                    onClick={() => setStatusDropdownOpen(true)}
                    readOnly
                    className="mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black cursor-pointer"
                    placeholder="Select status"
                  />
                  {statusDropdownOpen && (
                    <ul className="absolute z-10 top-16 bg-white border border-gray-300 w-full mt-1 hover:border-red-200 rounded shadow-lg max-h-40 overflow-y-auto">
                      {statusOptions.map(status => (
                        <li
                          key={status}
                          className="p-2 text-black hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSelectStatus(status)}
                        >
                          {status}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-col w-1/4">
                  <label htmlFor="RADRX_ISCOMPLETED" className="text-sm font-semibold text-gray-700">
                    Is Completed
                  </label>
                  <div className="mt-3 flex items-center space-x-4">
                    <label className="flex items-center text-black">
                      <input
                        type="radio"
                        name="RADRX_ISCOMPLETED"
                        value="Y"
                        checked={radiationFormData.RADRX_ISCOMPLETED === 'Y'}
                        onChange={handleRadiationChange}
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center text-black">
                      <input
                        type="radio"
                        name="RADRX_ISCOMPLETED"
                        value="N"
                        checked={radiationFormData.RADRX_ISCOMPLETED === 'N'}
                        onChange={handleRadiationChange}
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center ">
              <button
                type="submit"
                className="mt-4 w-48 bg-red-900 text-white py-2 px-4 rounded-3xl hover:bg-red-800 transition-colors duration-300"
              >
                Submit Radiotherapy
              </button>
            </div>
          </form>
        );

      case 4:
        return (
          <form className="h-[60vh] flex flex-col " onSubmit={handleHormonalSubmit}>
            <div className="">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col w-full relative" ref={dropdownRefPatient}>
                  <label htmlFor="lastname" className="text-sm font-semibold text-gray-700">Last Name</label>
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

                <div className="flex flex-col w-full">
                  <label htmlFor="hormonalDoctorId" className="text-sm font-semibold text-gray-700">Doctor</label>
                  <select
                    name="hormonalDoctorId"
                    value={hormonalFormData.hormonalDoctorId || ''}
                    onChange={handlehormoDoctor}
                    className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                  >
                    <option value="">Select a doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.doctorId} value={doctor.doctorId}>
                        {doctor.user.userFirstname} {doctor.user.userLastname} - {doctor.specialty.specialtyName} ({doctor.hospital.hospitalName})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="hormonalDrug" className="text-sm font-semibold text-gray-700">Hormonal Drug</label>
                    <input
                      type="text"
                      name="hormonalDrug"
                      value={hormonalFormData.hormonalDrug}
                      onChange={handleHormonalChange}
                      className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                      placeholder="Enter hormonal drug"
                    />
                  </div>

                  <div className="flex flex-col w-2/12">
                    <label htmlFor="hormonalDose" className="text-sm font-semibold text-gray-700">Hormonal Dose</label>
                    <input
                      type="number"
                      name="hormonalDose"
                      value={hormonalFormData.hormonalDose}
                      onChange={handleHormonalChange}
                      className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                      placeholder="Enter dosage"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label htmlFor="hormonalInitialDate" className="text-sm font-semibold text-gray-700">Initial Date</label>
                    <input
                      type="date"
                      name="hormonalInitialDate"
                      value={hormonalFormData.hormonalInitialDate}
                      onChange={handleHormonalChange}
                      className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label htmlFor="hormonalEndDate" className="text-sm font-semibold text-gray-700">End Date</label>
                    <input
                      type="date"
                      name="hormonalEndDate"
                      value={hormonalFormData.hormonalEndDate}
                      onChange={handleHormonalChange}
                      className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full relative" ref={dropdownHormonalRefStatus}>
                  <label htmlFor="hormonalStatus" className="text-sm font-semibold text-gray-700">Status</label>
                  <input
                    type="text"
                    name="hormonalStatus"
                    value={selectedHormonalStatus}
                    onClick={() => setStatusDropdownOpenHormonal(true)}
                    readOnly
                    className="mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black cursor-pointer"
                    placeholder="Select status"
                  />
                  {statusDropdownOpenHormonal && (
                    <ul className="absolute z-10 top-16 bg-white border border-gray-300 w-full mt-1 hover:border-red-200 rounded shadow-lg max-h-40 overflow-y-auto">
                      {statusOptions.map(status => (
                        <li
                          key={status}
                          className="p-2 text-black hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSelectHormonalStatus(status)}
                        >
                          {status}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="hormonalRxNotes" className="text-sm font-semibold text-gray-700">RX Notes</label>
                  <textarea
                    name="hormonalRxNotes"
                    value={hormonalFormData.hormonalRxNotes}
                    onChange={handleHormonalChange}
                    className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Enter RX notes"
                    rows={4}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center ">
              <button
                type="submit"
                className="mt-4 w-1/6 bg-red-900 text-white py-2 px-4 rounded-3xl hover:bg-red-800 transition-colors duration-300"
              >
                Submit Hormonal
              </button>
            </div>
          </form>
        );

      case 5:
        return (
          <form onSubmit={handleImmunoSubmit} className="h-[60vh] flex flex-col ">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col w-full relative" ref={dropdownRefPatient}>
                <label htmlFor="lastname" className="text-sm font-semibold text-gray-700">Last Name</label>
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

              <div className="flex gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="immunorxDoctorId" className="text-sm font-semibold text-gray-700">Doctor</label>
                  <select
                    name="immunorxDoctorId"
                    value={immunorxFormData.immunorxDoctorId || ''}
                    onChange={handleimuDoctor}
                    className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                  >
                    <option value="">Select a doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.doctorId} value={doctor.doctorId}>
                        {doctor.user.userFirstname} {doctor.user.userLastname} - {doctor.specialty.specialtyName} ({doctor.hospital.hospitalName})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="immunorxFacilityId" className="text-sm font-semibold text-gray-700">Facility</label>
                  <select
                    name="immunorxFacilityId"
                    value={immunorxFormData.immunorxFacilityId}
                    onChange={handleimuChangeHospital}
                    className="mt-1 h-10 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black"
                  >
                    <option value="">Select a hospital</option> {/* Optional placeholder */}
                    {hospitals.map((hospital) => (
                      <option key={hospital.hospitalId} value={hospital.hospitalId}>
                        {hospital.hospitalName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="immunorxDrug" className="text-sm font-semibold text-gray-700">Immunotherapy Drug</label>
                  <input
                    type="text"
                    name="immunorxDrug"
                    value={immunorxFormData.immunorxDrug}
                    onChange={handleImmunorxChange}
                    className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Enter immunotherapy drug"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="immunorxInitialDate" className="text-sm font-semibold text-gray-700">Initial Date</label>
                  <input
                    type="date"
                    name="immunorxInitialDate"
                    value={immunorxFormData.immunorxInitialDate}
                    onChange={handleImmunorxChange}
                    className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="immunorxEndDate" className="text-sm font-semibold text-gray-700">End Date</label>
                  <input
                    type="date"
                    name="immunorxEndDate"
                    value={immunorxFormData.immunorxEndDate}
                    onChange={handleImmunorxChange}
                    className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col w-full relative" ref={dropdownRefImmunoRx}>
                  <label htmlFor="immunorxStatus" className="text-sm font-semibold text-gray-700">Status</label>
                  <input
                    type="text"
                    name="immunorxStatus"
                    value={selectedImmunoRxStatus}
                    onClick={() => setImmunoRxDropdownOpen(true)}
                    readOnly
                    className="mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black cursor-pointer"
                    placeholder="Select treatment status"
                  />
                  {immunoRxDropdownOpen && (
                    <ul className="absolute z-10 top-16 bg-white border border-gray-300 w-full mt-1 hover:border-red-200 rounded shadow-lg max-h-40 overflow-y-auto">
                      {immunoRxStatusOptions.map(status => (
                        <li
                          key={status}
                          className="p-2 text-black hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSelectImmunoRxStatus(status)}
                        >
                          {status}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="immunorxIsCompleted" className="text-sm font-semibold text-gray-700">Is Completed</label>
                  <select
                    name="immunorxIsCompleted"
                    value={immunorxFormData.immunorxIsCompleted}
                    onChange={handleImmunorxChange}
                    className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                  >
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col w-full max-h-[132px]">
                <label htmlFor="immunorxNotes" className="text-sm font-semibold text-gray-700">Notes</label>
                <textarea
                  name="immunorxNotes"
                  value={immunorxFormData.immunorxNotes}
                  onChange={handleImmunorxChange}
                  className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                  placeholder="Enter additional notes"
                  rows={4}
                />
              </div>
            </div>
            <div className="flex w-full justify-center ">
              <button
                type="submit"
                className="mt-4 w-52 bg-red-900 text-white py-2 px-4 rounded-3xl hover:bg-red-800 transition-colors duration-300"
              >
                Submit Immunotherapy
              </button>
            </div>
          </form>
        );

      case 6:
        return (
          <form onSubmit={handleChemoSubmit} className="h-[60vh] flex flex-col ">
            <div className="">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col w-full relative" ref={dropdownRefPatient}>
                  <label htmlFor="lastname" className="text-sm font-semibold text-gray-700">Last Name</label>
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

                <div className="flex gap-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="chemoDoctor" className="text-sm font-semibold text-gray-700">Doctor</label>
                    <select
                      name="CHEMO_DOCTOR"
                      value={chemoFormData.CHEMO_DOCTOR || ''}
                      onChange={handlechemoDoctor}
                      className="h-10 mt-1 p-2 border border-gray-200 rounded focus:outline-none focus:border-red-500 text-black"
                    >
                      <option value="">Select a doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.doctorId} value={doctor.doctorId}>
                          {doctor.user.userFirstname} {doctor.user.userLastname} - {doctor.specialty.specialtyName} ({doctor.hospital.hospitalName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col w-full">
                    <label htmlFor="chemoFacility" className="text-sm font-semibold text-gray-700">Facility</label>
                    <select
                      name="CHEMO_FACILITY"
                      value={chemoFormData.CHEMO_FACILITY}
                      onChange={handlechemoChangeHospital}
                      className="mt-1 h-10 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black"
                    >
                      <option value="">Select a hospital</option> {/* Optional placeholder */}
                      {hospitals.map((hospital) => (
                        <option key={hospital.hospitalId} value={hospital.hospitalId}>
                          {hospital.hospitalName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col w-full relative" ref={dropdownRefChemoType}>
                    <label htmlFor="chemoType" className="text-sm font-semibold text-gray-700">Chemotherapy Type</label>
                    <input
                      type="text"
                      name="CHEMO_TYPE"
                      value={selectedChemoType}
                      onClick={() => setChemoTypeDropdownOpen(true)}
                      readOnly
                      className="mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black cursor-pointer"
                      placeholder="Select chemotherapy type"
                    />
                    {chemoTypeDropdownOpen && (
                      <ul className="absolute z-10 top-16 bg-white border border-gray-300 w-full mt-1 hover:border-red-200 rounded shadow-lg max-h-40 overflow-y-auto">
                        {chemoTypeOptions.map(type => (
                          <li
                            key={type}
                            className="p-2 text-black hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectChemoType(type)}
                          >
                            {type}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <label htmlFor="chemoProtocol" className="text-sm font-semibold text-gray-700">Chemotherapy Protocol</label>
                    <input
                      type="number"
                      name="CHEMO_PROTOCOL"
                      value={chemoFormData.CHEMO_PROTOCOL}
                      onChange={handleChemoChange}
                      className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                      placeholder="Enter chemotherapy protocol"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="chemoCycleNumberGiven" className="text-sm font-semibold text-gray-700">Cycle Number Given</label>
                    <input
                      type="number"
                      name="CHEMO_CYCLENUMBERGIVEN"
                      value={chemoFormData.CHEMO_CYCLENUMBERGIVEN}
                      onChange={handleChemoChange}
                      className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                      placeholder="Enter number of cycles given"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label htmlFor="chemoInitialDate" className="text-sm font-semibold text-gray-700">Initial Date</label>
                    <input
                      type="date"
                      name="CHEMO_INITIALDATE"
                      value={chemoFormData.CHEMO_INITIALDATE}
                      onChange={handleChemoChange}
                      className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label htmlFor="chemoEndDate" className="text-sm font-semibold text-gray-700">End Date</label>
                    <input
                      type="date"
                      name="CHEMO_ENDDATE"
                      value={chemoFormData.CHEMO_ENDDATE}
                      onChange={handleChemoChange}
                      className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col w-full relative" ref={dropdownRefChemoStatus}>
                    <label htmlFor="chemoStatus" className="text-sm font-semibold text-gray-700">Status</label>
                    <input
                      type="text"
                      name="CHEMO_STATUS"
                      value={selectedChemoStatus}
                      onClick={() => setChemoStatusDropdownOpen(true)}
                      readOnly
                      className="mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black cursor-pointer"
                      placeholder="Select current status"
                    />
                    {chemoStatusDropdownOpen && (
                      <ul className="absolute z-10 top-16 bg-white border border-gray-300 w-full mt-1 hover:border-red-200 rounded shadow-lg max-h-40 overflow-y-auto">
                        {chemoStatusOptions.map(status => (
                          <li
                            key={status}
                            className="p-2 text-black hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectChemoStatus(status)}
                          >
                            {status}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <label htmlFor="chemoIsCompleted" className="text-sm font-semibold text-gray-700">Is Completed?</label>
                    <select
                      name="CHEMO_ISCOMPLETED"
                      value={chemoFormData.CHEMO_ISCOMPLETED}
                      onChange={handleChemoChange}
                      className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                    >
                      <option value="Y">Yes</option>
                      <option value="N">No</option>
                    </select>
                  </div>

                </div>
                <div className="flex flex-col w-full max-h-[132px]">
                  <label htmlFor="chemoNotes" className="text-sm font-semibold text-gray-700">Notes</label>
                  <textarea
                    name="CHEMO_NOTES"
                    value={chemoFormData.CHEMO_NOTES}
                    onChange={handleChemoChange}
                    className={`mt-1 hover:border-red-200 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Enter notes about the chemotherapy"
                    rows={4}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center ">
              <button
                type="submit"
                className="mt-4 w-48 bg-red-900 text-white py-2 px-4 rounded-3xl hover:bg-red-800 transition-colors duration-300"
              >
                Submit Chemotherapy
              </button>
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-5/6 flex flex-col items-center justify-start gap-4">
      <div className="flex w-4/6 justify-between items-center h-20 p-2 text-center mt-12">
        <button
          type="button"
          onClick={handleBack}
          className={`hover:bg-red-900 rounded-3xl flex items-center transition-colors duration-300 hover:text-white font-semibold text-zinc-400 p-2 px-4 gap-2 text-sm ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={currentPage === 1}
        >
          <ChevronLeft /> Back
        </button>
        <p className="font-bold text-6xl text-red-900 text-nowrap	tracking-wide">{renderPageTitle()}</p>
        <button
          type="button"
          onClick={handleNext}
          className={`hover:bg-red-900 rounded-3xl flex items-center transition-colors duration-300 hover:text-white font-semibold text-zinc-400 p-2 px-4 gap-2 text-sm ${currentPage === 6 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={currentPage === 6}
        >
          Next <ChevronRight />
        </button>
      </div>

      <div className="w-full p-4 flex justify-center items-center">
        <div className="gap-4 w-full max-w-5xl">
          {renderPageContent()}
        </div>
      </div>
    </div>
  );
};

export default TreatmentHistoryForm;
