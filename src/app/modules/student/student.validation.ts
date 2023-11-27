import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().nonempty().min(1).max(255),
  middleName: z.string().nonempty().min(1).max(255),
  lastName: z.string().nonempty().min(1).max(255),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty().min(1).max(255),
  fatherContact: z.string().nonempty().min(1).max(255),
  fatherOccupation: z.string().nonempty().min(1).max(255),
  motherContact: z.string().nonempty().min(1).max(255),
  motherOccupation: z.string().nonempty().min(1).max(255),
  motherName: z.string().nonempty().min(1).max(255),
});

const localGuardianValidationSchema = z.object({
  occupation: z.string().nonempty().min(1).max(255),
  name: z.string().nonempty().min(1).max(255),
  contact: z.string().nonempty().min(1).max(255),
  address: z.string().nonempty().min(1).max(255),
});

const studentValidationSchema = z.object({
  id: z.string().min(3),
  password: z.string().min(8).max(20),
  name: userNameValidationSchema,
  email: z.string().email().nonempty().min(1).max(255),
  gender: z.enum(['Male', 'Female']),
  dateOfBirth: z.string().nonempty().min(1).max(255),
  contactNumber: z.string().nonempty().min(1).max(255),
  emergencyContactNo: z.string().nonempty().min(1).max(255),
  bloodGroup: z.enum(['A+', 'B+', 'AB+', 'O+']).optional(),
  presentAddress: z.string().nonempty().min(1).max(255),
  permanentAddress: z.string().nonempty().min(1).max(255),
  profile: z.string().optional(),
  Guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,

  isDeleted: z.boolean(),
});

export default studentValidationSchema;