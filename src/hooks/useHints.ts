import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const HINTS_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/hint`;

const fetchHints = async (url: string, { arg }: { arg: { sessionId: string } }) => {
  const res = await fetch(url, {
    method: "PUT",
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

  return;
};

export const useHints = () => {
  const { error, trigger, isMutating } = useSWRMutation(HINTS_API_URL, fetchHints);

  return {
    isError: error,
    hintTrigger: trigger,
    isMutating,
  };
};