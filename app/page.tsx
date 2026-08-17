/* Static GitHub Pages output intentionally uses native responsive images. */
/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";

import { ThemeToggle } from "./theme-toggle";

const TELEGRAM_URL = "https://t.me/DDopenChat";

export const metadata: Metadata = {
  title: "Тренировочный сбор по\u00a0триатлону в\u00a0Сочи",
  description:
    "Финальная неделя перед стартом: трасса, открытая вода, транзитные зоны и\u00a0питание. Сочи, 27\u00a0сентября — 4\u00a0октября.",
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
      className={`camp-cta ${className}`.trim()}
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
  {
    label: "27.09—04.10",
    value: "Прогноз с\u00a017 сентября",
    note: "за 10 дней до старта",
  },
];

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#content">
        Перейти к&nbsp;содержанию
      </a>

      <main id="content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-shell">
            <header className="masthead">
              <div className="masthead-nav">
                <a className="brand service-island material-glass" href="#top">
                  <strong>Тренировочный сбор</strong>
                  <span>по триатлону в&nbsp;Сочи</span>
                </a>

                <aside className="conditions glass-cluster" aria-label="Условия в Сочи">
                  {sochiConditions.map((condition, index) => (
                    <div
                      className={`condition service-island material-glass${index === sochiConditions.length - 1 ? " condition-forecast" : ""}`}
                      key={condition.label}
                    >
                      <span>{condition.label}</span>
                      <strong>{condition.value}</strong>
                      <small>{condition.note}</small>
                    </div>
                  ))}
                </aside>

                <nav className="section-nav glass-cluster" aria-label="Разделы страницы">
                  <a className="service-island material-glass" href="#top">О сборе</a>
                  <a className="service-island material-glass" href="#trainers">Тренеры</a>
                </nav>

                <div className="masthead-meta glass-cluster">
                  <p className="masthead-place service-island material-glass">27.09—04.10</p>
                  <ThemeToggle />
                </div>
              </div>
            </header>

            <div className="hero-stage">
              <figure className="hero-media">
                <img
                  src="./media/hero-time-trial.jpg"
                  alt="Триатлет проходит велосипедный этап на разделочном велосипеде"
                  width="2400"
                  height="1599"
                  fetchPriority="high"
                />
                <figcaption className="material-glass">
                  <span>Скорость собирается из&nbsp;деталей</span>
                  <span>Сочи / финальная неделя</span>
                </figcaption>
              </figure>

              <div className="week-marker" aria-label="Восемь дней подготовки">
                <span>8</span>
                <small>дней<br />в&nbsp;Сочи</small>
              </div>

              <div className="hero-brief">
                <p className="screen-index">27.09—04.10 / Сочи</p>
                <h1 id="hero-title">Восемь дней в&nbsp;Сочи перед стартом.</h1>
                <p className="hero-lead">
                  Потренируемся на&nbsp;открытой воде, шоссе и&nbsp;беговых маршрутах.
                  Отработаем технику, транзитные зоны и&nbsp;питание с&nbsp;учётом вашей дистанции.
                </p>

                <dl className="camp-facts" aria-label="Главное о кэмпе">
                  {campFacts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="hero-action">
                  <CampCta />
                  <p>
                    Евгений Тихонин <span aria-hidden="true">×</span> Максим Кубышко
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trainers" id="trainers" aria-labelledby="trainers-title">
          <div className="trainers-shell">
            <div className="finale-heading">
              <p className="screen-index screen-index-light">02 / тренеры</p>
              <h2 id="trainers-title">Тренеры</h2>
              <p>Сбор проведут Евгений Тихонин и&nbsp;Максим Кубышко.</p>
            </div>

            <div className="coach-grid" aria-label="Тренеры кэмпа">
              <figure className="coach-card">
                <div className="coach-image">
                  <img
                    src="./media/coach-evgeny-finish.jpg"
                    alt="Евгений Тихонин поднимает финишную ленту после гонки"
                    width="1800"
                    height="1202"
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  <div className="coach-identity">
                    <p>Тренер сборов</p>
                    <h3>Евгений Тихонин</h3>
                  </div>
                  <ul className="coach-credentials">
                    <li>4-кратный чемпион России</li>
                    <li>Бронзовый призёр ЧМ Ironman 70.3 · 2025</li>
                    <li>Победитель Ironman 70.3 Oman и&nbsp;Durban</li>
                  </ul>
                </figcaption>
              </figure>

              <figure className="coach-card">
                <div className="coach-image">
                  <img
                    src="./media/final-finish.jpg"
                    alt="Максим Кубышко пересекает финишную ленту с поднятыми руками"
                    width="2400"
                    height="1599"
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  <div className="coach-identity">
                    <p>Dusty Dumbbells</p>
                    <h3>Максим Кубышко</h3>
                  </div>
                  <ul className="coach-credentials">
                    <li>Мастер спорта по&nbsp;современному пятиборью</li>
                    <li>Двукратный чемпион Москвы</li>
                    <li>Победитель эстафеты Ironstar Sprint · 2024</li>
                  </ul>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      </main>

      <footer className="finale" aria-labelledby="closing-title">
        <div className="finale-shell">
          <div className="closing-strip">
            <p className="closing-date">27 сентября — 4 октября · до&nbsp;15 участников</p>
            <h2 id="closing-title">Встретимся<br />в&nbsp;Сочи.</h2>
            <div className="closing-action">
              <CampCta className="camp-cta-closing" />
              <p>30&#8239;000&nbsp;₽</p>
            </div>
          </div>

          <div className="finale-signoff">
            <a href="#top">Тренировочный сбор по&nbsp;триатлону в&nbsp;Сочи</a>
            <p>
              Плавание · велосипед · бег · Сочи
              <span aria-hidden="true"> · </span>
              <span className="weather-credit">
                погода: Open-Meteo, 16.08 · 23:15
              </span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
