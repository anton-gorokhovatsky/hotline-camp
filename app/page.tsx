/* Static GitHub Pages output intentionally uses native responsive images. */
/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import { ThemeToggle } from "./theme-toggle";

const telegramUrl = "https://t.me/DDopenChat";

export const metadata: Metadata = {
  title: "Hotline: триатлонный кэмп в\u00a0Сочи\u00a0— 27\u00a0сентября–4\u00a0октября\u00a02026",
  description:
    "Триатлонный кэмп Hotline в\u00a0Сириусе с\u00a0Евгением\u00a0Тихониным и\u00a0Максимом\u00a0Кубышко: трасса, море, транзитные зоны и\u00a0план на\u00a0гонку.",
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
    title: "Разведка трассы",
    text: "Разберём вело- и\u00a0беговой этапы: рельеф, повороты, опасные места и\u00a0распределение усилий.",
  },
  {
    kind: "swim" as const,
    number: "02",
    title: "Море и\u00a0навигация",
    text: "Выйдем на\u00a0акваторию старта, настроим ориентирование и\u00a0спокойный рабочий ритм на\u00a0открытой воде.",
  },
  {
    kind: "transition" as const,
    number: "03",
    title: "Транзитные зоны",
    text: "Соберём личный порядок действий, чтобы не\u00a0принимать лишних решений уже во\u00a0время гонки.",
  },
  {
    kind: "run" as const,
    number: "04",
    title: "Питание и\u00a0план",
    text: "Сверим питание, темп и\u00a0сценарии на\u00a0случай жары, ветра или изменений в\u00a0расписании.",
  },
];

const phases = [
  ["Приезд", "Собираем исходные данные: дистанция, самочувствие, экипировка и\u00a0логистика."],
  ["Знакомство с\u00a0гонкой", "Проходим ключевые участки, воду и\u00a0транзит\u00a0— отдельно и\u00a0в\u00a0связках."],
  ["Предстартовая настройка", "Снижаем неопределённость и\u00a0нагрузку, фиксируем личный план."],
  ["Стартовый уикенд", "IRONSTAR\u00a0113 — 3\u00a0октября, OLYMPIC — 4\u00a0октября."],
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
    text: "Заранее выбери перевозчика, проверь его правила и\u00a0заложи время на\u00a0сборку и\u00a0технический осмотр.",
    link: "https://iron-star.com/faq/",
    label: "Правила перевозки",
  },
  {
    title: "Жить ближе к\u00a0Сириусу",
    text: "Прибрежный кластер сокращает ежедневные переезды. Точные ориентиры по\u00a0размещению команда пришлёт тебе после подтверждения участия.",
    link: "https://sirius.gov.ru/transport/",
    label: "Транспорт Сириуса",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#content">
        Перейти к&nbsp;содержанию
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="К началу страницы">
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
            <p className="eyebrow"><span>Кэмп Hotline</span> Сириус, Сочи</p>
            <h1 id="hero-title">
              Форма уже с&nbsp;тобой.
              <span>Соберём гонку.</span>
            </h1>
            <p className="hero-lead">
              Неделя в&nbsp;Сириусе с&nbsp;Евгением&nbsp;Тихониным и&nbsp;Максимом&nbsp;Кубышко.
              Ты изучишь трассу, проверишь себя в&nbsp;море и&nbsp;выйдешь на&nbsp;старт
              со&nbsp;своим понятным планом.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={telegramUrl} target="_blank" rel="noreferrer">
                <TelegramMark />
                Обсудить участие
              </a>
              <a className="text-link" href="#program">Посмотреть программу <span aria-hidden="true">↓</span></a>
            </div>
            <p className="microcopy">Напиши, какую дистанцию выбираешь и&nbsp;как сейчас тренируешься. Тренер ответит лично и&nbsp;честно скажет, подходит ли&nbsp;тебе кэмп.</p>
          </div>

          <aside className="race-board" aria-label="Ключевые сведения о кэмпе">
            <div className="race-board-top">
              <span>27&nbsp;сентября</span>
              <span aria-hidden="true">→</span>
              <span>4&nbsp;октября</span>
            </div>
            <svg className="wave-lines" viewBox="0 0 640 180" preserveAspectRatio="none" aria-hidden="true">
              <path d="M-20 35C85-10 122 91 223 42s159-49 255 1 137-4 195-25" />
              <path d="M-20 72c105-45 142 56 243 7s159-49 255 1 137-4 195-25" />
              <path d="M-20 109c105-45 142 56 243 7s159-49 255 1 137-4 195-25" />
              <path d="M-20 146c105-45 142 56 243 7s159-49 255 1 137-4 195-25" />
            </svg>
            <div className="race-board-title">
              <strong>Сочи</strong>
              <span>Чёрное море / стартовый уикенд</span>
            </div>
            <dl className="hero-facts">
              <div><dt>Группа</dt><dd>15&nbsp;человек</dd></div>
              <div><dt>Стоимость</dt><dd>30&#8239;000&nbsp;₽</dd></div>
              <div><dt>Формат</dt><dd>Подгруппы</dd></div>
            </dl>
          </aside>
        </section>

        <div className="energy-ribbon" aria-hidden="true">
          <p>Swim / Bike / Run / Sochi / Hotline / Swim / Bike / Run / Sochi / Hotline /</p>
        </div>

        <section className="statement" aria-label="Главная идея кэмпа">
          <p>Месяцы тренировок уже сделали форму.</p>
          <p>Эта неделя убирает случайность.</p>
        </section>

        <section className="section program-section" id="program" aria-labelledby="program-title">
          <div className="section-heading">
            <p className="kicker">Что будем делать</p>
            <h2 id="program-title">Четыре части одной гонки</h2>
            <p>Здесь не&nbsp;будет объёма ради объёма. Вместе настроим то, что должно сработать у&nbsp;тебя&nbsp;— на&nbsp;конкретной трассе и&nbsp;в&nbsp;конкретный день.</p>
          </div>
          <div className="program-grid">
            {program.map((item) => (
              <article className="program-card" key={item.number}>
                <div className="program-card-top">
                  <SportMark kind={item.kind} />
                  <span>{item.number}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section place-section" id="place" aria-labelledby="place-title">
          <div className="place-intro">
            <p className="kicker">Место</p>
            <h2 id="place-title">Сириус: море и&nbsp;старт в&nbsp;одной логистике</h2>
            <p>
              Кэмп проходит рядом с&nbsp;трассами осеннего фестиваля IRONSTAR. Здесь можно
              работать не&nbsp;с&nbsp;абстрактными километрами, а&nbsp;с&nbsp;ориентирами, покрытием,
              ветром и&nbsp;последовательностью действий, которые встретятся тебе на&nbsp;старте.
            </p>
            <a className="text-link external-link" href="https://sirius.gov.ru/transport/" target="_blank" rel="noreferrer">
              Как добраться до&nbsp;Сириуса <ArrowUpRight />
            </a>
          </div>
          <div className="place-map" aria-label="Схематический ориентир: аэропорт, Сириус и Чёрное море">
            <div className="map-label map-airport"><span>Аэропорт Сочи</span><small>около 10&nbsp;минут на&nbsp;машине</small></div>
            <div className="map-route" aria-hidden="true"><span></span><span></span><span></span></div>
            <div className="map-label map-sirius"><span>Сириус</span><small>тренировки и&nbsp;старт</small></div>
            <div className="map-sea" aria-hidden="true">
              <span>Чёрное море</span>
              <svg viewBox="0 0 500 100" preserveAspectRatio="none"><path d="M-10 26c90-45 140 45 230 0s140 45 230 0 140 45 220 0M-10 64c90-45 140 45 230 0s140 45 230 0 140 45 220 0" /></svg>
            </div>
          </div>
        </section>

        <section className="sea-service" aria-labelledby="sea-title">
          <div>
            <p className="kicker kicker-light">Море в&nbsp;это время</p>
            <h2 id="sea-title">Тёплое по&nbsp;сезону. Переменчивое по&nbsp;факту.</h2>
          </div>
          <div className="sea-metric">
            <span>≈&nbsp;21–25&nbsp;°C</span>
            <p>температура воды в&nbsp;первые дни октября по&nbsp;наблюдениям 2022–2025&nbsp;годов</p>
          </div>
          <div className="sea-notes">
            <p>
              Это исторический ориентир, а&nbsp;не&nbsp;прогноз. Решение по&nbsp;гидрокостюму
              и&nbsp;открытой воде принимается по&nbsp;фактической температуре и&nbsp;условиям в&nbsp;день тренировки.
            </p>
            <a href="https://seatemperature.net/monthly/sochi-krasnodarskiy-russia-sea-temperature-in-october-1790" target="_blank" rel="noreferrer">
              Источник наблюдений <ArrowUpRight />
            </a>
          </div>
        </section>

        <section className="section rhythm-section" aria-labelledby="rhythm-title">
          <div className="section-heading compact-heading">
            <p className="kicker">Ритм недели</p>
            <h2 id="rhythm-title">От&nbsp;приезда&nbsp;— к&nbsp;личному плану старта</h2>
            <p>Каркас недели остаётся понятным, а&nbsp;детали мы подстроим под&nbsp;погоду, официальную программу и&nbsp;твоё состояние.</p>
          </div>
          <ol className="phase-list">
            {phases.map(([title, text], index) => (
              <li key={title}>
                <span className="phase-number">0{index + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section coaches-section" id="coaches" aria-labelledby="coaches-title">
          <div className="section-heading">
            <p className="kicker">Тренеры</p>
            <h2 id="coaches-title">Два взгляда на&nbsp;одну готовность</h2>
            <p>Опыт элитного велоспорта, современного пятиборья и&nbsp;международного триатлона&nbsp;— в&nbsp;прикладной работе с&nbsp;твоей гонкой.</p>
          </div>
          <div className="coaches-grid">
            <article className="coach-card coach-evgeny">
              <div className="coach-photo"><img src="./media/evgeny.jpg" alt="Евгений Тихонин в велоформе" width="1440" height="1800" loading="lazy" decoding="async" /></div>
              <div className="coach-copy">
                <p className="coach-team">Hotline</p>
                <h3>Евгений&nbsp;Тихонин</h3>
                <p>Мастер спорта, абсолютный победитель IRONMAN&nbsp;70.3 Oman&nbsp;2025 и&nbsp;Durban&nbsp;2026, бронзовый призёр чемпионата мира IRONMAN&nbsp;70.3&nbsp;2025.</p>
                <span className="coach-role">Велосипед · стратегия · гонка</span>
              </div>
            </article>
            <article className="coach-card coach-maksim">
              <div className="coach-photo"><img src="./media/maksim.jpg" alt="Максим Кубышко в беговой экипировке" width="933" height="1400" loading="lazy" decoding="async" /></div>
              <div className="coach-copy">
                <p className="coach-team">Dusty Dumbbells</p>
                <h3>Максим&nbsp;Кубышко</h3>
                <p>Мастер спорта по&nbsp;современному пятиборью, чемпион Москвы, призёр чемпионатов России и&nbsp;участник европейского первенства.</p>
                <span className="coach-role">Плавание · бег · транзиты</span>
              </div>
            </article>
          </div>
        </section>

        <section className="section checklist-section" aria-labelledby="checklist-title">
          <div className="section-heading compact-heading">
            <p className="kicker">До&nbsp;поездки</p>
            <h2 id="checklist-title">Начни с&nbsp;четырёх вещей</h2>
            <p>Они уберут бытовую суету из&nbsp;предстартовой недели.</p>
          </div>
          <div className="checklist-grid">
            {checklist.map((item, index) => (
              <article className="check-item" key={item.title}>
                <span className="check-index">{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href={item.link} target="_blank" rel="noreferrer">{item.label} <ArrowUpRight /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="section details-section" id="details" aria-labelledby="details-title">
          <div className="details-copy">
            <p className="kicker">Участие</p>
            <h2 id="details-title">15&nbsp;мест. Работа в&nbsp;подгруппах.</h2>
            <p>Кэмп для&nbsp;тебя, если база уже набрана и&nbsp;её нужно перевести в&nbsp;готовность к&nbsp;конкретной дистанции.</p>
          </div>
          <dl className="details-list">
            <div><dt>Даты</dt><dd>27&nbsp;сентября–4&nbsp;октября&nbsp;2026</dd></div>
            <div><dt>Стоимость</dt><dd>30&#8239;000&nbsp;₽</dd></div>
            <div><dt>Отдельно</dt><dd>Аренда дорожки в&nbsp;бассейне</dd></div>
            <div><dt>Уточняется</dt><dd>Проживание, трансфер и&nbsp;точное расписание</dd></div>
          </dl>
          <div className="details-action">
            <p>В&nbsp;первом сообщении напиши дистанцию, город вылета, примерный уровень и&nbsp;какой велосипед берёшь.</p>
            <a className="button button-primary button-wide" href={telegramUrl} target="_blank" rel="noreferrer">
              <TelegramMark />
              Написать в&nbsp;Telegram
            </a>
          </div>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="section-heading compact-heading">
            <p className="kicker">Коротко о&nbsp;важном</p>
            <h2 id="faq-title">Вопросы до&nbsp;регистрации</h2>
          </div>
          <div className="faq-list">
            <details>
              <summary>Можно приехать на&nbsp;OLYMPIC, а&nbsp;не&nbsp;на&nbsp;113?</summary>
              <p>Да. Участников разделяют на&nbsp;подгруппы, а&nbsp;дистанцию важно сообщить ещё в&nbsp;первом сообщении: дни старта и&nbsp;требования к&nbsp;велосипеду различаются.</p>
            </details>
            <details>
              <summary>Нужен ли&nbsp;гидрокостюм?</summary>
              <p>Возьми его, если он у&nbsp;тебя есть. Разрешение или обязательность определяются фактической температурой воды и&nbsp;правилами организатора в&nbsp;день старта.</p>
            </details>
            <details>
              <summary>Где лучше жить?</summary>
              <p>Практичный ориентир&nbsp;— прибрежная часть Сириуса, чтобы сократить ежедневные переезды. Конкретные варианты команда даст тебе после подтверждения участия.</p>
            </details>
            <details>
              <summary>Что не&nbsp;входит в&nbsp;30&#8239;000&nbsp;₽?</summary>
              <p>В&nbsp;презентации отдельно обозначена аренда дорожки в&nbsp;бассейне. Условия по&nbsp;проживанию, дороге, питанию и&nbsp;трансферам уточни до&nbsp;оплаты.</p>
            </details>
          </div>
        </section>
      </main>

      <footer className="site-footer" aria-labelledby="footer-title">
        <div className="footer-poster">
          <img
            className="footer-athlete"
            src="./media/evgeny.jpg"
            alt=""
            width="1440"
            height="1800"
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
          <div className="footer-cta">
            <p className="kicker">27.09–04.10 / Сочи</p>
            <h2 id="footer-title">Ты уже в&nbsp;пути.<span>Дальше&nbsp;— вместе.</span></h2>
            <a className="button button-footer" href={telegramUrl} target="_blank" rel="noreferrer">
              Обсудить участие
              <ArrowUpRight />
            </a>
          </div>
          <p className="footer-wordmark" aria-hidden="true">Hotline</p>
          <div className="footer-meta">
            <div className="footer-brand">
              <span>Hotline / триатлонный кэмп</span>
              <span>в&nbsp;партнёрстве с&nbsp;Dusty Dumbbells</span>
            </div>
            <p>Информация о&nbsp;погоде и&nbsp;море&nbsp;— исторический ориентир, не&nbsp;прогноз. Расписание и&nbsp;условия старта сверяй с&nbsp;организатором.</p>
            <nav className="footer-links" aria-label="Ссылки на программы стартов">
              <a href="https://iron-star.com/event/ironstar-113-sirius-2026/program/" target="_blank" rel="noreferrer">IRONSTAR&nbsp;113 <ArrowUpRight /></a>
              <a href="https://iron-star.com/event/ironstar-olympic-sirius-2026/program/" target="_blank" rel="noreferrer">OLYMPIC <ArrowUpRight /></a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
