import React from 'react';
import useSWRMutation from 'swr/mutation';
import type { SessionType } from '../types/index';
import useSWR from 'swr';
import { useLocalStorage } from './useLocalStorage';

export const START_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/start`;
export const GUESS_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/guess`;
export const END_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/end`;

export const fetchSession = async (url: string, body: { sessionId: string | null | undefined }) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: body.sessionId && JSON.stringify(body),
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }

  return await res.json();
};

async function guessFetcher(url: string, { arg }: { arg: { guess: string; sessionId: string } }) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const errorRes = await res.json();
    console.log(errorRes);
    const error = new Error(errorRes.message);
    throw error;
  }

  return await res.json();
}

const endSessionFetcher = async (url: string, { arg }: { arg: { sessionId: string } }) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const error = new Error('An error occurred while ending the session.');
    throw error;
  }

  return await res.json();
};

export default function useSession() {
  const [sessionId, saveSessionId] = useLocalStorage<string | null>('sessionId', null);

  const {
    data,
    error: loadSessionError,
    mutate,
    isLoading,
    isValidating,
  } = useSWR<SessionType>(START_API_URL, (url: string) => fetchSession(url, { sessionId }), {
    revalidateOnFocus: false,
  });

  const { trigger: submitGuess, isMutating, error: submitError } = useSWRMutation(GUESS_API_URL, guessFetcher);
  const { trigger: endSession } = useSWRMutation(END_API_URL, endSessionFetcher);

  React.useEffect(() => {
    if (data?.sessionId) {
      saveSessionId(data.sessionId);
    }
  }, [data]);

  return {
    session: data,
    isLoading,
    isValidating,
    error: loadSessionError,
    submitError,
    mutateSession: mutate,
    submitGuess,
    isSubmittingGuess: isMutating,
    endSession,
  };
}
