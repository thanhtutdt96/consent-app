import { memo } from 'react';

export const ConsentItemHeader = () => (
  <div className="flex justify-between mb-md text-bold">
    <div>Details</div>
    <div className="ml-auto flex">
      <div className="mr-sm">Consent</div>
      <div>Given</div>
    </div>
  </div>
);

export default memo(ConsentItemHeader);
