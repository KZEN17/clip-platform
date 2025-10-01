import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  animated?: boolean;
  showGlow?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    { className, value = 0, animated = true, showGlow = false, ...props },
    ref
  ) => {
    const [displayValue, setDisplayValue] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);

    React.useEffect(() => {
      if (animated && value !== displayValue) {
        setIsAnimating(true);
        const duration = 1500; // 1.5 seconds
        const startValue = displayValue;
        const difference = value - startValue;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Easing function for smooth animation
          const easeOutCubic = 1 - Math.pow(1 - progress, 3);
          const currentValue = startValue + difference * easeOutCubic;

          setDisplayValue(currentValue);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setIsAnimating(false);
          }
        };

        requestAnimationFrame(animate);
      } else if (!animated) {
        setDisplayValue(value);
      }
    }, [value, animated, displayValue]);

    const progressPercentage = Math.min(Math.max(displayValue, 0), 100);

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-gray-700",
          className
        )}
        {...props}
      >
        {/* Background glow effect when animated */}
        {showGlow && isAnimating && progressPercentage > 0 && (
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: `radial-gradient(ellipse at center, rgba(236, 72, 153, 0.4) 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Main progress indicator */}
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full flex-1 rounded-full transition-all duration-300 ease-out relative overflow-hidden",
            progressPercentage > 0
              ? "bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400"
              : "bg-gray-600",
            isAnimating &&
              progressPercentage > 0 &&
              "shadow-[0_0_25px_rgba(236,72,153,0.6)]"
          )}
          style={{
            width: `${progressPercentage}%`,
            transformOrigin: "left center",
          }}
        >
          {/* Animated shine effect */}
          {isAnimating && progressPercentage > 0 && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{
                transform: "translateX(-100%)",
                animation: "slide-right 2s ease-out infinite",
              }}
            />
          )}

          {/* Subtle inner shadow for depth */}
          {progressPercentage > 0 && (
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
          )}
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    );
  }
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
