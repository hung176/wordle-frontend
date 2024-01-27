import useSWRMutation from "swr/mutation";
import type { SessionType } from "../types/index";
import useSWR from "swr";

const startSessionUrl = "http://localhost:3333/api/start";
const submitGuessUrl = "http://localhost:3333/api/guess";

export const startSession = async (url: string, body: { userId: string }) => {
  return fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}


async function guessFetcher(
  url: string,
  { arg }: { arg: { guess: string; sessionId: string } }
) {
  return fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

export default function useSession() {
  const userId = "659a6a70b093a499999dfe3b";
  const { data, error, mutate } = useSWR<SessionType>("http://localhost:3333/wordle/start", (url: string) => startSession(url, { userId }));
  const { trigger: submitGuess, isMutating } = useSWRMutation("http://localhost:3333/wordle/guess", guessFetcher, {})

  return {
    session: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    submitGuess,
    isMutating
  }
}
