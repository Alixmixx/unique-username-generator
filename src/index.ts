import { nouns, adjectives } from "./data";

// Expanded Style enum to include more formatting options
export enum Style {
  LowerCase = "lowerCase",
  UpperCase = "upperCase",
  Capital = "capital",
  CamelCase = "camelCase",
  SnakeCase = "snakeCase",
  KebabCase = "kebabCase",
  PascalCase = "pascalCase",
}

export interface Config {
  dictionaries: string[][];
  separator?: string;
  randomDigits?: number;
  length?: number;
  style?: Style;
}

// Function to generate a random number (unsigned 32-bit integers) within a given range
// updated to only use edge runtime compatible apis
const getRandomInt = (min = 0, max = 4294967295) => (Math.random() * ((max | 0) - (min | 0) + 1.0) + (min | 0)) | 0;

const randomNumber = (maxNumber: number | undefined) => {
  let randomNumberString;
  switch (maxNumber) {
    case 1:
      randomNumberString = Math.floor(getRandomInt(1, 9)).toString();
      break;
    case 2:
      randomNumberString = Math.floor(getRandomInt(10, 90)).toString();
      break;
    case 3:
      randomNumberString = Math.floor(getRandomInt(100, 900)).toString();
      break;
    case 4:
      randomNumberString = Math.floor(getRandomInt(1000, 9000)).toString();
      break;
    case 5:
      randomNumberString = Math.floor(getRandomInt(10000, 90000)).toString();
      break;
    case 6:
      randomNumberString = Math.floor(getRandomInt(100000, 900000)).toString();
      break;
    default:
      randomNumberString = "";
      break;
  }
  return randomNumberString;
};

export function generateFromEmail(email: string, randomDigits?: number): string {
  // Retrieve name from email address
  const nameParts = email.replace(/@.+/, "");
  // Replace all special characters like "@ . _ ";
  const name = nameParts.replace(/[&/\\#,+()$~%._@'":*?<>{}]/g, "");
  // Create and return unique username
  return name + randomNumber(randomDigits);
}

/**
 * Apply style formatting to an array of words
 */
function applyStyle(words: string[], style?: Style): string {
  if (!style) return words.join("").toLowerCase();

  switch (style) {
    case Style.LowerCase:
      return words.join("").toLowerCase();
    case Style.UpperCase:
      return words.join("").toUpperCase();
    case Style.Capital: {
      const text = words.join("");
      const [firstLetter, ...rest] = text.split("");
      return firstLetter.toUpperCase() + rest.join("").toLowerCase();
    }
    case Style.CamelCase:
      return words
        .map((word, index) => (index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))
        .join("");
    case Style.SnakeCase:
      return words.map(word => word.toLowerCase()).join("_");
    case Style.KebabCase:
      return words.map(word => word.toLowerCase()).join("-");
    case Style.PascalCase:
      return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
    default:
      return words.join("").toLowerCase();
  }
}

export function generateUsername(separator?: string, randomDigits?: number, length?: number, prefix?: string, style?: Style): string {
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const adjective = prefix
    ? prefix
        .replace(/\s{2,}/g, " ")
        .replace(/\s/g, separator ?? "")
        .toLocaleLowerCase()
    : adjectives[Math.floor(Math.random() * adjectives.length)];

  // Create word array
  const words = [adjective, noun];
  
  let username;
  if (style) {
    // Apply style formatting to words array
    username = applyStyle(words, style);
  } else if (separator) {
    // Join with separator if no style is applied
    username = words.join(separator);
  } else {
    // Simple concatenation
    username = words.join("");
  }
  
  // Add random number
  username += randomNumber(randomDigits);

  if (length) {
    return username.substring(0, length);
  }

  return username;
}

export function uniqueUsernameGenerator(config: Config): string {
  if (!config.dictionaries) {
    throw new Error(
      "Cannot find any dictionary. Please provide at least one, or leave " + "the 'dictionary' field empty in the config object"
    );
  } else {
    const fromDictRander = (i: number) => config.dictionaries[i][getRandomInt(0, config.dictionaries[i].length - 1)];
    const dictionariesLength = config.dictionaries.length;
    
    // Collect words from dictionaries
    const words = [];
    for (let i = 0; i < dictionariesLength; i++) {
      words.push(fromDictRander(i));
    }

    let username;
    if (config.style) {
      // Apply style formatting to words array
      username = applyStyle(words, config.style);
    } else if (config.separator) {
      // Join with separator if no style is applied
      username = words.join(config.separator);
    } else {
      // Simple concatenation
      username = words.join("");
    }
    
    // Add random number
    username += randomNumber(config.randomDigits);

    if (config.length) {
      return username.substring(0, config.length);
    } else {
      return username.substring(0, 15);
    }
  }
}

export { adjectives, nouns } from "./data";
