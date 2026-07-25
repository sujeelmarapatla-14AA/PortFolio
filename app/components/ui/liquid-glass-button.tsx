"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-primary-foreground hover:bg-destructive/90",
        cool: "dark:inset-shadow-2xs dark:inset-shadow-white/10 bg-gradient-to-t border border-b-2 border-zinc-950/40 from-primary to-primary/85 shadow-md shadow-primary/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 text-primary-foreground",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

const liquidbuttonVariants = cva(
  "relative group inline-flex items-center justify-center cursor-pointer gap-2.5 whitespace-nowrap rounded-full text-sm font-semibold tracking-wide transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 select-none overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-white hover:text-white",
        primary: "text-white bg-indigo-600/30 hover:bg-indigo-600/40 border-indigo-400/40",
        secondary: "text-gray-200 hover:text-white bg-white/5 hover:bg-white/10",
        destructive: "text-red-200 bg-red-600/20 hover:bg-red-600/30 border-red-400/30",
        outline: "text-white border border-white/20 bg-transparent hover:bg-white/10",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-sm",
        sm: "h-9 px-4 py-1.5 text-xs",
        lg: "h-13 px-8 py-3.5 text-base",
        xl: "h-14 px-10 py-4 text-base font-bold",
        xxl: "h-16 px-12 py-5 text-lg font-bold",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof liquidbuttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <>
      <Comp
        data-slot="button"
        className={cn(
          liquidbuttonVariants({ variant, size, className }),
          "shadow-[0_8px_32px_0_rgba(99,102,241,0.25),inset_0_1px_1px_0_rgba(255,255,255,0.4),inset_0_-2px_6px_0_rgba(0,0,0,0.4)]",
          "border border-white/25 hover:border-white/40",
          "backdrop-blur-xl backdrop-saturate-200 bg-gradient-to-b from-white/20 via-white/10 to-indigo-950/40",
          "hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_12px_40px_0_rgba(129,140,248,0.4),inset_0_1px_2px_0_rgba(255,255,255,0.6)]"
        )}
        {...props}
      >
        {/* Specular Liquid Glass Top Reflection Light */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/35 via-white/10 to-transparent rounded-t-full opacity-80 group-hover:opacity-100 transition-opacity" />

        {/* Liquid Refraction Backdrop Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
          style={{ backdropFilter: 'url("#container-glass") blur(16px)' }}
        />

        {/* Dynamic Light Sheen Flare */}
        <div aria-hidden="true" className="pointer-events-none absolute -inset-full top-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" />

        {/* Content Container */}
        <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-md">
          {children}
        </span>

        {/* Bottom Ambient Glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-4 bottom-0 h-1 bg-indigo-400/40 blur-sm rounded-full group-hover:bg-indigo-300/60 transition-all" />

        <GlassFilter />
      </Comp>
    </>
  )
}

function GlassFilter() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <defs>
        <filter
          id="container-glass"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          {/* Fractal turbulence for smooth liquid distortion */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.04"
            numOctaves="2"
            seed="5"
            result="turbulence"
          />

          {/* Slight blur for organic liquid look */}
          <feGaussianBlur in="turbulence" stdDeviation="3" result="blurredNoise" />

          {/* Displace graphic with liquid map */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="25"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />

          <feGaussianBlur in="displaced" stdDeviation="0.5" result="finalBlur" />
          <feComposite in="finalBlur" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}

type ColorVariant =
  | "default"
  | "primary"
  | "success"
  | "error"
  | "gold"
  | "bronze";

interface MetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ColorVariant;
}

const colorVariants: Record<
  ColorVariant,
  {
    outer: string;
    inner: string;
    button: string;
    textColor: string;
    textShadow: string;
  }
> = {
  default: {
    outer: "bg-gradient-to-b from-[#000] to-[#A0A0A0]",
    inner: "bg-gradient-to-b from-[#FAFAFA] via-[#3E3E3E] to-[#E5E5E5]",
    button: "bg-gradient-to-b from-[#B9B9B9] to-[#969696]",
    textColor: "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgb(80_80_80_/_100%)]",
  },
  primary: {
    outer: "bg-gradient-to-b from-[#000] to-[#A0A0A0]",
    inner: "bg-gradient-to-b from-primary via-secondary to-muted",
    button: "bg-gradient-to-b from-primary to-primary/40",
    textColor: "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgb(30_58_138_/_100%)]",
  },
  success: {
    outer: "bg-gradient-to-b from-[#005A43] to-[#7CCB9B]",
    inner: "bg-gradient-to-b from-[#E5F8F0] via-[#00352F] to-[#D1F0E6]",
    button: "bg-gradient-to-b from-[#9ADBC8] to-[#3E8F7C]",
    textColor: "text-[#FFF7F0]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(6_78_59_/_100%)]",
  },
  error: {
    outer: "bg-gradient-to-b from-[#5A0000] to-[#FFAEB0]",
    inner: "bg-gradient-to-b from-[#FFDEDE] via-[#680002] to-[#FFE9E9]",
    button: "bg-gradient-to-b from-[#F08D8F] to-[#A45253]",
    textColor: "text-[#FFF7F0]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(146_64_14_/_100%)]",
  },
  gold: {
    outer: "bg-gradient-to-b from-[#917100] to-[#EAD98F]",
    inner: "bg-gradient-to-b from-[#FFFDDD] via-[#856807] to-[#FFF1B3]",
    button: "bg-gradient-to-b from-[#FFEBA1] to-[#9B873F]",
    textColor: "text-[#FFFDE5]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(178_140_2_/_100%)]",
  },
  bronze: {
    outer: "bg-gradient-to-b from-[#864813] to-[#E9B486]",
    inner: "bg-gradient-to-b from-[#EDC5A1] via-[#5F2D01] to-[#FFDEC1]",
    button: "bg-gradient-to-b from-[#FFE3C9] to-[#A36F3D]",
    textColor: "text-[#FFF7F0]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(124_45_18_/_100%)]",
  },
};

const metalButtonVariants = (
  variant: ColorVariant = "default",
  isPressed: boolean,
  isHovered: boolean,
  isTouchDevice: boolean,
) => {
  const colors = colorVariants[variant];
  const transitionStyle = "all 250ms cubic-bezier(0.1, 0.4, 0.2, 1)";

  return {
    wrapper: cn(
      "relative inline-flex transform-gpu rounded-md p-[1.25px] will-change-transform",
      colors.outer,
    ),
    wrapperStyle: {
      transform: isPressed
        ? "translateY(2.5px) scale(0.99)"
        : "translateY(0) scale(1)",
      boxShadow: isPressed
        ? "0 1px 2px rgba(0, 0, 0, 0.15)"
        : isHovered && !isTouchDevice
          ? "0 4px 12px rgba(0, 0, 0, 0.12)"
          : "0 3px 8px rgba(0, 0, 0, 0.08)",
      transition: transitionStyle,
      transformOrigin: "center center",
    },
    inner: cn(
      "absolute inset-[1px] transform-gpu rounded-lg will-change-transform",
      colors.inner,
    ),
    innerStyle: {
      transition: transitionStyle,
      transformOrigin: "center center",
      filter:
        isHovered && !isPressed && !isTouchDevice ? "brightness(1.05)" : "none",
    },
    button: cn(
      "relative z-10 m-[1px] rounded-md inline-flex h-11 transform-gpu cursor-pointer items-center justify-center overflow-hidden rounded-md px-6 py-2 text-sm leading-none font-semibold will-change-transform outline-none",
      colors.button,
      colors.textColor,
      colors.textShadow,
    ),
    buttonStyle: {
      transform: isPressed ? "scale(0.97)" : "scale(1)",
      transition: transitionStyle,
      transformOrigin: "center center",
      filter:
        isHovered && !isPressed && !isTouchDevice ? "brightness(1.02)" : "none",
    },
  };
};

const ShineEffect = ({ isPressed }: { isPressed: boolean }) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-20 overflow-hidden transition-opacity duration-300",
        isPressed ? "opacity-20" : "opacity-0",
      )}
    >
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-neutral-100 to-transparent" />
    </div>
  );
};

export const MetalButton = React.forwardRef<
  HTMLButtonElement,
  MetalButtonProps
>(({ children, className, variant = "default", ...props }, ref) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  React.useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const buttonText = children || "Button";
  const variants = metalButtonVariants(
    variant,
    isPressed,
    isHovered,
    isTouchDevice,
  );

  const handleInternalMouseDown = () => {
    setIsPressed(true);
  };
  const handleInternalMouseUp = () => {
    setIsPressed(false);
  };
  const handleInternalMouseLeave = () => {
    setIsPressed(false);
    setIsHovered(false);
  };
  const handleInternalMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  };
  const handleInternalTouchStart = () => {
    setIsPressed(true);
  };
  const handleInternalTouchEnd = () => {
    setIsPressed(false);
  };
  const handleInternalTouchCancel = () => {
    setIsPressed(false);
  };

  return (
    <div className={variants.wrapper} style={variants.wrapperStyle}>
      <div className={variants.inner} style={variants.innerStyle}></div>
      <button
        ref={ref}
        className={cn(variants.button, className)}
        style={variants.buttonStyle}
        {...props}
        onMouseDown={handleInternalMouseDown}
        onMouseUp={handleInternalMouseUp}
        onMouseLeave={handleInternalMouseLeave}
        onMouseEnter={handleInternalMouseEnter}
        onTouchStart={handleInternalTouchStart}
        onTouchEnd={handleInternalTouchEnd}
        onTouchCancel={handleInternalTouchCancel}
      >
        <ShineEffect isPressed={isPressed} />
        {buttonText}
        {isHovered && !isPressed && !isTouchDevice && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t rounded-lg from-transparent to-white/5" />
        )}
      </button>
    </div>
  );
});

MetalButton.displayName = "MetalButton";
export { Button, buttonVariants, liquidbuttonVariants, LiquidButton }