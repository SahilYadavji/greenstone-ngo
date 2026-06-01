import { useTranslation } from "react-i18next";

export default function Hero() {

  const { t } = useTranslation();
 

  return (
    <section
      id="home"
     className="bg-gradient-to-r from-green-800 to-emerald-500 text-white py-28 text-center px-6">

    

      <h1 className="text-6xl font-bold mb-6">
       {t("heroTitle")}
      </h1>

      <p className="text-xl max-w-3xl mx-auto mb-8">
        {t("heroSubtitle")}
      </p>

      <a
  href="#volunteer"
  className="bg-white text-green-800 px-6 py-3 rounded-2xl inline-block"
>
  {t("joinMission")}
</a>

    </section>
  );
}