import { z } from "zod";

const EnrollPatientSchema = z.object({
  lastname: z.string().min(1, "Last name is required"),
  firstname: z.string().min(1, "First name is required"),
  middle_name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  birthdate: z.string().min(1, "Birthdate is required"),
  birthplace: z.string().min(1, "Birthplace is required"),
  gender: z.enum(["male", "female", "other"]),
  marital_status: z.enum(["single", "married", "divorced", "widowed"]),
  addressNumber: z.string().min(1, "Address number required"),
  addressStreet: z.string().min(1, "Street is required"),
  addressCity: z.string().min(1, "City is required"),
  addressRegion: z.string().min(1, "Region is required"),
  addressZipcode: z.string().min(4, "Zipcode should be at least 4 characters"),
});

export default EnrollPatientSchema;