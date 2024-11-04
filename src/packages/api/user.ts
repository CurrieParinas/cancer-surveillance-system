// userSchema.ts
import { z } from 'zod';

export const AddressSchema = z.object({
  addressId: z.number(),
  addressNumber: z.string(),
  addressStreet: z.string(),
  addressCity: z.string(),
  addressRegion: z.string(),
  addressZipcode: z.string(),
});

export const RoleSchema = z.object({
  roleId: z.number(),
  roleName: z.string(),
  roleDescription: z.string(),
});

export const AccessSchema = z.object({
  accessId: z.number(),
  accessCanenrollpatient: z.string(),
  accessCaneditpatientinfo: z.string(),
  accessCanviewpatientinfo: z.string(),
  accessCandeleteuser: z.string(),
  accessCandeletepatientinfo: z.string(),
});

export const UserSchema = z.object({
  userId: z.number(),
  userLastname: z.string(),
  userFirstname: z.string(),
  userMiddlename: z.string(),
  userEmail: z.string().email(),
  userPassword: z.string(),
  userGender: z.string(),
  userMaritalStatus: z.string(),
  userBirthdate: z.string(), // Adjust to z.date() if handling dates directly
  userBirthplace: z.string(),
  userAddress: AddressSchema,
  userRole: RoleSchema,
  userAccess: AccessSchema,
  userIsVerified: z.string(),
  userStatus: z.string(),
  userCreatedOn: z.string(),
  userUpdatedOn: z.string(),
});

// TypeScript type derived from the Zod schema
export type User = z.infer<typeof UserSchema>;
