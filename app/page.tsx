/* Static GitHub Pages output intentionally uses native responsive images. */
/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";

import { ThemeToggle } from "./theme-toggle";

const TELEGRAM_URL = "https://t.me/DDopenChat";

export const metadata: Metadata = {
  title: "Hotline — триатлонный кэмп в\u00a0Сочи",
  description:
    "Финальная неделя перед стартом: трасса, море, транзитные зоны, темп и\u00a0питание. Сириус, 27\u00a0сентября — 4\u00a0октября 2026\u00a0года.",
};

const outcomes = [
  {
    number: "01",
    label: "Вело + бег",
    title: "Узнать трассу",
    text: "Проедем и\u00a0пробежим ключевые участки: рельеф, повороты, покрытие и\u00a0места, где особенно важно распределить усилия.",
  },
  {
    number: "02",
    label: "Открытая вода",
    title: "Освоить акваторию",
    text: "Настроим старт, ориентирование и\u00a0рабочий ритм в\u00a0море — с\u00a0учётом волнения, волн и\u00a0других пловцов.",
  },
  {
    number: "03",
    label: "Транзиты",
    title: "Собрать порядок",
    text: "Отрепетируем личную последовательность действий, чтобы на\u00a0старте не\u00a0тратить внимание на\u00a0решения, принятые заранее.",
  },
  {
    number: "04",
    label: "Темп + питание",
    title: "Проверить сценарий",
    text: "Сверим темп, питание и\u00a0экипировку. Подготовим варианты на\u00a0случай жары, ветра или изменений в\u00a0расписании.",
  },
];

const phases = [
  {
    dates: "27–28 сентября",
    title: "Приезд и\u00a0настройка",
    text: "Знакомимся, собираем велосипеды, сверяем состояние и\u00a0спокойно входим в\u00a0ритм недели.",
  },
  {
    dates: "29–30 сентября",
    title: "Разведка",
    text: "Изучаем трассу, акваторию и\u00a0транзитные зоны без гонки за\u00a0лишним объёмом.",
  },
  {
    dates: "1–2 октября",
    title: "Предстартовая сборка",
    text: "Связываем дисциплины, питание и\u00a0темп в\u00a0один личный сценарий. Снижаем нагрузку, сохраняем тонус.",
  },
  {
    dates: "3–4 октября",
    title: "Стартовый уикенд",
    text: "IRONSTAR\u00a0113 проходит 3\u00a0октября, OLYMPIC — 4\u00a0октября. Работаем по\u00a0плану своей дистанции.",
  },
];

const coaches = [
  {
    number: "01",
    name: "Евгений Тихонин",
    role: "велосипед и\u00a0триатлон",
    text: "Поможет связать технику, темп и\u00a0решения на\u00a0трассе в\u00a0один рабочий сценарий.",
    image: "./media/evgeny.jpg",
    alt: "Евгений Тихонин в велосипедной форме",
    width: 1440,
    height: 1800,
    className: "coach-card coach-card-evgeny",
  },
  {
    number: "02",
    name: "Максим Кубышко",
    role: "бег и\u00a0триатлон",
    text: "Поможет выбрать усилие, сохранить форму к\u00a0старту и\u00a0не\u00a0потерять гонку на\u00a0лишней спешке.",
    image: "./media/maksim.jpg",
    alt: "Максим Кубышко в беговой форме",
    width: 933,
    height: 1400,
    className: "coach-card coach-card-maksim",
  },
];

const faqs = [
  {
    question: "Подойдёт ли\u00a0кэмп, если я\u00a0впервые стартую в\u00a0Сочи?",
    answer:
      "Да. Смысл недели как раз в\u00a0том, чтобы заранее познакомиться с\u00a0местом и\u00a0перевести неизвестное в\u00a0понятный план. Нагрузку подстроим под\u00a0текущую форму.",
  },
  {
    question: "Нужно ли\u00a0быть сильным пловцом?",
    answer:
      "Нет, но\u00a0нужно уверенно держаться на\u00a0воде. Задания различаются по\u00a0уровню, а\u00a0решение о\u00a0выходе в\u00a0море всегда зависит от\u00a0фактических условий.",
  },
  {
    question: "Можно приехать без своего велосипеда?",
    answer:
      "Аренду можно обсудить заранее. Напиши рост и\u00a0параметры посадки в\u00a0Telegram: проверим доступные варианты до\u00a0поездки.",
  },
  {
    question: "Что входит в\u00a030\u202f000\u00a0₽?",
    answer:
      "Работа тренеров и\u00a0тренировочная программа кэмпа. Перелёт, проживание, питание, стартовый слот, аренда дорожки и\u00a0личные расходы оплачиваются отдельно.",
  },
  {
    question: "Что будет, если изменится погода?",
    answer:
      "Порядок занятий может меняться. Открытая вода, велосипед и\u00a0интенсивность зависят от\u00a0условий; тренеры сохранят задачу дня и\u00a0безопасность группы.",
  },
];

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6 18 18 6M9 6h9v9" />
    </svg>
  );
}

function CampCta() {
  return (
    <a className="camp-cta" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
      <span>Обсудить участие</span>
      <ArrowUpRight />
    </a>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Hotline: к началу страницы">
        <span className="brand-name">HOTLINE</span>
        <span className="brand-context">кэмп / Сочи</span>
      </a>

      <nav className="site-nav" aria-label="Навигация по странице">
        <a href="#program">Программа</a>
        <a href="#week">Неделя</a>
        <a href="#coaches">Тренеры</a>
        <a href="#participation">Участие</a>
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <div className="header-cta">
          <CampCta />
        </div>
      </div>
    </header>
  );
}

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#content">
        Перейти к содержанию
      </a>
      <SiteHeader />

      <main id="content">
        <section className="hero page-shell" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Сочи / Сириус · 27 сентября — 4 октября 2026</p>
            <h1 id="hero-title">
              Форма уже набрана.
              <span>Собираем старт.</span>
            </h1>
            <p className="hero-lead">
              Восемь дней в{"\u00a0"}Сириусе, чтобы изучить трассу и{"\u00a0"}море,
              отрепетировать транзиты и{"\u00a0"}выйти на{"\u00a0"}гонку со{"\u00a0"}своим
              понятным планом.
            </p>
            <div className="hero-action">
              <CampCta />
              <p>Напиши дистанцию и{"\u00a0"}ожидаемый результат — тренер ответит лично.</p>
            </div>

            <dl className="hero-facts" aria-label="Главное о кэмпе">
              <div>
                <dt>Группа</dt>
                <dd>до{"\u00a0"}15 человек</dd>
              </div>
              <div>
                <dt>Стоимость</dt>
                <dd>30&#8239;000{"\u00a0"}₽</dd>
              </div>
              <div>
                <dt>Дистанции</dt>
                <dd>113 / OLYMPIC</dd>
              </div>
            </dl>
          </div>

          <figure className="hero-media">
            <img
              src="./media/hotline-team-ride.jpg"
              alt="Команда Hotline едет группой на шоссейных велосипедах"
              width="1680"
              height="1117"
              fetchPriority="high"
            />
            <figcaption>
              <span>Hotline Cycling Club</span>
              <span>Командная работа · личный темп</span>
            </figcaption>
          </figure>
        </section>

        <section className="promise page-shell" aria-labelledby="promise-title">
          <p className="section-label">Задача кэмпа</p>
          <h2 id="promise-title">
            Не{"\u00a0"}добавить форму.
            <span>Убрать случайность.</span>
          </h2>
          <p>
            Месяцы тренировок уже сделали основную работу. Эта неделя нужна, чтобы
            спокойно познакомиться с{"\u00a0"}местом, проверить решения и{"\u00a0"}не
            собирать гонку утром перед стартом.
          </p>
        </section>

        <section className="program page-shell section" id="program" aria-labelledby="program-title">
          <div className="section-heading">
            <p className="section-label">Что станет понятным</p>
            <h2 id="program-title">Четыре части одной гонки</h2>
            <p>
              Отдельные тренировки важны. На{"\u00a0"}старте решает то, как они
              складываются в{"\u00a0"}один проверенный сценарий.
            </p>
          </div>

          <ol className="outcome-grid">
            {outcomes.map((item) => (
              <li key={item.number}>
                <div className="outcome-meta">
                  <span>{item.number}</span>
                  <span>{item.label}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="week section" id="week" aria-labelledby="week-title">
          <div className="week-inner page-shell">
            <div className="week-intro">
              <p className="section-label section-label-light">Ритм недели</p>
              <h2 id="week-title">От приезда — к{"\u00a0"}ясному плану старта</h2>
              <p>
                Каркас недели известен заранее. Конкретное расписание меняется
                только ради погоды, состояния группы и{"\u00a0"}официальной программы.
              </p>
            </div>

            <ol className="phase-list">
              {phases.map((phase, index) => (
                <li key={phase.dates}>
                  <span className="phase-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="phase-dates">{phase.dates}</p>
                    <h3>{phase.title}</h3>
                    <p>{phase.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="official-links" aria-label="Официальные программы дистанций">
              <p>Даты стартов сверены с{"\u00a0"}программой организатора.</p>
              <a
                href="https://iron-star.com/event/ironstar-113-sirius-2026/program/"
                target="_blank"
                rel="noreferrer"
              >
                Программа 113 <ArrowUpRight />
              </a>
              <a
                href="https://iron-star.com/event/ironstar-olympic-sirius-2026/program/"
                target="_blank"
                rel="noreferrer"
              >
                Программа OLYMPIC <ArrowUpRight />
              </a>
            </div>
          </div>
        </section>

        <section className="place page-shell section" id="place" aria-labelledby="place-title">
          <div className="section-heading place-heading">
            <p className="section-label">Место и{"\u00a0"}быт</p>
            <h2 id="place-title">Сириус — часть подготовки</h2>
            <p>
              Стартовый городок, море и{"\u00a0"}ключевые участки трассы находятся
              в{"\u00a0"}одной территории. Точное размещение сообщим после подтверждения,
              не{"\u00a0"}обещая выдуманную «пешую доступность».
            </p>
          </div>

          <div className="place-grid">
            <article className="place-card">
              <p className="card-index">01 / приезд</p>
              <h3>Аэропорт рядом</h3>
              <p>
                По{"\u00a0"}данным Сириуса, аэропорт находится примерно в{"\u00a0"}десяти
                минутах езды. Трансфер с{"\u00a0"}велокофром планируем отдельно.
              </p>
              <a href="https://sirius.gov.ru/transport/" target="_blank" rel="noreferrer">
                Транспорт Сириуса <ArrowUpRight />
              </a>
            </article>

            <article className="place-card">
              <p className="card-index">02 / велосипед</p>
              <h3>Сборка без спешки</h3>
              <p>
                Заранее проверяем правила перевозчика, оставляем время на{"\u00a0"}сборку
                и{"\u00a0"}технический осмотр. Вариант аренды обсуждаем до{"\u00a0"}поездки.
              </p>
            </article>

            <article className="place-card">
              <p className="card-index">03 / размещение</p>
              <h3>Точный адрес — после выбора базы</h3>
              <p>
                Подскажем район и{"\u00a0"}совместимые варианты проживания до
                бронирования. Перелёт и{"\u00a0"}проживание оплачиваются отдельно.
              </p>
            </article>

            <aside className="sea-card" aria-labelledby="sea-title">
              <p className="section-label section-label-light">Море в{"\u00a0"}начале октября</p>
              <h3 id="sea-title">Тёплое по{"\u00a0"}сезону. Переменчивое по{"\u00a0"}факту.</h3>
              <p className="sea-value" aria-label="От 21 до 25 градусов Цельсия">
                21–25{"\u00a0"}°C
              </p>
              <p>
                Такой диапазон наблюдался 1–4{"\u00a0"}октября в{"\u00a0"}2022–2025 годах.
                Это исторический ориентир, не{"\u00a0"}прогноз: решение по{"\u00a0"}открытой
                воде принимаем по{"\u00a0"}температуре, волне и{"\u00a0"}ветру в{"\u00a0"}день занятия.
              </p>
              <a
                href="https://temperaturavody.com/v/russia/sochi-krasnodarskiy-russia-sea-temperature/v-oktyabre"
                target="_blank"
                rel="noreferrer"
              >
                История температуры <ArrowUpRight />
              </a>
            </aside>
          </div>
        </section>

        <section className="coaches page-shell section" id="coaches" aria-labelledby="coaches-title">
          <div className="section-heading coaches-heading">
            <p className="section-label">Тренеры</p>
            <h2 id="coaches-title">Два взгляда. Один план.</h2>
            <p>
              Не{"\u00a0"}передаём участника между дисциплинами. Смотрим на
              подготовку как на{"\u00a0"}одну гонку — от{"\u00a0"}первого гребка до
              финишной прямой.
            </p>
          </div>

          <div className="coach-grid">
            {coaches.map((coach) => (
              <article className={coach.className} key={coach.name}>
                <div className="coach-photo">
                  <img
                    src={coach.image}
                    alt={coach.alt}
                    width={coach.width}
                    height={coach.height}
                    loading="lazy"
                  />
                </div>
                <div className="coach-copy">
                  <p className="coach-role">
                    {coach.number} / {coach.role}
                  </p>
                  <h3>{coach.name}</h3>
                  <p>{coach.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="participation section"
          id="participation"
          aria-labelledby="participation-title"
        >
          <div className="participation-inner page-shell">
            <div className="participation-copy">
              <p className="section-label section-label-warm">Участие</p>
              <h2 id="participation-title">Сначала сверим задачу</h2>
              <p>
                Расскажи о{"\u00a0"}дистанции, опыте и{"\u00a0"}текущей нагрузке. Если
                формат подходит, пришлём детали и{"\u00a0"}список подготовки к{"\u00a0"}поездке.
              </p>
              <CampCta />
            </div>

            <dl className="participation-facts">
              <div>
                <dt>Когда</dt>
                <dd>27.09—04.10.2026</dd>
              </div>
              <div>
                <dt>Где</dt>
                <dd>Сириус, Сочи</dd>
              </div>
              <div>
                <dt>Группа</dt>
                <dd>до{"\u00a0"}15 человек</dd>
              </div>
              <div>
                <dt>Программа</dt>
                <dd>30&#8239;000{"\u00a0"}₽</dd>
              </div>
            </dl>

            <div className="participation-list">
              <article>
                <h3>Входит</h3>
                <ul>
                  <li>тренировки по{"\u00a0"}трём дисциплинам</li>
                  <li>разведка трассы и{"\u00a0"}транзитных зон</li>
                  <li>рекомендации по{"\u00a0"}темпу и{"\u00a0"}питанию</li>
                  <li>поддержка тренеров в{"\u00a0"}течение кэмпа</li>
                </ul>
              </article>
              <article>
                <h3>Отдельно</h3>
                <ul>
                  <li>перелёт, трансфер и{"\u00a0"}проживание</li>
                  <li>питание и{"\u00a0"}личные расходы</li>
                  <li>стартовый слот</li>
                  <li>аренда дорожки или велосипеда</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="faq page-shell section" aria-labelledby="faq-title">
          <div className="faq-heading">
            <p className="section-label">Перед поездкой</p>
            <h2 id="faq-title">Коротко о{"\u00a0"}практическом</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="finish page-shell">
          <div className="finish-copy">
            <p className="section-label">Финиш начинается до{"\u00a0"}старта</p>
            <h2>Дальше — вместе.</h2>
            <p>
              Расскажи, к{"\u00a0"}чему готовишься. Ответим в{"\u00a0"}Telegram
              и{"\u00a0"}спокойно проверим, подходит ли{"\u00a0"}тебе этот кэмп.
            </p>
            <CampCta />
          </div>
          <figure className="finish-photo">
            <img
              src="./media/hotline-finish-sochi.jpg"
              alt="Участник Hotline финиширует на соревновании в Сочи"
              width="1680"
              height="1116"
              loading="lazy"
            />
          </figure>
        </div>
        <div className="footer-meta page-shell">
          <span>Hotline / триатлонный кэмп</span>
          <span>Сириус, Сочи / 27.09—04.10.2026</span>
          <a href="#top">Наверх ↑</a>
        </div>
      </footer>
    </>
  );
}
