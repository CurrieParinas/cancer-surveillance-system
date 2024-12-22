"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { UserSchema } from "@/packages/api/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Department {
  departmentId: number;
  departmentName: string;
}

interface Specialty {
  specialtyID: number;
  specialtyName: string;
  specialtyDescription: string;
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

type Errors = {
  lastname?: string;
  firstname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  doctor_license_number?: string;
  doctor_license_exp_date?: string;
  addressZipcode?: string;
  doctorESig?: string;
  emailNotUnique?: string;
};

type FormErrors = {
  [key: string]: string | undefined;
};

const DoctorRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    middle_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    birthplace: "",
    gender: "male",
    marital_status: "single",
    addressNumber: "",
    addressStreet: "",
    addressCity: "",
    addressRegion: "",
    addressZipcode: "",
    doctor_license_number: "",
    doctor_license_exp_date: "",
    hospital_id: 1,
    department_id: 1,
    specialty_id: 1,
    USER_CONTACTNO: ""
  });

  const [doctorESig, setDoctorESig] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordMatch, setPasswordMatch] = useState(true);

  const validateForm = () => {
    const newErrors: FormErrors = {};


    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.birthdate) newErrors.birthdate = "Birthday is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (!formData.doctor_license_number) newErrors.doctor_license_number = "License number is required";
    if (!formData.doctor_license_exp_date) newErrors.doctor_license_exp_date = "License expiration date is required";
    if (!formData.addressZipcode) newErrors.addressZipcode = "Zipcode is required";
    if (!doctorESig) newErrors.doctorESig = "Doctor's e-signature is required"; // Validate e-signature

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password" || name === "confirmPassword") {
      if (name === "confirmPassword") {
        setPasswordMatch(value === formData.password);
      } else {
        setPasswordMatch(value === formData.confirmPassword);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDoctorESig(file);
  };

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const today = new Date();
      const [birthYear, birthMonth, birthDay] = formData.birthdate.split("-").map(Number);
      const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

      if (birthDate >= today) {
        setErrors((prevErrors: Errors) => ({
          ...prevErrors,
          birthdate: "The birthdate cannot be today or in the future."
        }));
        return;
      } else {
        setErrors((prevErrors: Errors) => ({ ...prevErrors, birthdate: undefined }));
      }

      const [licenseYear, licenseMonth, licenseDay] = formData.doctor_license_exp_date.split("-").map(Number);
      const licenseDate = new Date(licenseYear, licenseMonth - 1, licenseDay);

      if (licenseDate < today) {
        setErrors((prevErrors: Errors) => ({
          ...prevErrors,
          doctor_license_exp_date_expired: "The expiration date must be today or a future date."
        }));
        return;
      } else {
        setErrors((prevErrors: Errors) => ({ ...prevErrors, doctor_license_exp_date_expired: undefined }));
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/user/allUsers`);
        const data = await response.json();

        const users = UserSchema.array().parse(data);
        const emailList = users.map((user) => user.userEmail);

        if (emailList.includes(formData.email)) {
          setErrors((prevErrors: Errors) => ({
            ...prevErrors,
            emailNotUnique: "The email must be unique. Please use a different email address."
          }));
          return;
        } else {
          setErrors((prevErrors: Errors) => ({ ...prevErrors, emailNotUnique: undefined }));
        }
      } catch (error) {
        console.error("Email uniqueness check failed:", error);
        return;
      }

      const dateParts = formData.birthdate.split("-");
      const formattedBirthdate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

      const licenseDateParts = formData.doctor_license_exp_date.split("-");
      const formattedLicenseDateParts = `${licenseDateParts[2]}/${licenseDateParts[1]}/${licenseDateParts[0]}`;

      const formDataToSend = new FormData();

      const requestBody = {
        hospital_id: formData.hospital_id,
        department_id: formData.department_id,
        specialty_id: formData.specialty_id,
        doctor_license_number: formData.doctor_license_number,
        doctor_license_exp_date: formattedLicenseDateParts,
        USER_LASTNAME: formData.lastname,
        USER_FIRSTNAME: formData.firstname,
        USER_MIDDLENAME: formData.middle_name,
        USER_EMAIL: formData.email,
        USER_PASSWORD: formData.password,
        USER_GENDER: formData.gender,
        USER_MARITAL_STATUS: formData.marital_status,
        USER_BIRTHDATE: formattedBirthdate,
        USER_BIRTHPLACE: formData.birthplace,
        ADDRESS_NUMBER: formData.addressNumber,
        ADDRESS_STREET: formData.addressStreet,
        ADDRESS_CITY: formData.addressCity,
        ADDRESS_REGION: formData.addressRegion,
        ADDRESS_ZIPCODE: formData.addressZipcode,
        USER_CONTACTNO: formData.USER_CONTACTNO
      };

      formDataToSend.append("addDoctorRequest", new Blob([JSON.stringify(requestBody)], { type: "application/json" }));

      if (doctorESig) {
        formDataToSend.append("doctorESig", doctorESig);
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/doctor/add`, {
          method: 'POST',
          body: formDataToSend,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log("Form submitted successfully:", result);

        const verificationResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/verification/createVerification?userId=${result.user.userId}`, {
          method: 'GET',
        });

        if (!verificationResponse.ok) {
          throw new Error('Verification email request failed');
        }

        const verificationResult = await verificationResponse;
        console.log("Verification email sent successfully:", verificationResult);
        toast({ title: "Doctor Registered Successfully!" })

        window.location.href = "/";

        setFormData({
          lastname: "",
          firstname: "",
          middle_name: "",
          email: "",
          password: "",
          confirmPassword: "",
          birthdate: "",
          birthplace: "",
          gender: "male",
          marital_status: "single",
          addressNumber: "",
          addressStreet: "",
          addressCity: "",
          addressRegion: "",
          addressZipcode: "",
          doctor_license_number: "",
          doctor_license_exp_date: "",
          hospital_id: 1,
          department_id: 1,
          specialty_id: 1,
          USER_CONTACTNO: "",
        });
        setDoctorESig(null);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      console.log("Form has errors");
    }
  };


  const [departments, setDepartments] = useState<Department[]>([]);
  const [depFormData, setDepFormData] = useState<{ department_id: string }>({
    department_id: ''
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/department/all`);
        const data: Department[] = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleChangeDepartment = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDepFormData({
      ...depFormData,
      [event.target.name]: event.target.value,
    });
    setFormData({
      ...formData,
      department_id: Number(event.target.value),
    })
  };

  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [formSpecialtiesData, setFormSpecialtiesData] = useState<{ specialty_id: string }>({
    specialty_id: ''
  });

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/specialty/all`);
        const data: Specialty[] = await response.json();
        setSpecialties(data);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };

    fetchSpecialties();
  }, []);

  const handleChangeSpecialty = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormSpecialtiesData({
      ...formSpecialtiesData,
      [event.target.name]: event.target.value,
    });
    setFormData({
      ...formData,
      specialty_id: Number(event.target.value),
    })
  };

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [formHospitalData, setFormHospitalData] = useState<{ hospital_id: string }>({
    hospital_id: ''
  });

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}css/hospital/all`);
        const data: Hospital[] = await response.json();
        setHospitals(data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  const handleChangeHospital = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormHospitalData({
      ...formHospitalData,
      [event.target.name]: event.target.value,
    });
    setFormData({
      ...formData,
      hospital_id: Number(event.target.value),
    })
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex items-center justify-center p-6">
        <div className="w-full flex flex-col justify-center items-center max-w-7xl bg-white rounded-lg p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-900 mb-8">Doctor Registration</h1>
          </div>
          <form className="flex gap-6 h-full" onSubmit={handleSubmit}>
            <div className="w-1/2 flex flex-col gap-5">
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

              <div className="flex gap-4">
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
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${passwordMatch ? "border-gray-300" : "border-red-500"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="Re-enter Password"
                  />
                  {!passwordMatch && <p className="text-red-500 text-xs mt-1">Passwords do not match</p>}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col w-1/4">
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

                <div className="flex flex-col w-1/4">
                  <label htmlFor="birthplace" className="text-sm font-semibold text-gray-700">Birthplace</label>
                  <input
                    type="text"
                    name="birthplace"
                    value={formData.birthplace}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                    placeholder="City or Province"
                  />
                </div>

                {/* Gender and marital status */}
                <div className="flex flex-col w-1/4">
                  <label htmlFor="gender" className="text-sm font-semibold text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="flex flex-col w-1/4">
                  <label htmlFor="marital_status" className="text-sm font-semibold text-gray-700">Marital Status</label>
                  <select
                    name="marital_status"
                    value={formData.marital_status}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                  >
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="divorced">Divorced</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col w-[23.5%]">
                  <label htmlFor="USER_CONTACTNO" className="text-sm font-semibold text-gray-700">Contact Number</label>
                  <input
                    type="number"
                    name="USER_CONTACTNO"
                    value={formData.USER_CONTACTNO}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                    placeholder="9123456789"
                  />
                </div>

                <div className="flex flex-col w-[23.5%]">
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

                <div className="flex flex-col w-[23.5%]">
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

                <div className="flex flex-col w-[23.5%]">
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
            </div>

            <Separator orientation="vertical" />



            <div className="w-1/2 flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="doctor_license_number" className="text-sm font-semibold text-gray-700">Doctor License Number</label>
                  <input
                    type="text"
                    name="doctor_license_number"
                    value={formData.doctor_license_number}
                    onChange={handleChange}
                    minLength={7}
                    className={`mt-1 p-2 border ${errors.doctor_license_number ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                    placeholder="9182347"
                  />
                  {errors.doctor_license_number && <p className="text-red-500 text-xs mt-1">{errors.doctor_license_number}</p>}
                </div>

                <div className="flex flex-col w-1/2">
                  <label htmlFor="doctor_license_exp_date" className="text-sm font-semibold text-gray-700">Doctor License Expiration Date</label>
                  <input
                    type="date"
                    name="doctor_license_exp_date"
                    value={formData.doctor_license_exp_date}
                    onChange={handleChange}
                    className={`mt-1 p-2 border ${errors.doctor_license_exp_date ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`}
                  />
                  {errors.doctor_license_exp_date && <p className="text-red-500 text-xs mt-1">{errors.doctor_license_exp_date}</p>}
                  {errors.doctor_license_exp_date_expired && <p className="text-red-500 text-xs mt-1">{errors.doctor_license_exp_date_expired}</p>}
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="doctorESig" className="text-sm font-semibold text-gray-700">Doctor&apos;s E-Signature</label>
                <Input
                  type="file"
                  id="doctorESig"
                  name="doctorESig"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`h-10 file:border-r file:border-zinc-100 mt-1 p-2 border ${errors.doctorESig ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:border-red-500 text-black`} />
                {errors.doctorESig && <p>{errors.doctorESig}</p>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="hospital_id" className="text-sm font-semibold text-gray-700">Hospital</label>
                <select
                  name="hospital_id"
                  value={formHospitalData.hospital_id}
                  onChange={handleChangeHospital}
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                >
                  {hospitals.map(hospital => (
                    <option key={hospital.hospitalId} value={hospital.hospitalId}>
                      {hospital.hospitalName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="department_id" className="text-sm font-semibold text-gray-700">Department</label>
                <select
                  name="department_id"
                  value={depFormData.department_id}
                  onChange={handleChangeDepartment}
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                >
                  {departments.map(department => (
                    <option key={department.departmentId} value={department.departmentId}>
                      {department.departmentName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="specialty_id" className="text-sm font-semibold text-gray-700">Specialty</label>
                <select
                  name="specialty_id"
                  value={formSpecialtiesData.specialty_id}
                  onChange={handleChangeSpecialty}
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-black"
                >
                  {specialties.map(specialty => (
                    <option key={specialty.specialtyID} value={specialty.specialtyID}>
                      {specialty.specialtyName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 flex justify-center">
                <button
                  type="submit"
                  className="bg-red-900 text-white px-6 py-3 rounded-md hover:bg-red-800 focus:outline-none focus:ring focus:ring-red-300"
                >
                  Register
                </button>
              </div>
              <Separator />
              <div className="flex gap-2 justify-center">
                <Label className='font-normal text-base text-black'>Already registered?</Label>
                <Link href="/" className='text-red-900 hover:underline'>Sign In!</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistration;
