export type MenuConfig = {
  title: string;
  name?: string;
  entry_dev?: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuConfig[];
};

export type AppOption = {
  title: string;
  name: string;
  entry_dev: string;
  prefetch: boolean;
  icon?: React.ReactNode;
};
