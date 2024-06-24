import Rating from "../Rating";
import initTranslations from "@/i18n";
import { I18Props } from "@/types/i18Props";

const SocialProof = async ({ locale }: any) => {
  const { t } = await initTranslations(locale, ["social_proof"]);
  return (
    <section className="anchor relative z-10 py-[60px] dark:primaryText md:pb-[60px] md:pt-[60px] xl:pb-[100px] xl:pt-[100px] 2xl:pb-[40px] 2xl:pt-[40px]">
      <div className="container flex justify-center items-center flex-col gap-x-5 lg:flex-row lg:gap-x-36">
        <div className="avatar flex items-center">
          <div className="h-64 rounded-full">
            <img src="/couples/couples5.jpg" />
          </div>
        </div>
        <div className="">
          <div className="mb-3">
            <Rating />
          </div>
          <p className=" mb-3">{t("reviewer1")}</p>
          <p className="">
            <b>{t("reviewer_name")}</b>, {t("reviewer_desc")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
