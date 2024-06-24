"use client";
import Link from "next/link";
import AvatarGroup from "../AvatarGroup";
import Rating from "../Rating";
import ShortForm from "../Contact/ShortForm";
import { useTranslation } from "react-i18next";
const Hero = () => {
  const { t } = useTranslation();

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden pb-16
        pt-[120px] md:pb-[120px] lg:pt-[120px] lg:pb-8
        "
      >
        <div className="container flex flex-col max-w-7xl lg:flex-row">
          <div className="container">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <div className="mx-auto max-w-[800px] ">
                  <h1 className="mb-5 text-4xl lg:text-6xl md:text-5xl sm:text-4xl font-bold leading-tightText sm:leading-tight  md:leading-tight">
                    {t("hero:hero_title")}
                  </h1>
                  {/* <h2 className="mb-5 text-4xl md:text-2xl sm:text-2xl font-bold leading-tight  dark: sm:leading-tight md:leading-tight">
                  </h2> */}
                  <p className="mb-5 text-base !leading-relaxed sm:text-lg md:text-lg">
                    {t("hero:app_desc")}
                  </p>
                  <div className="mb-5 md:flex gap-7">
                      <AvatarGroup />
                    <div className="max-w-xs">
                      <Rating />
                      <p >
                        {t("hero:join_happy_couples", {
                          couplesNumber: `97+`,
                        })}
                      </p>
                    </div>
                  </div>
                  <ShortForm />
                </div>
              </div>
            </div>
          </div>
          <div className="max-md:-m-4 relative flex flex-col items-center pt-8 px-8 lg:p-0 lg:w-full">
            <img
              className="w-full max-w-[507px] md:mx-auth md:mt-2"
              src="/hero-couple.jpg"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
