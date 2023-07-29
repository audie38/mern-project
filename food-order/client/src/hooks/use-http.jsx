import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, options, applyData) => {
    try {
      setIsLoading(true);
      const result = await fetch(url, options);
      if (!result.ok) {
        throw new Error("Something went wrong");
      }
      const data = await result.json();
      applyData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
