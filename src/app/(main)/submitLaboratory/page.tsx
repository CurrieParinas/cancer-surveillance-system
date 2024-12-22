'use client';

import { Separator } from '@/components/ui/separator';
import { DiseaseZodSchema } from '@/packages/api/disease-response';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import Dropzone from '@/components/ui/dropzone';
import { Label } from '@/components/ui/label';

type DiseaseResponse = z.infer<typeof DiseaseZodSchema>;
interface WorkupData {
  workup_TYPE: string;
  workup_REFERRAL: string | null;
  workup_DURATION: number;
  workup_NAME: string;
  workup_FREQUENCY: number;
  workup_INDICATION: string;
}

interface Workup {
  workupID: number;
  workupName: string;
  // Add other fields from the API response if needed
}

const SubmitLaboratoryPage = () => {
  const [, setDiseaseData] = useState<DiseaseResponse | null>(null);
  const [, setBodySiteName] = useState("");
  const [bodysiteId, setBodySiteId] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [workups, setWorkups] = useState<WorkupData[]>([]);
  const [selectedWorkup, setSelectedWorkup] = useState<string>("");
  const [labfile, setLabfile] = useState<File | null>(null);
  const [, setFileList] = useState<string[]>([]);
  const [patientId, setPatientId] = useState<number | null>(null);
  const [resetDropzone, setResetDropzone] = useState<boolean>(false);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setPatientId(parsedUserData.patientId);

        // const birthDate = new Date(parsedUserData.user.userBirthdate);
        // const age = new Date().getFullYear() - birthDate.getFullYear();
        // const isBeforeBirthday =
        //   new Date().getMonth() < birthDate.getMonth() ||
        //   (new Date().getMonth() === birthDate.getMonth() &&
        //     new Date().getDate() < birthDate.getDate());
        // const calculatedAge = isBeforeBirthday ? age - 1 : age;
      } catch (error) {
        console.error("Invalid user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchDiseaseData = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}css/disease/getbypatientid?patientID=${parsedUserData.patientId}`
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

          const jsonResponse = await response.json();
          const validatedData = DiseaseZodSchema.parse(jsonResponse);
          setDiseaseData(validatedData);
          setBodySiteName(validatedData.bodySite.bodysiteName);
          setBodySiteId(validatedData.bodySite.bodysiteId);
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
      }
    };

    fetchDiseaseData();
  }, []);

  useEffect(() => {
    const fetchWorkups = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}css/workup/fetchbycancertype?cancerType=${bodysiteId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch workup data.");
        }
        const data: WorkupData[] = await response.json();
        setWorkups(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkups();
  }, [bodysiteId]);

  const handleSelectionChange = (workupName: string) => {
    setSelectedWorkup(workupName);
  };

  const handleSubmit = async () => {
    let workup_id;
    let doctorData;
    setLoading(true);

    try {
      const responseDoctorId = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}css/doctor/finddoctorsbypatient?patientID=${patientId}`
      );

      if (!responseDoctorId.ok) {
        throw new Error(`Error: ${responseDoctorId.status} ${responseDoctorId.statusText}`);
      }

      doctorData = await responseDoctorId.json();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/workup/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Workup[] = await response.json();
      const workup = data.find(item => item.workupName === selectedWorkup);

      if (workup) {
        workup_id = workup.workupID;
      } else {
        setError("Please select a work up.")
        console.error(`Workup with name "${selectedWorkup}" not found.`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching workup data: ${(error as Error).message}`);
    }

    const formDataToSend = new FormData();

    const payload = {
      patient_id: patientId,
      doctor_id: doctorData[0].doctorId,
      lab_submission_date: new Date().toISOString().slice(0, 19).replace("T", " "),
      workup_name_id: workup_id,
    };

    formDataToSend.append("addLabSubmittedRequest", new Blob([JSON.stringify(payload)], { type: "application/json" }));

    if (labfile) {
      formDataToSend.append("labFileLocation", labfile);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/lab/submit/add`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit laboratory data.");
      }

      // setWorkups(prevWorkups => prevWorkups.filter(workup => workup.workup_NAME !== selectedWorkup));

      setSelectedWorkup("");
      setLabfile(null)
      setFileList([]);
      setResetDropzone(true);
      setTimeout(() => setResetDropzone(false), 1000);
      alert("Lab data submitted successfully!");
    } catch (error) {
      console.error("Error: ", error);
      setError("Failed to submit lab data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-5/6 bg-zinc-100 flex flex-col items-center px-6">
      <div className="w-6/12 h-auto mt-12 p-2 text-center">
        <p className="font-bold text-6xl text-red-900 text-nowrap tracking-wide">
          LABORATORY RESULTS
        </p>
      </div>
      <div className="w-full max-w-7xl mt-8 p-6 bg-white rounded-lg">
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900">Work Up Names</h2>
          <Separator className="mb-4 mt-2" />
          <div className="flex gap-4">
            <div className="space-y-4 w-2/6">
              {workups.length > 0 ? (
                <form className="space-y-6">
                  {workups.map((workup, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out bg-white"
                    >
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="workup"
                          value={workup.workup_NAME}
                          checked={selectedWorkup === workup.workup_NAME}
                          onChange={() => handleSelectionChange(workup.workup_NAME)}
                          className="form-radio h-5 w-5 text-red-900 focus:ring focus:ring-red-200"
                        />
                        <div className="text-gray-800">
                          <p className="font-medium text-lg">{workup.workup_NAME} - {workup.workup_INDICATION}</p>
                          <p className="text-sm text-gray-600">
                            {workup.workup_TYPE}
                          </p>
                          {workup.workup_REFERRAL && (
                            <p className="text-sm text-red-900">
                              {workup.workup_REFERRAL}
                            </p>
                          )}
                        </div>
                      </label>
                    </div>
                  ))}
                </form>
              ) : (
                <p className="text-gray-500 text-center w-2/6">Loading workups...</p>
              )}
            </div>
            <div className="flex flex-col w-4/6 gap-4">
              <div className="flex flex-col py-2 justify-center items-center">
                <Label className="text-black text-lg pb-4 self-start">Upload file</Label>
                <Dropzone
                  className='w-full'
                  onChange={setFileList}
                  setLabfile={setLabfile}
                  resetDropzone={resetDropzone}  // Pass the reset state to Dropzone
                />
                {loading ? (
                  <div className="flex justify-center items-center mt-6 px-4 py-2 w-40 bg-red-900 text-white rounded-lg hover:cursor-not-allowed">
                    <div
                      className="inline-block h-5 w-5 animate-spin rounded-full border-[3px] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                      role="status">
                    </div>
                    <span className="ml-2 text-white font-semibold">Sending...</span>
                  </div>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="mt-6 px-4 py-2 w-40 bg-red-900 text-white rounded-lg hover:bg-red-800"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SubmitLaboratoryPage;
