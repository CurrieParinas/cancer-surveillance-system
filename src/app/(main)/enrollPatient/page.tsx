"use client";

import EnrollPatientSchema from "@/packages/api/enroll-patient";
import { UserSchema } from "@/packages/api/user";
import React, { useState, useEffect } from "react";
import { z } from "zod";

type PatientFormData = z.infer<typeof EnrollPatientSchema>;

type Errors = Partial<PatientFormData> & {
  emailNotUnique?: string;
};

const EnrollPatient: React.FC = () => {
  const [formData, setFormData] = useState<PatientFormData>({
    lastname: "",
    firstname: "",
    middle_name: "",
    email: "",
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

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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

      try {
        const response = await fetch('http://localhost:8080/css/user/allUsers');
        const data = await response.json();

        const users = UserSchema.array().parse(data);
        const emailList = users.map((user) => user.userEmail);

        if (emailList.includes(formData.email)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            emailNotUnique: "The email must be unique. Please use a different email address."
          }));
          return;
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, emailNotUnique: undefined }));
        }
      } catch (error) {
        console.error("Email uniqueness check failed:", error);
        return;
      }

      const today = new Date();
      const [birthYear, birthMonth, birthDay] = formData.birthdate.split("-").map(Number);
      const birthDate = new Date(birthYear, birthMonth - 1, birthDay); // Month is 0-based in JavaScript

      if (birthDate >= today) {
        setErrors((prevErrors: Errors) => ({
          ...prevErrors,
          birthdate: "The birthdate cannot be today or in the future."
        }));
        return;
      } else {
        setErrors((prevErrors: Errors) => ({ ...prevErrors, birthdate: undefined }));
      }

      // Convert the birthdate format from yyyy-mm-dd to dd/mm/yyyy
      const dateParts = formData.birthdate.split("-");
      const formattedBirthdate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

      const requestBody = JSON.stringify({
        USER_LASTNAME: formData.lastname,
        USER_FIRSTNAME: formData.firstname,
        USER_MIDDLENAME: formData.middle_name,
        USER_EMAIL: formData.email,
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

      console.log(requestBody)

      try {
        const response = await fetch("http://localhost:8080/css/patient/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            lastname: "",
            firstname: "",
            middle_name: "",
            email: "",
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
        } else {
          console.error("Failed to add patient:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <div className="w-5/6">
      <div className="min-h-screen flex justify-center p-6">
        <div className="w-full max-w-3xl rounded-lg p-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-red-900 mb-16 tracking-wide text-nowrap">PATIENT ENROLLMENT</h1>
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
              {errors.emailNotUnique && <p className="text-red-500 text-xs mt-1">{errors.emailNotUnique}</p>}
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
                {errors.birthdate && <p className="text-red-500 text-xs mt-1">{errors.birthdate}</p>}
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
                  className={`bg-red-900 hover:bg-red-800 text-white py-2 px-6 rounded-3xl transition`}
                >
                  Submit
                </button>
              </div>
              <div className="w-1/2 flex justify-center">
                <button
                  type="button"
                  className={`bg-red-900 hover:bg-red-800 text-white py-2 px-6 rounded-3xl transition`}
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