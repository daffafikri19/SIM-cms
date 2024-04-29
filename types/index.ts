export type ServerProps = {
  params?: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

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
  shift: string;
};

export type ProductProps = {
  name: string;
  picture: string | null | undefined;
  price: number;
  category: string;
  max_age: number | null | undefined;
  created_at: string;
  updated_at: string;
};

export type UserDisplayProps = {
  id: string;
  name: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
  shift: string;
  created_at: Date;
  updated_at: Date;
};
