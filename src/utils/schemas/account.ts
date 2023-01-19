import * as Yup from 'yup';

export interface AccountSchema {
  lat: number;
  long: number;
}

const accountSchema: Yup.SchemaOf<AccountSchema> = Yup.object().shape({
  lat: Yup.number().required(),
  long: Yup.number().required(),
});

export default accountSchema;
