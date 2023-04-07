import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
export type ItemsContextProps = {
  videoId?: string;
  items?: Item[];
  isFirstRender: boolean;
};

const ItemsContext = createContext<{
  values: ItemsContextProps;
  setValues: Dispatch<SetStateAction<ItemsContextProps>>;
} | null>(null);

export const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [values, setValues] = useState<ItemsContextProps>({
    videoId: '',
    items: [],
    isFirstRender: true,
  });

  return <ItemsContext.Provider value={{ values, setValues }}>{children}</ItemsContext.Provider>;
};

export const useItemsContext = () => useContext(ItemsContext);
