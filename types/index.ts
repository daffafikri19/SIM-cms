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
  role: string & UserRole;
  shift: string | null;
  created_at?: string;
  updated_at?: string;
}

export type MenuProps = {
  label: string;
  key: string;
  icon: React.JSX.Element;
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
  name: string;
  category: IngredientCategoryProps;
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
}

export type ReportStockProps = {
  id: string;
  report_date: string;
  grand_total: number;
  report_shift_1: ShiftStockProps | null | undefined
  report_shift_2: ShiftStockProps | null | undefined
}

export type ShiftStockProps = {
  id: number;
  report_id: string;
  user_id: string;
  values: any;
  reporter: UserProps | null
}

export type ReportShift1Props = {
  id: number;
  reporter: UserProps;
  stock_before: number | null;
  afternoon_stock: number | null;
  order: number;
  withdrawal: number;
  total_price: number;
}

export type DetailReportValueShift1Props = {
  id: number;
  product_name: string;
  stock_before: number,
  afternoon_stock: number;
  order: number;
  withdrawal: number;
  total_price: number;
}

export type ReportShift2Props = {
  id: number;
  reporter: UserProps;
  morning_stock: number | null;
  afternoon_stock: number | null;
  total_price: number;
}