"use client";

import { useEffect, useState } from "react";
import { SelectRole } from "./_components/SelectRole";
import { ROLE_ID } from "@/_models/enum";
import { RegisterFormCandidate } from "./_components/RegisterFormCandidate";
import { RegisterFormRecruiter } from "./_components/RegisterFormRecruiter";
import { VerifyOTP } from "./_components/VerifyOTP";
import { SuccessfulScreen } from "./_components/SuccessfulScreen";
import { getStorageData, removeStorageData, setStorageData } from "@/_utils";

enum StepScreen {
  ROLE_SELECTION = "ROLE_SELECTION",
  REGISTER = "REGISTER",
  OTP = "OTP",
  SUCCESS = "SUCCESS",
}

interface FinalData {
  roleId: ROLE_ID | null;
  currentStep: StepScreen;
  email: string | null;
  password: string | null;
}
const KEY_STORE = "registerData";
const RegisterPage = () => {
  const [screen, setScreen] = useState<StepScreen>(StepScreen.ROLE_SELECTION);
  const [role, setRole] = useState<ROLE_ID | null>(null);
  const [finalData, setFinalData] = useState<FinalData>({
    roleId: null,
    currentStep: StepScreen.ROLE_SELECTION,
    email: null,
    password: null,
  });

  const onSelectRole = (role: ROLE_ID) => {
    setRole(role);
    setScreen(StepScreen.REGISTER);
    setFinalData({
      roleId: role,
      currentStep: StepScreen.REGISTER,
      email: null,
      password: null,
    });
  };

  useEffect(() => {
    const data = getStorageData<FinalData>(KEY_STORE);
    if (data) {
      setFinalData(data);
      setRole(data.roleId);
      setScreen(data.currentStep);
    }
  }, []);

  useEffect(() => {
    console.log("Temp store", finalData);
    setStorageData(KEY_STORE, finalData);
  }, [finalData]);

  const onFormBackClick = () => {
    setScreen(StepScreen.ROLE_SELECTION);
    setFinalData({
      ...finalData,
      roleId: null,
    });
  };

  const onSignupSuccess = (email: string, password: string) => {
    setScreen(StepScreen.OTP);
    setFinalData({
      ...finalData,
      currentStep: StepScreen.OTP,
      email,
      password: btoa(password),
    });
  };

  const onOTPVerifySuccess = () => {
    setScreen(StepScreen.SUCCESS);
    setFinalData({ ...finalData, currentStep: StepScreen.SUCCESS });
  };

  const onFinish = () => {
    removeStorageData(KEY_STORE);
  };

  const getScreen = () => {
    switch (screen) {
      case StepScreen.ROLE_SELECTION:
        return <SelectRole onSelectRole={onSelectRole} />;
      case StepScreen.REGISTER:
        if (role === ROLE_ID.CANDIDATE) {
          return (
            <RegisterFormCandidate
              onBackClick={onFormBackClick}
              onSignupSuccess={onSignupSuccess}
            />
          );
        }
        return <RegisterFormRecruiter />;
      case StepScreen.OTP:
        return (
          <VerifyOTP email={finalData.email} onSuccess={onOTPVerifySuccess} />
        );
      case StepScreen.SUCCESS:
        return (
          <SuccessfulScreen
            onFinish={onFinish}
            email={finalData.email}
            password={finalData.password}
          />
        );
    }
  };

  return <div>{getScreen()}</div>;
};

export default RegisterPage;
