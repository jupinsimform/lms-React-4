export type User = {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  active: boolean;
  owner: boolean;
  role: string;
  __v: number;
};

export type Props = {
  hoverdata: User | null;
};
