import useSWRMutation from "swr/mutation";

export const HINTS_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/hint`;

const fetchHint = async (url: string, { arg }: { arg: { sessionId: string } }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    throw error
  }

  return await res.text();
};

export const useHint = () => {
  const { data, error, trigger, isMutating } = useSWRMutation(HINTS_API_URL, fetchHint);

  return {
    hint: data,
    isError: error,
    generateHint: trigger,
    isMutating,
  };
};