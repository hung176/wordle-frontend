import useSWRMutation from "swr/mutation";
import type { SessionType } from "../types/index";
import useSWR from "swr";

export const START_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/start`;
export const GUESS_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/guess`;

export const fetchSession = async (url: string, body: { userId: string }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    throw error
  }

  return await res.json();
}


async function guessFetcher(
  url: string,
  { arg }: { arg: { guess: string; sessionId: string } }
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const errorRes = await res.json();
    const error = new Error(errorRes.message);
    throw error
  }

  return await res.json();
}

export default function useSession() {
  const userId = "659a6a70b093a499999dfe3b";
  const { data, error, mutate, isLoading } = useSWR<SessionType>(START_API_URL, (url: string) => fetchSession(url, { userId }));

  const { trigger: submitGuess, isMutating } = useSWRMutation(GUESS_API_URL, guessFetcher);

  return {
    session: data,
    isLoading,
    error,
    mutateSession: mutate,
    submitGuess,
    isSubmittingGuess: isMutating,
  }
}
