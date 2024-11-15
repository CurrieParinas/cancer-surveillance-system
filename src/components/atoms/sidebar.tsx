"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { Bell, CircleUserIcon, ContactRound, LayoutDashboard, LogOut, Mail, Microscope, Pill, Search, Stethoscope, Syringe } from 'lucide-react'
import { PatientsResponseSchema } from '@/packages/api/patient-list'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FilteredPatient {
    patientId: number;
    userFirstname: string;
    userLastname: string;
    userEmail: string;
}

interface Treatment {
    treatmentPrimaryRxType: string;
    treatmentPrimaryRxName: string;
    treatmentInitialRxDate: string;
    treatmentPurpose: string;
    treatmentPlan: {
        rxtypeId: number;
        rxtypeSurgery: string;
        rxtypeChemotherapy: string;
        rxtypeRadiotherapy: string;
        rxtypeImmunotherapy: string;
        rxtypeHormonalTherapy: string;
        rxtypeOthers: string;
        rxtypeNotes: string;
        createdOn: string | null;
        updatedOn: string | null;
    };
}

export const Sidebar = () => {
    const [doctorInfo, setDoctorInfo] = useState({
        userFirstname: '',
        userLastname: '',
        departmentName: '',
        hospitalName: '',
    });

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUserData = JSON.parse(userData);

            // Ensure the structure matches your API response
            setDoctorInfo({
                userFirstname: parsedUserData.user.userFirstname,
                userLastname: parsedUserData.user.userLastname,
                departmentName: parsedUserData.department.departmentName,
                hospitalName: parsedUserData.hospital.hospitalName,
            });
        }
    }, []);


    return (
        <div className='flex flex-col w-1/6 h-screen px-6 bg-red-900 py-4 sticky top-0 gap-6'>
            <div className=''>
                <Label className='text-3xl font-extralight'>Welcome,</Label>
            </div>
            <div className='flex justify-center -my-3'>
                <CircleUserIcon size={130} strokeWidth={1} />
            </div>
            <div className='pl-4 flex flex-col'>
                <Label className='text-2xl font-[700]'>
                    Dr. {doctorInfo.userFirstname} {doctorInfo.userLastname}
                </Label>
                <Label className='text-xl font-thin'>{doctorInfo.departmentName}</Label>
                <Label className='text-xl font-thin'>{doctorInfo.hospitalName}</Label>
            </div>
            <Separator />
            <DoctorSidebar />
        </div>
    );
};

interface SurgeryData {
    surgeryOperation: string;
    surgeryDate: string;
    surgeryFindings: string;
    surgeryIntent: string;
    surgerySurgeon: {
        doctorId: number;
        user: {
            userId: number;
            userLastname: string;
            userFirstname: string;
            userMiddlename: string;
        };
        hospital: {
            hospitalId: number;
            hospitalName: string;
        };
        department: {
            departmentId: number;
            departmentName: string;
        };
        specialty: {
            specialtyID: number;
            specialtyName: string;
            specialtyDescription: string;
        };
    };
    surgeryHospital: {
        hospitalId: number;
        hospitalName: string;
    };
}

type RadiotherapyData = {
    radRxDoctor: {
        doctorId: number;
        user: {
            userId: number;
            userLastname: string;
            userFirstname: string;
            userMiddlename: string;
        };
        hospital: {
            hospitalId: number;
            hospitalName: string;
        };
        department: {
            departmentId: number;
            departmentName: string;
        };
        specialty: {
            specialtyID: number;
            specialtyName: string;
            specialtyDescription: string;
        };
    };
    radRxType: {
        radDetailsId: number;
        radDetailsProcedure: string;
    };
    radRxInitialDate: string;
    radRxLastDate: string;
    radRxDose: number;
    radRxBodySite: string;
    radRxStatus: string;
    radRxIsCompleted: string;
    radRxFacility: {
        hospitalId: number;
        hospitalName: string;
    };
};

interface HormonalDoctor {
    doctorId: number;
    user: {
        userId: number;
        userLastname: string;
        userFirstname: string;
        userMiddlename: string;
    };
    hospital: {
        hospitalId: number;
        hospitalName: string;
    };
    department: {
        departmentId: number;
        departmentName: string;
    };
    specialty: {
        specialtyID: number;
        specialtyName: string;
        specialtyDescription: string;
    };
}

interface HormonalData {
    hormonalDrug: string;
    hormonalDose: number;
    hormonalInitialdate: string;
    hormonalEnddate: string;
    hormonalStatus: string;
    hormonalRxNotes: string;
    hormonalDoctor: HormonalDoctor;
}

interface ImmunotherapyData {
    immunorxDrug: string;
    immunorxInitialdate: string;
    immunorxEnddate: string;
    immunorxStatus: string;
    immunorxNotes: string;
    immunorxIscompleted: string;
    immunorxFacility: {
        hospitalId: number;
        hospitalName: string;
    };
    immunorxDoctor: {
        doctorId: number;
        user: {
            userId: number;
            userLastname: string;
            userFirstname: string;
            userMiddlename: string;
        };
        hospital: {
            hospitalId: number;
            hospitalName: string;
        };
        department: {
            departmentId: number;
            departmentName: string;
        };
        specialty: {
            specialtyID: number;
            specialtyName: string;
            specialtyDescription: string;
        };
    };
}

interface ChemoDoctor {
    doctorId: number;
    user: {
        userId: number;
        userLastname: string;
        userFirstname: string;
        userMiddlename: string;
    };
    hospital: {
        hospitalId: number;
        hospitalName: string;
    };
    department: {
        departmentId: number;
        departmentName: string;
    };
    specialty: {
        specialtyID: number;
        specialtyName: string;
        specialtyDescription: string;
    };
}

interface ChemoProtocol {
    chemoProtocolId: number;
    chemoDrugs: string;
    chemoDosage: number;
    chemoNoCycle: number;
    chemoDiluent: string;
}

interface ChemoFacility {
    hospitalId: number;
    hospitalName: string;
}

interface ChemotherapyData {
    chemoType: string;
    chemoProtocol: ChemoProtocol;
    chemoInitialDate: string;
    chemoEndDate: string;
    chemoCycleNumberGiven: number;
    chemoStatus: string;
    chemoNotes: string;
    chemoIsCompleted: string;
    chemoFacility: ChemoFacility;
    chemoDoctor: ChemoDoctor;
}

export const DoctorSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navigateTo = (route: string) => {
        router.push(route);
    };

    const isActive = (route: string) => pathname === route;

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
        window.location.href = "/";
    };

    const [patientSearchTerm, setPatientSearchTerm] = useState("");
    const [patientDropdownOpen, setPatientDropdownOpen] = useState(false);
    const [filteredPatients, setFilteredPatients] = useState<FilteredPatient[]>([]);
    const [allPatients, setAllPatients] = useState<FilteredPatient[]>([]);
    const [doctorInfo, setDoctorInfo] = useState("");

    const dropdownRefPatient = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
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
            setFilteredPatients(allPatients);
        } else {
            const filtered = allPatients.filter((patient) =>
                patient.userLastname.toLowerCase().includes(search)
            );
            setFilteredPatients(filtered);
        }
    };

    const handleSelectPatient = async (
        patientId: number,
        firstname: string,
        lastname: string,
        email: string
    ) => {
        setPatientSearchTerm(`${firstname} ${lastname}`);
        setPatientDropdownOpen(false);
        setSelectedUserId(patientId);
        await fetchTreatmentData(patientId);
        await fetchSurgeryData(patientId);
        await fetchRadiotherapyData(patientId);
        await fetchHormonalData(patientId);
        await fetchImmunotherapyData(patientId);
        await fetchChemotherapyData(patientId);
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
                const userData = localStorage.getItem("user");
                if (userData) {
                    const parsedUserData = JSON.parse(userData);
                    const response = await fetch(
                        `http://localhost:8080/css/onboard/getPatientsByDoctor/${parsedUserData.doctorId}`
                    );
                    const data = await response.json();
                    const parsedData = PatientsResponseSchema.parse(data);

                    const patients = parsedData.map((relation) => ({
                        patientId: relation.patient.patientId,
                        userFirstname: relation.patient.user.userFirstname,
                        userLastname: relation.patient.user.userLastname,
                        userEmail: relation.patient.user.userEmail,
                    }));

                    setAllPatients(patients);
                    setFilteredPatients(patients);
                }
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchPatients();
    }, []);

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const handleSearchIconClick = (patientId: number) => {
        setSelectedUserId(patientId);
        setPatientDropdownOpen(false);
    };

    // treatment fetch

    const [treatmentData, setTreatmentData] = useState<Treatment | null>(null);

    const fetchTreatmentData = async (patientId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/css/treatment/findbypatient/latest?patientID=${patientId}`);

            if (!response.ok) {
                throw new Error("Failed to fetch treatment data");
            }

            const data = await response.json();

            // Check if data is empty or missing expected fields
            if (Object.keys(data).length === 0 || !data.treatmentPrimaryRxType) {
                setTreatmentData(null);
            } else {
                setTreatmentData({
                    treatmentPrimaryRxType: data.treatmentPrimaryRxType,
                    treatmentPrimaryRxName: data.treatmentPrimaryRxName,
                    treatmentInitialRxDate: data.treatmentInitialRxDate,
                    treatmentPurpose: data.treatmentPurpose,
                    treatmentPlan: data.treatmentPlan,
                });
            }
        } catch (error) {
            console.error("Error fetching treatment data:", error);
            setTreatmentData(null);
        }
    };

    // surgery fetch

    const [surgeryData, setSurgeryData] = useState<SurgeryData | null>(null);

    const fetchSurgeryData = async (patientId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/css/surgery/findbypatient/latest?patientID=${patientId}`);

            if (!response.ok) {
                throw new Error("Failed to fetch surgery data");
            }

            const data = await response.json();

            // Check if data is empty or missing expected fields
            if (Object.keys(data).length === 0 || !data.surgeryOperation) {
                setSurgeryData(null);
            } else {
                setSurgeryData({
                    surgeryOperation: data.surgeryOperation,
                    surgeryDate: data.surgeryDate,
                    surgeryFindings: data.surgeryFindings,
                    surgeryIntent: data.surgeryIntent,
                    surgerySurgeon: {
                        doctorId: data.surgerySurgeon.doctorId,
                        user: {
                            userId: data.surgerySurgeon.user.userId,
                            userLastname: data.surgerySurgeon.user.userLastname,
                            userFirstname: data.surgerySurgeon.user.userFirstname,
                            userMiddlename: data.surgerySurgeon.user.userMiddlename,
                        },
                        hospital: {
                            hospitalId: data.surgerySurgeon.hospital.hospitalId,
                            hospitalName: data.surgerySurgeon.hospital.hospitalName,
                        },
                        department: {
                            departmentId: data.surgerySurgeon.department.departmentId,
                            departmentName: data.surgerySurgeon.department.departmentName,
                        },
                        specialty: {
                            specialtyID: data.surgerySurgeon.specialty.specialtyID,
                            specialtyName: data.surgerySurgeon.specialty.specialtyName,
                            specialtyDescription: data.surgerySurgeon.specialty.specialtyDescription,
                        },
                    },
                    surgeryHospital: {
                        hospitalId: data.surgeryHospital.hospitalId,
                        hospitalName: data.surgeryHospital.hospitalName,
                    },
                });
            }
        } catch (error) {
            console.error("Error fetching surgery data:", error);
            setSurgeryData(null);
        }
    };

    // radio fetch

    const [radiotherapyData, setRadiotherapyData] = useState<RadiotherapyData | null>(null);

    const fetchRadiotherapyData = async (patientId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/css/radiotherapy/findbypatient/latest?patientID=${patientId}`);

            if (!response.ok) {
                throw new Error("Failed to fetch radiotherapy data");
            }

            const data = await response.json();

            // Check if data is empty or missing expected fields
            if (Object.keys(data).length === 0 || !data.radRxDoctor) {
                setRadiotherapyData(null);
            } else {
                setRadiotherapyData({
                    radRxDoctor: {
                        doctorId: data.radRxDoctor.doctorId,
                        user: {
                            userId: data.radRxDoctor.user.userId,
                            userLastname: data.radRxDoctor.user.userLastname,
                            userFirstname: data.radRxDoctor.user.userFirstname,
                            userMiddlename: data.radRxDoctor.user.userMiddlename,
                        },
                        hospital: {
                            hospitalId: data.radRxDoctor.hospital.hospitalId,
                            hospitalName: data.radRxDoctor.hospital.hospitalName,
                        },
                        department: {
                            departmentId: data.radRxDoctor.department.departmentId,
                            departmentName: data.radRxDoctor.department.departmentName,
                        },
                        specialty: {
                            specialtyID: data.radRxDoctor.specialty.specialtyID,
                            specialtyName: data.radRxDoctor.specialty.specialtyName,
                            specialtyDescription: data.radRxDoctor.specialty.specialtyDescription,
                        },
                    },
                    radRxType: {
                        radDetailsId: data.radRxType.radDetailsId,
                        radDetailsProcedure: data.radRxType.radDetailsProcedure,
                    },
                    radRxInitialDate: data.radRxInitialDate,
                    radRxLastDate: data.radRxLastDate,
                    radRxDose: data.radRxDose,
                    radRxBodySite: data.radRxBodySite,
                    radRxStatus: data.radRxStatus,
                    radRxIsCompleted: data.radRxIsCompleted,
                    radRxFacility: {
                        hospitalId: data.radRxFacility.hospitalId,
                        hospitalName: data.radRxFacility.hospitalName,
                    },
                });
            }
        } catch (error) {
            console.error("Error fetching radiotherapy data:", error);
            setRadiotherapyData(null);
        }
    };

    //hormonal fetch

    const [hormonalData, setHormonalData] = useState<HormonalData | null>(null);

    const fetchHormonalData = async (patientId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/css/hormonal/findbypatient/latest?patientID=${patientId}`);

            if (!response.ok) {
                throw new Error("Failed to fetch hormonal data");
            }

            const data = await response.json();

            // Check if data is empty or missing expected fields
            if (Object.keys(data).length === 0 || !data.hormonalDrug) {
                setHormonalData(null);
            } else {
                setHormonalData({
                    hormonalDrug: data.hormonalDrug,
                    hormonalDose: data.hormonalDose,
                    hormonalInitialdate: data.hormonalInitialdate,
                    hormonalEnddate: data.hormonalEnddate,
                    hormonalStatus: data.hormonalStatus,
                    hormonalRxNotes: data.hormonalRxNotes,
                    hormonalDoctor: {
                        doctorId: data.hormonalDoctor.doctorId,
                        user: {
                            userId: data.hormonalDoctor.user.userId,
                            userLastname: data.hormonalDoctor.user.userLastname,
                            userFirstname: data.hormonalDoctor.user.userFirstname,
                            userMiddlename: data.hormonalDoctor.user.userMiddlename,
                        },
                        hospital: {
                            hospitalId: data.hormonalDoctor.hospital.hospitalId,
                            hospitalName: data.hormonalDoctor.hospital.hospitalName,
                        },
                        department: {
                            departmentId: data.hormonalDoctor.department.departmentId,
                            departmentName: data.hormonalDoctor.department.departmentName,
                        },
                        specialty: {
                            specialtyID: data.hormonalDoctor.specialty.specialtyID,
                            specialtyName: data.hormonalDoctor.specialty.specialtyName,
                            specialtyDescription: data.hormonalDoctor.specialty.specialtyDescription,
                        },
                    },
                });
            }
        } catch (error) {
            console.error("Error fetching hormonal data:", error);
            setHormonalData(null);
        }
    };

    // immuno fetch

    const [immunotherapyData, setImmunotherapyData] = useState<ImmunotherapyData | null>(null);

    const fetchImmunotherapyData = async (patientId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/css/immunotherapy/findbypatient/latest?patientID=${patientId}`);

            if (!response.ok) {
                throw new Error("Failed to fetch immunotherapy data");
            }

            const data = await response.json();

            // Check if data is empty or missing expected fields
            if (Object.keys(data).length === 0 || !data.immunorxDrug) {
                setImmunotherapyData(null);
            } else {
                setImmunotherapyData({
                    immunorxDrug: data.immunorxDrug,
                    immunorxInitialdate: data.immunorxInitialdate,
                    immunorxEnddate: data.immunorxEnddate,
                    immunorxStatus: data.immunorxStatus,
                    immunorxNotes: data.immunorxNotes,
                    immunorxIscompleted: data.immunorxIscompleted,
                    immunorxFacility: {
                        hospitalId: data.immunorxFacility.hospitalId,
                        hospitalName: data.immunorxFacility.hospitalName,
                    },
                    immunorxDoctor: {
                        doctorId: data.immunorxDoctor.doctorId,
                        user: {
                            userId: data.immunorxDoctor.user.userId,
                            userLastname: data.immunorxDoctor.user.userLastname,
                            userFirstname: data.immunorxDoctor.user.userFirstname,
                            userMiddlename: data.immunorxDoctor.user.userMiddlename,
                        },
                        hospital: {
                            hospitalId: data.immunorxDoctor.hospital.hospitalId,
                            hospitalName: data.immunorxDoctor.hospital.hospitalName,
                        },
                        department: {
                            departmentId: data.immunorxDoctor.department.departmentId,
                            departmentName: data.immunorxDoctor.department.departmentName,
                        },
                        specialty: {
                            specialtyID: data.immunorxDoctor.specialty.specialtyID,
                            specialtyName: data.immunorxDoctor.specialty.specialtyName,
                            specialtyDescription: data.immunorxDoctor.specialty.specialtyDescription,
                        },
                    },
                });
            }
        } catch (error) {
            console.error("Error fetching immunotherapy data:", error);
            setImmunotherapyData(null);
        }
    };

    // chemo fetch
    const [chemotherapyData, setChemotherapyData] = useState<ChemotherapyData | null>(null);

    const fetchChemotherapyData = async (patientId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/css/chemotherapy/findbypatient/latest?patientID=${patientId}`);

            if (!response.ok) {
                throw new Error("Failed to fetch chemotherapy data");
            }

            const data = await response.json();

            // Check if data is empty or missing expected fields
            if (Object.keys(data).length === 0 || !data.chemoType) {
                setChemotherapyData(null);
            } else {
                setChemotherapyData({
                    chemoType: data.chemoType,
                    chemoProtocol: {
                        chemoProtocolId: data.chemoProtocol.chemoProtocolId,
                        chemoDrugs: data.chemoProtocol.chemoDrugs,
                        chemoDosage: data.chemoProtocol.chemoDosage,
                        chemoNoCycle: data.chemoProtocol.chemoNoCycle,
                        chemoDiluent: data.chemoProtocol.chemoDiluent,
                    },
                    chemoInitialDate: data.chemoInitialDate,
                    chemoEndDate: data.chemoEndDate,
                    chemoCycleNumberGiven: data.chemoCycleNumberGiven,
                    chemoStatus: data.chemoStatus,
                    chemoNotes: data.chemoNotes,
                    chemoIsCompleted: data.chemoIsCompleted,
                    chemoFacility: {
                        hospitalId: data.chemoFacility.hospitalId,
                        hospitalName: data.chemoFacility.hospitalName,
                    },
                    chemoDoctor: {
                        doctorId: data.chemoDoctor.doctorId,
                        user: {
                            userId: data.chemoDoctor.user.userId,
                            userLastname: data.chemoDoctor.user.userLastname,
                            userFirstname: data.chemoDoctor.user.userFirstname,
                            userMiddlename: data.chemoDoctor.user.userMiddlename,
                        },
                        hospital: {
                            hospitalId: data.chemoDoctor.hospital.hospitalId,
                            hospitalName: data.chemoDoctor.hospital.hospitalName,
                        },
                        department: {
                            departmentId: data.chemoDoctor.department.departmentId,
                            departmentName: data.chemoDoctor.department.departmentName,
                        },
                        specialty: {
                            specialtyID: data.chemoDoctor.specialty.specialtyID,
                            specialtyName: data.chemoDoctor.specialty.specialtyName,
                            specialtyDescription: data.chemoDoctor.specialty.specialtyDescription,
                        },
                    },
                });
            }
        } catch (error) {
            console.error("Error fetching chemotherapy data:", error);
            setChemotherapyData(null);
        }
    };

    return (
        <div className='justify-between h-full flex flex-col overflow-hidden'>
            <div className='flex flex-col gap-2'>
                <div className='px-2 -mb-4 relative' ref={dropdownRefPatient}>
                    <Input
                        type="text"
                        name="lastname"
                        value={patientSearchTerm}
                        onChange={handlePatientSearchChange}
                        onClick={() => setPatientDropdownOpen(true)}
                        placeholder='Find patient (ID or Lastname)'
                        className='rounded-full placeholder:text-zinc-400 py-5' />
                    <Dialog>
                        <DialogTrigger><Search className="absolute right-5 bottom-[34px] text-zinc-300" size={23} onClick={() => handleSearchIconClick(selectedUserId || 0)} /></DialogTrigger>
                        <DialogContent className='max-w-none w-3/5 h-4/5 bg-white'>
                            <DialogHeader className='flex items-center'>
                                <Tabs defaultValue="account" className="mt-10">
                                    <TabsList className='py-6'>
                                        <TabsTrigger className="w-44 py-2 data-[state=active]:text-white" value="Treatment">Treatment</TabsTrigger>
                                        <TabsTrigger className="w-44 py-2 data-[state=active]:text-white" value="Surgery">Surgery</TabsTrigger>
                                        <TabsTrigger className="w-44 py-2 data-[state=active]:text-white" value="Radiotherapy">Radiotherapy</TabsTrigger>
                                        <TabsTrigger className="w-44 py-2 data-[state=active]:text-white" value="Hormonal">Hormonal</TabsTrigger>
                                        <TabsTrigger className="w-44 py-2 data-[state=active]:text-white" value="Immunotherapy">Immunotherapy</TabsTrigger>
                                        <TabsTrigger className="w-44 py-2 data-[state=active]:text-white" value="Chemotherapy">Chemotherapy</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="Treatment">
                                        {treatmentData ? (
                                            <div className='space-y-4 py-5'>
                                                <div className="flex flex-col w-full">
                                                    <label className="text-sm font-semibold text-gray-700">Treatment History of Patient:</label>
                                                    <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                        {selectedUserId}
                                                    </label>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Primary Rx Type:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {treatmentData.treatmentPrimaryRxType}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Primary Rx Name:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {treatmentData.treatmentPrimaryRxName}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Initial Rx Date:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {treatmentData.treatmentInitialRxDate}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Purpose:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {treatmentData.treatmentPurpose}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">RX Plan Type ID:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {treatmentData.treatmentPlan.rxtypeId}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Surgery:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {treatmentData.treatmentPlan.rxtypeSurgery === "1" ? "Yes" : "No"}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Chemotherapy:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {treatmentData.treatmentPlan.rxtypeChemotherapy === "1" ? "Yes" : "No"}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Radiotherapy:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {treatmentData.treatmentPlan.rxtypeRadiotherapy === "1" ? "Yes" : "No"}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Immunotherapy:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {treatmentData.treatmentPlan.rxtypeImmunotherapy === "1" ? "Yes" : "No"}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Hormonal Therapy:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {treatmentData.treatmentPlan.rxtypeHormonalTherapy === "1" ? "Yes" : "No"}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Others:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {treatmentData.treatmentPlan.rxtypeOthers === "1" ? "Yes" : "No"}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <label className="text-sm font-semibold text-gray-700">Notes:</label>
                                                    <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black h-20">
                                                        {treatmentData.treatmentPlan.rxtypeNotes}
                                                    </label>
                                                </div>
                                            </div>

                                        ) : (
                                            <div className="text-black w-full items-center justify-center flex py-20">
                                                <label>No treatment data available.</label>
                                            </div>
                                        )}
                                    </TabsContent>
                                    <TabsContent value="Surgery">
                                        {surgeryData ? (
                                            <div className='space-y-4 py-5'>
                                                <div className="flex flex-col w-full">
                                                    <label className="text-sm font-semibold text-gray-700">Surgery Details of Patient:</label>
                                                    <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                        {selectedUserId}
                                                    </label>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/5">
                                                        <label className="text-sm font-semibold text-gray-700">Surgeon Details:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            Dr. {surgeryData.surgerySurgeon.user.userFirstname} {surgeryData.surgerySurgeon.user.userMiddlename} {surgeryData.surgerySurgeon.user.userLastname}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-3/5">
                                                        <label className="text-sm font-semibold text-gray-700">Specialty:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {surgeryData.surgerySurgeon.specialty.specialtyName} - {surgeryData.surgerySurgeon.specialty.specialtyDescription}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Department:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {surgeryData.surgerySurgeon.department.departmentName}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Hospital:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {surgeryData.surgeryHospital.hospitalName}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Operation:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {surgeryData.surgeryOperation}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Intent:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {surgeryData.surgeryIntent}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Date:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {surgeryData.surgeryDate}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <label className="text-sm font-semibold text-gray-700">Findings:</label>
                                                    <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black h-20">
                                                        {surgeryData.surgeryFindings}
                                                    </label>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-black w-full items-center justify-center flex py-20">
                                                <label>No surgery data available.</label>
                                            </div>
                                        )}
                                    </TabsContent>
                                    <TabsContent value="Radiotherapy">
                                        {radiotherapyData ? (
                                            <div className="space-y-4 py-5">
                                                <div className="flex flex-col w-full">
                                                    <label className="text-sm font-semibold text-gray-700">Radiotherapy Details of Patient:</label>
                                                    <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                        {selectedUserId}
                                                    </label>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/5">
                                                        <label className="text-sm font-semibold text-gray-700">Doctor Name:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            Dr. {`${radiotherapyData.radRxDoctor.user.userFirstname} ${radiotherapyData.radRxDoctor.user.userMiddlename} ${radiotherapyData.radRxDoctor.user.userLastname}`}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-3/5">
                                                        <label className="text-sm font-semibold text-gray-700">Specialty:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {radiotherapyData.radRxDoctor.specialty.specialtyName} - {radiotherapyData.radRxDoctor.specialty.specialtyDescription}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Department:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {radiotherapyData.radRxDoctor.department.departmentName}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Hospital:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {radiotherapyData.radRxDoctor.hospital.hospitalName}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Radiotherapy Procedure:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {radiotherapyData.radRxType.radDetailsProcedure}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Initial Date:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {radiotherapyData.radRxInitialDate}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Last Date:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {radiotherapyData.radRxLastDate}
                                                        </label>
                                                    </div>

                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Dose:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {radiotherapyData.radRxDose}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Body Site:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {radiotherapyData.radRxBodySite}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Status:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {radiotherapyData.radRxStatus}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Completed:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {radiotherapyData.radRxIsCompleted === 'Y' ? 'Yes' : 'No'}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-black w-full items-center justify-center flex py-20">
                                                <label>No radiotherapy data available.</label>
                                            </div>
                                        )}

                                    </TabsContent>
                                    <TabsContent value="Hormonal">
                                        {hormonalData ? (
                                            <div className='space-y-4 py-5'>
                                                <div className="flex flex-col w-full">
                                                    <label className="text-sm font-semibold text-gray-700">Hormonal Details of Patient:</label>
                                                    <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                        {selectedUserId}
                                                    </label>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/5">
                                                        <label className="text-sm font-semibold text-gray-700">Doctor Name:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            Dr. {hormonalData.hormonalDoctor.user.userFirstname} {hormonalData.hormonalDoctor.user.userMiddlename} {hormonalData.hormonalDoctor.user.userLastname}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-3/5">
                                                        <label className="text-sm font-semibold text-gray-700">Specialty:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {hormonalData.hormonalDoctor.specialty.specialtyName} - {hormonalData.hormonalDoctor.specialty.specialtyDescription}
                                                        </label>
                                                    </div>

                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Department:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {hormonalData.hormonalDoctor.department.departmentName}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Hospital:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {hormonalData.hormonalDoctor.hospital.hospitalName}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Hormonal Drug:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {hormonalData.hormonalDrug}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Dose:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {hormonalData.hormonalDose}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Initial Date:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {hormonalData.hormonalInitialdate}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">End Date:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {hormonalData.hormonalEnddate}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <label className="text-sm font-semibold text-gray-700">Status:</label>
                                                    <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                        {hormonalData.hormonalStatus}
                                                    </label>
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <label className="text-sm font-semibold text-gray-700">Notes:</label>
                                                    <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black h-20   ">
                                                        {hormonalData.hormonalRxNotes}
                                                    </label>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-black w-full items-center justify-center flex py-20">
                                                <label>No hormonal treatment data available.</label>
                                            </div>
                                        )}
                                    </TabsContent>
                                    <TabsContent value="Immunotherapy">
                                        {immunotherapyData ? (
                                            <div className='space-y-4 py-5'>
                                                <div className="flex flex-col w-full">
                                                    <label className="text-sm font-semibold text-gray-700">Immunotherapy Details of Patient:</label>
                                                    <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                        {selectedUserId}
                                                    </label>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/5">
                                                        <label className="text-sm font-semibold text-gray-700">Doctor Name:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            Dr. {immunotherapyData.immunorxDoctor.user.userFirstname} {immunotherapyData.immunorxDoctor.user.userMiddlename} {immunotherapyData.immunorxDoctor.user.userLastname}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-3/5">
                                                        <label className="text-sm font-semibold text-gray-700">Specialty:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {immunotherapyData.immunorxDoctor.specialty.specialtyName} - {immunotherapyData.immunorxDoctor.specialty.specialtyDescription}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Department:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {immunotherapyData.immunorxDoctor.department.departmentName}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Hospital:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {immunotherapyData.immunorxDoctor.hospital.hospitalName}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Immunotherapy Drug:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {immunotherapyData.immunorxDrug}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Initial Date:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {immunotherapyData.immunorxInitialdate}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">End Date:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {immunotherapyData.immunorxEnddate}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <label className="text-sm font-semibold text-gray-700">Status:</label>
                                                    <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                        {immunotherapyData.immunorxStatus}
                                                    </label>
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <label className="text-sm font-semibold text-gray-700">Notes:</label>
                                                    <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black h-20">
                                                        {immunotherapyData.immunorxNotes}
                                                    </label>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-black w-full items-center justify-center flex py-20">
                                                <label>No immunotherapy treatment data available.</label>
                                            </div>
                                        )}
                                    </TabsContent>
                                    <TabsContent value="Chemotherapy">
                                        {chemotherapyData ? (
                                            <div className="space-y-4 py-5">
                                                <div className="flex flex-col w-full">
                                                    <label className="text-sm font-semibold text-gray-700">Chemotherapy Details of Patient:</label>
                                                    <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                        {selectedUserId}
                                                    </label>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/5">
                                                        <label className="text-sm font-semibold text-gray-700">Doctor Name:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            Dr. {chemotherapyData.chemoDoctor.user.userFirstname} {chemotherapyData.chemoDoctor.user.userMiddlename} {chemotherapyData.chemoDoctor.user.userLastname}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-3/5">
                                                        <label className="text-sm font-semibold text-gray-700">Specialty:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {chemotherapyData.chemoDoctor.specialty.specialtyName} - {chemotherapyData.chemoDoctor.specialty.specialtyDescription}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Department:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {chemotherapyData.chemoDoctor.department.departmentName}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Hospital:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {chemotherapyData.chemoDoctor.hospital.hospitalName}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Chemotherapy Type:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {chemotherapyData.chemoType}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-2/4">
                                                        <label className="text-sm font-semibold text-gray-700">Drug Protocol:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {chemotherapyData.chemoProtocol.chemoDrugs} - {chemotherapyData.chemoProtocol.chemoDosage}mg per cycle
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col w-1/3">
                                                        <label className="text-sm font-semibold text-gray-700">Status:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {chemotherapyData.chemoStatus}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-1/3">
                                                        <label className="text-sm font-semibold text-gray-700">Initial Date:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {chemotherapyData.chemoInitialDate}
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col w-1/3">
                                                        <label className="text-sm font-semibold text-gray-700">End Date:</label>
                                                        <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                                            {chemotherapyData.chemoEndDate}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <label className="text-sm font-semibold text-gray-700">Notes:</label>
                                                    <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black h-20">
                                                        {chemotherapyData.chemoNotes}
                                                    </label>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-black w-full items-center justify-center flex py-20">
                                                <label>No chemotherapy treatment data available.</label>
                                            </div>
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    {patientDropdownOpen && (
                        <ul className="absolute z-10 top-12 bg-white border border-gray-300 w-11/12 mt-1 hover:border-red-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map(patient => (
                                    <li
                                        key={patient.patientId}
                                        className="flex gap-2 p-2 text-black hover:bg-gray-200 cursor-pointer items-center text-nowrap"
                                        onClick={() => handleSelectPatient(patient.patientId, patient.userFirstname, patient.userLastname, patient.userEmail)}
                                    >
                                        {patient.userLastname} <p className="text-zinc-400 text-sm">({patient.userEmail})</p>
                                    </li>
                                ))
                            ) : (
                                <li className="p-2 text-gray-500">No patients found</li>
                            )}
                        </ul>
                    )}
                </div>

                <Button
                    onClick={() => navigateTo("/dashboard")}
                    className={`w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/dashboard") || isActive("/") ? "font-medium pl-8 bg-white text-black" : ""}`}
                >
                    <LayoutDashboard /> Dashboard
                </Button>

                <Button
                    onClick={() => navigateTo("/enrollPatient")}
                    className={`w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/enrollPatient") ? "font-medium pl-8 bg-white text-black" : ""}`}
                >
                    <ContactRound /> Enroll Patient
                </Button>

                <Button
                    onClick={() => navigateTo("/diseaseProfile")}
                    className={`w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/diseaseProfile") ? "font-medium pl-8 bg-white text-black" : ""}`}
                >
                    <Microscope /> Disease Profile
                </Button>

                <Button
                    onClick={() => navigateTo("/treatmentHistory")}
                    className={`w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/treatmentHistory") ? "font-medium pl-8 bg-white text-black" : ""}`}
                >
                    <Syringe /> Treatment History
                </Button>

                <Button
                    onClick={() => navigateTo("/consult")}
                    className={`w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/consult") ? "font-medium pl-8 bg-white text-black" : ""}`}
                >
                    <Stethoscope /> Consult
                </Button>

                <Button
                    onClick={() => navigateTo("/notification")}
                    className={`w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/notification") ? "font-medium pl-8 bg-white text-black" : ""}`}
                >
                    <Bell /> Notification
                </Button>

                <Button
                    onClick={() => navigateTo("/message")}
                    className={`w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/message") ? "font-medium pl-8 bg-white text-black" : ""}`}
                >
                    <Mail /> Message
                </Button>
            </div>

            <div>
                <Button
                    onClick={handleLogout}
                    className='w-full h-12 hover:bg-white hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100'
                >
                    <LogOut /> Logout
                </Button>
            </div>
        </div>
    );
}

