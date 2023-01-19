import { Gender } from 'definitions/enums';
import * as Yup from 'yup';

export interface RegisterSchema {
  name: string;
  age: number;
  gender: Gender;
  lat: number;
  long: number;
  water: number;
  food: number;
  medication: number;
  ammunition: number;
}

const registerSchema: Yup.SchemaOf<RegisterSchema> = Yup.object().shape({
  name: Yup.string().required(),
  age: Yup.number().required(),
  gender: Yup.mixed().oneOf(Object.values(Gender)).required(),
  lat: Yup.number().required(),
  long: Yup.number().required(),
  water: Yup.number().required(),
  food: Yup.number().required(),
  medication: Yup.number().required(),
  ammunition: Yup.number().required(),
});

export default registerSchema;
