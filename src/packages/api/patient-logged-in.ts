import { z } from "zod";

const AddressSchema = z.object({
  addressId: z.number(),
  addressNumber: z.string(),
  addressStreet: z.string(),
  addressCity: z.string(),
  addressRegion: z.string(),
  addressZipcode: z.string(),
});

const RoleSchema = z.object({
  roleId: z.number(),
  roleName: z.string(),
  roleDescription: z.string(),
});

const AccessSchema = z.object({
  accessId: z.number(),
  accessCanenrollpatient: z.string(),
  accessCaneditpatientinfo: z.string(),
  accessCanviewpatientinfo: z.string(),
  accessCandeleteuser: z.string(),
  accessCandeletepatientinfo: z.string(),
});

const UserSchema = z.object({
  userId: z.number(),
  userLastname: z.string(),
  userFirstname: z.string(),
  userMiddlename: z.string(),
  userEmail: z.string().email(),
  userPassword: z.string(),
  userGender: z.string(),
  userMaritalStatus: z.string(),
  userBirthdate: z.string(), // Consider a date string format, or use z.date()
  userBirthplace: z.string(),
  userAddress: AddressSchema,
  userRole: RoleSchema,
  userAccess: AccessSchema,
  userIsVerified: z.string(),
  userStatus: z.string(),
  userCreatedOn: z.string(), // Consider using z.date() for date-time
  userUpdatedOn: z.string(), // Consider using z.date() for date-time
});

const PatientSchema = z.object({
  patientId: z.number(),
  user: UserSchema,
  patientCreatedOn: z.string(), // Consider using z.date() for date-time
  patientUpdatedOn: z.string(), // Consider using z.date() for date-time
});

export default PatientSchema;