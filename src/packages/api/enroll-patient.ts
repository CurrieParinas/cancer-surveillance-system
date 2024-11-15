import { z } from "zod";

const EnrollPatientSchema = z.object({
  lastname: z.string().min(1, "Last name is required"),
  firstname: z.string().min(1, "First name is required"),
  middle_name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  birthdate: z.string(),
  birthplace: z.string(),
  gender: z.enum(["male", "female", "other"]),
  marital_status: z.enum(["single", "married", "divorced", "widowed"]),
  addressNumber: z.string(),
  addressStreet: z.string(),
  addressCity: z.string(),
  addressRegion: z.string(),
  addressZipcode: z.string().min(4, "Zipcode should be at least 4 characters"),
});

export default EnrollPatientSchema;