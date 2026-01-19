import React from 'react';

interface DentistryIconProps {
  name: string;
  className?: string;
  size?: number;
}

const DentistryIcon: React.FC<DentistryIconProps> = ({ name, className = '', size = 24 }) => {
  // Map of meaningful names to file names
  const iconMap: Record<string, string> = {
    // Workflow icons
    consultation: '012-medical_app.svg',
    treatment: '019-Dental_care.svg',
    aftercare: '042-wellness.svg',

    // Service icons
    smile: '001-smile.svg',
    tooth: '018-tooth.svg',
    teeth: '050-teeth.svg',
    dentist: '021-dentist.svg',
    clinic: '034-dental_clinic.svg',
    checkup: '036-dental_checkup.svg',
    cleaning: '048-tooth_cleaning.svg',
    implant: '023-dental_implant.svg',
    crown: '005-dental_crown.svg',
    braces: '015-braces.svg',
    surgery: '025-dental_surgery.svg',
    xray: '049-x_ray.svg',
    drill: '009-tooth_drill.svg',
    download: '013-report_card.svg', // Using report card as download icon

    // UI icons
    calendar: '037-dental_schedule.svg',
    phone: '012-medical_app.svg',
    email: '012-medical_app.svg',
    location: '034-dental_clinic.svg',
    certificate: '044-certificate.svg',
    star: '001-smile.svg',
    heart: '042-wellness.svg',
    shield: '006-dental_insurance.svg',
    user: '021-dentist.svg',
    award: '044-certificate.svg',
  };

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const fileName = iconMap[name] || `${name}.svg`;

  return (
    <img
      src={`/icons/${fileName}`}
      alt={`${name} icon`}
      className={className}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
      }}
      onError={e => {
        // Fallback to a default icon if the custom icon fails to load
        const target = e.target as HTMLImageElement;
        target.src = '/icons/021-dentist.svg'; // Default dentist icon
      }}
    />
  );
};

export default DentistryIcon;
