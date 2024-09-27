import { z } from "zod";

const AddressSchema = z.object({
  addressId: z.number(),
  addressNumber: z.string(),
  addressStreet: z.string(),
  addressCity: z.string(),
  addressRegion: z.string(),
  addressZipcode: z.string(),
});

const UserRoleSchema = z.object({
  roleId: z.number(),
  roleName: z.string(),
  roleDescription: z.string(),
});

const UserAccessSchema = z.object({
  accessId: z.number(),
  accessCanenrollpatient: z.enum(["Y", "N"]),
  accessCaneditpatientinfo: z.enum(["Y", "N"]),
  accessCanviewpatientinfo: z.enum(["Y", "N"]),
  accessCandeleteuser: z.enum(["Y", "N"]),
  accessCandeletepatientinfo: z.enum(["Y", "N"]),
});

const UserSchema = z.object({
  userId: z.number(),
  userLastname: z.string(),
  userFirstname: z.string(),
  userMiddlename: z.string().optional(),
  userEmail: z.string().email(),
  userPassword: z.string(),
  userGender: z.string(),
  userMaritalStatus: z.string(),
  userBirthdate: z.string(),
  userBirthplace: z.string(),
  userIsVerified: z.enum(["Y", "N"]),
  userStatus: z.string(),
  userCreatedOn: z.string(),
  userUpdatedOn: z.string(),
  userAddress: AddressSchema,
  userRole: UserRoleSchema,
  userAccess: UserAccessSchema,
  userEncoder: z.nullable(z.any()),
});

const HospitalSchema = z.object({
  hospitalId: z.number(),
  hospitalName: z.string(),
  address: AddressSchema,
  hospitalContactNo: z.nullable(z.string()),
});

const DepartmentSchema = z.object({
  departmentId: z.number(),
  departmentName: z.string(),
});

const SpecialtySchema = z.object({
  specialtyID: z.number(),
  specialtyName: z.string(),
  specialtyDescription: z.string(),
});

const DoctorSchema = z.object({
  doctorId: z.number(),
  user: UserSchema,
  hospital: HospitalSchema,
  department: DepartmentSchema,
  specialty: SpecialtySchema,
  doctorESignature: z.nullable(z.any()),
  doctorLicenseNumber: z.string(),
  doctorLicenseExpDate: z.string(),
  doctorSchedule: z.number(),
});

export default DoctorSchema;
