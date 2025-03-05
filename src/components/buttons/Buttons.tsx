import Link from "next/link";
import { ButtonProps } from "../constants/interfaces";

export const BackgroundButton = (props: ButtonProps) => {
    return (
      <Link
        href={props.link}
        className={`${props.btnWidth} flex items-center justify-center bg-darkBlue text-white border border-shadeThree rounded-full py-3 px-6`}
      >
        {props.text}
      </Link>
    );
  };
  
  export const OutlineButton = (props: ButtonProps) => {
    return (
      <Link
        href={props.link}
        className={`${props.btnWidth} flex items-center justify-center text-darkBlue border border-darkBlue rounded-full py-3 px-6 text-nowrap `}
      >
        {props.text}
      </Link>
    );
  };