import { useTranslation } from "react-i18next";

export default function Mission() {

  const { t } = useTranslation();

  const missions = [
    {
      icon: "🌱",
      title: t("plantTitle"),
      desc: t("plantDesc"),
    },
    {
      icon: "👦",
      title: t("childTitle"),
      desc: t("childDesc"),
    },
    {
      icon: "🤝",
      title: t("communityTitle"),
      desc: t("communityDesc"),
    },
  ];

  return (

    <section id="mission" className="py-20 px-6 bg-white">

      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-4xl font-bold text-green-700 mb-12">

          {t("missionTitle")}

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {missions.map((item, index) => (

            <div
              key={index}
              className="bg-green-100 p-8 rounded-3xl shadow-lg"
            >

              <div className="text-5xl mb-4">

                {item.icon}

              </div>

              <h3 className="text-2xl font-semibold mb-4">

                {item.title}

              </h3>

              <p>

                {item.desc}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}