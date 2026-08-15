/* Static GitHub Pages output intentionally uses native responsive images. */
/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import { ThemeToggle } from "./theme-toggle";

const telegramUrl = "https://t.me/DDopenChat";

export const metadata: Metadata = {
  title: "Hotline: триатлонный кэмп в\u00a0Сочи\u00a0— 27\u00a0сентября–4\u00a0октября\u00a02026",
  description:
    "Триатлонный кэмп Hotline в\u00a0Сириусе с\u00a0Евгением\u00a0Тихониным и\u00a0Максимом\u00a0Кубышко: трасса, море, транзитные зоны и\u00a0личный план на\u00a0гонку.",
};

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}

function TelegramMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3.6 11.5 15.2-5.9c.7-.3 1.3.2 1.1 1l-2.6 12.2c-.2.9-.8 1.1-1.5.7l-4-3-2 1.9c-.2.2-.4.4-.8.4l.3-4.1 7.4-6.7c.3-.3-.1-.4-.5-.2L7 13.6l-3.9-1.2c-.8-.3-.8-.8.5-.9Z" />
    </svg>
  );
}

function SportMark({ kind }: { kind: "bike" | "swim" | "run" | "transition" }) {
  if (kind === "bike") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="8" cy="22" r="5" />
        <circle cx="24" cy="22" r="5" />
        <path d="m8 22 6-10 5 10H8Zm6-10h5l5 10m-8-14h4" />
      </svg>
    );
  }

  if (kind === "swim") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="20" cy="8" r="3" />
        <path d="m4 17 7-5 6 3 5-2 6 4M3 22c3 0 3 2 6 2s3-2 6-2 3 2 6 2 3-2 8-2M3 27c3 0 3 2 6 2s3-2 6-2 3 2 6 2 3-2 8-2" />
      </svg>
    );
  }

  if (kind === "run") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="20" cy="6" r="3" />
        <path d="m17 12 5 3 5 1M17 12l-4 7-6 2m10-9-1 9 6 7m-6-7-6 7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M5 7h22v18H5zM11 7v18M21 7v18M3 16h26" />
      <circle cx="16" cy="16" r="3" />
    </svg>
  );
}

const program = [
  {
    kind: "bike" as const,
    number: "01",
    title: "Узнать трассу",
    text: "Разберём вело- и\u00a0беговой этапы: рельеф, повороты, опасные места и\u00a0распределение усилий.",
  },
  {
    kind: "swim" as const,
    number: "02",
    title: "Освоить море",
    text: "Выйдем на\u00a0акваторию старта, настроим ориентирование и\u00a0найдём спокойный рабочий ритм на\u00a0открытой воде.",
  },
  {
    kind: "transition" as const,
    number: "03",
    title: "Собрать транзиты",
    text: "Зафиксируем личный порядок действий, чтобы не\u00a0принимать лишних решений уже во\u00a0время гонки.",
  },
  {
    kind: "run" as const,
    number: "04",
    title: "Зафиксировать план",
    text: "Сверим питание, темп и\u00a0сценарии на\u00a0случай жары, ветра или изменений в\u00a0расписании.",
  },
];

const logistics = [
  {
    number: "01",
    title: "Прилететь",
    text: "Аэропорт Сочи находится рядом с\u00a0Сириусом. Оттуда до\u00a0прибрежного кластера обычно добираются на\u00a0такси или автобусе.",
  },
  {
    number: "02",
    title: "Поселиться",
    text: "Лучше жить в\u00a0Сириусе, ближе к\u00a0морю и\u00a0стартовому городку. Точные ориентиры пришлём после подтверждения участия.",
  },
  {
    number: "03",
    title: "Привезти велосипед",
    text: "Заранее проверь правила перевозчика и\u00a0заложи время на\u00a0сборку. На\u00a0месте поможем пройти техническую проверку.",
  },
  {
    number: "04",
    title: "Войти в\u00a0ритм",
    text: "Первая встреча нужна, чтобы спокойно сверить состояние, экипировку, дистанцию и\u00a0личные задачи на\u00a0неделю.",
  },
];

const phases = [
  {
    number: "01",
    title: "Приезд",
    text: "Собираем исходные данные: дистанция, самочувствие, экипировка и\u00a0логистика.",
  },
  {
    number: "02",
    title: "Знакомство с\u00a0гонкой",
    text: "Проходим ключевые участки, воду и\u00a0транзиты\u00a0— отдельно и\u00a0в\u00a0связках.",
  },
  {
    number: "03",
    title: "Предстартовая настройка",
    text: "Снижаем неопределённость и\u00a0нагрузку, фиксируем личный план старта.",
  },
  {
    number: "04",
    title: "Стартовый уикенд",
    text: "IRONSTAR\u00a0113\u00a0— 3\u00a0октября, OLYMPIC\u00a0— 4\u00a0октября.",
  },
];

const checklist = [
  {
    title: "Выбрать дистанцию",
    text: "Первым сообщением напиши, едешь ли\u00a0ты на\u00a0113 или OLYMPIC: расписание и\u00a0требования к\u00a0велосипеду отличаются.",
    link: "https://iron-star.com/event/ironstar-113-sirius-2026/program/",
    label: "Программа\u00a0113",
  },
  {
    title: "Проверить документы",
    text: "Для\u00a0допуска к\u00a0старту нужны медицинская справка и\u00a0страховка. Не\u00a0откладывай их на\u00a0неделю кэмпа.",
    link: "https://iron-star.com/faq/",
    label: "FAQ организатора",
  },
  {
    title: "Продумать велосипед",
    text: "Выбери перевозчика, проверь его правила и\u00a0заложи время на\u00a0сборку и\u00a0технический осмотр.",
    link: "https://iron-star.com/faq/",
    label: "Правила перевозки",
  },
  {
    title: "Жить ближе к\u00a0Сириусу",
    text: "Прибрежный кластер сокращает ежедневные переезды и\u00a0оставляет больше времени на\u00a0сон, еду и\u00a0восстановление.",
    link: "https://sirius.gov.ru/transport/",
    label: "Транспорт Сириуса",
  },
];

const faqs = [
  {
    question: "Подойдёт ли\u00a0кэмп, если я\u00a0впервые стартую в\u00a0Сочи?",
    answer: "Да. Смысл недели как раз в\u00a0том, чтобы заранее познакомиться с\u00a0местом и\u00a0перевести неизвестное в\u00a0понятный план.",
  },
  {
    question: "Нужно ли\u00a0быть сильным пловцом?",
    answer: "Нет, но\u00a0ты должен уверенно держаться на\u00a0воде. Задания будут различаться по\u00a0уровню, а\u00a0решение о\u00a0выходе в\u00a0море всегда зависит от\u00a0условий.",
  },
  {
    question: "Что входит в\u00a030\u202f000\u00a0₽?",
    answer: "Работа тренеров и\u00a0вся тренировочная программа кэмпа. Перелёт, проживание, питание, стартовый слот и\u00a0личные расходы оплачиваются отдельно.",
  },
  {
    question: "Можно приехать без участия в\u00a0гонке?",
    answer: "Напиши тренеру в\u00a0Telegram. Мы честно сверим твою задачу с\u00a0ритмом недели и\u00a0скажем, будет ли\u00a0формат полезен именно тебе.",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#content">
        Перейти к&nbsp;содержанию
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="К началу страницы">
          <span className="wordmark-mark" aria-hidden="true">Hotline</span>
          <span>Кэмп / Сочи</span>
        </a>

        <nav className="main-nav" aria-label="Основная навигация">
          <a href="#program">Программа</a>
          <a href="#place">Место</a>
          <a href="#coaches">Тренеры</a>
          <a href="#details">Участие</a>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a className="button button-small" href={telegramUrl} target="_blank" rel="noreferrer">
            Telegram
            <ArrowUpRight />
          </a>
        </div>
      </header>

      <main id="content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">27.09–04.10 / Сириус, Сочи</p>
            <h1 id="hero-title">
              Форма уже с&nbsp;тобой.
              <span>Соберём гонку.</span>
            </h1>
            <p className="hero-lead">
              Неделя с&nbsp;Евгением&nbsp;Тихониным и&nbsp;Максимом&nbsp;Кубышко. Ты&nbsp;изучишь
              трассу, проверишь себя в&nbsp;море и&nbsp;выйдешь на&nbsp;старт
              со&nbsp;своим понятным планом.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={telegramUrl} target="_blank" rel="noreferrer">
                <TelegramMark />
                Обсудить участие
              </a>
              <a className="text-link" href="#program">Что будет за&nbsp;неделю <span aria-hidden="true">↓</span></a>
            </div>
            <p className="microcopy">
              Напиши, какую дистанцию выбираешь и&nbsp;как сейчас тренируешься.
              Тренер ответит лично и&nbsp;честно скажет, подходит ли&nbsp;тебе кэмп.
            </p>
          </div>

          <figure className="hero-visual">
            <img
              src="./media/hotline-ride.jpg"
              alt="Команда Hotline едет группой по шоссе"
              width="1680"
              height="1117"
              fetchPriority="high"
            />
            <figcaption>Работаем командой. Стартуешь своим темпом.</figcaption>
            <dl className="hero-facts">
              <div><dt>Группа</dt><dd>до&nbsp;15</dd></div>
              <div><dt>Стоимость</dt><dd>30&#8239;000&nbsp;₽</dd></div>
              <div><dt>Формат</dt><dd>Подгруппы</dd></div>
            </dl>
          </figure>
        </section>

        <div className="energy-ribbon" aria-hidden="true">
          <p>Swim / Bike / Run / Sochi / Hotline / Swim / Bike / Run / Sochi / Hotline /</p>
        </div>

        <section className="statement" aria-labelledby="statement-title">
          <p className="kicker kicker-dark">Задача недели</p>
          <h2 id="statement-title">Не&nbsp;тренироваться больше. Тренироваться точнее.</h2>
          <p>Месяцы тренировок уже сделали форму. Эта неделя убирает случайность.</p>
        </section>

        <section className="section program-section" id="program" aria-labelledby="program-title">
          <div className="section-heading">
            <p className="kicker">Что будем делать</p>
            <h2 id="program-title">Четыре части одной гонки</h2>
            <p>
              Здесь не&nbsp;будет объёма ради объёма. Настроим то, что должно
              сработать у&nbsp;тебя&nbsp;— на&nbsp;конкретной трассе и&nbsp;в&nbsp;конкретный день.
            </p>
          </div>

          <div className="program-grid">
            {program.map((item) => (
              <article className="program-card" key={item.number}>
                <div className="program-card-top">
                  <SportMark kind={item.kind} />
                  <span>{item.number}</span>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section place-section" id="place" aria-labelledby="place-title">
          <div className="section-heading place-heading">
            <p className="kicker">Место и&nbsp;быт</p>
            <h2 id="place-title">Сириус. Всё нужное рядом.</h2>
            <p>
              Море, стартовый городок и&nbsp;ключевые участки трассы собраны
              в&nbsp;одной логистике. Меньше переездов&nbsp;— больше времени на&nbsp;сон,
              питание и&nbsp;восстановление.
            </p>
          </div>

          <div className="place-board">
            <div className="logistics-list">
              {logistics.map((item) => (
                <article className="logistics-item" key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            <aside className="sea-card" aria-labelledby="sea-title">
              <p className="kicker kicker-light">Море в&nbsp;это время</p>
              <h3 id="sea-title">Тёплое по&nbsp;сезону. Переменчивое по&nbsp;факту.</h3>
              <strong>≈&nbsp;21–25&nbsp;°C</strong>
              <p>
                Температура воды в&nbsp;первые дни октября по&nbsp;наблюдениям
                2022–2025&nbsp;годов.
              </p>
              <p className="sea-disclaimer">
                Это исторический ориентир, а&nbsp;не&nbsp;прогноз. Решение
                по&nbsp;гидрокостюму и&nbsp;открытой воде принимается
                по&nbsp;фактическим условиям.
              </p>
              <a href="https://seatemperature.net/monthly/sochi-krasnodarskiy-russia-sea-temperature-in-october-1790" target="_blank" rel="noreferrer">
                Источник наблюдений <ArrowUpRight />
              </a>
            </aside>
          </div>

          <a className="text-link external-link place-link" href="https://sirius.gov.ru/transport/" target="_blank" rel="noreferrer">
            Транспорт и&nbsp;ориентиры Сириуса <ArrowUpRight />
          </a>
        </section>

        <section className="section rhythm-section" aria-labelledby="rhythm-title">
          <div className="rhythm-intro">
            <p className="kicker">Ритм недели</p>
            <h2 id="rhythm-title">От&nbsp;приезда&nbsp;— к&nbsp;личному плану старта</h2>
            <p>
              Каркас недели понятен заранее. Детали подстроим под&nbsp;погоду,
              официальную программу и&nbsp;твоё состояние.
            </p>
          </div>

          <ol className="phase-list">
            {phases.map((item) => (
              <li key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section coaches-section" id="coaches" aria-labelledby="coaches-title">
          <div className="section-heading coaches-heading">
            <p className="kicker">Команда</p>
            <h2 id="coaches-title">Два тренера. Один общий план</h2>
            <p>
              Два тренера и&nbsp;небольшая группа. Ты&nbsp;получаешь не&nbsp;общие слова,
              а&nbsp;разбор своих решений и&nbsp;понятную обратную связь.
            </p>
          </div>

          <div className="coaches-layout">
            <figure className="coaches-team">
              <img
                src="./media/hotline-team-ride.jpg"
                alt="Команда Hotline едет группой на шоссейных велосипедах"
                width="1680"
                height="1117"
                loading="lazy"
              />
              <figcaption>
                <span>Hotline Cycling Club</span>
                <span>Одна команда, общий ритм</span>
              </figcaption>
            </figure>

            <div className="coach-list">
              <article className="coach-profile">
                <p className="coach-number">01 / Велосипед и&nbsp;триатлон</p>
                <h3>Евгений Тихонин</h3>
                <p>Триатлет и&nbsp;велосипедист. Поможет связать технику, темп и&nbsp;решения на&nbsp;трассе в&nbsp;один рабочий сценарий.</p>
              </article>

              <article className="coach-profile">
                <p className="coach-number">02 / Бег и&nbsp;триатлон</p>
                <h3>Максим Кубышко</h3>
                <p>Тренер по&nbsp;бегу и&nbsp;триатлону. Поможет выбрать усилие, сохранить форму к&nbsp;старту и&nbsp;не&nbsp;потерять гонку на&nbsp;лишней спешке.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section checklist-section" aria-labelledby="checklist-title">
          <div className="section-heading checklist-heading">
            <p className="kicker">До поездки</p>
            <h2 id="checklist-title">Четыре вещи, которые лучше решить заранее</h2>
            <p>Мы поможем с&nbsp;ориентирами, но&nbsp;важные личные решения должны быть у&nbsp;тебя под&nbsp;контролем ещё до&nbsp;вылета.</p>
          </div>

          <div className="checklist-grid">
            {checklist.map((item, index) => (
              <article className="check-item" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href={item.link} target="_blank" rel="noreferrer">
                  {item.label} <ArrowUpRight />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="details" id="details" aria-labelledby="details-title">
          <div className="details-inner">
            <div className="details-copy">
              <p className="kicker kicker-dark">Участие</p>
              <h2 id="details-title">Неделя, чтобы перестать гадать.</h2>
              <p>
                Если ты&nbsp;готовишься к&nbsp;старту в&nbsp;Сочи, напиши тренеру.
                Сначала сверим дистанцию, опыт и&nbsp;текущую форму&nbsp;— без&nbsp;форм
                и&nbsp;автоматических обещаний.
              </p>
            </div>

            <dl className="details-facts">
              <div><dt>Когда</dt><dd>27.09–04.10.2026</dd></div>
              <div><dt>Где</dt><dd>Сириус, Сочи</dd></div>
              <div><dt>Мест</dt><dd>до&nbsp;15</dd></div>
              <div><dt>Стоимость</dt><dd>30&#8239;000&nbsp;₽</dd></div>
            </dl>

            <div className="details-action">
              <a className="button button-light button-wide" href={telegramUrl} target="_blank" rel="noreferrer">
                <TelegramMark />
                Написать тренеру
              </a>
              <p>В&nbsp;стоимость не&nbsp;входят перелёт, проживание, питание и&nbsp;стартовый слот.</p>
            </div>
          </div>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="faq-intro">
            <p className="kicker">Вопросы</p>
            <h2 id="faq-title">Коротко о&nbsp;важном</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-visual">
          <img
            src="./media/hotline-finish-sochi.jpg"
            alt="Триатлет Hotline финиширует в Сочи с поднятыми руками"
            width="1680"
            height="1116"
            loading="lazy"
          />
          <div className="footer-overlay">
            <p className="eyebrow eyebrow-light">Финиш начинается до&nbsp;старта</p>
            <h2>Дальше&nbsp;— вместе.</h2>
            <a className="button button-light" href={telegramUrl} target="_blank" rel="noreferrer">
              Обсудить участие <ArrowUpRight />
            </a>
          </div>
          <div className="footer-wordmark" aria-hidden="true">Hotline</div>
        </div>

        <div className="footer-meta">
          <p>Hotline / триатлонный кэмп</p>
          <p>Сириус, Сочи / 27.09–04.10.2026</p>
          <nav className="footer-links" aria-label="Ссылки в подвале">
            <a href="#top">Наверх ↑</a>
            <a href={telegramUrl} target="_blank" rel="noreferrer">Telegram <ArrowUpRight /></a>
          </nav>
        </div>
      </footer>
    </>
  );
}
