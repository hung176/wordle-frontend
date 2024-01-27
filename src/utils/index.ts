import { Attempt } from "@/types";

export function generateClassName(
  attempt: Attempt = []
): Attempt {
  const greenClass = "bg-wl-green border-wl-green text-white";
  const yellowClass = "bg-wl-yellow border-wl-yellow text-white";
  const blackClass = "bg-wl-gray border-wl-gray text-white";

  return attempt.map(({ letter, position, green, yellow, black }) => ({
    letter,
    position,
    className: green
      ? greenClass
      : yellow
        ? yellowClass
        : black
          ? blackClass
          : "",
  }));
}
