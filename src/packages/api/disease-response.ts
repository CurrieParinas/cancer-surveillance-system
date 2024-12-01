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
  userEmail: z.string(),
  userPassword: z.string(),
  userGender: z.string(),
  userMaritalStatus: z.string(),
  userBirthdate: z.string(),
  userBirthplace: z.string(),
  userAddress: AddressSchema,
  userRole: RoleSchema,
  userAccess: AccessSchema,
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

const BodySiteSchema = z.object({
  bodysiteId: z.number(),
  bodysiteName: z.string(),
});

const BasisSchema = z.object({
  basisId: z.number(),
  category: z.string(),
  subcategory: z.string(),
});

const PathologyDimSchema = z.object({
  pathologyDimId: z.number(),
  icdo32: z.nullable(z.string()),
  pathologyDimLevel: z.string(),
  term: z.string(),
  codeReference: z.nullable(z.string()),
  obs: z.nullable(z.string()),
  seeAlso: z.nullable(z.string()),
  seeNote: z.nullable(z.string()),
  includes: z.nullable(z.string()),
  excludes: z.nullable(z.string()),
  otherText: z.nullable(z.string()),
});

const HistologySchema = z.object({
  histologyId: z.number(),
  patient: PatientSchema,
  histoPathology: PathologyDimSchema,
  histoTumorSize: z.number(),
  histoTumorExtension: z.string(),
  histoGrade: z.number(),
  histoNodePositive: z.number(),
  histoNodeHarvest: z.number(),
  histoMarginsNegative: z.string(),
  histoMarginsPositive: z.string(),
  histoStage: z.string(),
  histoCreatedOn: z.string(),
  histoUpdatedOn: z.string(),
});

const MetastaticSiteSchema = z.object({
  metsId: z.number(),
  patient: PatientSchema,
  metsDistantln: z.string(),
  metsBone: z.string(),
  metsLiver: z.string(),
  metsLung: z.string(),
  metsBrain: z.string(),
  metsOvary: z.string(),
  metsSkin: z.string(),
  metsIntestine: z.string(),
  metsOthers: z.string(),
  metsUnknown: z.string(),
  metsNotes: z.string(),
  metsCreatedOn: z.string(),
  metsUpdatedOn: z.string(),
});

const DiseaseStatusSchema = z.object({
  dxstatusId: z.number(),
  patient: PatientSchema,
  dxstatusAlive: z.string(),
  dxstatusSymptoms: z.string(),
  dxstatusRecurrence: z.string(),
  dxstatusMetastatic: z.string(),
  dxstatusCurative: z.string(),
  dxstatusCreatedOn: z.string(),
});

const DiseaseSchema = z.object({
  diseaseID: z.number(),
  patient: PatientSchema,
  bodySite: BodySiteSchema,
  diseaseDiagnosisDate: z.string(),
  basis: BasisSchema,
  diseaseLaterality: z.string(),
  diseaseHistology: HistologySchema,
  diseaseExtent: z.string(),
  diseaseTumorSize: z.number(),
  diseaseLymphNode: z.number(),
  diseaseMetastatic: z.string(),
  diseaseMetastaticSite: MetastaticSiteSchema,
  diseaseMultiplePrimary: z.number(),
  diseaseTstage: z.number(),
  diseaseNstage: z.number(),
  diseaseMstage: z.number(),
  diseaseGstage: z.number(),
  diseaseStage: z.string(),
  diseaseStageType: z.string(),
  diseaseStatus: DiseaseStatusSchema,
  diseaseCreatedOn: z.string(),
  diseaseUpdatedOn: z.string(),
});

export const DiseaseZodSchema = DiseaseSchema;
