"use client"

import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { Bell, ClipboardPlus, ContactRound, DnaIcon, FileSearch, HospitalIcon, LayoutDashboard, LogOut, Mail, Microscope, MicroscopeIcon, PillBottleIcon, PillIcon, RadiationIcon, Search, SettingsIcon, Slice, Stethoscope, SyringeIcon, Terminal, ThermometerSnowflake, UsersRoundIcon } from 'lucide-react'
import { PatientsResponseSchema } from '@/packages/api/patient-list'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DiseaseZodSchema } from "@/packages/api/disease-response"
import { z } from "zod";
import usePageStore from '@/packages/stores/pageStore'
import { useToast } from '@/hooks/use-toast'
import { PatientSchema } from '@/packages/api/patient'

type PatientsResponse = z.infer<typeof PatientSchema>

type DiseaseResponse = z.infer<typeof DiseaseZodSchema>

interface FilteredPatient {
  patientUserId: number,
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
  const [userInfo, setUserInfo] = useState({
    userFirstname: '',
    userLastname: '',
    role: '',
    departmentName: '',
    hospitalName: '',
    email: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      if ('doctorId' in parsedUserData) {
        setUserInfo({
          userFirstname: parsedUserData.user.userFirstname,
          userLastname: parsedUserData.user.userLastname,
          role: 'Doctor',
          departmentName: parsedUserData.department.departmentName,
          hospitalName: parsedUserData.hospital.hospitalName,
          email: parsedUserData.user.userEmail,
        });
      } else if ('patientId' in parsedUserData) {
        setUserInfo({
          userFirstname: parsedUserData.user.userFirstname,
          userLastname: parsedUserData.user.userLastname,
          role: 'Patient',
          departmentName: '',
          hospitalName: '',
          email: parsedUserData.user.userEmail,
        });
      }
    }
  }, []);

  const departmentIcons: Record<string, React.ReactNode> = {
    Medicine: <PillIcon size={20} strokeWidth={2} />,
    Surgery: <Slice size={20} strokeWidth={2} />,
    Pathology: <MicroscopeIcon size={20} strokeWidth={2} />,
    Radiology: <RadiationIcon size={20} strokeWidth={2} />,
    "Family Medicine": <UsersRoundIcon size={20} strokeWidth={2} />,
  };

  const getDepartmentIcon = (departmentName: string) => {
    return departmentIcons[departmentName] || <Stethoscope size={20} strokeWidth={2} />; // Default icon
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
    window.location.href = "/";
  };

  return (
    <div className='flex flex-col w-1/6 h-screen px-4 bg-red-900 py-4 sticky top-0 gap-4'>
      <div className=''>
        <Label className='text-xl text-white'>Welcome,</Label>
      </div>
      <div className="flex items-center">
        <div className='pl-2 flex flex-col gap-1 w-full'>
          <div className="flex justify-between w-full items-center">
            <Label className='text-xl font-[700] tracking-wide text-white'>
              {userInfo.role === 'Doctor' ? 'Dr. ' : ''}
              {userInfo.userFirstname} {userInfo.userLastname}
            </Label>
            <Popover>
              <PopoverTrigger className=''><SettingsIcon size={19} className='text-white' /></PopoverTrigger>
              <PopoverContent side='right' align='start' className='rounded-2xl p-2 bg-red-900 border-red-800 shadow-lg'>
                <div className='flex items-center hover:bg-red-800 rounded-lg'>
                  <Avatar className='rounded-lg'>
                    <AvatarImage src="https://www.flaticon.com/free-icon/doctor_387561" />
                    <AvatarFallback className='font-bold rounded-lg bg-zinc-200'>{userInfo.userFirstname.charAt(0)}{userInfo.userLastname.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col p-2">
                    <Label className='font-bold text-white tracking-wider'>
                      {userInfo.userFirstname} {userInfo.userLastname}
                    </Label>
                    <Label className='text-zinc-300'>
                      {userInfo.email}
                    </Label>
                  </div>
                </div>
                <Separator className='my-4' />
                <Button
                  onClick={handleLogout}
                  className='bg-white shadow-none flex gap-2 rounded-lg text-black w-full hover:bg-zinc-200 '
                >
                  <LogOut /> Logout
                </Button>
              </PopoverContent>
            </Popover>
          </div>
          {userInfo.role === 'Doctor' && (
            <div className='flex gap-2 flex-wrap'>
              <Badge className='bg-white text-black rounded-xl hover:bg-zinc-200 gap-2 text-sm font-medium'>{getDepartmentIcon(userInfo.departmentName)} {userInfo.departmentName}</Badge>
              <Badge className='bg-white text-black rounded-xl hover:bg-zinc-200 gap-2 text-sm font-medium'><HospitalIcon size={20} strokeWidth={2} /> {userInfo.hospitalName}</Badge>
            </div>
          )}
        </div>
      </div>
      <Separator className='h-[1px] bg-[#9c3737]' />
      {userInfo.role === 'Doctor' ? <DoctorSidebar /> : <PatientSidebar />}
    </div>
  );
};

export const PatientSidebar = () => {
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

  return (
    <div className='justify-between h-full flex flex-col overflow-hidden'>
      <div className='flex flex-col gap-2'>
        <Button
          onClick={() => navigateTo("/reportSymptoms")}
          className={`w-full h-12 hover:bg-zinc-300 hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/reportSymptoms") ? "hover:bg-white font-medium pl-8 bg-white text-black" : ""}`}
        >
          <ThermometerSnowflake /> Report Symptoms
        </Button>

        <Button
          onClick={() => navigateTo("/requestDocuments")}
          className={`w-full h-12 hover:bg-zinc-300 hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/requestDocuments") ? "hover:bg-white font-medium pl-8 bg-white text-black" : ""}`}
        >
          <FileSearch /> Request Documents
        </Button>

        <Button
          onClick={() => navigateTo("/submitLaboratory")}
          className={`w-full h-12 hover:bg-zinc-300 hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/submitLaboratory") ? "hover:bg-white font-medium pl-8 bg-white text-black" : ""}`}
        >
          <ClipboardPlus /> Submit Laboratory
        </Button>

        <Button
          onClick={() => navigateTo("/notification")}
          className={`w-full h-12 hover:bg-zinc-300 hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/notification") ? "hover:bg-white font-medium pl-8 bg-white text-black" : ""}`}
        >
          <Bell /> Notification
        </Button>

        <Button
          onClick={() => navigateTo("/message")}
          className={`w-full h-12 hover:bg-zinc-300 hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/message") ? "hover:bg-white font-medium pl-8 bg-white text-black" : ""}`}
        >
          <Mail /> Message
        </Button>
      </div>

      <Dialog>
        <DialogTrigger>
          <Button
            className='w-full h-12 hover:bg-zinc-300 hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100'
          >
            <LogOut /> Logout
          </Button>
        </DialogTrigger>
        <DialogContent className='bg-zinc-200 p-2'>
          <Alert className='bg-zinc-200 p-4 text-black flex flex-col gap-2'>
            <AlertTitle className='flex gap-1 text-lg font-bold items-center tracking-wide'><Terminal className="h-4 w-4" strokeWidth={3} />Logging Out</AlertTitle>
            <div className='flex flex-col'>
              <AlertDescription>
                Are you sure you want to log out?
                <div className="flex justify-end gap-4">
                  <DialogClose asChild>
                    <Button
                      className='bg-transparent text-black border border-red-900 hover:border-zinc-200 hover:bg-transparent mt-4 shadow-none'
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={handleLogout}
                    className='bg-red-900 hover:bg-red-800 mt-4'
                  >
                    Logout
                  </Button>
                </div>
              </AlertDescription>
            </div>
          </Alert>
        </DialogContent>
      </Dialog>
    </div>
  )
}


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

interface NotificationFormData {
  title: string;
  content: string;
  recipientId: number;
  senderId: number;
  recipientEmail: string;
  senderEmail: string;
  messageType: number;
}

// interface EmailFormData {
//   subject: string;
//   messageBody: string;
//   recieverID: number;
//   senderID: number;
//   recieverEmail: string;
//   senderEmail: string;
//   notificationType: number;
// }

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

// interface Diagnosis {
//   DATE: string | null;
//   LATERALITY: string | null;
//   STAGE: string | null;
// }

// interface HormonalTherapy {
//   YN: string;
//   COMPLIANCE: string | null;
// }

// interface Chemotherapy {
//   YN: string;
//   COMPLETION: string | null;
// }

// interface Name {
//   MIDDLENAME: string;
//   LASTNAME: string;
//   FIRSTNAME: string;
// }

// interface Operation {
//   SURGERY: string | null;
//   DATE: string | null;
// }

// interface Radiotherapy {
//   YN: string;
//   COMPLETION: string | null;
// }

// interface PatientConsultInfo {
//   DIAGNOSIS: Diagnosis;
//   PATIENT_SISX_REPORT: string | null;
//   PATIENT_REPORT_DATE: string | null;
//   HORMONAL_THERAPY: HormonalTherapy;
//   CHEMOTHERAPY: Chemotherapy;
//   NAME: Name;
//   STATUS: string;
//   LATEST_LAB_SUBMITTED: string | null;
//   OPERATION: Operation;
//   LATEST_LAB_DATE: string | null;
//   RADIOTHERAPY: Radiotherapy;
//   LATEST_CONSULT_DATE: string | null;
//   AGE: number;
// }


export const DoctorSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (route: string) => {
    router.push(route);
  };

  const [isTreatmentPage, setIsTreatmentPage] = useState(false);

  useEffect(() => {
    if (pathname.includes('treatmentHistory')) {
      setIsTreatmentPage(true);
    } else {
      setIsTreatmentPage(false);
    }
  }, [pathname]);

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
  const [, setDoctorInfo] = useState("");

  const dropdownRefPatient = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setDoctorInfo(parsedUserData.doctorId);
      setScheduleConsultFormData((prevData) => ({
        ...prevData,
        doctor_id: parsedUserData.doctorId,
      }))
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
    patientUserId: number,
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
    await fetchDiseaseDetails(patientId)
    setNotificationData((prevData) => ({
      ...prevData,
      recipientId: patientUserId,
      recipientEmail: email
    }));
    setFormDataConsult((prevData) => ({
      ...prevData,
      PATIENT_ID: patientId,
    }));
    setScheduleConsultFormData((prevData) => ({
      ...prevData,
      patient_id: patientId.toString(),
    }));
    fetchPatient(patientId);
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
            `${process.env.NEXT_PUBLIC_BACKEND_URL}css/onboard/getPatientsByDoctor/${parsedUserData.doctorId}`
          );
          const data = await response.json();
          const parsedData = PatientsResponseSchema.parse(data);

          const patients = parsedData.map((relation) => ({
            patientUserId: relation.patient.user.userId,
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/treatment/findbypatient/latest?patientID=${patientId}`);

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/surgery/findbypatient/latest?patientID=${patientId}`);

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/radiotherapy/findbypatient/latest?patientID=${patientId}`);

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/hormonal/findbypatient/latest?patientID=${patientId}`);

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/immunotherapy/findbypatient/latest?patientID=${patientId}`);

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/chemotherapy/findbypatient/latest?patientID=${patientId}`);

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

  //disease profile
  const [diseaseData, setDiseaseData] = useState<DiseaseResponse | null>(null);
  const [, setError] = useState<string | null>(null);

  const fetchDiseaseDetails = async (patientId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}css/disease/getbypatientid?patientID=${patientId}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const jsonResponse = await response.json();

      // Validate the response with zod
      const validatedData = DiseaseZodSchema.parse(jsonResponse);
      setDiseaseData(validatedData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError("Validation Error: Invalid API Response");
        console.error(err.errors);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown Error occurred");
      }
    }
  };

  const [notificationData, setNotificationData] = useState<NotificationFormData>({
    title: "",
    content: "",
    recipientId: 1, // Default value
    senderId: 1, // Default value
    recipientEmail: "",
    senderEmail: "",
    messageType: 1, // Assuming a default message type
  });

  const [, setValidationErrors] = useState<Partial<NotificationFormData>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNotificationData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const errors: Partial<NotificationFormData> = {};
    if (!notificationData.title) errors.title = "Title is required";
    if (!notificationData.content) errors.content = "Content is required";
    if (!notificationData.recipientEmail) errors.recipientEmail = "Recipient email is required";
    if (!notificationData.senderEmail) errors.senderEmail = "Sender email is required";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Patient search
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setNotificationData({
        ...notificationData,
        senderEmail: parsedUser.user.userEmail,
        senderId: parsedUser.user.userId,
      });
    }
  }, []);

  const [loading, setLoading] = useState(false); // Loading state


  const handleSubmitMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const payload = {
      subject: notificationData.title,
      messageBody: notificationData.content,
      recieverID: notificationData.recipientId,
      senderID: notificationData.senderId,
      recieverEmail: notificationData.recipientEmail,
      senderEmail: notificationData.senderEmail,
      notificationType: notificationData.messageType,
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/email/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("Failed to send notification");
      } else {
        setNotificationData({
          title: "",
          content: "",
          recipientId: 1,
          senderId: 1,
          recipientEmail: "",
          senderEmail: "",
          messageType: 1,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const [showSubButtons, setShowSubButtons] = useState(false);

  const handleClick = () => {
    setShowSubButtons(!showSubButtons);
    navigateTo("/treatmentHistory");
  };

  const subButtons = [
    { label: "Surgery", icon: <Slice /> },
    { label: "Radiotherapy", icon: <RadiationIcon /> },
    { label: "Hormonal", icon: <PillBottleIcon /> },
    { label: "Immunotherapy", icon: <SyringeIcon /> },
    { label: "Chemotherapy", icon: <DnaIcon /> },
  ];

  const currentPage = usePageStore((state) => state.currentPage)

  const setCurrentPage = usePageStore((state) => state.setCurrentPage);


  // schedule a consult
  const [scheduleConsultFormData, setScheduleConsultFormData] = useState({
    patient_id: "",
    doctor_id: "",
    checkup_request_date: "",
    checkup_confirmed_date: "",
    checkup_start_time: "",
    checkup_end_time: "",
    checkup_status_id: 1,
  });

  const handleScheduleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setScheduleConsultFormData({ ...scheduleConsultFormData, [e.target.name]: e.target.value });
  };

  const handleSubmitSchedule = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(JSON.stringify(scheduleConsultFormData))
      const requestBody = {
        patient_id: scheduleConsultFormData.patient_id,
        doctor_id: scheduleConsultFormData.doctor_id,
        checkup_request_date: scheduleConsultFormData.checkup_request_date,
        checkup_confirmed_date: scheduleConsultFormData.checkup_request_date,
        checkup_start_time: scheduleConsultFormData.checkup_start_time,
        checkup_end_time: scheduleConsultFormData.checkup_end_time,
        checkup_status_id: scheduleConsultFormData.checkup_status_id,
      }
      console.log(JSON.stringify(requestBody))
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/checkup/schedule/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to schedule checkup");
      }

      alert("Checkup scheduled successfully!");
      setScheduleConsultFormData({
        patient_id: "",
        doctor_id: "",
        checkup_request_date: "",
        checkup_confirmed_date: "",
        checkup_start_time: "",
        checkup_end_time: "",
        checkup_status_id: 1,
      });
    } catch (error) {
      console.error(error);
      alert("An error occurred while scheduling the checkup.");
    }
  };

  //consult patient
  const [formDataConsult, setFormDataConsult] = useState<ConsultFormData>({
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

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChangeConsult = (
    e: React.ChangeEvent<HTMLInputElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormDataConsult((prev) => ({
      ...prev,
      [name]: name === "PATIENT_ID" || name === "CONSULT_PATIENTSTATUS" ? Number(value) : value,
    }));
  };

  const validateFormConsult = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formDataConsult.PATIENT_ID) newErrors.PATIENT_ID = "Patient ID is required.";
    if (!formDataConsult.CONSULT_SUBJECTIVE)
      newErrors.CONSULT_SUBJECTIVE = "Subjective information is required.";
    if (!formDataConsult.CONSULT_OBJECTIVE)
      newErrors.CONSULT_OBJECTIVE = "Objective information is required.";
    if (!formDataConsult.CONSULT_ASSESSMENT)
      newErrors.CONSULT_ASSESSMENT = "Assessment is required.";
    if (!formDataConsult.CONSULT_SURVWORKUP)
      newErrors.CONSULT_SURVWORKUP = "Surveillance/Workup is required.";
    if (!formDataConsult.CONSULT_RXPLAN)
      newErrors.CONSULT_RXPLAN = "RX Plan is required.";
    if (!formDataConsult.CONSULT_PATIENTSTATUS)
      newErrors.CONSULT_PATIENTSTATUS = "Patient status is required.";
    console.log(newErrors)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { toast } = useToast()

  const handleSubmitConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFormConsult()) {
      return;
    }

    const requestBody = {
      PATIENT_ID: Number(formDataConsult.PATIENT_ID),
      CONSULT_SUBJECTIVE: formDataConsult.CONSULT_SUBJECTIVE.trim(),
      CONSULT_OBJECTIVE: formDataConsult.CONSULT_OBJECTIVE.trim(),
      CONSULT_ASSESSMENT: formDataConsult.CONSULT_ASSESSMENT.trim(),
      CONSULT_SURVWORKUP: formDataConsult.CONSULT_SURVWORKUP.trim(),
      CONSULT_RXPLAN: formDataConsult.CONSULT_RXPLAN.trim(),
      CONSULT_PATIENTSTATUS: formDataConsult.CONSULT_PATIENTSTATUS,
      CONSULT_DATE: formDataConsult.CONSULT_DATE,
    };
    console.log(requestBody)

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
        setFormDataConsult({
          PATIENT_ID: formDataConsult.PATIENT_ID,
          CONSULT_SUBJECTIVE: "",
          CONSULT_OBJECTIVE: "",
          CONSULT_ASSESSMENT: "",
          CONSULT_SURVWORKUP: "",
          CONSULT_RXPLAN: "",
          CONSULT_PATIENTSTATUS: 1,
          CONSULT_DATE: new Date()
            .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }),
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

  const [patient, setPatient] = useState<PatientsResponse | null>(null);

  const fetchPatient = async (patientId: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/patient/find?patientID=${patientId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch patient data');
      }
      const data: PatientsResponse = await response.json();
      setPatient(data);
    } catch (err) {
      setError((err as Error).message);
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
            placeholder='Find surname...'
            className='rounded-full placeholder:text-zinc-400 py-5' />
          <Dialog>
            <DialogTrigger><Search className="absolute right-5 bottom-[34px] text-zinc-300" size={23} onClick={() => handleSearchIconClick(selectedUserId || 0)} /></DialogTrigger>
            <DialogContent className='max-w-none w-3/5 h-4/5 bg-white'>
              <DialogHeader className='flex items-start'>
                <Tabs defaultValue="Profile" className="h-full w-full flex py-4">
                  <TabsList className='flex-col h-[22rem] space-y-4 mt-4 w-48'>
                    <TabsTrigger className="w-44 py-2 data-[state=active]:text-white text-lg" value="Profile">Patient Profile</TabsTrigger>
                    <TabsTrigger className="w-44 py-2 data-[state=active]:text-white text-lg" value="Disease">Disease Profile</TabsTrigger>
                    <TabsTrigger className="w-44 py-2 data-[state=active]:text-white text-lg" value="Treatment">Treatment Profile</TabsTrigger>
                    <TabsTrigger className="w-44 py-2 data-[state=active]:text-white text-lg" value="Schedule">Schedule Consult</TabsTrigger>
                    <TabsTrigger className="w-44 py-2 data-[state=active]:text-white text-lg" value="Consult">Consult</TabsTrigger>
                    <TabsTrigger className="w-44 py-2 data-[state=active]:text-white text-lg" value="Message">Message</TabsTrigger>
                  </TabsList>
                  <Separator orientation='vertical' className='mx-8 max-h-[55%]' />
                  <TabsContent value="Profile" className='text-black w-[76%]'>
                    <div className="w-11/12">
                      <h1 className="text-2xl font-bold mb-4">Patient Information</h1>
                      {patient ? (
                        <div className="flex flex-col gap-4">
                          <div className="flex gap-4">
                            <div className="flex flex-col mb-4 w-1/2">
                              <label className="text-sm font-semibold text-gray-700">Name:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {patient.user.userFirstname} {patient.user.userMiddlename} {patient.user.userLastname}
                              </label>
                            </div>
                            <div className="flex flex-col mb-4 w-1/2">
                              <label className="text-sm font-semibold text-gray-700">Email:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {patient.user.userEmail}
                              </label>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="flex flex-col mb-4 w-1/6">
                              <label className="text-sm font-semibold text-gray-700">Gender:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {patient.user.userGender}
                              </label>
                            </div>
                            <div className="flex flex-col mb-4 w-1/6">
                              <label className="text-sm font-semibold text-gray-700">Marital Status:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {patient.user.userMaritalStatus}
                              </label>
                            </div>
                            <div className="flex flex-col mb-4 w-1/3">
                              <label className="text-sm font-semibold text-gray-700">Birthdate:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {new Date(patient.user.userBirthdate).toLocaleDateString()}
                              </label>
                            </div>
                            <div className="flex flex-col mb-4 w-1/3">
                              <label className="text-sm font-semibold text-gray-700">Birthplace:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {patient.user.userBirthplace}
                              </label>
                            </div>
                          </div>
                          <div className="flex flex-col mb-4">
                            <label className="text-sm font-semibold text-gray-700">Address:</label>
                            <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                              {`${patient.user.userAddress.addressNumber} ${patient.user.userAddress.addressStreet}, ${patient.user.userAddress.addressCity}, ${patient.user.userAddress.addressRegion} ${patient.user.userAddress.addressZipcode}`}
                            </label>
                          </div>

                          <div className="flex gap-4">
                            <div className="flex flex-col mb-4 w-1/2">
                              <label className="text-sm font-semibold text-gray-700">Role:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {patient.user.userRole.roleName} - {patient.user.userRole.roleDescription}
                              </label>
                            </div>
                            <div className="flex flex-col mb-4 w-1/2">
                              <label className="text-sm font-semibold text-gray-700">Status:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {patient.user.userStatus}
                              </label>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="">No patient found.</div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="Disease" className="text-black w-[76%]">
                    <div className="p-6">
                      {diseaseData ? (
                        <div className='h-[38rem] overflow-y-auto'>
                          <h2 className="text-xl font-bold mb-4">Primary Information</h2>

                          <Separator className='mb-4' />

                          {/* Primary Site */}
                          <div className="flex flex-col mb-4">
                            <label className="text-sm font-semibold text-gray-700">Primary Site:</label>
                            <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                              {diseaseData.bodySite.bodysiteName}
                            </label>
                          </div>

                          <div className="flex gap-4 w-full">
                            {/* Diagnosis Date */}
                            <div className="flex flex-col mb-4 w-1/6">
                              <label className="text-sm font-semibold text-gray-700">Diagnosis Date:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseDiagnosisDate}
                              </label>
                            </div>

                            {/* Basis */}
                            <div className="flex flex-col mb-4 w-1/2">
                              <label className="text-sm font-semibold text-gray-700">Basis:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.basis.category} - {diseaseData.basis.subcategory}
                              </label>
                            </div>

                            {/* Laterality */}
                            <div className="flex flex-col mb-4 w-1/3">
                              <label className="text-sm font-semibold text-gray-700">Laterality:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {{
                                  1: 'Left',
                                  2: 'Right',
                                  3: 'Bilateral',
                                  4: 'Mid',
                                  5: 'Not Stated',
                                  6: 'Not Applicable'
                                }[diseaseData.diseaseLaterality] || 'Unknown'}
                              </label>
                            </div>
                          </div>

                          <h2 className="text-xl font-bold my-4">Histology Information</h2>

                          <Separator className='mb-4' />

                          {/* Histopathology */}
                          <div className="flex flex-col mb-4">
                            <label className="text-sm font-semibold text-gray-700">Histopathology:</label>
                            <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                              {diseaseData.diseaseHistology.histoPathology.term}
                            </label>
                          </div>

                          <div className="flex gap-4 w-full">
                            {/* Tumor Size */}
                            <div className="flex flex-col mb-4 w-1/3">
                              <label className="text-sm font-semibold text-gray-700">Tumor Size:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseHistology.histoTumorSize}
                              </label>
                            </div>

                            {/* Grade */}
                            <div className="flex flex-col mb-4 w-1/3">
                              <label className="text-sm font-semibold text-gray-700">Tumor Grade:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseHistology.histoGrade}
                              </label>
                            </div>

                            {/* Tumor Extension */}
                            <div className="flex flex-col mb-4 w-1/3">
                              <label className="text-sm font-semibold text-gray-700">Tumor Extension:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseHistology.histoTumorExtension === "Y" ? "Yes" : "No"}
                              </label>
                            </div>
                          </div>

                          <div className="flex gap-4 w-full">
                            {/* Node Positive */}
                            <div className="flex flex-col mb-4 w-1/5">
                              <label className="text-sm font-semibold text-gray-700">Node Positive:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseHistology.histoNodePositive}
                              </label>
                            </div>

                            {/* Node Harvest */}
                            <div className="flex flex-col mb-4 w-1/5">
                              <label className="text-sm font-semibold text-gray-700">Node Harvest:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseHistology.histoNodeHarvest}
                              </label>
                            </div>

                            {/* Stage */}
                            <div className="flex flex-col mb-4 w-1/5">
                              <label className="text-sm font-semibold text-gray-700">Stage:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseHistology.histoStage}
                              </label>
                            </div>

                            {/* Margins Negative */}
                            <div className="flex flex-col mb-4 w-1/5">
                              <label className="text-sm font-semibold text-gray-700">Margins Negative:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseHistology.histoMarginsNegative === "Y" ? "Yes" : "No"}
                              </label>
                            </div>

                            {/* Margins Positive */}
                            <div className="flex flex-col mb-4 w-1/5">
                              <label className="text-sm font-semibold text-gray-700">Margins Positive:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseHistology.histoMarginsPositive === "Y" ? "Yes" : "No"}
                              </label>
                            </div>
                          </div>

                          <h2 className="text-xl font-bold my-4">Disease Information</h2>

                          <Separator className='mb-4' />

                          <div className="flex gap-4 w-full">
                            {/* Extent */}
                            <div className="flex flex-col mb-4 w-1/4">
                              <label className="text-sm font-semibold text-gray-700">Extent of Disease:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseExtent}
                              </label>
                            </div>

                            {/* Tumor Size */}
                            <div className="flex flex-col mb-4 w-1/4">
                              <label className="text-sm font-semibold text-gray-700">Tumor Size:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseTumorSize}
                              </label>
                            </div>

                            {/* Lymph Node */}
                            <div className="flex flex-col mb-4 w-1/4">
                              <label className="text-sm font-semibold text-gray-700">Lymph Node:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseLymphNode}
                              </label>
                            </div>

                            {/* Metastatic */}
                            <div className="flex flex-col mb-4 w-1/4">
                              <label className="text-sm font-semibold text-gray-700">Metastatic:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseMetastatic === "Y" ? "Yes" : "No"}
                              </label>
                            </div>
                          </div>

                          <h2 className="text-xl font-bold my-4">Metastatic Involvement</h2>

                          <Separator className='mb-4' />

                          <div className="flex gap-4 w-full flex-wrap">
                            {/* Distant Lymph Node */}
                            {diseaseData.diseaseMetastaticSite.metsDistantln === "Y" && (
                              <div className="flex flex-col mb-4 w-1/3">
                                <label className="text-sm font-semibold text-gray-700">Distant Lymph Node:</label>
                                <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                  {diseaseData.diseaseMetastaticSite.metsDistantln === "Y" ? "Yes" : "No"}
                                </label>
                              </div>
                            )}

                            {/* Bone */}
                            {diseaseData.diseaseMetastaticSite.metsBone === "Y" && (
                              <div className="flex flex-col mb-4 w-1/3">
                                <label className="text-sm font-semibold text-gray-700">Bone:</label>
                                <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                  {diseaseData.diseaseMetastaticSite.metsBone === "Y" ? "Yes" : "No"}
                                </label>
                              </div>
                            )}

                            {/* Liver */}
                            {diseaseData.diseaseMetastaticSite.metsLiver === "Y" && (
                              <div className="flex flex-col mb-4 w-1/3">
                                <label className="text-sm font-semibold text-gray-700">Liver:</label>
                                <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                  {diseaseData.diseaseMetastaticSite.metsLiver === "Y" ? "Yes" : "No"}
                                </label>
                              </div>
                            )}

                            {/* Lung */}
                            {diseaseData.diseaseMetastaticSite.metsLung === "Y" && (
                              <div className="flex flex-col mb-4 w-1/3">
                                <label className="text-sm font-semibold text-gray-700">Lung:</label>
                                <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                  {diseaseData.diseaseMetastaticSite.metsLung === "Y" ? "Yes" : "No"}
                                </label>
                              </div>
                            )}

                            {/* Brain */}
                            {diseaseData.diseaseMetastaticSite.metsBrain === "Y" && (
                              <div className="flex flex-col mb-4 w-1/3">
                                <label className="text-sm font-semibold text-gray-700">Brain:</label>
                                <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                  {diseaseData.diseaseMetastaticSite.metsBrain === "Y" ? "Yes" : "No"}
                                </label>
                              </div>
                            )}

                            {/* Ovary */}
                            {diseaseData.diseaseMetastaticSite.metsOvary === "Y" && (
                              <div className="flex flex-col mb-4 w-1/3">
                                <label className="text-sm font-semibold text-gray-700">Ovary:</label>
                                <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                  {diseaseData.diseaseMetastaticSite.metsOvary === "Y" ? "Yes" : "No"}
                                </label>
                              </div>
                            )}

                            {/* Skin */}
                            {diseaseData.diseaseMetastaticSite.metsSkin === "Y" && (
                              <div className="flex flex-col mb-4 w-1/3">
                                <label className="text-sm font-semibold text-gray-700">Skin:</label>
                                <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                  {diseaseData.diseaseMetastaticSite.metsSkin === "Y" ? "Yes" : "No"}
                                </label>
                              </div>
                            )}

                            {/* Intestine */}
                            {diseaseData.diseaseMetastaticSite.metsIntestine === "Y" && (
                              <div className="flex flex-col mb-4 w-1/3">
                                <label className="text-sm font-semibold text-gray-700">Intestine:</label>
                                <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                  {diseaseData.diseaseMetastaticSite.metsIntestine === "Y" ? "Yes" : "No"}
                                </label>
                              </div>
                            )}

                            {/* Others */}
                            {diseaseData.diseaseMetastaticSite.metsOthers === "Y" && (
                              <div className="flex flex-col mb-4 w-1/3">
                                <label className="text-sm font-semibold text-gray-700">Others:</label>
                                <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                  {diseaseData.diseaseMetastaticSite.metsOthers === "Y" ? "Yes" : "No"}
                                </label>
                              </div>
                            )}

                            {/* Unknown */}
                            {diseaseData.diseaseMetastaticSite.metsUnknown === "Y" && (
                              <div className="flex flex-col mb-4 w-1/3">
                                <label className="text-sm font-semibold text-gray-700">Unknown:</label>
                                <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                  {diseaseData.diseaseMetastaticSite.metsUnknown === "Y" ? "Yes" : "No"}
                                </label>
                              </div>
                            )}
                          </div>


                          {/* Notes */}
                          <div className="flex flex-col mb-4">
                            <label className="text-sm font-semibold text-gray-700">Notes:</label>
                            <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black h-40">
                              {diseaseData.diseaseMetastaticSite.metsNotes}
                            </label>
                          </div>

                          <h2 className="text-xl font-bold my-4 mt-8">Multiple Primary Information</h2>

                          <Separator className='mb-4' />

                          {/* Multiple Primary */}
                          <div className="flex flex-col mb-4">
                            <label className="text-sm font-semibold text-gray-700">Multiple Primary:</label>
                            <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                              {diseaseData.diseaseMultiplePrimary}
                            </label>
                          </div>

                          <div className="flex gap-4 w-full">
                            {/* TStage */}
                            <div className="flex flex-col mb-4 w-1/4">
                              <label className="text-sm font-semibold text-gray-700">TStage:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseTstage}
                              </label>
                            </div>

                            {/* NStage */}
                            <div className="flex flex-col mb-4 w-1/4">
                              <label className="text-sm font-semibold text-gray-700">NStage:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseNstage}
                              </label>
                            </div>

                            {/* MStage */}
                            <div className="flex flex-col mb-4 w-1/4">
                              <label className="text-sm font-semibold text-gray-700">MStage:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseMstage}
                              </label>
                            </div>

                            {/* GStage */}
                            <div className="flex flex-col mb-4 w-1/4">
                              <label className="text-sm font-semibold text-gray-700">GStage:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseGstage}
                              </label>
                            </div>
                          </div>

                          <div className="flex gap-4 w-full">
                            {/* Stage */}
                            <div className="flex flex-col mb-4 w-1/2">
                              <label className="text-sm font-semibold text-gray-700">Stage:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseStage}
                              </label>
                            </div>

                            {/* Stage Type */}
                            <div className="flex flex-col mb-4 w-1/2">
                              <label className="text-sm font-semibold text-gray-700">Stage Type:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseStageType}
                              </label>
                            </div>
                          </div>

                          <h2 className="text-xl font-bold my-4">Patient Status</h2>

                          <Separator className='mb-4' />

                          <div className="flex w-full gap-4">
                            {/* Alive */}
                            <div className="flex flex-col mb-4 w-1/5">
                              <label className="text-sm font-semibold text-gray-700">Alive:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseStatus.dxstatusAlive === "Y" ? "Yes" : "No"}
                              </label>
                            </div>

                            {/* Symptoms */}
                            <div className="flex flex-col mb-4 w-1/5">
                              <label className="text-sm font-semibold text-gray-700">Symptoms:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseStatus.dxstatusSymptoms === "Y" ? "Yes" : "No"}
                              </label>
                            </div>

                            {/* Recurrence */}
                            <div className="flex flex-col mb-4 w-1/5">
                              <label className="text-sm font-semibold text-gray-700">Recurrence:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseStatus.dxstatusRecurrence === "Y" ? "Yes" : "No"}
                              </label>
                            </div>

                            {/* Metastatic */}
                            <div className="flex flex-col mb-4 w-1/5">
                              <label className="text-sm font-semibold text-gray-700">Metastatic:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseStatus.dxstatusMetastatic === "Y" ? "Yes" : "No"}
                              </label>
                            </div>

                            {/* Curative */}
                            <div className="flex flex-col mb-4 w-1/5">
                              <label className="text-sm font-semibold text-gray-700">Curative:</label>
                              <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                                {diseaseData.diseaseStatus.dxstatusCurative === "Y" ? "Yes" : "No"}
                              </label>
                            </div>
                          </div>
                        </div>

                      ) : (
                        <div>No disease profile available.</div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="Treatment" className='text-black'>
                    <Tabs defaultValue="Treatment" className="mt-10">
                      <TabsList className='py-6'>
                        <TabsTrigger className="w-[8.5rem] py-2 data-[state=active]:text-white" value="Treatment">Treatment</TabsTrigger>
                        <TabsTrigger className="w-[8.5rem] py-2 data-[state=active]:text-white" value="Surgery">Surgery</TabsTrigger>
                        <TabsTrigger className="w-[8.5rem] py-2 data-[state=active]:text-white" value="Radiotherapy">Radiotherapy</TabsTrigger>
                        <TabsTrigger className="w-[8.5rem] py-2 data-[state=active]:text-white" value="Hormonal">Hormonal</TabsTrigger>
                        <TabsTrigger className="w-[8.5rem] py-2 data-[state=active]:text-white" value="Immunotherapy">Immunotherapy</TabsTrigger>
                        <TabsTrigger className="w-[8.5rem]   py-2 data-[state=active]:text-white" value="Chemotherapy">Chemotherapy</TabsTrigger>
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
                                <label className="text-sm font-semibold text-gray-700">Hormonal:</label>
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
                  </TabsContent>
                  <TabsContent value="Schedule" className='text-black w-[76%]'>
                    <div className="mx-auto p-6 bg-white w-full">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Schedule Checkup</h2>
                      <form onSubmit={handleSubmitSchedule} className="space-y-4">
                        <div className="flex flex-col w-full">
                          <label
                            htmlFor="checkup_request_date"
                            className="text-sm font-semibold text-gray-700"
                          >
                            Request Date
                          </label>
                          <input
                            type="date"
                            id="checkup_request_date"
                            name="checkup_request_date"
                            value={scheduleConsultFormData.checkup_request_date}
                            onChange={handleScheduleChange}
                            className={`mt-1 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                            required
                          />
                        </div>

                        <div className="flex w-full gap-4">
                          <div className="flex flex-col w-1/2">
                            <label
                              htmlFor="checkup_start_time"
                              className="text-sm font-semibold text-gray-700"
                            >
                              Start Time
                            </label>
                            <input
                              type="datetime-local"
                              id="checkup_start_time"
                              name="checkup_start_time"
                              value={scheduleConsultFormData.checkup_start_time.replace(" ", "T")}
                              onChange={(e) => {
                                const formattedValue = e.target.value.replace("T", " ") + ":00";
                                setScheduleConsultFormData((prevState) => ({
                                  ...prevState,
                                  checkup_start_time: formattedValue,
                                }));
                              }}
                              className={`mt-1 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                              required
                            />
                          </div>

                          <div className="flex flex-col w-1/2">
                            <label
                              htmlFor="checkup_end_time"
                              className="text-sm font-semibold text-gray-700"
                            >
                              End Time
                            </label>
                            <input
                              type="datetime-local"
                              id="checkup_end_time"
                              name="checkup_end_time"
                              value={scheduleConsultFormData.checkup_end_time.replace(" ", "T")}
                              onChange={(e) => {
                                const formattedValue = e.target.value.replace("T", " ") + ":00";
                                setScheduleConsultFormData((prevState) => ({
                                  ...prevState,
                                  checkup_end_time: formattedValue,
                                }));
                              }}
                              className={`mt-1 p-2 border rounded focus:outline-none focus:border-red-500 text-black`}
                              required
                            />
                          </div>
                        </div>

                        <div className="flex flex-col w-full">
                          <label
                            htmlFor="checkup_status_id"
                            className="text-sm font-semibold text-gray-700"
                          >
                            Status
                          </label>
                          <select
                            id="checkup_status_id"
                            name="checkup_status_id"
                            value={scheduleConsultFormData.checkup_status_id}
                            onChange={handleScheduleChange}
                            className={`mt-1 p-2 border rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 hover:shadow-md transition-all duration-200 `}
                            required
                          >
                            <option value="" disabled>
                              Select status
                            </option>
                            <option value="1">Request</option>
                            <option value="2">Confirmed</option>
                            <option value="3">Done</option>
                            <option value="4">Cancelled</option>
                          </select>

                        </div>

                        <button
                          type="submit"
                          className="w-full bg-red-900 text-white py-2 px-4 rounded-md hover:bg-red-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Schedule Checkup
                        </button>
                      </form>
                    </div>

                  </TabsContent>
                  <TabsContent value="Consult" className='text-black w-[74%]'>
                    <div className="flex w-full py-8 overflow-y-auto max-h-[55%]">
                      <form className="flex flex-col gap-6 pb-20 w-full px-2" onSubmit={handleSubmitConsult}>
                        <div className="flex flex-col">
                          <label className="text-sm font-semibold text-black">Subjective</label>
                          <input
                            name="CONSULT_SUBJECTIVE"
                            value={formDataConsult.CONSULT_SUBJECTIVE}
                            onChange={handleChangeConsult}
                            className={`mt-1 p-2 text-black border ${errors.CONSULT_SUBJECTIVE ? "border-red-500" : "border-gray-300"} rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                          />
                          {errors.CONSULT_SUBJECTIVE && <p className="text-red-500 text-xs mt-1">{errors.CONSULT_SUBJECTIVE}</p>}
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm font-semibold text-black">Objective</label>
                          <textarea
                            name="CONSULT_OBJECTIVE"
                            value={formDataConsult.CONSULT_OBJECTIVE}
                            onChange={handleChangeConsult}
                            className={`mt-1 p-2 min-h-40 text-black border ${errors.CONSULT_OBJECTIVE ? "border-red-500" : "border-gray-300"} rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                            rows={10}
                          />
                          {errors.CONSULT_OBJECTIVE && <p className="text-red-500 text-xs mt-1">{errors.CONSULT_OBJECTIVE}</p>}
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm font-semibold text-black">Assessment</label>
                          <input
                            name="CONSULT_ASSESSMENT"
                            value={formDataConsult.CONSULT_ASSESSMENT}
                            onChange={handleChangeConsult}
                            className={`mt-1 p-2 text-black border ${errors.CONSULT_ASSESSMENT ? "border-red-500" : "border-gray-300"} rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                          />
                          {errors.CONSULT_ASSESSMENT && <p className="text-red-500 text-xs mt-1">{errors.CONSULT_ASSESSMENT}</p>}
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm font-semibold text-black">RX Plan</label>
                          <textarea
                            name="CONSULT_RXPLAN"
                            value={formDataConsult.CONSULT_RXPLAN}
                            onChange={handleChangeConsult}
                            className={`mt-1 p-2 min-h-40 text-black border ${errors.CONSULT_RXPLAN ? "border-red-500" : "border-gray-300"} rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                            rows={10}
                          />
                          {errors.CONSULT_RXPLAN && <p className="text-red-500 text-xs mt-1">{errors.CONSULT_RXPLAN}</p>}
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm font-semibold text-black">Surveillance/Workup</label>
                          <input
                            name="CONSULT_SURVWORKUP"
                            value={formDataConsult.CONSULT_SURVWORKUP}
                            onChange={handleChangeConsult}
                            className={`mt-1 p-2 text-black border ${errors.CONSULT_SURVWORKUP ? "border-red-500" : "border-gray-300"} rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                          />
                          {errors.CONSULT_SURVWORKUP && <p className="text-red-500 text-xs mt-1">{errors.CONSULT_SURVWORKUP}</p>}
                        </div>

                        <div className="flex flex-col">
                          <label className="text-sm font-semibold text-black">Patient Status</label>
                          <select
                            name="CONSULT_PATIENTSTATUS"
                            value={formDataConsult.CONSULT_PATIENTSTATUS}
                            onChange={handleChangeConsult}
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
                    </div>
                  </TabsContent>
                  <TabsContent value="Message" className='text-black w-[76%]'>
                    <div className="w-full bg-white flex flex-col items-center px-6">
                      <div className="w-full max-w-4xl bg-white rounded-lg">
                        <form className="p-6 rounded-lg flex flex-col gap-4" onSubmit={handleSubmitMessage}>
                          {/* TO Input */}
                          <div className="flex flex-col w-full relative">
                            <label htmlFor="familyName" className="text-sm pb font-semibold">
                              TO:
                            </label>
                            <label className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 text-black">
                              {patientSearchTerm}
                            </label>
                          </div>

                          {/* Title Input */}
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold">SUBJECT:</label>
                            <input
                              type="text"
                              name="title"
                              value={notificationData.title}
                              onChange={handleInputChange}
                              className="p-2 border rounded mt-1"
                              placeholder="Enter title"
                            />
                          </div>

                          {/* Content Input */}
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold">CONTENT:</label>
                            <textarea
                              name="content"
                              value={notificationData.content}
                              onChange={handleInputChange}
                              rows={10}
                              className="p-2 border rounded mt-1"
                              placeholder="Enter message content"
                            />
                          </div>

                          {/* Submit Button */}
                          <div className="flex justify-center mt-6 text-white">
                            {loading ? (
                              <div className="w-32 py-2 bg-red-900 flex items-center justify-center rounded-lg hover:cursor-not-allowed">
                                <div
                                  className="inline-block h-5 w-5 animate-spin rounded-full border-[3px] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                  role="status">
                                </div>
                                <span className="ml-2 text-white font-semibold">Sending...</span>
                              </div>
                            ) : (
                              <button
                                type="submit"
                                className="w-32 bg-red-900 text-white font-semibold py-2 px-8 rounded-lg shadow-lg hover:bg-red-800 transition duration-200"
                              >
                                Send
                              </button>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
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
                    onClick={() => handleSelectPatient(patient.patientUserId, patient.patientId, patient.userFirstname, patient.userLastname, patient.userEmail)}
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
          className={`w-full h-12 hover:bg-zinc-300 hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/dashboard") || isActive("/") ? "hover:bg-white font-medium pl-8 bg-white text-black" : ""}`}
        >
          <LayoutDashboard /> Dashboard
        </Button>

        <Button
          onClick={() => navigateTo("/enrollPatient")}
          className={`w-full h-12 hover:bg-zinc-300 hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/enrollPatient") ? "hover:bg-white font-medium pl-8 bg-white text-black" : ""}`}
        >
          <ContactRound /> Enroll Patient
        </Button>

        <Button
          onClick={() => navigateTo("/diseaseProfile")}
          className={`w-full h-12 hover:bg-zinc-300 hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/diseaseProfile") ? "hover:bg-white font-medium pl-8 bg-white text-black" : ""}`}
        >
          <Microscope /> Disease Profile
        </Button>

        <Button
          onClick={() => {
            handleClick(); // Retain any existing logic in handleClick
            setCurrentPage(1); // Set the page to 1 for "Treatment History"
          }}
          className={`w-full h-12 hover:bg-zinc-300 hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/treatmentHistory") && (currentPage == 1) ? "hover:bg-white font-medium pl-8 bg-white text-black" : ""}`}
        >
          <ClipboardPlus /> Treatment History
        </Button>

        <div
          className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${isTreatmentPage ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="flex">
            <Separator orientation='vertical' className='absolute bg-[#9c3737] max-h-52 ml-3' />
            <div className="flex flex-col gap-1">
              {subButtons.map((items, index) => (
                <Button
                  key={index}
                  onClick={() => setCurrentPage(index + 2)}
                  className={`w-full h-10 hover:bg-zinc-300 hover:text-black rounded-3xl font-normal bg-transparent shadow-none justify-start text-lg flex gap-3 transition-all ease-in-out duration-100 ml-6
                                ${currentPage === index + 2 ? 'hover:bg-white pl-8 font-medium bg-white text-black' : ''} 
                                ${items.label === 'Chemotherapy' ? 'mb-1' : ''}
                                ${items.label === 'Surgery' ? '-pb-1' : ''}`}
                >
                  {items.icon} {items.label}
                </Button>
              ))}
            </div>
          </div>
        </div>


        <Button
          onClick={() => navigateTo("/consult")}
          className={`w-full h-12 -mt-2 hover:bg-zinc-300 hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/consult") ? "hover:bg-white font-medium pl-8 bg-white text-black" : ""}`}
        >
          <Stethoscope /> Consult
        </Button>

        <Button
          onClick={() => navigateTo("/notification")}
          className={`w-full h-12 hover:bg-zinc-300 hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/notification") ? "hover:bg-white font-medium pl-8 bg-white text-black" : ""}`}
        >
          <Bell /> Notification
        </Button>

        <Button
          onClick={() => navigateTo("/message")}
          className={`w-full h-12 hover:bg-zinc-300 hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100 ${isActive("/message") ? "hover:bg-white font-medium pl-8 bg-white text-black" : ""}`}
        >
          <Mail /> Message
        </Button>

      </div>

      <Dialog>
        <DialogTrigger>
          <Button
            className='w-full h-12 hover:bg-zinc-300 hover:text-black  rounded-3xl font-normal bg-transparent shadow-none justify-start text-xl flex gap-3 transition-all ease-in-out duration-100'
          >
            <LogOut /> Logout
          </Button>
        </DialogTrigger>
        <DialogContent className='bg-zinc-200 p-2'>
          <Alert className='bg-zinc-200 p-4 text-black flex flex-col gap-2'>
            <AlertTitle className='flex gap-1 text-lg font-bold items-center tracking-wide'><Terminal className="h-4 w-4" strokeWidth={3} />Logging Out</AlertTitle>
            <div className='flex flex-col'>
              <AlertDescription>
                Are you sure you want to log out?
                <div className="flex justify-end gap-4">
                  <DialogClose asChild>
                    <Button
                      className='bg-transparent text-black border border-red-900 hover:border-zinc-200 hover:bg-transparent mt-4 shadow-none'
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={handleLogout}
                    className='bg-red-900 hover:bg-red-800 mt-4'
                  >
                    Logout
                  </Button>
                </div>
              </AlertDescription>
            </div>
          </Alert>
        </DialogContent>
      </Dialog>
    </div>
  );
}
