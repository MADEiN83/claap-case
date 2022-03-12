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
import { setEmails } from "core/reducer/main/actions";
import { useAppDispatch, useAppSelector } from "core/reducer";
import SelectOption from "./components/select-option";
import Tag from "./components/tag";
import NewItem from "./components/new-item";
import { filterWrongItems } from "./multi-select.utils";

let debounce: any = null;

const MultiSelect: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const ref = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.main.loading);

  const handleOnUserInputChange = useCallback(() => {
    clearTimeout(debounce);

    debounce = setTimeout(() => {
      const value = inputRef.current?.value || "";

      searchUser(value).then((users) => {
        setUsers(users);
      });
    }, 400);
  }, []);

  useEffect(() => {
    /**
     * The @choc-ui/chakra-autocomplete lib doesn't allow us
     * to retrieve the input value.
     *
     * We need to find another way to get the value
     * - change library
     * - create custom multi-select
     * - or fork the lib & made the update
     */
    inputRef.current?.addEventListener("input", handleOnUserInputChange);
    return () => {
      inputRef.current?.removeEventListener("input", handleOnUserInputChange);
    };
  }, [handleOnUserInputChange]);

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

      const tempValue = value
        .filter((p) => !wrongItems.includes(p))
        .map((value) => {
          if (value.includes("@")) {
            return value;
          }

          const [firstName, lastName] = value.split(" ");
          const user = users.find(
            (user) => user.firstName === firstName && user.lastName === lastName
          );

          return user?.email || value;
        });

      dispatch(setEmails(tempValue));
    },
    [filterWrongItems, dispatch, users]
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
          id="input"
          ref={inputRef}
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
