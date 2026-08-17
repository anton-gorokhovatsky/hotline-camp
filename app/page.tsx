/* Static GitHub Pages output intentionally uses native responsive images. */
/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";

import { ConditionsPanel } from "./conditions-panel";
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
  { label: "Группа", value: "До\u00a015 человек" },
  { label: "Стоимость", value: "30\u202f000\u00a0₽" },
];

const programNotes = [
  {
    number: "01",
    title: "Велосипед",
    text: "Заранее проедем соревновательную трассу и\u00a0разберём, где держать темп.",
  },
  {
    number: "02",
    title: "Бег",
    text: "Пройдём беговой маршрут, чтобы на\u00a0старте не\u00a0тратить внимание на\u00a0незнакомые повороты.",
  },
  {
    number: "03",
    title: "Открытая вода",
    text: "Отработаем ориентирование и\u00a0спокойный вход в\u00a0дистанцию.",
  },
  {
    number: "04",
    title: "Транзит и\u00a0питание",
    text: "Соберём переходы и\u00a0план питания в\u00a0один повторяемый сценарий.",
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
        <section className="hero screen" id="about" aria-labelledby="hero-title">
          <header className="masthead">
            <a className="brand" href="#about" aria-label="Тренировочный сбор по триатлону в Сочи — наверх">
              <strong>Тренировочный сбор</strong>
              <span>по триатлону в&nbsp;Сочи</span>
            </a>

            <div className="masthead-actions">
              <nav className="section-nav" aria-label="Разделы страницы">
                <a href="#program">Программа</a>
                <a href="#trainers">Тренеры</a>
                <a href="#registration">Участие</a>
              </nav>
              <ThemeToggle />
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
            </figure>

            <div className="hero-copy">
              <p className="eyebrow">Сочи · Сириус · 27 сентября — 4 октября</p>
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

            <ConditionsPanel />
          </div>
        </section>

        <section className="program screen" id="program" aria-labelledby="program-title">
          <header className="program-heading">
            <div>
              <p className="eyebrow">Подготовка на&nbsp;месте</p>
              <h2 id="program-title">Собрать гонку целиком.</h2>
            </div>
            <p className="program-intro">
              Восемь дней нужны не&nbsp;для объёма ради объёма. Мы знакомимся
              с&nbsp;местом старта и&nbsp;связываем три дисциплины в&nbsp;понятную
              последовательность действий.
            </p>
          </header>

          <ol className="program-notes" aria-label="Что отрабатываем на сборе">
            {programNotes.map((item) => (
              <li key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>

          <div className="program-contact-sheet" aria-label="Тренировки и старты участников Hotline">
            <figure className="program-shot program-shot-cyclist">
              <img
                src="./media/program-cyclist.jpg"
                alt="Триатлет Hotline едет на шоссейном велосипеде"
                width="1200"
                height="1800"
                loading="lazy"
              />
            </figure>
            <figure className="program-shot program-shot-swimmer">
              <img
                src="./media/week-swimmer.jpg"
                alt="Триатлет выходит из воды после плавательного этапа"
                width="1600"
                height="2400"
                loading="lazy"
              />
            </figure>
            <figure className="program-shot program-shot-ride">
              <img
                src="./media/hotline-ride.jpg"
                alt="Участники Hotline держат строй на групповой велотренировке"
                width="1680"
                height="1117"
                loading="lazy"
              />
            </figure>
            <figure className="program-shot program-shot-team">
              <img
                src="./media/hotline-team-ride.jpg"
                alt="Пелотон Hotline проходит поворот на тренировке"
                width="1680"
                height="1117"
                loading="lazy"
              />
            </figure>
            <figure className="program-shot program-shot-sochi">
              <img
                src="./media/hotline-finish-sochi.jpg"
                alt="Участник Hotline финиширует на соревновании в Сириусе"
                width="1680"
                height="1116"
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        <section className="trainers screen" id="trainers" aria-labelledby="trainers-title">
          <header className="trainers-heading">
            <p className="eyebrow">Тренеры</p>
            <h2 id="trainers-title">Знают финиш изнутри.</h2>
            <p>
              Евгений и&nbsp;Максим ведут сбор вместе: разбирают технику,
              темп, переходы и&nbsp;решения, которые понадобятся уже на&nbsp;старте.
            </p>
          </header>

          <article className="coach-story coach-story-evgeny">
            <div className="coach-copy">
              <p className="coach-affiliation">Hotline</p>
              <h3>Евгений Тихонин</h3>
              <ul className="coach-credentials">
                {evgenyCredentials.map((credential) => (
                  <li key={credential}>{credential}</li>
                ))}
              </ul>
            </div>

            <div className="coach-images">
              <figure className="coach-finish">
                <img
                  src="./media/coach-evgeny-finish.jpg"
                  alt="Евгений Тихонин держит финишную ленту над головой"
                  width="1800"
                  height="1202"
                  loading="lazy"
                />
              </figure>
              <figure className="coach-portrait">
                <img
                  src="./media/evgeny.jpg"
                  alt="Портрет Евгения Тихонина в форме Hotline"
                  width="1440"
                  height="1800"
                  loading="lazy"
                />
              </figure>
            </div>
          </article>

          <article className="coach-story coach-story-maksim">
            <div className="coach-copy">
              <p className="coach-affiliation">Dusty Dumbbells</p>
              <h3>Максим Кубышко</h3>
              <ul className="coach-credentials">
                {maksimCredentials.map((credential) => (
                  <li key={credential}>{credential}</li>
                ))}
              </ul>
            </div>

            <div className="coach-images">
              <figure className="coach-finish">
                <img
                  src="./media/coach-maksim-finish.jpg"
                  alt="Максим Кубышко приближается к финишной ленте"
                  width="1800"
                  height="1199"
                  loading="lazy"
                />
              </figure>
              <figure className="coach-portrait">
                <img
                  src="./media/maksim.jpg"
                  alt="Портрет Максима Кубышко в беговой форме"
                  width="933"
                  height="1400"
                  loading="lazy"
                />
              </figure>
            </div>
          </article>

          <div className="closing-scene" id="registration">
            <figure className="closing-media">
              <img
                src="./media/final-finish.jpg"
                alt="Максим Кубышко пересекает финишную ленту с поднятыми руками"
                width="2400"
                height="1599"
                loading="lazy"
              />
            </figure>

            <div className="closing-action">
              <h2>Встретимся в&nbsp;Сочи?</h2>
              <p>
                Напиши нам в&nbsp;Telegram. Расскажем, как устроен сбор,
                и&nbsp;ответим на&nbsp;вопросы.
              </p>
              <CampCta className="camp-cta-closing" />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#about">Тренировочный сбор по&nbsp;триатлону в&nbsp;Сочи</a>
        <p>
          Условия:{" "}
          <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
            Open-Meteo
          </a>
        </p>
        <a href="#about">Наверх</a>
      </footer>
    </>
  );
}
