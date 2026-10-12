export interface WebinarEvent {
  id: string;
  title: string;
  date: string;
  duration: number;
  isUpcoming: boolean;
  registrationOpen: boolean;
  imageUrl: string;
  instructor: string;
  previewUrl?: string;
  badgeLabel?: string;
  lumaUrl?: string;
  price?: string;
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function csUnit(count: number, one: string, few: string, many: string): string {
  if (count === 1) {
    return `1 ${one}`;
  }
  if (count >= 2 && count <= 4) {
    return `${count} ${few}`;
  }
  return `${count} ${many}`;
}

export function getCountdownParts(targetDateIso: string, now: Date = new Date()): CountdownParts | null {
  const diffMs = new Date(targetDateIso).getTime() - now.getTime();
  if (diffMs <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export function formatCountdown(parts: CountdownParts): string {
  const segments: string[] = [];

  if (parts.days > 0) {
    segments.push(csUnit(parts.days, "den", "dny", "dní"));
  }

  segments.push(csUnit(parts.hours, "hodina", "hodiny", "hodin"));
  segments.push(csUnit(parts.minutes, "minuta", "minuty", "minut"));
  segments.push(csUnit(parts.seconds, "sekunda", "sekundy", "sekund"));

  return segments.join(" ");
}

export function getEventFormatLabel(badgeLabel?: string): "online" | "offline" | null {
  if (!badgeLabel) {
    return null;
  }

  const normalized = badgeLabel.toLowerCase();
  if (normalized.includes("offline") || normalized.includes("prezenční") || normalized.includes("prezencni")) {
    return "offline";
  }
  if (normalized.includes("online")) {
    return "online";
  }

  return null;
}

export function getEventFormatDisplay(badgeLabel?: string): string {
  if (badgeLabel) {
    return badgeLabel;
  }

  const format = getEventFormatLabel(badgeLabel);
  if (format === "offline") {
    return "Offline akce";
  }
  if (format === "online") {
    return "Online akce";
  }

  return "Akce";
}

interface GetNextRegistrationEventOptions {
  requireLumaUrl?: boolean;
}

export function getNextRegistrationEvent(options: GetNextRegistrationEventOptions = {}): WebinarEvent | null {
  const now = new Date();

  const nextEvent = ([] as WebinarEvent[])
    .filter((event) => {
      if (!event.isUpcoming || !event.registrationOpen || new Date(event.date) <= now) {
        return false;
      }
      if (options.requireLumaUrl && !event.lumaUrl) {
        return false;
      }
      return true;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return nextEvent ?? null;
}
