const forms = [
  {
    name: "Your info",
    data: {
      heading: "Personal info",
      subHeading: "Please provide your name, email address, and phone number.",

      input: [
        {
          name: "Name",
          placeholder: "e.g. Stephen King",
          type: "text"
        },
        {
          name: "Email Address",
          placeholder: "e.g. stephenking@lorem.com",
          type: "email"
        },
        {
          name: "Phone Number",
          placeholder: "e.g. +1 234 567 890",
          type: "tel"
        },
      ],
    },
  },

  {
    name: "Select plan",
    data: {
      heading: "Select your plan",
      subHeading: "You have the option of monthly or yearly billing.",

      plans: [
        {
          name: "Arcade",
          monthlyPrice: 9,
          yearlyPrice: 90,
          icon: "icon-arcade.svg",
        },
        {
          name: "Advanced",
          monthlyPrice: 12,
          yearlyPrice: 120,
          icon: "icon-advanced.svg",
        },
        {
          name: "Pro",
          monthlyPrice: 15,
          yearlyPrice: 150,
          icon: "icon-pro.svg",
        },
      ],
    },
  },

  {
    name: "Add-ons",
    data: {
      heading: "Pick add-ons",
      subHeading: "Add-ons help enhance your gaming experience.",

      addOns: [
        {
          name: "Online service",
          description: "Access to multiplayer games",
          monthlyPrice: 1,
          yearlyPrice: 10,
        },
        {
          name: "Larger storage",
          description: "Extra 1TB of cloud save",
          monthlyPrice: 2,
          yearlyPrice: 20,
        },
        {
          name: "Customizable profile",
          description: "Custom theme on your profile",
          monthlyPrice: 2,
          yearlyPrice: 20,
        },
      ],
    },
  },
  {
    name: "Summary",
    data: {
      heading: "Finishing up",
      subHeading: "Double-check everything looks OK before confirming.",

      summary: true,
    },
  },
];

export const getFormData = (num: number) => {
  return forms[num];
};

export const getNavigation = (num: number) => {
  return forms.map((form) => {
    return form.name;
  });
};

export const getFormCount = () => {
  return forms.length;
};

//Could have done this easier by just adding price number to the activeplan ect..
export const getPlanPrice = (activePlan: string, yearly: boolean) => {
  const matchingForm = forms.find((form) =>
    form.data.plans?.some((plan) => plan.name === activePlan)
  );

  // Check if a matching form was found
  if (matchingForm) {
    // Assuming there is a property like 'price' in the plan object, adjust accordingly
    const matchingPlan = matchingForm.data.plans?.find(
      (plan) => plan.name === activePlan
    );

    if (matchingPlan) {
      if (yearly) {
        return matchingPlan.yearlyPrice;
      } else {
        return matchingPlan.monthlyPrice;
      }
    } else {
      // Handle the case where the plan with the specified name is not found
      return 0; // or throw an error, return a default value, etc.
    }
  } else {
    // Handle the case where the form with the specified plan is not found
    return 0; // or throw an error, return a default value, etc.
  }
};
