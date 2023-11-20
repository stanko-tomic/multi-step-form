"use client";

import React, { useEffect, useState } from "react";
import { getFormData } from "@/lib/formData";
import { useStateContext } from "@/context/useStateContext";

type FormData = {
  Name: string;
  "Email Address": string;
  "Phone Number": string;
};

const FormDisplay = () => {
  const {
    currentStep,
    userData,
    setUserData,
    activePlan,
    setActivePlan,
    setAddons,
    addons,
    yearly,
    setYearly,
    total,
    planPrice,
    setCurrentStep,
    finishedForm,
    clickedNextButton,
  } = useStateContext();

  const [form, setForm] = useState<Form | null>(null);

  const handleInputChange = (name: string, value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddonToggle = (addon: Addon) => {
    // Check if the addon is already selected
    const isAddonSelected = addons.some(
      (selectedAddon) => selectedAddon.name === addon.name
    );

    if (isAddonSelected) {
      // If selected, remove it from the array
      const updatedAddons = addons.filter(
        (selectedAddon) => selectedAddon.name !== addon.name
      );
      setAddons(updatedAddons);
    } else {
      // If not selected, add it to the array
      setAddons([...addons, addon]);
    }
  };

  useEffect(() => {
    const data = getFormData(currentStep);
    setForm(data);
  }, [currentStep]);

  const isValidEmail = (email: string): boolean => {
    // Use a regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div
      className={`${
        finishedForm
          ? "pt-0 lg:absolute lg:top-1/2 lg:-translate-y-1/2"
          : "lg:pt-11"
      }`}
    >
      {!finishedForm && (
        <>
          <h1>{form?.data?.heading}</h1>
          <h2 className="mt-3 text-neutral-coolGray text-base">
            {form?.data?.subHeading}
          </h2>
        </>
      )}

      <div
        className={`flex flex-col gap-4 h-full ${
          finishedForm ? "mt-0" : "lg:mt-10 mt-6 "
        }`}
      >
        {/* Normal input case */}
        {form?.data?.input?.map((input) => {
          return (
            <div key={input.name}>
              <div className="flex flex-row w-full justify-between">
                <label
                  className="default text-sm"
                  htmlFor={input.name.replace(/\s/g, "-")}
                >
                  {input.name}
                </label>
                {!userData[input.name as keyof FormData] &&
                  clickedNextButton && (
                    <p className="font-semibold text-primary-strawberryRed text-sm">
                      This field is required
                    </p>
                  )}
                {input.name === "Email Address" &&
                  userData[input.name as keyof FormData] &&
                  !isValidEmail(userData[input.name as keyof FormData]) && (
                    <p className="font-semibold text-primary-strawberryRed text-sm">
                      Invalid email address
                    </p>
                  )}
              </div>
              <input
                type={input.type}
                name={input.name.replace(/\s/g, "-")}
                id={input.name.replace(/\s/g, "-")}
                required
                className="default mt-2"
                onChange={(e) => handleInputChange(input.name, e.target.value)}
                value={userData[input.name as keyof FormData]}
                placeholder={input.placeholder}
              />
            </div>
          );
        })}

        {/* Plans case */}
        {form?.data.plans && (
          <div>
            <div className="lg:grid lg:grid-cols-3 flex flex-col gap-3 lg:gap-[18px]">
              {form.data.plans.map((plan) => {
                return (
                  <button
                    className={`lg:block text-left hover:bg-primary-purplishBlue hover:bg-opacity-5 hover:border-primary-purplishBlue flex items-center gap-4 plan px-4 py-5 border border-neutral-coolGray rounded-lg ${
                      activePlan == plan.name &&
                      "bg-primary-purplishBlue bg-opacity-5 border-primary-purplishBlue"
                    }`}
                    aria-label={plan.name}
                    key={plan.name}
                    onClick={() => setActivePlan(plan.name)}
                  >
                    <div>
                      <img src={`/images/${plan.icon}`} alt={plan.name} />
                    </div>

                    <div className="lg:mt-10">
                      <p className="text-primary-marineBlue font-semibold">
                        {plan.name}
                      </p>
                      <p className="text-neutral-coolGray">
                        $
                        {yearly
                          ? `${plan.yearlyPrice}/yr`
                          : `${plan.monthlyPrice}/mo`}
                      </p>

                      {yearly && (
                        <p className="text-primary-marineBlue text-sm mt-1">
                          2 months free
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="h-12 bg-neutral-magnolia w-full rounded-lg flex items-center justify-center gap-6 mt-6">
              <p
                className={`text-sm font-semibold ${
                  yearly ? "text-neutral-coolGray" : "text-primary-marineBlue"
                }`}
              >
                Monthly
              </p>
              <button
                aria-label={yearly ? "Yearly plan" : "Monthly plan"}
                className="bg-primary-marineBlue rounded-full w-[38px] h-[20px] relative"
                onClick={() => setYearly((prev) => !prev)}
              >
                <span
                  className={`w-3 h-3 rounded-full bg-white absolute top-1/2 -translate-y-1/2 ${
                    yearly ? "right-1" : "left-1"
                  }`}
                ></span>
              </button>
              <p
                className={`text-sm font-semibold ${
                  yearly ? "text-primary-marineBlue" : "text-neutral-coolGray"
                }`}
              >
                Yearly
              </p>
            </div>
          </div>
        )}

        {/* Addons case */}
        {form?.data.addOns && (
          <div className="flex flex-col gap-4">
            {form.data.addOns.map((addon) => {
              return (
                <button
                  key={addon.name}
                  className={`text-left flex justify-between items-center w-full border border-neutral-coolGray rounded-lg px-6 py-5 hover:bg-primary-purplishBlue hover:bg-opacity-[0.02] hover:border-primary-marineBlue ${
                    addons.some((selectedAddon) =>
                      addons.some(
                        (selectedAddon) => selectedAddon.name === addon.name
                      )
                    ) &&
                    "border-primary-purplishBlue bg-primary-purplishBlue bg-opacity-[0.02]"
                  }`}
                  aria-label={addon.name}
                  onClick={() => handleAddonToggle(addon)}
                >
                  <div className="flex flex-row gap-6 items-center">
                    <input
                      type="checkbox"
                      className="addon-checkbox"
                      onChange={() => {}}
                      checked={addons.some(() =>
                        addons.some(
                          (selectedAddon) => selectedAddon.name === addon.name
                        )
                      )}
                    />
                    <div>
                      <p className="text-primary-marineBlue font-semibold">
                        {addon.name}
                      </p>
                      <p className="text-sm text-neutral-coolGray">
                        {addon.description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-primary-purplishBlue">
                      +$
                      {yearly
                        ? `${addon.yearlyPrice}/yr`
                        : `${addon.monthlyPrice}/mo`}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {finishedForm ? (
          <div className="h-full flex items-center justify-center flex-col">
            <img
              className="lg:mb-9 mb-4 w-14 lg:w-auto"
              src="/images/icon-thank-you.svg"
              alt="Checkmark"
            />
            <h1 className="mb-4 text-2xl lg:text-3xl">Thank you!</h1>
            <p className="text-neutral-coolGray text-center">
              Thanks for confirming your subscription! We hope you have fun
              using our platform. If you ever need support, please feel free to
              email us at support@loremgaming.com.
            </p>
          </div>
        ) : (
          <>
            {form?.data.summary && (
              <div>
                <div className="bg-neutral-magnolia px-6 py-5 rounded-lg">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col text-primary-marineBlue font-semibold">
                      <p>{`${activePlan} (${
                        yearly ? "Yearly" : "Monthly"
                      })`}</p>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-neutral-coolGray underline text-left font-normal text-sm hover:text-primary-purplishBlue"
                      >
                        Change
                      </button>
                    </div>

                    <p className="text-primary-marineBlue font-semibold">{`$${planPrice}/${
                      yearly ? "yr" : "mo"
                    }`}</p>
                  </div>

                  {addons.length > 0 && (
                    <span className="h-[1px] bg-neutral-lightGray mb-5 w-full block mt-6"></span>
                  )}

                  <div className="flex flex-col gap-2">
                    {addons.map((addon) => {
                      return (
                        <div
                          className="flex flex-row justify-between"
                          key={`${addon.name}-summary`}
                        >
                          <div>
                            <p className="text-neutral-coolGray text-sm">
                              {addon.name}
                            </p>
                          </div>

                          <div>
                            <p className="text-primary-marineBlue text-xs">
                              +{yearly ? addon.yearlyPrice : addon.monthlyPrice}
                              /{`${yearly ? "yr" : "mo"}`}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-row px-6 w-full justify-between items-center mt-6">
                  <div>
                    <p className="text-neutral-coolGray text-sm">
                      Total (per {yearly ? "year" : "month"})
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-primary-purplishBlue">
                      +${total}/{yearly ? "yr" : "mo"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FormDisplay;
