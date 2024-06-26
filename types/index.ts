export type ServerProps = {
  params?: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export interface authProps {
  userid: string;
  setUserid: (userid: string) => void;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  role: string;
  setRole: (role: string) => void;
  profile_picture: string | null;
  setProfilePicture: (profile_picture: string | null) => void;
  shift: string | null;
  setShift: (shift: string | null) => void;
}

export type UserProps = {
  id?: string;
  name: string;
  email: string;
  profile_picture: string | null;
  role: UserRole;
  shift: string | null;
  created_at?: string;
  updated_at?: string;
};

export type MenuProps = {
  label: string;
  key: string;
  icon?: React.JSX.Element;
  href?: string | undefined;
  children?: {
    label: string;
    key: string;
    href?: string;
  }[];
}[];

export type RegisterProps = {
  name: string;
  email: string;
  profile_picture: string | null | undefined;
  role: string;
  password: string;
  confirmPassword: string;
  shift: string | null;
};

export type ProductProps = {
  id?: string;
  name: string;
  picture: string | null | undefined;
  price: number;
  category: CategoryProps;
  max_age: number | null | undefined;
  created_at?: string;
  updated_at?: string;
};

export type CategoryProps = {
  id: number;
  name: string;
};

export type IngredientProps = {
  id?: number;
  name: string;
  category: IngredientCategoryProps;
  price: number;
  unit: number;
};

export type IngredientCategoryProps = {
  id: number;
  name: string;
};

export type UserDisplayProps = {
  id: string;
  profile_picture: string | null;
  name: string;
  email: string;
  role: UserRole;
  shift: string;
  created_at: Date;
  updated_at: Date;
};

export type UserRole = {
  id: number;
  name: string;
  user?: UserProps[]
  access?: AccessProps[]
};

export type AccessProps = {
  id?: number;
  key: string;
  value: boolean;
}

export type ReportStockProps = {
  id: string;
  report_date: string;
  grand_total: number;
  report_shift_1: {
    id: number;
    report_id: string;
    user_id: string;
    values: DetailReportValueShift1Props;
    reporter: string;
  } | null;
  report_shift_2: {
    id: number;
    report_id: string;
    user_id: string;
    values: DetailReportValueShift2Props;
    reporter: string;
  } | null;
};

export type DetailReportValueShift1Props = {
  id: number;
  product_name: string;
  stock_before: number;
  afternoon_stock: number;
  order: number;
  withdrawal: number;
  total_sold: number;
  total_price: number;
};

export type DetailReportValueShift2Props = {
  id: number;
  product_name: string;
  stock_before: number;
  night_stock: number;
  total_sold: number;
  total_price: number;
};

export type ReportSalesProps = {
  id?: string;
  reporter: string;
  total_income: number;
  total_cash: number;
  total_non_cash: number;
  total_expenses: number;
  non_cash: NonCashProps[];
  expenses: ExpensesProps[];
  report_date: string;
}

export type ReportIngredientProps = {
  id?: string;
  report_date: string;
  detail: DetailReportIngredientProps[];
  reporter: UserProps;
}

export type DetailReportIngredientProps = {
  id?: number;
  ingredient_id: number;
  ingredient: IngredientProps;
  quantity: number;
  pieces: number;
}

export type NonCashProps = {
  id?: number;
  reciept: string;
  description: string;
  amount: number;
}

export type ExpensesProps = {
  id?: number;
  amount: number;
  description: string;
}

export type RecipeProps = {
  id?: number;
  name: string;
    notes?: string;
    recipes_ingredient: {
      id?: number;
      ingredients: {
        name: string;
      };
      dose: number;
  }[];
}

export type RecipeIngredient = {
  id?: number;
  dose: number;
  ingredients: IngredientProps;
}