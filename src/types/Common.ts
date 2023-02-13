export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum ConsentFormStep {
  'INFO' = 'info',
  'AGREEMENT' = 'agreement',
  'SUCCESS' = 'success',
}

export enum ConsentItemLanguage {
  'EN' = 'English',
  'FR' = 'French',
}

export enum ConsentItemAgreement {
  'YES' = 'Yes',
  'NO' = 'No',
  'OUI' = 'Oui',
  'NON' = 'Non',
}

export interface ConsentItemData {
  uuid?: string;
  name: string;
  language: string;
  is_consent_agreed?: boolean;
  audio_data?: string | null;
}
