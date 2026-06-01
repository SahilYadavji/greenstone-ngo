import { useTranslation } from "react-i18next";

export default function Contact() {

  const { t } = useTranslation();

  return (

    <section
      id="contact"
      className="bg-green-700 text-white py-20 px-6 text-center"
    >

      <h2 className="text-4xl font-bold mb-6">

        {t("contactTitle")}

      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

        {/* Email */}
        <div className="bg-green-600 p-6 rounded-2xl">

          <h3 className="text-2xl font-bold mb-3">

            {t("email")}

          </h3>

          <p>

            greenstone@email.com

          </p>

        </div>

        {/* Phone */}
        <div className="bg-green-600 p-6 rounded-2xl">

          <h3 className="text-2xl font-bold mb-3">

            {t("phone")}

          </h3>

          <p>

            +91 9876543210

          </p>

        </div>

        {/* Location */}
        <div className="bg-green-600 p-6 rounded-2xl">

          <h3 className="text-2xl font-bold mb-3">

            {t("location")}

          </h3>

          <p>

            India

          </p>

        </div>

      </div>

    </section>
  );
}