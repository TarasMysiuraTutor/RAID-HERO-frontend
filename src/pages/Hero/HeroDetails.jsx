import { useParams, Link } from "react-router-dom";
import heroesData from "../../locales/heroes_all.json";
import { useLanguage } from "../../context/LanguageContext.js";
import { useTranslation } from "react-i18next";

export default function HeroDetails() {
  const { id } = useParams();
  const { language } = useLanguage();
  const { t } = useTranslation();

  const hero = heroesData.find((h) => String(h._id.$oid) === id);

  if (!hero) return <p className="p-6">Героя не знайдено</p>;

  const heroData = hero.details?.[language] || hero.details?.en;
  // console.log(heroData.skills);
  // console.log(Array.isArray(heroData.skills));
  return (
    <div className="p-6 dark:bg-gray-900 dark:text-white min-h-screen max-w-6xl mx-auto px-4 py-6">
      <Link to="/" className="underline block mb-4">
        ← Назад
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-[240px] mb-auto rounded-xl shadow">
          <img
            src={hero.img}
            alt={heroData.name}
            className="w-[240px] mb-auto rounded-xl shadow"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{heroData.name}</h1>
          <p className="italic text-gray-600 dark:text-gray-400">
            {hero.class}
          </p>
          <p className="mt-3">{heroData.description}</p>

          <h2 className="text-2xl font-semibold mt-6">
            {t("heroCharacteristics")}
          </h2>
          <ul className="list-none list-inside p-3 pl-5">
            {Object.entries(heroData.characteristics || {}).map(
              ([key, val]) => (
                <li key={key} className="mb-2">
                  <b>
                    {key}
                    :
                  </b>{" "}
                  {val}
                </li>
              )
            )}
          </ul>
          {heroData.aura && (
            <div className="mt-6 p-3 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <h2 className="text-2xl font-semibold">{t("aura")}</h2>
              <p>{heroData.aura}</p>
            </div>
          )}

          <h2 className="text-2xl font-semibold mt-6">{t("heroSkills")}</h2>
          <div className="grid gap-4">
            {Object.values(heroData.skills).map((skill, index) => (
              <div
                key={index}
                className="p-3 border rounded mb-3 bg-gray-100 dark:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  {skill.skill_img_url === null || (
                    <img
                      src={skill.skill_img_url}
                      alt={skill.name}
                      className="w-8 h-8"
                    />
                  )}

                  <h3 className="font-bold">{skill.name}</h3>
                </div>

                {/* Опис скіла */}
                <p className="text-sm mt-2">{skill.text}</p>

                {/* Формули */}
                {skill.formula && (
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-300">
                    {Object.values(skill.formula).map((f, i) => (
                      <div key={i}>{f}</div>
                    ))}
                  </div>
                )}

                {/* Рівні скіла */}
                {skill.skill_levels &&
                  Object.keys(skill.skill_levels).length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold">{`Skill Levels:`}</p>
                      {Object.entries(skill.skill_levels).map(
                        ([level, details]) => (
                          <div key={level} className="text-sm ml-2">
                            Lv.{level}: {details.type} +{details.amount}
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            {t("statsByLevel")}
          </h2>
          <div className="overflow-x-auto pb-10">
            <table className="border-separate border border-gray-400 w-full">
              {/* {Object.entries(heroData.stats_by_level || {}).map(
                ([key, val]) => (
                  <li key={key}>
                    <b>{t(key)}:</b> {val}
                  </li>
                )
              )} */}
              <thead>
                <tr>
                  {Object.entries(heroData.stats_by_level || {}).map(
                    ([key, val]) => (
                      <th key={key} className="border border-gray-300 ...">
                        <b>{t(key)}</b>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.entries(heroData.stats_by_level || {}).map(
                    ([key, val]) => (
                      <th key={key} className="border border-gray-300 ...">
                        <p>{val}</p>
                      </th>
                    )
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
