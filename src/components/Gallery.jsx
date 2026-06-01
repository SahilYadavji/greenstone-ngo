import { useTranslation } from "react-i18next";
export default function Gallery() {
  const { t } = useTranslation();
  return (
    <section id="gallery" className="py-20 bg-green-50 px-6">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
        {t("galleryTitle")}
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <img
          src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1200&auto=format&fit=crop"
          alt="Tree Plantation"
          className="rounded-3xl h-72 w-full object-cover shadow-xl hover:scale-105 transition"
        />

        <img
          src="https://images.unsplash.com/photo-1604425330669-7dcfba757cb7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmdvJTIwcGhvdG9zfGVufDB8fDB8fHww"
          alt="Child"
          className="rounded-3xl h-72 w-full object-cover shadow-xl hover:scale-105 transition"
        />

        <img
          src="https://images.unsplash.com/photo-1569173675610-42c361a86e37?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5nbyUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Child Education"
          className="rounded-3xl h-72 w-full object-cover shadow-xl hover:scale-105 transition"
        />
        <img
          src="https://plus.unsplash.com/premium_photo-1726736593394-9a6106de49c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fG5nbyUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Tree Plantation"
          className="rounded-3xl h-72 w-full object-cover shadow-xl hover:scale-105 transition"
        />

      </div>
    </section>
  );
}