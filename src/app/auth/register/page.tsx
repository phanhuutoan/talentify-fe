"use client";

import { useEffect, useState } from "react";
import { SelectRole } from "./_components/SelectRole";
import { ROLE_ID } from "@/_models/enum";
import { RegisterFormCandidate } from "./_components/RegisterFormCandidate";
import { RegisterFormRecruiter } from "./_components/RegisterFormRecruiter";
import { VerifyOTP } from "./_components/VerifyOTP";
import { SuccessfulScreen } from "./_components/SuccessfulScreen";
import { storageStore } from "@/_utils";

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
    console.log("Temp store", finalData);
    storageStore(finalData);
  }, [finalData]);

  const getScreen = () => {
    switch (screen) {
      case StepScreen.ROLE_SELECTION:
        return <SelectRole onSelectRole={onSelectRole} />;
      case StepScreen.REGISTER:
        if (role === ROLE_ID.CANDIDATE) {
          return <RegisterFormCandidate />;
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
