import { useTranslation } from "react-i18next";

export default function About() {

  const { t } = useTranslation();

  return (

    <section
      id="about"
      className="py-20 px-6 bg-green-50"
    >

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop"
          className="rounded-3xl shadow-xl"
        />

        <div>

          <h2 className="text-4xl font-bold text-green-700 mb-6">

            {t("aboutTitle")}

          </h2>

          <p className="text-lg leading-relaxed">

            {t("aboutText")}

          </p>

        </div>

      </div>

    </section>

  );
}