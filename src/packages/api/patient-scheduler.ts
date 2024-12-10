import { z } from "zod";

const addressSchema = z.object({
  addressId: z.number(),
  addressNumber: z.string(),
  addressStreet: z.string(),
  addressCity: z.string(),
  addressRegion: z.string(),
  addressZipcode: z.string(),
});

const userAccessSchema = z.object({
  accessId: z.number(),
  accessCanenrollpatient: z.string(),
  accessCaneditpatientinfo: z.string(),
  accessCanviewpatientinfo: z.string(),
  accessCandeleteuser: z.string(),
  accessCandeletepatientinfo: z.string(),
});

const userRoleSchema = z.object({
  roleId: z.number(),
  roleName: z.string(),
  roleDescription: z.string(),
});

const userSchema = z.object({
  userId: z.number(),
  userLastname: z.string(),
  userFirstname: z.string(),
  userMiddlename: z.string(),
  userEmail: z.string(),
  userPassword: z.string(),
  userGender: z.string(),
  userMaritalStatus: z.string(),
  userBirthdate: z.string(),
  userBirthplace: z.string(),
  userAddress: addressSchema,
  userRole: userRoleSchema,
  userAccess: userAccessSchema,
  userIsVerified: z.string(),
  userStatus: z.string(),
  userCreatedOn: z.string(),
  userUpdatedOn: z.string(),
});

const patientSchema = z.object({
  patientId: z.number(),
  user: userSchema,
  patientCreatedOn: z.string(),
  patientUpdatedOn: z.string(),
});

const specialtySchema = z.object({
  specialtyID: z.number(),
  specialtyName: z.string(),
  specialtyDescription: z.string(),
});

const departmentSchema = z.object({
  departmentId: z.number(),
  departmentName: z.string(),
});

const hospitalSchema = z.object({
  hospitalId: z.number(),
  hospitalName: z.string(),
  address: addressSchema,
  hospitalContactNo: z.nullable(z.string()),
});

const doctorSchema = z.object({
  doctorId: z.number(),
  user: userSchema,
  hospital: hospitalSchema,
  department: departmentSchema,
  specialty: specialtySchema,
  doctorESignature: z.nullable(z.string()),
  doctorLicenseNumber: z.string(),
  doctorLicenseExpDate: z.string(),
  doctorSchedule: z.number(),
});

const checkupStatusSchema = z.object({
  checkupStatusID: z.number(),
  notifStatusName: z.string(),
});

const checkupScheduleSchema = z.object({
  checkupScheduleID: z.number(),
  patient: patientSchema,
  doctor: doctorSchema,
  checkupRequestDate: z.string(),
  checkupConfirmedDate: z.string(),
  checkupStartTime: z.string(),
  checkupEndTime: z.string(),
  checkupStatus: checkupStatusSchema,
  checkupUpdatedOn: z.string(),
});

// Export schema
export default checkupScheduleSchema;
