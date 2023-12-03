import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentintoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);

  return result;
};

const getAllAcademicDepartmentFromDb = async () => {
  const result = await AcademicDepartment.find({});
  return result;
};

const getSingletAcademicDepartmentFromDb = async (id: string) => {
  const result = await AcademicDepartment.findById(id);

  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentintoDB,
  getAllAcademicDepartmentFromDb,
  getSingletAcademicDepartmentFromDb,
  updateAcademicDepartmentIntoDB,
};
