"use client";

import { useEffect, useState } from "react";

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=43.5855&longitude=39.7231&current=temperature_2m%2Cweather_code&daily=sunrise%2Csunset&timezone=Europe%2FMoscow&forecast_days=1";
const MARINE_URL =
  "https://marine-api.open-meteo.com/v1/marine?latitude=43.55&longitude=39.69&current=sea_surface_temperature&timezone=Europe%2FMoscow&forecast_days=1";

type ConditionValue = {
  label: string;
  value: string;
  note: string;
};

type ConditionsState = {
  status: "loading" | "ready" | "partial" | "error";
  values: [ConditionValue, ConditionValue, ConditionValue];
  summary: string;
  sourceNote: string;
};

type WeatherResponse = {
  current?: {
    time?: string;
    temperature_2m?: number;
    weather_code?: number;
  };
  daily?: {
    time?: string[];
    sunrise?: string[];
    sunset?: string[];
  };
};

type MarineResponse = {
  current?: {
    sea_surface_temperature?: number;
  };
};

const loadingState: ConditionsState = {
  status: "loading",
  values: [
    { label: "Сочи сейчас", value: "Загрузка", note: "воздух" },
    { label: "Чёрное море", value: "Загрузка", note: "у берега" },
    { label: "Рассвет / закат", value: "Загрузка", note: "сегодня" },
  ],
  summary: "Загружаем наблюдения Open-Meteo",
  sourceNote: "обновляем данные",
};

const unavailableValue = (label: string, note: string): ConditionValue => ({
  label,
  value: "Нет данных",
  note,
});

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function formatTemperature(value: number) {
  const rounded = Math.round(value);
  return (rounded > 0 ? "+" : "") + rounded + "°";
}

function formatClock(value: string | undefined) {
  const time = value?.split("T")[1];
  return time?.slice(0, 5) || null;
}

function formatDate(value: string | undefined) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function formatObservation(value: string | undefined) {
  if (!value) {
    return null;
  }

  const [date, time] = value.split("T");
  const [, month, day] = date.split("-");
  const clock = time?.slice(0, 5);

  return month && day && clock ? day + "." + month + " · " + clock : null;
}

function describeWeather(code: number | undefined) {
  if (!isNumber(code)) {
    return "текущие условия";
  }

  if (code === 0) return "ясно";
  if (code === 1) return "преимущественно ясно";
  if (code === 2) return "переменная облачность";
  if (code === 3) return "пасмурно";
  if (code === 45 || code === 48) return "туман";
  if (code >= 51 && code <= 57) return "морось";
  if (code >= 61 && code <= 67) return "дождь";
  if (code >= 71 && code <= 77) return "снег";
  if (code >= 80 && code <= 82) return "ливни";
  if (code === 85 || code === 86) return "снежные заряды";
  if (code >= 95) return "гроза";
  return "текущие условия";
}

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, { cache: "no-store", signal });

  if (!response.ok) {
    throw new Error("Open-Meteo returned " + response.status);
  }

  return response.json() as Promise<T>;
}

export function ConditionsPanel() {
  const [conditions, setConditions] = useState<ConditionsState>(loadingState);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadConditions() {
      const [weatherResult, marineResult] = await Promise.allSettled([
        fetchJson<WeatherResponse>(WEATHER_URL, controller.signal),
        fetchJson<MarineResponse>(MARINE_URL, controller.signal),
      ]);

      if (!active) {
        return;
      }

      let air = unavailableValue("Сочи сейчас", "не удалось обновить");
      let daylight = unavailableValue("Рассвет / закат", "не удалось обновить");
      let sea = unavailableValue("Чёрное море", "не удалось обновить");
      let observation: string | null = null;
      let availableGroups = 0;

      if (weatherResult.status === "fulfilled") {
        const current = weatherResult.value.current;
        const daily = weatherResult.value.daily;
        const sunrise = formatClock(daily?.sunrise?.[0]);
        const sunset = formatClock(daily?.sunset?.[0]);

        if (isNumber(current?.temperature_2m)) {
          air = {
            label: "Сочи сейчас",
            value: formatTemperature(current.temperature_2m),
            note: describeWeather(current.weather_code),
          };
          availableGroups += 1;
        }

        if (sunrise && sunset) {
          daylight = {
            label: "Рассвет / закат",
            value: sunrise + " / " + sunset,
            note: formatDate(daily?.time?.[0]) || "сегодня",
          };
          availableGroups += 1;
        }

        observation = formatObservation(current?.time);
      }

      if (
        marineResult.status === "fulfilled"
        && isNumber(marineResult.value.current?.sea_surface_temperature)
      ) {
        sea = {
          label: "Чёрное море",
          value: formatTemperature(marineResult.value.current.sea_surface_temperature),
          note: "у берега",
        };
        availableGroups += 1;
      }

      const status =
        availableGroups === 3 ? "ready" : availableGroups > 0 ? "partial" : "error";
      const summary =
        status === "ready"
          ? "Наблюдение " + (observation || "обновлено")
          : status === "partial"
            ? "Часть данных недоступна" + (observation ? " · " + observation : "")
            : "Данные Open-Meteo сейчас недоступны";
      const sourceNote =
        status === "ready"
          ? observation || "наблюдение обновлено"
          : status === "partial"
            ? "часть данных недоступна"
            : "данные недоступны";

      setConditions({
        status,
        values: [air, sea, daylight],
        summary,
        sourceNote,
      });
    }

    void loadConditions();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return (
    <aside
      className="conditions"
      aria-label="Условия в Сочи"
      aria-busy={conditions.status === "loading"}
    >
      <div className="conditions-row">
        {conditions.values.map((condition, index) => (
          <div
            className={[
              "condition",
              ["condition-air", "condition-sea", "condition-daylight"][index],
              "service-island",
              "material-glass",
            ].join(" ")}
            key={condition.label}
          >
            <span>{condition.label}</span>
            <strong>{condition.value}</strong>
            <small>{condition.note}</small>
          </div>
        ))}
        <div className="condition condition-forecast service-island material-glass">
          <span>27.09—04.10</span>
          <strong>Прогноз с&nbsp;17 сентября</strong>
          <small>за 10 дней до старта</small>
        </div>
        <a
          className="condition condition-source service-island material-glass"
          href="https://open-meteo.com/en/docs"
          target="_blank"
          rel="noreferrer"
        >
          <span>Источник</span>
          <strong>Open-Meteo</strong>
          <small>{conditions.sourceNote}</small>
        </a>
      </div>
      <p className="visually-hidden" role="status" aria-atomic="true">
        {conditions.summary}
      </p>
    </aside>
  );
}
