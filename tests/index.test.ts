import { adjectives, nouns, generateFromEmail, uniqueUsernameGenerator, generateUsername, Style } from "../src/index";
import { expect } from "chai";

describe("generate-unique-username-from-email unit tests", (): void => {
  it("generating from email containing no special character in the name", (): void => {
    const actual: string = generateFromEmail("lakshminarayan@example.com");
    expect(actual).is.equal("lakshminarayan");
  });
  it("generating from email with special character in the name", (): void => {
    const actual: string = generateFromEmail("lakshmi.narayan@example.com");
    expect(actual).is.equal("lakshminarayan");
  });
  it("generating from email containing no special character in the name and adding one random digit", (): void => {
    const actual: string = generateFromEmail("lakshminarayan@example.com", 1);
    expect(actual.slice(0, -1)).is.equal("lakshminarayan");
  });
  it("generating from email with special character in the name and adding one random digit", (): void => {
    const actual: string = generateFromEmail("lakshmi.narayan@example.com", 1);
    expect(actual.slice(0, -1)).is.equal("lakshminarayan");
  });
  it("generating from email containing no special character in the name and adding two random digit", (): void => {
    const actual: string = generateFromEmail("lakshminarayan@example.com", 2);
    expect(actual.slice(0, -2)).is.equal("lakshminarayan");
  });
  it("generating from email with special character in the name and adding two random digit", (): void => {
    const actual: string = generateFromEmail("lakshmi.narayan@example.com", 2);
    expect(actual.slice(0, -2)).is.equal("lakshminarayan");
  });
  it("generating from email containing no special character in the name and adding three random digit", (): void => {
    const actual: string = generateFromEmail("lakshminarayan@example.com", 3);
    expect(actual.slice(0, -3)).is.equal("lakshminarayan");
  });
  it("generating from email with special character in the name and adding three random digit", (): void => {
    const actual: string = generateFromEmail("lakshmi.narayan@example.com", 3);
    expect(actual.slice(0, -3)).is.equal("lakshminarayan");
  });
  it("generating from email containing no special character in the name and adding four random digit", (): void => {
    const actual: string = generateFromEmail("lakshminarayan@example.com", 4);
    expect(actual.slice(0, -4)).is.equal("lakshminarayan");
  });
  it("generating from email with special character in the name and adding four random digit", (): void => {
    const actual: string = generateFromEmail("lakshmi.narayan@example.com", 4);
    expect(actual.slice(0, -4)).is.equal("lakshminarayan");
  });
  it("generating from email containing no special character in the name and adding five random digit", (): void => {
    const actual: string = generateFromEmail("lakshminarayan@example.com", 5);
    expect(actual.slice(0, -5)).is.equal("lakshminarayan");
  });
  it("generating from email with special character in the name and adding five random digit", (): void => {
    const actual: string = generateFromEmail("lakshmi.narayan@example.com", 5);
    expect(actual.slice(0, -5)).is.equal("lakshminarayan");
  });
  it("generating from email containing no special character in the name and adding six random digit", (): void => {
    const actual: string = generateFromEmail("lakshminarayan@example.com", 6);
    expect(actual.slice(0, -6)).is.equal("lakshminarayan");
  });
  it("generating from email with special character in the name and adding six random digit", (): void => {
    const actual: string = generateFromEmail("lakshmi.narayan@example.com", 6);
    expect(actual.slice(0, -6)).is.equal("lakshminarayan");
  });
});

describe("generate-unique-username-uniqueUsernameGenerator unit tests", (): void => {
  it("uniqueUsernameGenerator uses all dicts w separator", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["q"], ["a"]],
      separator: "-",
    });
    expect(actual).is.equal("q-a");
  });

  it("uniqueUsernameGenerator uses all dicts wo separator", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["q"], ["a"]],
    });
    expect(actual).is.equal("qa");
  });
  it("uniqueUsernameGenerator style UPPERCASE", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["q"], ["a"]],
      style: Style.UpperCase,
    });
    expect(actual).is.equal("QA");
  });
  it("uniqueUsernameGenerator style lowercase", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["Q"], ["A"]],
      style: Style.LowerCase,
    });
    expect(actual).is.equal("qa");
  });
  it("uniqueUsernameGenerator style capital", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["q"], ["A"]],
      style: Style.Capital,
    });
    expect(actual).is.equal("Qa");
  });
  it("uniqueUsernameGenerator style camelCase", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["cool"], ["dog"]],
      style: Style.CamelCase,
    });
    expect(actual).is.equal("coolDog");
  });
  it("uniqueUsernameGenerator style snakeCase", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["cool"], ["dog"]],
      style: Style.SnakeCase,
    });
    expect(actual).is.equal("cool_dog");
  });
  it("uniqueUsernameGenerator style kebabCase", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["cool"], ["dog"]],
      style: Style.KebabCase,
    });
    expect(actual).is.equal("cool-dog");
  });
  it("uniqueUsernameGenerator style pascalCase", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["cool"], ["dog"]],
      style: Style.PascalCase,
    });
    expect(actual).is.equal("CoolDog");
  });
  it("uniqueUsernameGenerator works w config w default dictionaries only", (): void => {
    const actual: string = uniqueUsernameGenerator({ dictionaries: [adjectives, nouns] });
    expect(actual).not.contains("-");
  });
});

describe("generate-unique-username unit tests", (): void => {
  it("generating unique username", (): void => {
    const actual: string = generateUsername();
    expect(typeof actual).is.equal("string");
    expect(actual).is.not.equal("");
  });

  it("generating unique username with separator", (): void => {
    const actual: string = generateUsername("-");
    expect(actual).is.contains("-");
    expect(actual.split("-").length).is.greaterThan(1);
  });
  it("generating unique username with separator and no random number", (): void => {
    const actual: string = generateUsername("-", 0);
    expect(actual).to.not.match(/[0-9]/);
  });
  it("generating unique username with max length", (): void => {
    const actual: string = generateUsername("-", 2, 5);
    expect(actual).to.lengthOf(5);
  });
  it("generating unique username with max length and prefix", (): void => {
    const actual: string = generateUsername("-", undefined, undefined, "unique username");
    expect(actual).to.contain(`unique-username`);
  });
  it("generating unique username with camelCase style", (): void => {
    const actual: string = generateUsername("-", 0, undefined, undefined, Style.CamelCase);
    // Extract the parts before any potential numbers
    const parts = actual.replace(/-/g, " ").split(" ");
    // First word should be lowercase, second word should be capitalized
    expect(parts[0]).to.equal(parts[0].toLowerCase());
    if (parts.length > 1) {
      expect(parts[1][0]).to.equal(parts[1][0].toUpperCase());
    }
  });
  it("generating unique username with snakeCase style", (): void => {
    const actual: string = generateUsername("-", 0, undefined, undefined, Style.SnakeCase);
    expect(actual).to.include("_");
    expect(actual).to.equal(actual.toLowerCase());
  });
  it("generating unique username with kebabCase style", (): void => {
    const actual: string = generateUsername("-", 0, undefined, undefined, Style.KebabCase);
    expect(actual).to.include("-");
    expect(actual).to.equal(actual.toLowerCase());
  });
  it("generating unique username with pascalCase style", (): void => {
    const actual: string = generateUsername("-", 0, undefined, undefined, Style.PascalCase);
    // Words should start with capital letters
    const parts = actual.replace(/-/g, " ").split(" ");
    for (const part of parts) {
      if (part.length > 0) {
        expect(part[0]).to.equal(part[0].toUpperCase());
      }
    }
  });
});
