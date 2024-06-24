import Link from "next/link";
import initTranslations from "@/i18n";
import ShortForm from '@/components/Contact/ShortForm'
const Cta = async ({ locale }: any) => {
  const { t } = await initTranslations(locale, ["cta"]);
  return (
    <section
      className="anchor relative z-10
    py-[60px]   md:pb-[60px] md:pt-[60px] xl:pb-[100px] xl:pt-[100px] 2xl:pb-[40px] 2xl:pt-[40px]
    "
    >
      <div className="container flex flex-col items-center">
        <h3 className="text-center sm:text-center md:text-center">
          {t("header")}
        </h3>
        {/* <p className="text-base max-w-screen-sm text-center  mb-8">
          Start summarizing YT comments in less than a minute.
        </p> */}
        <div className="w-3/5 flex justify-center">
          <ShortForm/> 
        </div>
      </div>
    </section>
  );
};

export default Cta;
