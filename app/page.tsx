/* Static GitHub Pages output intentionally uses native responsive images. */
/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";

import { ThemeToggle } from "./theme-toggle";

const TELEGRAM_URL = "https://t.me/DDopenChat";

export const metadata: Metadata = {
  title: "Тренировочный сбор по\u00a0триатлону в\u00a0Сочи",
  description:
    "Восемь дней подготовки к\u00a0старту: трасса, открытая вода, транзитные зоны и\u00a0питание. Сочи, 27\u00a0сентября — 4\u00a0октября.",
};

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6 18 18 6M9 6h9v9" />
    </svg>
  );
}

function CampCta({ className = "" }: { className?: string }) {
  return (
    <a
      className={["camp-cta", className].filter(Boolean).join(" ")}
      href={TELEGRAM_URL}
      target="_blank"
      rel="noreferrer"
    >
      <span>Обсудить участие</span>
      <ArrowUpRight />
    </a>
  );
}

const campFacts = [
  { label: "Когда", value: "27.09—04.10" },
  { label: "Группа", value: "15 человек" },
  { label: "Стоимость", value: "30\u202f000\u00a0₽" },
];

const sochiConditions = [
  {
    label: "Сочи сейчас",
    value: "+23°",
    note: "туман",
  },
  {
    label: "Чёрное море",
    value: "+28°",
    note: "у берега",
  },
  {
    label: "Рассвет / закат",
    value: "05:26 / 19:23",
    note: "16 августа",
  },
];

const evgenyCredentials = [
  "4-кратный чемпион России",
  "Бронзовый призёр чемпионата мира Ironman 70.3, 2025",
  "Победитель Ironman 70.3 Oman 2025 и\u00a0Durban 2026",
  "Победитель T100 Qatar 2025",
];

const maksimCredentials = [
  "Мастер спорта по\u00a0современному пятиборью",
  "Чемпион Москвы по\u00a0современному пятиборью, 2014 и\u00a02017",
  "Победитель Всероссийской летней спартакиады учащихся, 2015",
  "Победитель Ironstar Sprint в\u00a0составе эстафетной команды, 2024",
];

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#about">
        Перейти к&nbsp;содержанию
      </a>

      <main>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <header className="masthead">
            <a className="brand" href="#top">
              <strong>Тренировочный сбор</strong>
              <span>по триатлону в&nbsp;Сочи</span>
            </a>

            <div className="masthead-actions">
              <nav className="section-nav" aria-label="Разделы страницы">
                <a href="#about">О сборе</a>
                <a href="#trainers">Тренеры</a>
                <a href="#registration">Участие</a>
              </nav>
              <ThemeToggle />
            </div>
          </header>

          <div className="hero-stage" id="about">
            <div className="hero-copy">
              <h1 id="hero-title">Последняя неделя перед стартом.</h1>
              <p className="hero-lead">
                Заранее проедем велотрассу и&nbsp;пройдём беговой маршрут.
                Отработаем навигацию в&nbsp;открытой воде, транзитные зоны
                и&nbsp;питание на&nbsp;дистанции.
              </p>

              <dl className="camp-facts" aria-label="Главное о сборе">
                {campFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="cost-note">
                Аренда дорожки в&nbsp;бассейне оплачивается отдельно.
              </p>
              <CampCta />
            </div>

            <figure className="hero-media">
              <img
                src="./media/hero-time-trial.jpg"
                alt="Триатлет проходит велосипедный этап на разделочном велосипеде"
                width="2400"
                height="1599"
                fetchPriority="high"
              />
            </figure>
          </div>

          <aside className="conditions" aria-label="Условия в Сочи">
            {sochiConditions.map((condition) => (
              <div
                className="condition service-island material-glass"
                key={condition.label}
              >
                <span>{condition.label}</span>
                <strong>{condition.value}</strong>
                <small>{condition.note}</small>
              </div>
            ))}
          </aside>
        </section>

        <section className="trainers" id="trainers" aria-labelledby="trainers-title">
          <header className="section-heading">
            <h2 id="trainers-title">Тренеры</h2>
          </header>

          <article className="coach coach-evgeny">
            <figure className="coach-photo">
              <img
                src="./media/coach-evgeny-finish.jpg"
                alt="Евгений Тихонин держит финишную ленту над головой"
                width="1800"
                height="1202"
                loading="lazy"
              />
            </figure>

            <div className="coach-copy">
              <p className="coach-affiliation">Hotline</p>
              <h3>Евгений Тихонин</h3>
              <ul className="coach-credentials">
                {evgenyCredentials.map((credential) => (
                  <li key={credential}>{credential}</li>
                ))}
              </ul>
            </div>
          </article>

          <article className="coach coach-maksim">
            <figure className="coach-photo">
              <img
                src="./media/final-finish.jpg"
                alt="Максим Кубышко пересекает финишную ленту с поднятыми руками"
                width="2400"
                height="1599"
                loading="lazy"
              />
            </figure>

            <div className="coach-copy">
              <p className="coach-affiliation">Dusty Dumbbells</p>
              <h3>Максим Кубышко</h3>
              <ul className="coach-credentials">
                {maksimCredentials.map((credential) => (
                  <li key={credential}>{credential}</li>
                ))}
              </ul>
            </div>
          </article>
        </section>
      </main>

      <footer className="finale" id="registration" aria-labelledby="closing-title">
        <figure className="finale-media">
          <img
            src="./media/hotline-team-ride.jpg"
            alt="Участники Hotline едут группой на шоссейных велосипедах"
            width="1680"
            height="1117"
            loading="lazy"
          />
        </figure>

        <div className="closing-action">
          <h2 id="closing-title">Хочешь присоединиться?</h2>
          <p>
            Напиши нам в&nbsp;Telegram. Расскажем, как устроен сбор,
            и&nbsp;ответим на&nbsp;вопросы.
          </p>
          <CampCta className="camp-cta-closing" />
        </div>

        <div className="finale-signoff">
          <a href="#top">Тренировочный сбор по&nbsp;триатлону в&nbsp;Сочи</a>
          <p>Погода: Open-Meteo · обновлено 16 августа, 23:15</p>
        </div>
      </footer>
    </>
  );
}
