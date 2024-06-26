import React from 'react';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import { useLocalStorage } from './useLocalStorage';
import { SettingType } from '@/components/Setting';
import { useSearchParams } from 'next/navigation';

export const START_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/start`;
export const GUESS_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/guess`;
export const END_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/end`;
export const FETCH_VALID_WORDS_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/valid`;
export const CHALLENGE_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/challenge`;

export const fetchValid = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }
  return await res.json();
};

export const fetchSession = async (url: string, body: { sessionId: string | null; dailyMode?: boolean }) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
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

async function startNewSession(url: string, { arg }: { arg: { sessionId: string | null; settings?: SettingType } }) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ sessionId: null, dailyMode: arg?.settings?.dailyMode }),
  });
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }

  return await res.json();
}

async function fetchChallenge(payload: [string, { challengeId: string; sessionId?: string }]) {
  const [url, { challengeId, sessionId }] = payload;
  if (!challengeId) {
    return;
  }

  const res = await fetch(`${url}/${challengeId}?sessionId=${sessionId}`);

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }

  return await res.json();
}

export default function useSession() {
  const searchParams = useSearchParams();
  const challengeId = searchParams.get('challengeId');

  const [sessionId, saveSessionId] = useLocalStorage<string | null>('sessionId', null);
  const [settings, setSettings] = useLocalStorage('settings', { dailyMode: false, swapButton: false });

  const {
    data,
    error,
    mutate: normalMutate,
    isLoading,
    isValidating,
  } = useSWR(
    challengeId ? null : START_API_URL,
    (url: string) => fetchSession(url, { sessionId, dailyMode: settings.dailyMode }),
    {
      revalidateOnFocus: false,
    }
  );

  const { data: challengeData, mutate: challengeMutate } = useSWR(
    challengeId ? [CHALLENGE_API_URL, { challengeId, sessionId }] : null,
    fetchChallenge,
    {
      revalidateOnFocus: false,
    }
  );

  const session = challengeId ? challengeData : data;

  const { trigger: submitGuess, isMutating } = useSWRMutation(GUESS_API_URL, guessFetcher);
  const { trigger: endSession } = useSWRMutation(END_API_URL, endSessionFetcher);
  const { trigger: startNewGame } = useSWRMutation(START_API_URL, startNewSession);
  const { data: validWords = [] } = useSWR(FETCH_VALID_WORDS_API_URL, fetchValid, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  React.useEffect(() => {
    if (session?.sessionId) {
      saveSessionId(session.sessionId);
    }
  }, [session?.sessionId]);

  React.useEffect(() => {
    if (challengeId) {
      setSettings({ ...settings, dailyMode: false });
    }
  }, [challengeId]);

  return {
    session,
    validWords,
    isLoading,
    isMutating,
    isValidating,
    error,
    mutate: challengeId ? challengeMutate : normalMutate,
    submitGuess,
    endSession,
    startNewGame,
  };
}
