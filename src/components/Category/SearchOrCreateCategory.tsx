import React from "react";
import * as Select from "@radix-ui/react-select";
import { RiArrowDownSLine, RiArrowUpSLine, RiCheckLine } from "react-icons/ri";
import { Controller, useFormContext } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

const options: Option[] = [
  { label: "Despesas Diárias", value: "dailyExpenses" },
  { label: "Moradia", value: "housing" },
  { label: "Saúde", value: "healthcare" },
  { label: "Educação", value: "education" },
  { label: "Transporte", value: "transportation" },
  { label: "Lazer e Entretenimento", value: "leisureAndEntertainment" },
  { label: "Economias e Investimentos", value: "savingsAndInvestments" },
  { label: "Dívidas", value: "debts" },
  { label: "Seguros", value: "insurance" },
  { label: "Roupas e Acessórios", value: "clothingAndAccessories" },
];

const SearchOrCreateCategory = (props: Select.SelectProps) => {
  const { control, getValues } = useFormContext();

  return (
    <div className="flex flex-col">
      <p className="text-sm font-medium text-gray-700">Categoria</p>
      <Controller
        name="category"
        control={control}
        render={({ field }) => {
          return (
            <Select.Root
              {...props}
              onValueChange={(value) =>
                field.onChange({ target: { name: "category", value } })
              }
            >
              <Select.Trigger className="inline-flex h-10 items-center justify-between rounded border-[1px] border-gray-300 px-4 py-2 text-sm leading-none shadow-sm">
                <Select.Value placeholder="Selecione uma categoria"></Select.Value>
                <Select.Icon>
                  <RiArrowDownSLine size={20} />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="overflow-hidden rounded-md border-[1px] border-gray-300 bg-white shadow-sm">
                  <Select.ScrollUpButton className="flex h-6 items-center justify-center bg-white">
                    <RiArrowUpSLine />
                  </Select.ScrollUpButton>
                  <Select.Viewport className="p-1">
                    <Select.Group>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                  <Select.ScrollDownButton className="flex h-6 items-center justify-center bg-white">
                    <RiArrowDownSLine />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          );
        }}
      />
    </div>
  );
};

const SelectItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className="relative flex h-8 select-none items-center rounded-md px-6 text-sm leading-none hover:bg-gray-100 data-[disabled]:pointer-events-none"
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
        <RiCheckLine />
      </Select.ItemIndicator>
    </Select.Item>
  );
});
SelectItem.displayName = "SelectItem";
export default SearchOrCreateCategory;
