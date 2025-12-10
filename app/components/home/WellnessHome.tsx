"use client";

import wellnessConfigDefault from '@/app/config/home/wellnessConfig.json';
import { useHomeConfigOptional } from '@/app/context/HomeConfigContext';
import { HomePageConfig } from '@/app/types/homeConfig.types';
// import { SectionRenderer } from './dynamic';

interface WellnessHomeProps {
      // Allow passing config externally for non-provider usage
      externalConfig?: HomePageConfig;
}

const WellnessHome = ({ externalConfig }: WellnessHomeProps) => {
      const homeConfig = useHomeConfigOptional();

      // Use context config if available, otherwise use external or default
      const config = homeConfig?.config.mode === 'wellness'
            ? homeConfig.config
            : externalConfig || (wellnessConfigDefault as HomePageConfig);

      return <SectionRenderer config={config} />;
};

export default WellnessHome;
