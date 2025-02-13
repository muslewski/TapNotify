interface CountryType {
  code: string;
  name: string;
  flag: string;
  phoneCode: string;
  placeholderPhone: string;
  format: {
    pattern: RegExp;
    display: string;
  };
}

export const COUNTRIES: CountryType[] = [
  {
    code: "PL",
    name: "Poland",
    flag: "🇵🇱",
    phoneCode: "+48",
    placeholderPhone: "123 456 789",
    format: {
      pattern: /(\d{3})(\d{3})(\d{3})/,
      display: "$1 $2 $3",
    },
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    phoneCode: "+1",
    placeholderPhone: "(555) 123-4567",
    format: {
      pattern: /(\d{3})(\d{3})(\d{4})/,
      display: "($1) $2-$3",
    },
  },
  // ... keep other countries with their basic info, just add format property
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    phoneCode: "+44",
    placeholderPhone: "7911 123456",
    format: {
      pattern: /(\d{4})(\d{6})/,
      display: "$1 $2",
    },
  },
  // ... rest of your countries
].sort((a, b) => a.name.localeCompare(b.name));

if (!COUNTRIES || COUNTRIES.length === 0) {
  throw new Error("COUNTRIES array must be populated");
}
