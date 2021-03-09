import { useState, useCallback, useEffect } from 'react';

//custom hooks
export default function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
    return () => {};
  }, [initialValue]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  return [value, handleChange] as [string, typeof handleChange];
}
