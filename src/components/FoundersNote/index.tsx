import Link from "next/link";
import initTranslations from "@/i18n";
import ShortForm from "@/components/Contact/ShortForm";
const Cta = async ({ locale }: any) => {
  const { t } = await initTranslations(locale, ["founders_note"]);
  console.log(locale);
  return (
    <section
      id="foundersNote"
      className="anchor relative z-10
    py-[60px]   md:pb-[60px] md:pt-[60px] xl:pb-[100px] xl:pt-[100px] 2xl:pb-[40px] 2xl:pt-[40px]
    "
    >
      <div className="container flex flex-col items-center">
        <h3 className="text-center ">{t("header")}</h3>
        <div>
          <p
            className={
              `text-base max-w-screen-md mb-8 mx-2 ` +
              (locale == "en" ? "text-left" : "text-right")
            }
          >
            {t("founders_note")}
          </p>
          <div className="flex gap-4 items-center">
            <div className="avatar">
              <div className="w-24 rounded-full ">
                <img src="Nir&Polina.jpg" />
              </div>
            </div>
            <div>
              <p className="font-bold">Nir & Polina</p>
              <p>Cofounders of Ignight</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
