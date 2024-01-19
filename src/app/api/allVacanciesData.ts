export interface AllVacanciesDataTS {
  id: any;
  
  about_company: "string";
  position: "string";
  industry: "string";
  description: "string";
  skills: "string";
  salaryRequest: {
    salaryType: "string";
    salarySum: number;
    valute: "string";
  };
  typeOfEmploymentS: "string";
  experience: "string";
  contactInformationRequest: {
    country: "string";
    city: "string";
    street_house: "string";
  };
  additionalInformation: "string";
};
export interface alldata 
{
  user: any
  id: 0,
  about_company: "string",
  position: "string",
  industry: "string",
  description: "string",
  skills: "string",
  salaryResponse: {
    id: 0,
    salaryType: "FULL",
    salarySum: 0,
    valute: "SOM"
  },
  typeOfEmploymentS: "POLNIY_RABOCHIY_DEN",
  experience: "string",
  contactInformationResponse: {
    idl: 0,
    country: "string",
    city: "string",
    street_house: "string"
  },
  additionalInformation: "string",
  respondedCount: 0,
  statusOfVacancy: "string",
  creationDate: "string"
}