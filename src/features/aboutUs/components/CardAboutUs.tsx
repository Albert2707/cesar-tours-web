import React, { FC } from "react";
import useTranslate from "../../../shared/hooks/translations/Translate";

interface Cardprops {
  isInView: boolean;
  title: string;
  values: "vision" | "mision" | "valores";
  style: React.CSSProperties | undefined;
  children: React.ReactNode;
}
const CardAboutUs: FC<Cardprops> = ({
  isInView,
  title,
  values,
  children,
  style,
}) => {
  const { translate } = useTranslate();

  return (
    <div
      className="card-aboutUs"
      style={{
        transform: isInView ? "none" : "translateY(200px)",
        opacity: isInView ? 1 : 0,
      }}
    >
      <div className="card-header">
        <div className="header" style={style}>
          {children}
        </div>
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <p className="">
          {values === "valores"
            ? translate(values).map((e: string, index: number) => (
                <React.Fragment key={index}>
                  <span>{e}</span>
                  <br />
                </React.Fragment>
              ))
            : translate(values)}
        </p>
      </div>
    </div>
  );
};

export default CardAboutUs;
