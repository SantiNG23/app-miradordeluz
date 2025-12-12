import type { FC } from "react";
import { FiWifi, FiTv, FiStar } from "react-icons/fi";
import { MdOutlinePool, MdGarage } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";

interface Props {
  amenity: string;
  class?: string;
}

const AmenityIcon: FC<Props> = ({ amenity, class: className = "" }) => {
  const key = amenity?.toLowerCase() ?? "";

  if (key.includes("pileta") || key.includes("pool")) {
    return <MdOutlinePool className={className} aria-hidden />;
  }
  if (key.includes("cochera") || key.includes("estacion") || key.includes("garage")) {
    return <MdGarage className={className} aria-hidden />;
  }
  if (key.includes("aire") || key.includes("ac") || key.includes("climat") || key.includes("acondicionado")) {
    return <TbAirConditioning className={className} aria-hidden />;
  }
  if (key.includes("tv") || key.includes("tele") || key.includes("led")) {
    return <FiTv className={className} aria-hidden />;
  }
  if (key.includes("wifi")) {
    return <FiWifi className={className} aria-hidden />;
  }

  return <FiStar className={className} aria-hidden />;
};

export default AmenityIcon;


