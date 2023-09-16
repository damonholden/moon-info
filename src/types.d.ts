interface MoonQuery {
  lang: string;
  location: string;
  date: string;
}

interface moonData {
  phase_name: string;
  stage: phaseName;
  days_until_next_full_moon: number;
  days_until_next_new_moon: number;
}
