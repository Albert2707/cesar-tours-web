import useTranslate from '@hooks/translations/Translate';
import { FC } from 'react'
import Button from '@/shared/components/button/Button';
import { useNavigate } from 'react-router-dom';
interface Props{
  text:string
  redirectTo:string
}
const StepValidation:FC<Props> = ({text, redirectTo}) => {
  const { translate } = useTranslate();
  const navigate = useNavigate();

  return (
    <div
    style={{
      height: "calc(100vh - 80px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      boxSizing: "border-box",
    }}
  >
    {text}
    <Button
      properties={{
        type: "back",
        onClickfn: () => {
          navigate(redirectTo);
        },
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
      {translate("reserve")}
    </Button>
  </div>
  )
}

export default StepValidation
