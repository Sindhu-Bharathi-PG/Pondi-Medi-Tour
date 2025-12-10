"use client";

import medicalConfigDefault from '@/app/config/home/medicalConfig.json';
import { useHomeConfigOptional } from '@/app/context/HomeConfigContext';
import { HomePageConfig } from '@/app/types/homeConfig.types';
// import { SectionRenderer } from './dynamic';

interface MedicalHomeProps {
      // Allow passing config externally for non-provider usage
      externalConfig?: HomePageConfig;
}

const MedicalHome = ({ externalConfig }: MedicalHomeProps) => {
      const homeConfig = useHomeConfigOptional();

      // Use context config if available, otherwise use external or default
      const config = homeConfig?.config.mode === 'medical'
            ? homeConfig.config
            : externalConfig || (medicalConfigDefault as HomePageConfig);

      return <SectionRenderer config={config} />;
};

export default MedicalHome;
