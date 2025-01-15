import { mainApiInstance } from "./_axiosInstance";

const sendSubscriberEmail = async (email: string) => {
  await mainApiInstance.post(`/landing/subscriber`, {
    email,
  });
};

export const landingService = {
  sendSubscriberEmail,
};
