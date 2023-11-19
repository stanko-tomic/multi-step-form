"use client";

import { getFormCount, getPlanPrice } from "@/lib/formData";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserData {
  Name: string;
  "Email Address": string;
  "Phone Number": string;
}

interface ContextProps {
  currentStep: number;
  planPrice: number;
  yearly: boolean;
  error: boolean;
  clickedNextButton: boolean;
  increaseStep: () => void;
  decreaseStep: () => void;
  total: number;
  addons: Addon[]; // Use an array of Addon objects here
  userData: {
    Name: string;
    "Email Address": string;
    "Phone Number": string;
  };
  activePlan: string;
  finishedForm: boolean;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setActivePlan: React.Dispatch<React.SetStateAction<string>>;
  setAddons: React.Dispatch<React.SetStateAction<Addon[]>>;
  setYearly: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setFinishedForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Context = createContext<ContextProps>({
  currentStep: 1,
  planPrice: 0,
  yearly: false,
  error: false,
  userData: { Name: "", "Email Address": "", "Phone Number": "" },
  activePlan: "Arcade",
  addons: [],
  total: 0,
  clickedNextButton: false,
  finishedForm: false,
  setAddons: () => {},
  increaseStep: () => {},
  decreaseStep: () => {},
  setUserData: () => {},
  setActivePlan: () => {},
  setYearly: () => {},
  setCurrentStep: () => {},
  setFinishedForm: () => {},
});

interface StateContextProps {
  children: React.ReactNode;
}

export const StateContext = ({ children }: StateContextProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [userData, setUserData] = useState({
    Name: "",
    "Email Address": "",
    "Phone Number": "",
  });
  const [activePlan, setActivePlan] = useState("Arcade");
  const [addons, setAddons] = useState<Addon[]>([]);
  const [yearly, setYearly] = useState(false);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);
  const [planPrice, setPlanPrice] = useState(0);
  const [clickedNextButton, setClickedNextButton] = useState(false);
  const [finishedForm, setFinishedForm] = useState(false);

  const formCount = getFormCount();

  useEffect(() => {
    if (
      userData["Email Address"] &&
      userData.Name &&
      userData["Phone Number"]
    ) {
      setError(false);
    } else {
      setError(true)
    }
  }, [userData]);

  const increaseStep = () => {
    setClickedNextButton(true)
    if (
      !userData["Email Address"] ||
      !userData.Name ||
      !userData["Phone Number"]
    ) {
      setError(true);
    } else if (currentStep + 1 < formCount && !error) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const decreaseStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Calculate total
  useEffect(() => {
    if (activePlan) {
      const planPriceFunc = getPlanPrice(activePlan, yearly);
      setPlanPrice(planPriceFunc);
      setTotal(planPrice);

      if (addons && addons.length > 0) {
        let addonPrice = 0;
        addons.forEach((addon) => {
          if (yearly) {
            addonPrice += addon.yearlyPrice;
          } else {
            addonPrice += addon.monthlyPrice;
          }
        });
        setTotal((prev) => prev + addonPrice);
      }
    }
  }, [activePlan, yearly, addons, planPrice]);

  return (
    <Context.Provider
      value={{
        setCurrentStep,
        error,
        currentStep,
        increaseStep,
        decreaseStep,
        userData,
        setUserData,
        activePlan,
        setActivePlan,
        addons,
        setAddons,
        yearly,
        setYearly,
        total,
        planPrice,
        clickedNextButton,
        finishedForm,
        setFinishedForm
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = (): ContextProps => useContext(Context);
