import * as TooltipRadix from "@radix-ui/react-tooltip";

export const Tooltip = ({
  children,
  title,
}: TooltipRadix.TooltipProps & { title: string }) => (
  <TooltipRadix.Provider>
    <TooltipRadix.Root>
      <TooltipRadix.Trigger>{children}</TooltipRadix.Trigger>
      <TooltipRadix.Portal>
        <TooltipRadix.Content className="bg-gray-800 px-4 py-2 rounded-md text-white" side={'right'}>
          <p>{title}</p>
          <TooltipRadix.Arrow className="fill-gray-800"/>
        </TooltipRadix.Content>
      </TooltipRadix.Portal>
    </TooltipRadix.Root>
  </TooltipRadix.Provider>
);
