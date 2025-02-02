import { useSearchParams } from "next/navigation";

/** This hook use to deal with extended email like this anything+something@gmail.com */
export const useGetEmailParams = () => {
  const params = useSearchParams();
  const email = params.get("email");

  return email?.replace(/\s/g, "+");
};
