import { Slot } from '@radix-ui/react-slot';
import type { ComponentProps } from 'react';

import { cn } from '@/shared/lib/utils';

import { buttonVariants, type ButtonVariantProps } from './button-variants';

type ButtonProps = ComponentProps<'button'> &
  ButtonVariantProps & {
    asChild?: boolean;
  };

export const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
