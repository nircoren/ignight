"use client";
import { useTranslation } from "react-i18next";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  number,
  title,
  description,
}) => (
  <div className="flex items-start mb-4 md:mb-6">
    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-md mr-4">
      {number}.
    </div>
    <div>
      <h3 className="mb-0 font-normal text-lg">{title}</h3>
      <p className="text-gray-400 font-normal">{description}</p>
    </div>
  </div>
);

const ProcessList = () => {
  const { t } = useTranslation();
  return (
    <div className="pl-0 py-8 lg:p-8">
      <h2 className=" text-3xl font-bold mb-8">
        {t("features_objections:header")}
      </h2>
      <ProcessStep
        number="1"
        title={t("features_objections:feature1")}
        description=""
      />
      <ProcessStep
        number="2"
        title={t("features_objections:feature2")}
        description=""
      />
      <ProcessStep
        number="3"
        title={t("features_objections:feature3")}
        description=""
      />
    </div>
  );
};

export default ProcessList;
