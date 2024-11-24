import { z } from "zod";

const AddressSchema = z.object({
  addressId: z.number(),
  addressNumber: z.string(),
  addressStreet: z.string(),
  addressCity: z.string(),
  addressRegion: z.string(),
  addressZipcode: z.string(),
});

const UserAccessSchema = z.object({
  accessId: z.number(),
  accessCanenrollpatient: z.string(),
  accessCaneditpatientinfo: z.string(),
  accessCanviewpatientinfo: z.string(),
  accessCandeleteuser: z.string(),
  accessCandeletepatientinfo: z.string(),
});

const UserRoleSchema = z.object({
  roleId: z.number(),
  roleName: z.string(),
  roleDescription: z.string(),
});

const UserSchema = z.object({
  userId: z.number(),
  userLastname: z.string(),
  userFirstname: z.string(),
  userMiddlename: z.string().nullable(),
  userEmail: z.string().email(),
  userPassword: z.string(),
  userGender: z.string(),
  userMaritalStatus: z.string(),
  userBirthdate: z.string(),
  userBirthplace: z.string(),
  userAddress: AddressSchema,
  userRole: UserRoleSchema,
  userAccess: UserAccessSchema,
  userIsVerified: z.string(),
  userStatus: z.string(),
  userCreatedOn: z.string(),
  userUpdatedOn: z.string(),
});

const PatientSchema = z.object({
  patientId: z.number(),
  user: UserSchema,
  patientCreatedOn: z.string(),
  patientUpdatedOn: z.string(),
});

const SpecialtySchema = z.object({
  specialtyID: z.number(),
  specialtyName: z.string(),
  specialtyDescription: z.string(),
});

const DepartmentSchema = z.object({
  departmentId: z.number(),
  departmentName: z.string(),
});

const HospitalSchema = z.object({
  hospitalId: z.number(),
  hospitalName: z.string(),
  address: AddressSchema,
  hospitalContactNo: z.string().nullable(),
});

const DoctorSchema = z.object({
  doctorId: z.number(),
  user: UserSchema,
  hospital: HospitalSchema,
  department: DepartmentSchema,
  specialty: SpecialtySchema,
  doctorESignature: z.string(), // Assuming it's nullable
  doctorLicenseNumber: z.string(),
  doctorLicenseExpDate: z.string(),
  doctorSchedule: z.number(),
});

const PatientsResponseSchema = z.array(
  z.object({
    relationId: z.number(),
    patient: PatientSchema,
    doctor: DoctorSchema,
    doctorRole: z.null(), // Assuming it's nullable
  })
);

export { PatientsResponseSchema };
