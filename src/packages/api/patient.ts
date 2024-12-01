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
  userGender: z.enum(["Male", "Female", "Other"]),
  userMaritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"]),
  userBirthdate: z.string(),
  userBirthplace: z.string(),
  userAddress: AddressSchema,
  userRole: UserRoleSchema,
  userAccess: UserAccessSchema,
  userIsVerified: z.enum(["Y", "N"]),
  userStatus: z.enum(["Active", "Inactive"]),
  userCreatedOn: z.string(),
  userUpdatedOn: z.string(),
});

const PatientSchema = z.object({
  patientId: z.number(),
  user: UserSchema,
  patientCreatedOn: z.string(),
  patientUpdatedOn: z.string(),
});

export { AddressSchema, UserRoleSchema, UserAccessSchema, UserSchema, PatientSchema };
