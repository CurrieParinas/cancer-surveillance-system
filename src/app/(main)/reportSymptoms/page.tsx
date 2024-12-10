"use client";

import React, { useEffect, useState } from "react";
import { DiseaseZodSchema } from "@/packages/api/disease-response";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

type DiseaseResponse = z.infer<typeof DiseaseZodSchema>;

interface Symptom {
  symptom_NAME: string;
  symptomsurvey_ID: number;
}

const ReportSymptomsPage = () => {
  const [patientId, setPatientId] = useState("");
  const [diseaseData, setDiseaseData] = useState<DiseaseResponse | null>(null);
  const [bodysiteId, setBodySiteId] = useState<number>(0);
  const [surveyResponseID, setSurveyResponseID] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [symptomNotes, setSymptomNotes] = useState<string>("");

  const [LocalSymptoms, setLocalSymptoms] = useState<Symptom[]>([]);
  const [SelectedLocalSymptoms, setSelectedLocalSymptoms] = useState<Symptom[]>([]);

  const [SystemicSymptoms, setSystemicSymptoms] = useState<Symptom[]>([]);
  const [SelectedSystemicSymptoms, setSelectedSystemicSymptoms] = useState<Symptom[]>([]);

  const [QualitySymptoms, setQualitySymptoms] = useState<Symptom[]>([]);
  const [SelectedQualitySymptoms, setSelectedQualitySymptoms] = useState<Symptom[]>([]);

  const [TreatmentEffectsSymptoms, setTreatmentEffectsSymptoms] = useState<Symptom[]>([]);
  const [SelectedTreatmentEffectsSymptoms, setSelectedTreatmentEffectsSymptoms] = useState<Symptom[]>([]);

  const [TreatmentcompletionOptions, setTreatmentcompletionOptions] = useState<Symptom[]>([
    { symptom_NAME: "Surgery", symptomsurvey_ID: 1 },
    { symptom_NAME: "Second surgery", symptomsurvey_ID: 2 },
    { symptom_NAME: "Chemotherapy", symptomsurvey_ID: 3 },
    { symptom_NAME: "Hormonal therapy", symptomsurvey_ID: 4 },
    { symptom_NAME: "Immunotherapy", symptomsurvey_ID: 5 },
    { symptom_NAME: "Radiotherapy", symptomsurvey_ID: 6 },
  ]);
  const [SelectedTreatmentcompletion, setSelectedTreatmentcompletion] = useState<Symptom[]>([]);

  const [doctorId, setDoctorId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      console.log(patientId)
      try {
        const response = await fetch(
          `http://localhost:8080/css/doctor/finddoctorsbypatient?patientID=${patientId}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const doctorData = await response.json();
        setDoctorId(doctorData[0].doctorId);
      } catch (err) {
        console.error("Failed to fetch doctor data:", err);
      }
    };

    fetchDoctorData();
  }, [patientId]);


  useEffect(() => {
    const fetchDiseaseData = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setPatientId(parsedUserData.patientId)
        try {
          const response = await fetch(
            `http://localhost:8080/css/disease/getbypatientid?patientID=${parsedUserData.patientId}`
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

          const jsonResponse = await response.json();
          const validatedData = DiseaseZodSchema.parse(jsonResponse);
          setDiseaseData(validatedData);
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
    const fetchSymptoms = async (
      endpoint: string,
      setter: React.Dispatch<React.SetStateAction<Symptom[]>>
    ) => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: Symptom[] = await response.json();
        setter(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (bodysiteId) {
      fetchSymptoms(
        `http://localhost:8080/css/symptom/survey/symptomname/ls?cancerType=${bodysiteId}`,
        setLocalSymptoms
      );
      fetchSymptoms(
        `http://localhost:8080/css/symptom/survey/symptomname/ss?cancerType=${bodysiteId}`,
        setSystemicSymptoms
      );
      fetchSymptoms(
        `http://localhost:8080/css/symptom/survey/symptomname/qol?cancerType=${bodysiteId}`,
        setQualitySymptoms
      );
      fetchSymptoms(
        `http://localhost:8080/css/symptom/survey/symptomname/tse?cancerType=${bodysiteId}`,
        setTreatmentEffectsSymptoms
      );
    }
  }, [bodysiteId]);

  const handleSymptomClick = (
    symptom: Symptom,
    category: "local" | "systemic" | "quality" | "treatment" | "completion"
  ) => {
    if (category === "local") {
      setLocalSymptoms((prev) => prev.filter((s) => s.symptom_NAME !== symptom.symptom_NAME));
      setSelectedLocalSymptoms((prev) => [...prev, symptom]);
    } else if (category === "systemic") {
      setSystemicSymptoms((prev) => prev.filter((s) => s.symptom_NAME !== symptom.symptom_NAME));
      setSelectedSystemicSymptoms((prev) => [...prev, symptom]);
    } else if (category === "quality") {
      setQualitySymptoms((prev) => prev.filter((s) => s.symptom_NAME !== symptom.symptom_NAME));
      setSelectedQualitySymptoms((prev) => [...prev, symptom]);
    } else if (category === "treatment") {
      setTreatmentEffectsSymptoms((prev) => prev.filter((s) => s.symptom_NAME !== symptom.symptom_NAME));
      setSelectedTreatmentEffectsSymptoms((prev) => [...prev, symptom]);
    } else if (category === "completion") {
      setTreatmentcompletionOptions((prev) => prev.filter((s) => s.symptom_NAME !== symptom.symptom_NAME));
      setSelectedTreatmentcompletion((prev) => [...prev, symptom]);
    }
  };

  const handleRemoveSymptom = (
    symptom: Symptom,
    category: "local" | "systemic" | "quality" | "treatment" | "completion"
  ) => {
    if (category === "local") {
      setSelectedLocalSymptoms((prev) =>
        prev.filter((s) => s.symptom_NAME !== symptom.symptom_NAME)
      );
      setLocalSymptoms((prev) => [...prev, symptom]);
    } else if (category === "systemic") {
      setSelectedSystemicSymptoms((prev) =>
        prev.filter((s) => s.symptom_NAME !== symptom.symptom_NAME)
      );
      setSystemicSymptoms((prev) => [...prev, symptom]);
    } else if (category === "quality") {
      setSelectedQualitySymptoms((prev) =>
        prev.filter((s) => s.symptom_NAME !== symptom.symptom_NAME)
      );
      setQualitySymptoms((prev) => [...prev, symptom]);
    } else if (category === "treatment") {
      setSelectedTreatmentEffectsSymptoms((prev) =>
        prev.filter((s) => s.symptom_NAME !== symptom.symptom_NAME)
      );
      setTreatmentEffectsSymptoms((prev) => [...prev, symptom]);
    } else if (category === "completion") {
      setSelectedTreatmentcompletion((prev) =>
        prev.filter((s) => s.symptom_NAME !== symptom.symptom_NAME)
      );
      setTreatmentcompletionOptions((prev) => [...prev, symptom]);
    }
  };

  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const responseDoctorId = await fetch(
        `http://localhost:8080/css/doctor/finddoctorsbypatient?patientID=${patientId}`
      );

      if (!responseDoctorId.ok) {
        throw new Error(`Error: ${responseDoctorId.status} ${responseDoctorId.statusText}`);
      }

      console.log("TEST1");

      const doctorData = await responseDoctorId.json();

      if (!doctorData || doctorData.length === 0 || !doctorData[0].doctorId) {
        throw new Error("Doctor data is missing or invalid.");
      }

      const doctorId = doctorData[0].doctorId;
      console.log("Doctor ID:", doctorId);

      const response = await fetch(
        `http://localhost:8080/css/surveyresponse/existing?patientID=${patientId}&doctorID=${doctorId}`
      );

      console.log("TEST1.1", patientId, "AND", doctorId);

      if (!response.ok) {
        console.log("RESPONSE NOT OK");
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      console.log("Content-Type:", response.headers.get("Content-Type"));

      // Read response as text first
      const responseText = await response.text();
      console.log("Raw Response Text:", responseText);

      // Parse the text as JSON if it's not empty
      const responseBody = responseText ? JSON.parse(responseText) : {};
      console.log("Parsed Response Body:", responseBody);

      console.log("TEST2");

      try {
        // Retrieve or create the survey response ID
        let currentSurveyResponseID = surveyResponseID; // Default to the state value

        if (responseBody && Object.keys(responseBody).length > 0) {
          currentSurveyResponseID = responseBody.surveyResponseID;
          setSurveyResponseID(currentSurveyResponseID); // Update the state for consistency
        } else {
          const now = new Date();
          const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
            now.getDate()
          ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(
            2,
            "0"
          )}:${String(now.getSeconds()).padStart(2, "0")}`;

          const addResponse = await fetch("http://localhost:8080/css/surveyresponse/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              patient_id: patientId,
              doctor_id: doctorId,
              survey_response_date: formattedDate,
              response_note: symptomNotes,
            }),
          });

          if (!addResponse.ok) {
            throw new Error(`Failed to add survey response: ${addResponse.status} ${addResponse.statusText}`);
          }

          const addResponseBody = await addResponse.json();
          console.log("Survey response added successfully:", addResponseBody);
          currentSurveyResponseID = addResponseBody.surveyResponseID;
          setSurveyResponseID(currentSurveyResponseID); // Update the state for consistency
        }

        // Submit symptoms using the correct survey response ID
        const allSymptoms = [
          ...SelectedLocalSymptoms,
          ...SelectedQualitySymptoms,
          ...SelectedTreatmentEffectsSymptoms,
          ...SelectedTreatmentcompletion,
          ...SelectedSystemicSymptoms,
        ];

        const submissionPromises = allSymptoms.map((symptom) =>
          fetch(`http://localhost:8080/css/symptom/report/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              symptomSurveyId: symptom.symptomsurvey_ID,
              surveyResponseId: currentSurveyResponseID, // Use the resolved value
            }),
          }).then((response) => {
            if (!response.ok) {
              throw new Error(`Error submitting symptom: ${response.statusText}`);
            }
          })
        );

        await Promise.all(submissionPromises);
        console.log("All symptoms submitted successfully.");

        // Clear the selected symptoms
        setSelectedLocalSymptoms([]);
        setSelectedSystemicSymptoms([]);
        setSelectedQualitySymptoms([]);
        setSelectedTreatmentEffectsSymptoms([]);
        setSelectedTreatmentcompletion([]);
        setSymptomNotes("");
      } catch (error) {
        console.error("Error submitting symptoms:", error);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };


  const handleSymptomNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSymptomNotes(e.target.value);
  };

  return (
    <div className="w-5/6 bg-zinc-50 flex flex-col items-center px-6 pb-12">
      <div className="w-6/12 h-auto mt-12 p-2 text-center">
        <p className="font-bold text-6xl text-red-900 text-nowrap tracking-wide">REPORT SYMPTOMS</p>
      </div>
      <form className="w-6/12 mt-8 flex flex-col gap-4">
        <SymptomCategory
          title="Local Symptoms"
          subtitle="*Please select symptom/s you are experiencing"
          symptoms={LocalSymptoms}
          selectedSymptoms={SelectedLocalSymptoms}
          onSymptomClick={(symptom: Symptom) => handleSymptomClick(symptom, "local")}
          onRemoveSymptom={(symptom) => handleRemoveSymptom(symptom, "local")}
        />
        <SymptomCategory
          title="Systemic Symptoms"
          subtitle="*Please select symptom/s you are experiencing"
          symptoms={SystemicSymptoms}
          selectedSymptoms={SelectedSystemicSymptoms}
          onSymptomClick={(symptom) => handleSymptomClick(symptom, "systemic")}
          onRemoveSymptom={(symptom) => handleRemoveSymptom(symptom, "systemic")}
        />
        <SymptomCategory
          title="Quality of Life Symptoms"
          symptoms={QualitySymptoms}
          selectedSymptoms={SelectedQualitySymptoms}
          onSymptomClick={(symptom) => handleSymptomClick(symptom, "quality")}
          onRemoveSymptom={(symptom) => handleRemoveSymptom(symptom, "quality")}
        />
        <SymptomCategory
          title="Treatment Side Effects"
          symptoms={TreatmentEffectsSymptoms}
          selectedSymptoms={SelectedTreatmentEffectsSymptoms}
          onSymptomClick={(symptom) => handleSymptomClick(symptom, "treatment")}
          onRemoveSymptom={(symptom) => handleRemoveSymptom(symptom, "treatment")}
        />
        <SymptomCategory
          title="Treatment Completion"
          subtitle="*Please select treatment/s you already received"
          symptoms={TreatmentcompletionOptions}
          selectedSymptoms={SelectedTreatmentcompletion}
          onSymptomClick={(symptom) => handleSymptomClick(symptom, "completion")}
          onRemoveSymptom={(symptom) => handleRemoveSymptom(symptom, "completion")}
        />
        <div className="p-4 bg-white shadow-md rounded-lg border border-zinc-200">
          <h3 className="font-bold text-xl text-gray-800 mb-2">Symptoms Notes:</h3>
          <p className="text-gray-600 text-sm mb-4 -mt-1">*Please add any other symptoms you are feeling</p>
          <Separator />

          <div className="flex gap-4 py-8">
            <textarea
              className="w-full border border-zinc-200 rounded-lg focus:outline-none focus:border-red-200 text-black p-2"
              placeholder=" Add symptoms notes here..."
              rows={5}
              value={symptomNotes}
              onChange={handleSymptomNotesChange}
            />
          </div>
        </div>
        <div className="flex justify-center">
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
      </form>
    </div>
  );
};

const SymptomCategory = ({
  title,
  subtitle,
  symptoms,
  selectedSymptoms,
  onSymptomClick,
  onRemoveSymptom,
}: {
  title: string;
  subtitle?: string;
  symptoms: Symptom[];
  selectedSymptoms: Symptom[];
  onSymptomClick: (symptom: Symptom) => void;
  onRemoveSymptom: (symptom: Symptom) => void;
}) => {
  if (symptoms.length === 0 && selectedSymptoms.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg border border-zinc-200">
      <h3 className="font-bold text-xl text-gray-800 mb-2">{title}</h3>
      {subtitle && <p className="text-gray-600 text-sm mb-4 -mt-1">{subtitle}</p>}
      <Separator />

      <div className="flex gap-4 py-8">
        {title !== "Treatment Completion" ? (
          <div className="flex h-14">
            <Label className="text-black text-lg text-nowrap">I am feeling...</Label>
          </div>
        ) : (
          <Label className="text-black text-lg text-nowrap">I already received...</Label>
        )}
        {selectedSymptoms.length > 0 && (
          <div className="flex flex-wrap gap-3 -my-2">
            {selectedSymptoms.map((symptom, index) => (
              <span
                key={index}
                className="bg-red-100 text-red-900 px-4 h-10 rounded-full flex items-center gap-3 transition-transform transform hover:scale-105 shadow-md border-red-200 border"
              >
                {symptom.symptom_NAME}
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 transition"
                  onClick={() => onRemoveSymptom(symptom)}
                >
                  <X />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Render symptom list only if there are any */}
      {symptoms.length > 0 && (
        <div>
          <Label className="text-zinc-500 tracking-wide">Select if applicable:</Label>
          <ul className="flex gap-4 pt-1 flex-wrap">
            {symptoms.map((symptom, index) => (
              <li
                key={index}
                className="text-gray-700 cursor-pointer text-nowrap hover:text-red-600 hover:bg-red-100 py-2 px-4 shadow-md border-zinc-200  border rounded-full transition"
                onClick={() => onSymptomClick(symptom)}
              >
                {symptom.symptom_NAME}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReportSymptomsPage;
