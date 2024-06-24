import Hero from "@/components/Hero";
import { Metadata } from "next";
import Process from "@/components/Process";
import Cta from "@/components/Cta";
import FoundersNote from "@/components/FoundersNote";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import TranslationsProvider from "@/components/i18/TranslationsProvider";
import initTranslations from "@/i18n";
import { I18Props } from "@/types/i18Props";

export const metadata: Metadata = {
  title: "Ignight",
  description: "Ditch Netflix, Ignite Your Night",
  // other metadata
};

const i18nNamespaces = ["common", "hero", "features_objections", "faq","cta"];

const Home: React.FC<I18Props> = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <main>
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <Hero />
        <Process />
        <SocialProof locale={locale}/>
        <FAQ locale={locale}/>
        <Cta />
        <FoundersNote locale={locale}/>
        {/* <Benefits /> */}
        {/* <Pricing /> */}
        <Contact />
      </TranslationsProvider>
    </main>
  );
};

export default Home;
