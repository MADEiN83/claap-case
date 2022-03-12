/* eslint-disable max-lines */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormControl, useToast } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

import { searchUser, User } from "core/api/fake.api";
import { useAppDispatch, useAppSelector } from "core/reducer";
import SelectOption from "./components/select-option";
import Tag from "./components/tag";
import NewItem from "./components/new-item";
import { filterWrongItems } from "./multi-select.utils";
import { setEmails } from "core/reducer/main/actions";

const MultiSelect: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const ref = useRef<any>(null);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.main.loading);

  useEffect(() => {
    // TODO: finish this & handle user input
    searchUser("t").then((users) => {
      setUsers(users);
    });
  }, []);

  const filterSelection = useCallback(
    (value: string[], item: any) => {
      const wrongItems = filterWrongItems(item);

      wrongItems.forEach((item) => {
        ref.current?.removeItem(item);
      });

      if (wrongItems[0]) {
        toast({
          title: "Wrong format.",
          // eslint-disable-next-line max-len
          description: `Please provide a valid email address (got '${wrongItems[0]}').`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }

      const tempValue = value.filter((p) => !wrongItems.includes(p));
      dispatch(setEmails(tempValue));
    },
    [filterWrongItems, dispatch]
  );

  return (
    <FormControl bgColor="brand.900" color="white" isDisabled={loading}>
      <AutoComplete multiple creatable onChange={filterSelection} ref={ref}>
        <AutoCompleteInput
          variant="filled"
          placeholder="Search names or emails..."
          borderColor="brand.700"
          bg="brand.900"
          _hover={{ bg: "brand.900" }}
        >
          {({ tags }) => tags.map((tag) => <Tag key={tag.label} {...tag} />)}
        </AutoCompleteInput>
        <AutoCompleteList
          bg="brand.900"
          _hover={{ bg: "brand.900" }}
          _first={{ bg: "brand.900" }}
        >
          <AutoCompleteCreatable
            bgColor="brand.900"
            color="white"
            _focus={{ bgColor: "brand.900" }}
            _hover={{ bg: "brand.700" }}
          >
            {({ value: { props } }: any) => <NewItem {...props} />}
          </AutoCompleteCreatable>
          {users.map((user) => (
            <AutoCompleteItem
              key={`option-${user.email}`}
              value={`${user.firstName} ${user.lastName}`}
              textTransform="capitalize"
              bg="brand.900"
              _selected={{ bg: "brand.900" }}
              _focus={{ bg: "brand.900" }}
              _hover={{ bg: "brand.700" }}
            >
              <SelectOption user={user} />
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </FormControl>
  );
};

export default MultiSelect;
