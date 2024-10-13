"use client";

import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

interface FormData {
  lastname: string;
  email: string;
  primary_site: string;
  date_of_diagnosis: string;
  basis_of_diagnosis: string;
  laterality: string;
  histology: string;
  histo_pathology: string;
  histo_tumorSize: string;
  histo_tumorExtension: string;
  histo_tumorGrade: string;
  histo_nodePositive: string;
  histo_nodeHarvest: string;
  histo_negativeMargins: string;
  histo_stage: string;
  extent_of_disease: string;
  tumor_size: string;
  nodal_involvement: string;
  metastasis: string;
  metastatic_site: string;
  multiple_primaries: string;
  other_primary: string;
  stage: string;
  stage_type: string;
  patient_status: string;
  tstage: string;
  nstage: string;
  mstage: string;
}

interface Errors {
  lastname?: string;
  email?: string;
  primary_site?: string;
  date_of_diagnosis?: string;
  basis_of_diagnosis?: string;
  laterality?: string;
  histology?: string;
  histo_pathology?: string;
  histo_tumorSize?: string;
  histo_tumorExtension?: string;
  histo_tumorGrade?: string;
  histo_nodePositive?: string;
  histo_nodeHarvest?: string;
  histo_negativeMargins?: string;
  histo_stage?: string;
  extent_of_disease?: string;
  tumor_size?: string;
  nodal_involvement?: string;
  metastasis?: string;
  metastatic_site?: string;
  multiple_primaries?: string;
  other_primary?: string;
  stage?: string;
  stage_type?: string;
  patient_status?: string;
  tstage?: string;
  nstage?: string;
  mstage?: string;
}

const DiseaseProfile = () => {
  const [formData, setFormData] = useState<FormData>({
    lastname: "",
    email: "",
    primary_site: "",
    date_of_diagnosis: "",
    basis_of_diagnosis: "",
    laterality: "",
    histology: "",
    histo_pathology: "",
    histo_tumorSize: "",
    histo_tumorExtension: "",
    histo_tumorGrade: "",
    histo_nodePositive: "",
    histo_nodeHarvest: "",
    histo_negativeMargins: "",
    histo_stage: "",
    extent_of_disease: "",
    tumor_size: "",
    nodal_involvement: "",
    metastasis: "",
    metastatic_site: "",
    multiple_primaries: "",
    other_primary: "",
    stage: "",
    stage_type: "",
    patient_status: "",
    tstage: "",
    nstage: "",
    mstage: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [diagnosisType, setDiagnosisType] = useState<string>("Non-Microscopic");
  const handleDiagnosisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setDiagnosisType(value);  // Update the diagnosis type
    setFormData((prevData) => ({
      ...prevData,
      basis_of_diagnosis: "",  // Reset any dependent selection
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    console.log("Form submitted successfully", formData);
  };

  const fieldLabels: { [key: string]: string } = {
    histo_pathology: "Pathology",
    histo_tumorSize: "Tumor Size",
    histo_tumorExtension: "Tumor Extension",
    histo_tumorGrade: "Tumor Grade",
    histo_nodePositive: "Node Positive",
    histo_nodeHarvest: "Node Harvest",
    histo_negativeMargins: "Negative Margins",
    histo_stage: "Stage",
  };

  return (
    <div className="w-5/6">
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-900 mb-8">DISEASE PROFILE</h1>
          </div>

          <form className="gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="lastname" className="text-sm font-semibold text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.lastname ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Enter lastname"
                  />
                  {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
                </div>

                <div className="flex flex-col w-1/2">
                  <label htmlFor="lastname" className="text-sm font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.lastname}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.lastname ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Enter email"
                  />
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
                  <label htmlFor="basis_of_diagnosis" className="text-sm font-semibold text-gray-700">
                    Basis of Diagnosis
                  </label>
                  <select
                    name="basis_of_diagnosis"
                    value={diagnosisType}
                    onChange={handleDiagnosisChange}
                    className={`mt-1 p-2 border ${errors.basis_of_diagnosis ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  >
                    <option value="Non-Microscopic">Non-Microscopic</option>
                    <option value="Microscopic">Microscopic</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>

                <div className="flex flex-col w-1/4">
                  <label htmlFor="primary_site" className="text-sm font-semibold text-gray-700">
                    Primary Site
                  </label>
                  <select
                    name="primary_site"
                    value={formData.primary_site}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.primary_site ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  >
                    <option value="Colon">Colon</option>
                    <option value="Liver">Liver</option>
                    <option value="Ovary">Ovary</option>
                    <option value="Stomach">Stomach</option>
                    <option value="Brain">Brain</option>
                    <option value="Corpus Uteri">Corpus Uteri</option>
                    <option value="Lung">Lung</option>
                    <option value="Pancreas">Pancreas</option>
                    <option value="Testis">Testis</option>
                    <option value="Bladder Urinary">Bladder Urinary</option>
                    <option value="Bladder Gall">Bladder Gall</option>
                    <option value="Esophagus">Esophagus</option>
                    <option value="Skin">Skin</option>
                    <option value="Prostate">Prostate</option>
                    <option value="Thyroid">Thyroid</option>
                    <option value="Breast">Breast</option>
                    <option value="Kidney">Kidney</option>
                    <option value="Nasopharynx">Nasopharynx</option>
                    <option value="Rectum">Rectum</option>
                    <option value="Uterine Cervix">Uterine Cervix</option>
                    <option value="Blood">Blood</option>
                    <option value="Oral Cavity">Oral Cavity</option>
                  </select>
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
                    <option value="Left">Left</option>
                    <option value="Right">Right</option>
                    <option value="Bilateral">Bilateral</option>
                    <option value="Mid">Mid</option>
                    <option value="Not Stated">Not Stated</option>
                    <option value="Not Stated">Not Applicable</option>
                  </select>
                  {errors.laterality && <p className="text-red-500 text-xs mt-1">{errors.laterality}</p>}
                </div>
              </div>

              {diagnosisType === "Non-Microscopic" && (
                <div className="flex mt-1 h-7 gap-8 items-center">
                  <label className="text-sm font-semibold text-gray-700">Non-Microscopic Options: </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="death_certificates"
                      name="non_microscopic_death_certificates"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="death_certificates" className="text-black">Death Certificates</label>
                  </div>
                  <div className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      id="clinical_investigation"
                      name="non_microscopic_clinical_investigation"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="clinical_investigation" className="text-black">Clinical Investigation</label>
                  </div>
                  <div className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      id="clinical_only"
                      name="non_microscopic_clinical_only"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="clinical_only" className="text-black">Clinical</label>
                  </div>
                  <div className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      id="specific_tumor_markers"
                      name="non_microscopic_specific_tumor_markers"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="specific_tumor_markers" className="text-black">Specific Tumor Markers</label>
                  </div>
                </div>
              )}


              {diagnosisType === "Microscopic" && (
                <div className="flex mt-1 h-7 gap-8 items-center">
                  <label className="text-sm font-semibold text-gray-700">Microscopic Options: </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="microscopic_cytology_or_hematology"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label className="text-black">Cytology or Hematology</label>
                  </div>
                  <div className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      name="microscopic_histology_of_metastasis"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label className="text-black">Histology of Metastasis</label>
                  </div>
                  <div className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      name="microscopic_histology_of_primary"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label className="text-black">Histology of Primary</label>
                  </div>
                </div>
              )}

              {diagnosisType === "Unknown" && (
                <div className="flex mt-1 h-7 gap-8 items-center">
                  <label className="text-sm font-semibold text-gray-700">Unknown Basis: </label>
                  <p className="text-base text-gray-500">No additional options available.</p>
                </div>
              )}

              <div className="flex justify-center mt-4">
                <label className="text-lg text-black font-bold">HISTOLOGY</label>
              </div>
              <Separator className="" />

              <div className="flex gap-4">
                {[
                  "histo_pathology",
                  "histo_tumorSize",
                  "histo_tumorGrade",
                  "histo_tumorExtension",
                ].map((fieldName) => (
                  <div
                    className={`flex flex-col ${fieldName === "histo_pathology" ? "w-8/12" : "w-2/12"}`}
                    key={fieldName}
                  >
                    <label htmlFor={fieldName} className="text-sm font-semibold text-gray-700">
                      {fieldLabels[fieldName]}
                    </label>

                    {fieldName === "histo_tumorExtension" ? (
                      <div className="flex items-center text-black h-11 gap-4">
                        <label className="mr-2">
                          <input
                            type="radio"
                            name="histo_tumorExtension"
                            value="yes"
                            checked={formData[fieldName] === "yes"}
                            onChange={handleChange}
                            className="mr-1"
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="histo_tumorExtension"
                            value="no"
                            checked={formData[fieldName] === "no"}
                            onChange={handleChange}
                            className="mr-1"
                          />
                          No
                        </label>
                      </div>
                    ) : (
                      <input
                        type="text"
                        name={fieldName}
                        value={formData[fieldName as keyof FormData]}
                        onChange={handleChange}
                        className={`mt-1 p-2 border ${errors[fieldName as keyof Errors] ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                        placeholder={`${fieldLabels[fieldName]}`}
                      />
                    )}

                    {errors[fieldName as keyof Errors] && <p className="text-red-500 text-xs mt-1">{errors[fieldName as keyof Errors]}</p>}
                  </div>
                ))}
              </div>

              <div className="flex gap-4 w-full justify-between">
                {[
                  "histo_nodePositive",
                  "histo_nodeHarvest",
                  "histo_stage",
                  "histo_negativeMargins",
                ].map((fieldName) => (
                  <div
                    className={`flex flex-col ${fieldName === "histo_negativeMargins" ? "w-2/12" : "w-[34%]"}`}
                    key={fieldName}
                  >
                    <label htmlFor={fieldName} className="text-sm font-semibold text-gray-700">
                      {fieldLabels[fieldName]}
                    </label>

                    {fieldName === "histo_negativeMargins" ? (
                      <div className={`flex items-center text-black h-11 gap-4`}>
                        <label className="mr-2">
                          <input
                            type="radio"
                            name="histo_negativeMargins"
                            value="yes"
                            checked={formData[fieldName] === "yes"}
                            onChange={handleChange}
                            className="mr-1"
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="histo_negativeMargins"
                            value="no"
                            checked={formData[fieldName] === "no"}
                            onChange={handleChange}
                            className="mr-1"
                          />
                          No
                        </label>
                      </div>
                    ) : fieldName === "histo_stage" ? (
                      <select
                        name={fieldName}
                        value={formData[fieldName as keyof FormData]}
                        onChange={handleChange}
                        className={`mt-1 p-2 border ${errors[fieldName as keyof Errors] ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                      >
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        name={fieldName}
                        value={formData[fieldName as keyof FormData]}
                        onChange={handleChange}
                        className={`mt-1 p-2 border ${errors[fieldName as keyof Errors] ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                        placeholder={`${fieldLabels[fieldName]}`}
                      />
                    )}

                    {errors[fieldName as keyof Errors] && <p className="text-red-500 text-xs mt-1">{errors[fieldName as keyof Errors]}</p>}
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-4">
                <label className="text-lg text-black font-bold">TNM SYSTEM</label>
              </div>
              <Separator className="" />

              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="extent_of_disease" className="text-sm font-semibold text-gray-700">Extent of Disease</label>
                  <select
                    name="extent_of_disease"
                    value={formData.extent_of_disease}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.extent_of_disease ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  >
                    <option value="In-Situ">In-Situ</option>
                    <option value="Localized">Localized</option>
                    <option value="Direct Extension">Direct Extension</option>
                    <option value="Regional Lymph Node">Regional Lymph Node</option>
                    <option value="O3+4">O3+4</option>
                    <option value="Distant Metastasis">Distant Metastasis</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                  {errors.extent_of_disease && <p className="text-red-500 text-xs mt-1">{errors.extent_of_disease}</p>}
                </div>


                <div className="flex flex-col w-1/2">
                  <label htmlFor="tumor_size" className="text-sm font-semibold text-gray-700">Tumor Size</label>
                  <input
                    type="text"
                    name="tumor_size"
                    value={formData.tumor_size}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.tumor_size ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Enter tumor size"
                  />
                  {errors.tumor_size && <p className="text-red-500 text-xs mt-1">{errors.tumor_size}</p>}
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="nodal_involvement" className="text-sm font-semibold text-gray-700">Nodal Involvement</label>
                <input
                  type="text"
                  name="nodal_involvement"
                  value={formData.nodal_involvement}
                  onChange={handleChange}
                  className={`mt-1 p-2 border ${errors.nodal_involvement ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  placeholder="Enter nodal involvement"
                />
                {errors.nodal_involvement && <p className="text-red-500 text-xs mt-1">{errors.nodal_involvement}</p>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="metastasis" className="text-sm font-semibold text-gray-700">Metastasis</label>
                <input
                  type="text"
                  name="metastasis"
                  value={formData.metastasis}
                  onChange={handleChange}
                  className={`mt-1 p-2 border ${errors.metastasis ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  placeholder="Enter metastasis"
                />
                {errors.metastasis && <p className="text-red-500 text-xs mt-1">{errors.metastasis}</p>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="metastatic_site" className="text-sm font-semibold text-gray-700">Metastatic Site</label>
                <input
                  type="text"
                  name="metastatic_site"
                  value={formData.metastatic_site}
                  onChange={handleChange}
                  className={`mt-1 p-2 border ${errors.metastatic_site ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  placeholder="Enter metastatic site"
                />
                {errors.metastatic_site && <p className="text-red-500 text-xs mt-1">{errors.metastatic_site}</p>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="multiple_primaries" className="text-sm font-semibold text-gray-700">Multiple Primaries</label>
                <input
                  type="text"
                  name="multiple_primaries"
                  value={formData.multiple_primaries}
                  onChange={handleChange}
                  className={`mt-1 p-2 border ${errors.multiple_primaries ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  placeholder="Enter multiple primaries"
                />
                {errors.multiple_primaries && <p className="text-red-500 text-xs mt-1">{errors.multiple_primaries}</p>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="other_primary" className="text-sm font-semibold text-gray-700">Other Primary</label>
                <input
                  type="text"
                  name="other_primary"
                  value={formData.other_primary}
                  onChange={handleChange}
                  className={`mt-1 p-2 border ${errors.other_primary ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  placeholder="Enter other primary"
                />
                {errors.other_primary && <p className="text-red-500 text-xs mt-1">{errors.other_primary}</p>}
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col w-1/3">
                  <label htmlFor="tstage" className="text-sm font-semibold text-gray-700">T Stage</label>
                  <input
                    type="text"
                    name="tstage"
                    value={formData.tstage}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.tstage ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="T Stage"
                  />
                  {errors.tstage && <p className="text-red-500 text-xs mt-1">{errors.tstage}</p>}
                </div>

                <div className="flex flex-col w-1/3">
                  <label htmlFor="nstage" className="text-sm font-semibold text-gray-700">N Stage</label>
                  <input
                    type="text"
                    name="nstage"
                    value={formData.nstage}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.nstage ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="N Stage"
                  />
                  {errors.nstage && <p className="text-red-500 text-xs mt-1">{errors.nstage}</p>}
                </div>

                <div className="flex flex-col w-1/3">
                  <label htmlFor="mstage" className="text-sm font-semibold text-gray-700">M Stage</label>
                  <input
                    type="text"
                    name="mstage"
                    value={formData.mstage}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.mstage ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="M Stage"
                  />
                  {errors.mstage && <p className="text-red-500 text-xs mt-1">{errors.mstage}</p>}
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="stage" className="text-sm font-semibold text-gray-700">Stage</label>
                <input
                  type="text"
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  className={`mt-1 p-2 border ${errors.stage ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  placeholder="Enter stage"
                />
                {errors.stage && <p className="text-red-500 text-xs mt-1">{errors.stage}</p>}
              </div>

              <div className="flex flex-col">
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

              <div className="flex flex-col">
                <label htmlFor="patient_status" className="text-sm font-semibold text-gray-700">Patient Status</label>
                <input
                  type="text"
                  name="patient_status"
                  value={formData.patient_status}
                  onChange={handleChange}
                  className={`mt-1 p-2 border ${errors.patient_status ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  placeholder="Enter patient status"
                />
                {errors.patient_status && <p className="text-red-500 text-xs mt-1">{errors.patient_status}</p>}
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