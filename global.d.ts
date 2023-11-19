interface Form {
  name: string;
  data: {
    heading: string;
    subHeading: string;
    input?: {
      name: string;
      placeholder: string;
    }[];
    plans?: {
      name: string;
      monthlyPrice: number;
      yearlyPrice: number;
      icon: string;
    }[];
    addOns?: Addon[];
    summary?: boolean;
  };
}
[];

interface Addon {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
}
