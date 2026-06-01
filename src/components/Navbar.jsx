import { useState, useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef();

  const { t, i18n } = useTranslation();

  // Change Language
  const changeLanguage = (lang) => {

    i18n.changeLanguage(lang);

  };

  // Close Menu on Outside Click
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {

        setMenuOpen(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  return (

    <nav className="bg-green-900 text-white px-6 py-4 sticky top-0 z-50 shadow-lg">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-bold"
        >
          Greenstone NGO
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium items-center">

          <li>
            <a
              href="#home"
              className="hover:text-green-300"
            >
              {t("home")}
            </a>
          </li>

          <li>
            <a
              href="#about"
              className="hover:text-green-300"
            >
              {t("about")}
            </a>
          </li>

          <li>
            <a
              href="#mission"
              className="hover:text-green-300"
            >
              {t("mission")}
            </a>
          </li>

          <li>
            <a
              href="#activities"
              className="hover:text-green-300"
            >
              {t("activities")}
            </a>
          </li>

          <li>
            <a
              href="#blogs"
              className="hover:text-green-300"
            >
              {t("blogs")}
            </a>
          </li>

          <li>
            <a
              href="#events"
              className="hover:text-green-300"
            >
              {t("events")}
            </a>
          </li>

          <li>
            <a
              href="#gallery"
              className="hover:text-green-300"
            >
              {t("gallery")}
            </a>
          </li>

          <li>
            <a
              href="#contact"
              className="hover:text-green-300"
            >
              {t("contact")}
            </a>
          </li>

        </ul>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">

          {/* Language Buttons */}
          <div className="flex gap-2">

            <button
              onClick={() => changeLanguage("en")}
              className="bg-white text-green-800 px-3 py-1 rounded-lg font-bold"
            >
              EN
            </button>

            <button
              onClick={() => changeLanguage("hi")}
              className="bg-white text-green-800 px-3 py-1 rounded-lg font-bold"
            >
              हिंदी
            </button>

          </div>

          {/* Donate Button */}
          <a
            href="#donate"
            className="bg-white text-green-800 px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
          >
            {t("donate")}
          </a>

        </div>

        {/* Mobile Section */}
        <div ref={menuRef}>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-3xl"
            onClick={(e) => {

              e.stopPropagation();

              setMenuOpen(!menuOpen);

            }}
          >
            ☰
          </button>

          {/* Mobile Menu */}
          {menuOpen && (

            <div
              className="absolute right-6 mt-4 bg-green-800 rounded-2xl p-6 space-y-4 text-center shadow-2xl"
            >

              {/* Mobile Language Buttons */}
              <div className="flex justify-center gap-4 mb-4">

                <button
                  onClick={() => changeLanguage("en")}
                  className="bg-white text-green-800 px-4 py-2 rounded-xl font-bold"
                >
                  EN
                </button>

                <button
                  onClick={() => changeLanguage("hi")}
                  className="bg-white text-green-800 px-4 py-2 rounded-xl font-bold"
                >
                  हिंदी
                </button>

              </div>

              {/* Links */}
              <a
                href="#home"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-green-300"
              >
                {t("home")}
              </a>

              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-green-300"
              >
                {t("about")}
              </a>

              <a
                href="#mission"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-green-300"
              >
                {t("mission")}
              </a>

              <a
                href="#activities"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-green-300"
              >
                {t("activities")}
              </a>

              <a
                href="#blogs"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-green-300"
              >
                {t("blogs")}
              </a>

              <a
                href="#events"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-green-300"
              >
                {t("events")}
              </a>

              <a
                href="#gallery"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-green-300"
              >
                {t("gallery")}
              </a>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-green-300"
              >
                {t("contact")}
              </a>

              {/* Donate Button */}
              <a
                href="#donate"
                onClick={() => setMenuOpen(false)}
                className="inline-block bg-white text-green-800 px-5 py-2 rounded-xl font-semibold"
              >
                {t("donate")}
              </a>

            </div>

          )}

        </div>

      </div>

    </nav>

  );
}