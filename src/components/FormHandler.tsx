"use client";

import React, { useEffect, useState } from "react";
import FormDisplay from "./FormDisplay";
import { useStateContext } from "@/context/useStateContext";
import { getNavigation } from "@/lib/formData";

const FormHandler = () => {
  const {
    currentStep,
    increaseStep,
    decreaseStep,
    error,
    setFinishedForm,
    finishedForm,
    setClickedNextButton,
    clickedNextButton,
  } = useStateContext();

  const [navigationItems, setNavigationItems] = useState<string[]>([]);

  const handleIncrease = () => {
    if (currentStep == 3) {
      setFinishedForm(true);
    }
    increaseStep();
  };

  useEffect(() => {
    const data = getNavigation(currentStep);
    setNavigationItems(data);
  }, [currentStep]);

  return (
    <div className="lg:bg-white lg:shadow-[0px_0px_30px_10px] lg:shadow-[#00000010] lg:p-4 lg:flex lg:flex-row lg:min-w-[940px] rounded-xl lg:gap-[100px]">
      <aside className="relative">
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet="images/bg-sidebar-desktop.svg"
          />
          <img
            src="images/bg-sidebar-mobile.svg"
            className="w-full"
            alt="Sidebar design"
          />
        </picture>

        <div className="absolute lg:top-[40px] lg:left-[32px] top-[32px] left-1/2 -translate-x-1/2 lg:-translate-x-0">
          <div className="flex lg:flex-col gap-4 lg:gap-8">
            {navigationItems.map((nav, i) => {
              const realIndex = i + 1;

              return (
                <div key={nav} className="flex gap-4 items-center">
                  <span
                    className={`${
                      realIndex == currentStep + 1 && "stepActive"
                    } w-[33px] h-[33px] text-white rounded-full flex items-center justify-center font-bold border`}
                  >
                    {realIndex}
                  </span>

                  <div className="lg:flex flex-col hidden">
                    <span className="uppercase text-neutral-lightGray text-sm">
                      Step {realIndex}
                    </span>

                    <span className="uppercase text-white font-semibold">
                      {nav}
                    </span>
                  </div>
                </div>
              );
            })}
            {/*  */}
          </div>
        </div>
      </aside>
      <div
        className={`relative w-full lg:max-w-[450px] ${
          finishedForm ? "pb-0" : "pb-10"
        } lg:pb-0`}
      >
        <section
          className={`lg:max-w-[450px] lg:w-full shadow-[0px_0px_30px_10px] shadow-[#00000011] lg:shadow-none bg-white py-[35px] px-6 rounded-xl mx-4 -translate-y-[74px] lg:py-0 lg:rounded-none lg:mx-0 lg:static lg:-translate-y-0 lg:px-0 ${
            finishedForm && "h-full py-20 lg:py-0"
          }`}
        >
          <FormDisplay />
        </section>
        {!finishedForm && (
          <footer
            className={`${
              currentStep >= 1 ? "justify-between" : "justify-end"
            } lg:w-full lg:absolute fixed bottom-0 left-0 right-0 flex lg:shadow-none bg-white p-4 lg:p-0 shadow-[0px_0px_20px_10px] shadow-[rgba(0,0,0,0.05)]`}
          >
            {currentStep > 0 && (
              <button
                onClick={decreaseStep}
                className="secondary text-neutral-coolGray font-medium text-base"
              >
                Go Back
              </button>
            )}
            <span onClick={() => setClickedNextButton(true)} className="z-50">
              <button
                disabled={error && clickedNextButton}
                onClick={handleIncrease}
                className="primary"
              >
                Next step
              </button>
            </span>
          </footer>
        )}
      </div>
    </div>
  );
};

export default FormHandler;
