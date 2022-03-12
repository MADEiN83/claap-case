/* eslint-disable max-len */
export interface Item {
  value: string;
  originalValue: string;
  label: string;
  noFilter?: boolean;
  creatable?: boolean;
}

const EMAIL_REGEX =
  // eslint-disable-next-line max-len
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export const filterWrongItems = (items: any[]): string[] => {
  // const good = items
  //   .filter((item: Item) => item && !item.creatable)
  //   .map((item: Item) => item.value);
  const wrong: string[] = items
    .filter(
      (item: Item) => item && item.creatable && !item.value.match(EMAIL_REGEX)
    )
    .map((item: Item) => item.value);

  return wrong;
};
