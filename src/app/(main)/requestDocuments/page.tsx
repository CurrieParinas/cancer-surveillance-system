"use client";

import React, { useCallback, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DiseaseZodSchema } from "@/packages/api/disease-response";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";

type DiseaseResponse = z.infer<typeof DiseaseZodSchema>;

interface WorkupData {
  workup_TYPE: string;
  workup_REFERRAL: string | null;
  workup_DURATION: number;
  workup_NAME: string;
  workup_FREQUENCY: number;
  workup_INDICATION: string;
}

const RequestDocumentsPage = () => {
  const [selectedReferral, setSelectedReferral] = useState<string | undefined>("");

  const [, setDiseaseData] = useState<DiseaseResponse | null>(null);
  const [bodysiteName, setBodySiteName] = useState("");
  const [bodysiteId, setBodySiteId] = useState<number>(0);
  const [, setError] = useState<string | null>(null);

  const [userInfo, setUserInfo] = useState({
    lastName: "",
    firstName: "",
    middleInitial: "",
    age: 0,
    sex: "",
    birthdate: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);

        const birthDate = new Date(parsedUserData.user.userBirthdate);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        const isBeforeBirthday =
          new Date().getMonth() < birthDate.getMonth() ||
          (new Date().getMonth() === birthDate.getMonth() &&
            new Date().getDate() < birthDate.getDate());
        const calculatedAge = isBeforeBirthday ? age - 1 : age;

        setUserInfo({
          lastName: parsedUserData.user.userLastname,
          firstName: parsedUserData.user.userFirstname,
          middleInitial: parsedUserData.user.userMiddlename.charAt(0),
          age: calculatedAge,
          sex: parsedUserData.user.userGender,
          birthdate: parsedUserData.user.userBirthdate,
        });
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
            `http://localhost:8080/css/disease/getbypatientid?patientID=${parsedUserData.patientId}`
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

  const generatePDFContent = (selectedWorkupDisplay: string, selectedReferralDisplay: string | undefined) =>
    `
    <html>
  <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
      body {
        font-family: 'Poppins', Arial, sans-serif;
        margin: 0;
        padding: 0;
        background: #ffffff;
        color: #444;
        line-height: 1.8;
      }
      .container {
        max-width: 900px;
        margin: 50px auto;
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        border: 1px solid #e0e0e0;
      }
      .header {
        background: linear-gradient(135deg, #e53935, #b71c1c);
        color: #fff;
        text-align: center;
        padding: 40px 20px;
        font-size: 36px;
        font-weight: 600;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        border-bottom: 5px solid #e0e0e0;
      }
      .section {
        padding: 30px;
        background: #f9fbfd;
        border-bottom: 1px solid #eaeaea;
      }
      .section:last-child {
        border-bottom: none;
      }
      .section h2 {
        font-size: 24px;
        margin-bottom: 20px;
        color: #333;
        text-transform: uppercase;
        padding-left: 15px;
        font-weight: 600;
      }
      .details {
        margin-top: 15px;
        padding-left: 15px;
      }
      .details p {
        margin: 12px 0;
        font-size: 18px;
        color: #555;
      }
      .details p span {
        font-weight: 600;
        color: #222;
      }
      .footer {
        text-align: center;
        padding: 25px;
        background: #f3f3f3;
        font-size: 16px;
        color: #777;
        font-style: italic;
        border-top: 1px solid #eaeaea;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Laboratory Request Form</div>
      <div class="section">
        <h2>User Details</h2>
        <div class="details">
          <p><span>Name:</span> ${userInfo.firstName} ${userInfo.middleInitial}. ${userInfo.lastName}</p>
          <p><span>Age:</span> ${userInfo.age}</p>
          <p><span>Birthdate:</span> ${userInfo.birthdate}</p>
          <p><span>Sex:</span> ${userInfo.sex}</p>
          <p><span>Cancer Type:</span> ${bodysiteName}</p>
        </div>
      </div>
      <div class="section">
        <h2>Work Up</h2>
        <div class="details">
          <p><span>Selected Work Up Name:</span> ${selectedWorkupDisplay || "None"}</p>
        </div>
      </div>
      <div class="section">
        <h2>Referral</h2>
        <div class="details">
          <p><span>Selected Referral:</span> ${selectedReferralDisplay || "None"}</p>
        </div>
      </div>
      <div class="footer">
        &copy; 2024 Cancer Surveillance System. All rights reserved.
      </div>
    </div>
  </body>
</html>
  `;

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const downloadPDF = () => {
    if (!userInfo.firstName) {
      alert("User information is not available.");
      return;
    }

    if (!selectedWorkup) {
      alert("Please select a workup before downloading.");
      return;
    }

    const content = generatePDFContent(selectedWorkup, selectedReferral ?? "None");
    const container = document.createElement("div");
    container.innerHTML = content;
    container.style.width = "794px"; // Match A4 proportions in pixels for 96 DPI
    document.body.appendChild(container);

    html2canvas(container, {
      scale: 2, // Increase scale for better resolution
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // PDF dimensions for A4 size in portrait orientation
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm

      // Calculate the scaled-down dimensions for the image
      const imageWidth = pdfWidth * 0.7; // Scale down to 80% of the page width
      const imageHeight = (canvas.height * imageWidth) / canvas.width; // Maintain aspect ratio

      // Center the image within the page
      const marginX = (pdfWidth - imageWidth) / 2;
      const marginY = (pdfHeight - imageHeight) / 2;

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      doc.addImage(imgData, "PNG", marginX, marginY, imageWidth, imageHeight);
      const sanitizedWorkupName = selectedWorkup.replace(/[^a-zA-Z0-9]/g, "_");
      doc.save(`${sanitizedWorkupName}_${userInfo.lastName}.pdf`);
      document.body.removeChild(container);
    });
  };

  const [workups, setWorkups] = useState<WorkupData[]>([]);
  const [selectedWorkup, setSelectedWorkup] = useState<string>("");

  useEffect(() => {
    const fetchWorkups = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/css/workup/fetchbycancertype?cancerType=${bodysiteId}`
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

  const handleSelectionChange = (workupName: string, workupReferral?: string | null) => {
    setSelectedWorkup(workupName);
    setSelectedReferral(workupReferral ?? "None");
  };

  const generatePDFPreview = useCallback(async () => {
    if (!userInfo.firstName || !selectedWorkup) {
      setPdfUrl(null);
      return;
    }

    const content = generatePDFContent(selectedWorkup, selectedReferral ?? "None");

    // Create the container
    const container = document.createElement("div");
    container.innerHTML = content;

    // Add an image to the container
    const imageElement = document.createElement("img");
    imageElement.src = "/path-to-your-image.jpg"; // Replace with your image URL or base64 string
    imageElement.style.width = "100%"; // Adjust as necessary
    imageElement.style.marginBottom = "20px"; // Optional styling
    container.prepend(imageElement); // Add the image at the top

    container.style.width = "794px"; // Match A4 proportions in pixels for 96 DPI
    document.body.appendChild(container);

    // Render as canvas
    const canvas = await html2canvas(container, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Create the PDF
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const imageWidth = pdfWidth * 0.7; // Scale down to 80% of the page width
    const imageHeight = (canvas.height * imageWidth) / canvas.width; // Maintain aspect ratio
    const marginX = (pdfWidth - imageWidth) / 2;
    const marginY = (pdfHeight - imageHeight) / 2;

    doc.addImage(imgData, "PNG", marginX, marginY, imageWidth, imageHeight);

    const blob = doc.output("blob");
    const pdfBlobUrl = URL.createObjectURL(blob);
    setPdfUrl(pdfBlobUrl);

    document.body.removeChild(container);
  }, [userInfo.firstName, selectedWorkup, selectedReferral, generatePDFContent]);

  useEffect(() => {
    generatePDFPreview();
  }, [generatePDFPreview]);

  return (
    <div className="w-5/6 bg-zinc-100 flex flex-col items-center px-6">
      <div className="w-6/12 h-auto mt-12 p-2 text-center">
        <p className="font-bold text-6xl text-red-900 text-nowrap tracking-wide">
          LABORATORY REQUEST
        </p>
      </div>

      <div className="w-full max-w-7xl mt-8 p-6 bg-white rounded-lg">
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900">
            Work Up Names
          </h2>
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
                          onChange={() => handleSelectionChange(workup.workup_NAME, workup.workup_REFERRAL)}
                          className="form-radio h-5 w-5 text-red-900 focus:ring focus:ring-red-200"
                        />
                        <div className="text-gray-800">
                          <p className="font-medium text-lg">{workup.workup_NAME} - {workup.workup_INDICATION}</p>
                          <p className="text-sm text-gray-600">
                            {workup.workup_TYPE}
                          </p>
                          {workup.workup_REFERRAL && (
                            <div className="text-sm flex gap-1">
                              Referral:
                              <p className="text-sm text-red-900">
                                {workup.workup_REFERRAL}
                              </p>
                            </div>
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
              {pdfUrl ? (
                <div className="mt-8 ">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    PDF Preview
                  </h3>
                  <div className="flex w-full justify-center">
                    <iframe
                      src={`${pdfUrl}#view=Fit&pagemode=none`}
                      title="PDF Preview"
                      width="80%"
                      height="600px"
                      className="border rounded"
                    ></iframe>
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-center">
                  <p className="text-gray-500 text-center mt-8 w-4/6">
                    Please select a workup to preview the PDF.
                  </p>
                </div>
              )}
              <div className="text-center">
                <button
                  onClick={downloadPDF}
                  className="px-6 py-2 bg-red-900 text-white font-semibold rounded-full hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RequestDocumentsPage;
