import Accordion from "./Accordion";
import initTranslations from "@/i18n";

const FAQ = async ({ locale }: any) => {
  const { t } = await initTranslations(locale, ["faq"]);

  return (
    <section
      id="faq"
      className="anchor relative z-10 Text
  py-[60px] md:pb-[60px] md:pt-[60px] xl:pb-[100px] xl:pt-[100px] 2xl:pb-[40px] 2xl:pt-[40px]
  "
    >
      <div className="container grid lg:grid-cols-2 sm:grid-cols-1">
        <div className="container items-left">
          <h3>{t("header")}</h3>
          {/* <p className="max-w-screen-sm  mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            deserunt optio quod, error totam maiores sit et? Provident
            praesentium
          </p> */}
        </div>
        <div className="container">
          <div id="accordion">
            <Accordion />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
