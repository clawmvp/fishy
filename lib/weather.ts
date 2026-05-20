export interface DailyForecast {
  date: string;
  dayName: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitation: number;
  precipProbability: number;
  windMax: number;
  windDirection: number;
  humidity: number;
  pressure: number;
  pressureTrend: "rising" | "falling" | "stable";
  cloudCover: number;
}

export async function fetchWeather(
  latitude: number,
  longitude: number
): Promise<DailyForecast[]> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", latitude.toString());
  url.searchParams.set("longitude", longitude.toString());
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant"
  );
  url.searchParams.set(
    "hourly",
    "relative_humidity_2m,surface_pressure,cloud_cover"
  );
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "7");

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();
  const daily = data.daily;
  const hourlyHumidity: number[] = data.hourly?.relative_humidity_2m || [];
  const hourlyPressure: number[] = data.hourly?.surface_pressure || [];
  const hourlyCloud: number[] = data.hourly?.cloud_cover || [];

  const dayNamesRo = [
    "Duminica",
    "Luni",
    "Marti",
    "Miercuri",
    "Joi",
    "Vineri",
    "Sambata",
  ];

  const forecasts: DailyForecast[] = [];
  for (let i = 0; i < daily.time.length; i++) {
    const date = new Date(daily.time[i] + "T12:00:00");

    const dayHumidity = hourlyHumidity.slice(i * 24, (i + 1) * 24);
    const avgHumidity = dayHumidity.length > 0
      ? Math.round(dayHumidity.reduce((a: number, b: number) => a + b, 0) / dayHumidity.length)
      : 50;

    const dayPressure = hourlyPressure.slice(i * 24, (i + 1) * 24);
    const avgPressure = dayPressure.length > 0
      ? Math.round(dayPressure.reduce((a: number, b: number) => a + b, 0) / dayPressure.length)
      : 1013;

    const dayCloud = hourlyCloud.slice(i * 24, (i + 1) * 24);
    const avgCloud = dayCloud.length > 0
      ? Math.round(dayCloud.reduce((a: number, b: number) => a + b, 0) / dayCloud.length)
      : 50;

    let pressureTrend: "rising" | "falling" | "stable" = "stable";
    if (dayPressure.length >= 12) {
      const morningAvg = dayPressure.slice(0, 12).reduce((a, b) => a + b, 0) / 12;
      const eveningAvg = dayPressure.slice(12, 24).reduce((a, b) => a + b, 0) / Math.min(12, dayPressure.length - 12);
      const diff = eveningAvg - morningAvg;
      if (diff > 1.5) pressureTrend = "rising";
      else if (diff < -1.5) pressureTrend = "falling";
    }

    if (i > 0 && pressureTrend === "stable") {
      const prevDayPressure = hourlyPressure.slice((i - 1) * 24, i * 24);
      if (prevDayPressure.length > 0) {
        const prevAvg = Math.round(prevDayPressure.reduce((a, b) => a + b, 0) / prevDayPressure.length);
        const diff = avgPressure - prevAvg;
        if (diff > 2) pressureTrend = "rising";
        else if (diff < -2) pressureTrend = "falling";
      }
    }

    forecasts.push({
      date: daily.time[i],
      dayName: dayNamesRo[date.getDay()],
      weatherCode: daily.weather_code[i],
      tempMax: Math.round(daily.temperature_2m_max[i]),
      tempMin: Math.round(daily.temperature_2m_min[i]),
      precipitation: daily.precipitation_sum[i],
      precipProbability: daily.precipitation_probability_max[i],
      windMax: Math.round(daily.wind_speed_10m_max[i]),
      windDirection: Math.round(daily.wind_direction_10m_dominant?.[i] || 0),
      humidity: avgHumidity,
      pressure: avgPressure,
      pressureTrend,
      cloudCover: avgCloud,
    });
  }

  return forecasts;
}

export function getWeatherIcon(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 2) return "⛅";
  if (code === 3) return "☁️";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 57) return "🌦️";
  if (code >= 61 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "🌨️";
  if (code >= 80 && code <= 82) return "🌧️";
  if (code >= 85 && code <= 86) return "🌨️";
  if (code >= 95) return "⛈️";
  return "☁️";
}

export function getWeatherDescription(code: number): string {
  if (code === 0) return "Cer senin";
  if (code === 1) return "Predominant senin";
  if (code === 2) return "Partial noros";
  if (code === 3) return "Noros";
  if (code === 45) return "Ceata";
  if (code === 48) return "Ceata cu chiciura";
  if (code >= 51 && code <= 55) return "Burnita";
  if (code >= 56 && code <= 57) return "Burnita inghetata";
  if (code === 61) return "Ploaie usoara";
  if (code === 63) return "Ploaie moderata";
  if (code === 65) return "Ploaie puternica";
  if (code >= 66 && code <= 67) return "Ploaie inghetata";
  if (code === 71) return "Ninsoare usoara";
  if (code === 73) return "Ninsoare moderata";
  if (code === 75) return "Ninsoare puternica";
  if (code === 77) return "Graunti de zapada";
  if (code >= 80 && code <= 82) return "Averse de ploaie";
  if (code >= 85 && code <= 86) return "Averse de zapada";
  if (code === 95) return "Furtuna";
  if (code >= 96) return "Furtuna cu grindina";
  return "Necunoscut";
}

export function getWindDirection(degrees: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SV", "V", "NV"];
  const idx = Math.round(degrees / 45) % 8;
  return dirs[idx];
}

export function getPressureTrendIcon(trend: "rising" | "falling" | "stable"): string {
  if (trend === "rising") return "📈";
  if (trend === "falling") return "📉";
  return "➡️";
}

export function getPressureTrendLabel(trend: "rising" | "falling" | "stable"): string {
  if (trend === "rising") return "In crestere";
  if (trend === "falling") return "In scadere";
  return "Stabila";
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  const months = [
    "Ian", "Feb", "Mar", "Apr", "Mai", "Iun",
    "Iul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${date.getDate()} ${months[date.getMonth()]}`;
}
