import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemister } from '../academicSemister/academicSemister.model';
import { TStuedent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';

const createStudentintoDb = async (password: string, payload: TStuedent) => {
  const userData: Partial<TUser> = {};

  // if passoword is not gived , use default password

  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemister = await AcademicSemister.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Automatically generated Id
    userData.id = await generateStudentId(admissionSemister);

    // Transaction 1
    // Create a new user
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create User');
    }
    // set id, _Id
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //referencing _ id

    // Transaction 2
    const newStudent = await Student.create([payload], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failded to create Student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const createFcaultyintoDb = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};

  // if passoword is not gived , use default password

  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'faculty';

  // find academic semester info
  // const admissionSemister = await AcademicSemister.findById(
  //   payload.admissionSemester,
  // );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Automatically generated Id
    userData.id = await generateFacultyId();

    // Transaction 1
    // Create a new user
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create User');
    }
    // set id, _Id
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //referencing _ id

    // Transaction 2
    const newStudent = await Faculty.create([payload], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failded to create Faculty');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentintoDb,
  createFcaultyintoDb,
};
