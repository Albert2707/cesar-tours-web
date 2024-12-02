import { FC } from "react";
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
        transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
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
        {values === "valores" ? (
          translate(values).map((e: string) => {
            return (
              <>
                <span key={crypto.randomUUID()}>{e}</span>
                <br key={crypto.randomUUID()} />
              </>
            );
          })
        ) : (
          translate(values)
        )}
        </p>
      </div>
    </div>
  );
};

export default CardAboutUs;
