"use client";

import EnrollPatientSchema from "@/packages/api/enroll-patient";
import React, { useState, useEffect } from "react";
import { z } from "zod";

type PatientFormData = z.infer<typeof EnrollPatientSchema>;

const EnrollPatient: React.FC = () => {
  const [formData, setFormData] = useState<PatientFormData>({
    lastname: "",
    firstname: "",
    middle_name: "",
    email: "",
    password: "",
    birthdate: "",
    birthplace: "",
    gender: "male",
    marital_status: "single",
    addressNumber: "",
    addressStreet: "",
    addressCity: "",
    addressRegion: "",
    addressZipcode: ""
  });

  const [doctorInfo, setDoctorInfo] = useState({
    doctorId: '',
    userId: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setDoctorInfo({
        doctorId: parsedUserData.doctorId,
        userId: parsedUserData.user.userId,
      });
    }
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUserData = JSON.parse(userData);
    }
  })

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === formData.password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = EnrollPatientSchema.safeParse(formData);

    if (!result.success) {
      const errorMap: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          errorMap[error.path[0]] = error.message;
        }
      });
      setErrors(errorMap);
    } else {
      setErrors({});

      // Convert the birthdate format from yyyy-mm-dd to dd/mm/yyyy
      const dateParts = formData.birthdate.split("-");
      const formattedBirthdate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

      try {
        const response = await fetch("http://localhost:8080/css/patient/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            USER_LASTNAME: formData.lastname,
            USER_FIRSTNAME: formData.firstname,
            USER_MIDDLENAME: formData.middle_name,
            USER_EMAIL: formData.email,
            USER_PASSWORD: formData.password,
            USER_GENDER: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1),
            USER_MARITAL_STATUS: formData.marital_status.charAt(0).toUpperCase() + formData.marital_status.slice(1),
            USER_BIRTHDATE: formattedBirthdate,
            USER_BIRTHPLACE: formData.birthplace,
            ADDRESS_NUMBER: formData.addressNumber,
            ADDRESS_STREET: formData.addressStreet,
            ADDRESS_CITY: formData.addressCity,
            ADDRESS_REGION: formData.addressRegion,
            ADDRESS_ZIPCODE: formData.addressZipcode,
            USER_ENCODER: doctorInfo.userId,
          })
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            lastname: "",
            firstname: "",
            middle_name: "",
            email: "",
            password: "",
            birthdate: "",
            birthplace: "",
            gender: "male",
            marital_status: "single",
            addressNumber: "",
            addressStreet: "",
            addressCity: "",
            addressRegion: "",
            addressZipcode: ""
          })
          setConfirmPassword("")
        } else {
          console.error("Failed to add patient:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };
  useEffect(() => {
    setPasswordMatch(confirmPassword === formData.password);
  }, [formData.password]);

  return (
    <div className="w-5/6">
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-3xl rounded-lg p-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-red-900 mb-8">PATIENT ENROLLMENT</h1>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex w-full gap-3">
              <div className="flex flex-col w-2/5">
                <label htmlFor="lastname" className="text-sm font-semibold text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className={`mt-1 p-2 border ${errors.lastname ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  placeholder="Dela Cruz"
                />
                {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
              </div>

              <div className="flex flex-col w-2/5">
                <label htmlFor="firstname" className="text-sm font-semibold text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className={`mt-1 p-2 border ${errors.firstname ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  placeholder="Juan"
                />
                {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
              </div>

              <div className="flex flex-col w-2/12">
                <label htmlFor="middle_name" className="text-sm font-semibold text-gray-700">Middle Name</label>
                <input
                  type="text"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                  placeholder="Bueno"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                placeholder="juandelacruz@mail.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col w-1/2">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 p-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  placeholder="Password"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="flex flex-col w-1/2">
                <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">Re-enter Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`mt-1 p-2 border ${passwordMatch ? "border-gray-300" : "border-red-500"} rounded focus:outline-none focus:border-red-500 text-black`}
                  placeholder="Re-enter Password"
                />
                {!passwordMatch && <p className="text-red-500 text-xs mt-1">Passwords do not match</p>}
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col w-1/2">
                <label htmlFor="birthdate" className="text-sm font-semibold text-gray-700">Birthdate</label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                />
              </div>

              <div className="flex flex-col w-1/2">
                <label htmlFor="birthplace" className="text-sm font-semibold text-gray-700">Birthplace</label>
                <input
                  type="text"
                  name="birthplace"
                  value={formData.birthplace}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                  placeholder="Province, City/Municipality"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col w-1/2">
                <label htmlFor="gender" className="text-sm font-semibold text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col w-1/2">
                <label htmlFor="marital_status" className="text-sm font-semibold text-gray-700">Marital Status</label>
                <select
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                >
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col w-1/3">
                <label htmlFor="addressNumber" className="text-sm font-semibold text-gray-700">Address Number</label>
                <input
                  type="text"
                  name="addressNumber"
                  value={formData.addressNumber}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                  placeholder="101"
                />
              </div>

              <div className="flex flex-col w-1/3">
                <label htmlFor="addressStreet" className="text-sm font-semibold text-gray-700">Street Name</label>
                <input
                  type="text"
                  name="addressStreet"
                  value={formData.addressStreet}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                  placeholder="Padre Faura St."
                />
              </div>

              <div className="flex flex-col w-1/3">
                <label htmlFor="addressCity" className="text-sm font-semibold text-gray-700">City</label>
                <input
                  type="text"
                  name="addressCity"
                  value={formData.addressCity}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                  placeholder="Manila City"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col w-1/2">
                <label htmlFor="addressRegion" className="text-sm font-semibold text-gray-700">Region</label>
                <input
                  type="text"
                  name="addressRegion"
                  value={formData.addressRegion}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                  placeholder="NCR"
                />
              </div>

              <div className="flex flex-col w-1/2">
                <label htmlFor="addressZipcode" className="text-sm font-semibold text-gray-700">Zipcode</label>
                <input
                  type="text"
                  name="addressZipcode"
                  value={formData.addressZipcode}
                  onChange={handleChange}
                  className={`mt-1 p-2 border ${errors.addressZipcode ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  placeholder="1000"
                />
                {errors.addressZipcode && <p className="text-red-500 text-xs mt-1">{errors.addressZipcode}</p>}
              </div>
            </div>

            <div className="flex justify-between mt-8 w-full">
              <div className="w-1/2 flex justify-center">
                <button
                  type="submit"
                  disabled={!passwordMatch} // Disable submit if passwords don't match
                  className={`bg-red-900 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded transition ${!passwordMatch ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Submit
                </button>
              </div>
              <div className="w-1/2 flex justify-center">
                <button
                  type="button"
                  disabled={!passwordMatch} // Disable submit if passwords don't match
                  className={`bg-red-900 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded transition ${!passwordMatch ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Submit & Add Disease Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnrollPatient;