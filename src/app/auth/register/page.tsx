"use client";

import { useEffect, useState } from "react";
import { SelectRole } from "./_components/SelectRole";
import { ROLE_ID } from "@/_models/enum";
import { RegisterFormCandidate } from "./_components/RegisterFormCandidate";
import { RegisterFormRecruiter } from "./_components/RegisterFormRecruiter";
import { VerifyOTP } from "./_components/VerifyOTP";
import { SuccessfulScreen } from "./_components/SuccessfulScreen";
import { getStorageData, storageStore } from "@/_utils";

enum StepScreen {
  ROLE_SELECTION = "ROLE_SELECTION",
  REGISTER = "REGISTER",
  OTP = "OTP",
  SUCCESS = "SUCCESS",
}

interface FinalData {
  roleId: ROLE_ID | null;
  currentStep: StepScreen;
}
const KEY_STORE = "registerData";
const RegisterPage = () => {
  const [screen, setScreen] = useState<StepScreen>(StepScreen.ROLE_SELECTION);
  const [role, setRole] = useState<ROLE_ID | null>(null);
  const [finalData, setFinalData] = useState<FinalData>({
    roleId: null,
    currentStep: StepScreen.ROLE_SELECTION,
  });

  const onSelectRole = (role: ROLE_ID) => {
    setRole(role);
    setScreen(StepScreen.REGISTER);
    setFinalData({ roleId: role, currentStep: StepScreen.REGISTER });
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
    storageStore(KEY_STORE, finalData);
  }, [finalData]);

  const onFormBackClick = () => {
    setScreen(StepScreen.ROLE_SELECTION);
    setFinalData({ roleId: null, currentStep: StepScreen.ROLE_SELECTION });
  };

  const onSignupSuccess = () => {
    setScreen(StepScreen.OTP);
    setFinalData({ ...finalData, currentStep: StepScreen.OTP });
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
        return <VerifyOTP />;
      case StepScreen.SUCCESS:
        return <SuccessfulScreen />;
    }
  };

  return <div>{getScreen()}</div>;
};

export default RegisterPage;
