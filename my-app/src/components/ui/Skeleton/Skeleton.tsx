// components/Skeleton.tsx
import { useEffect, useRef } from "react";
import { Animated, View, ViewStyle } from "react-native";

type SkeletonProps = {
  className?: string;
  style?: ViewStyle;
};

export function Skeleton({ className, style }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  return (
    <Animated.View
      className={`bg-slate-200 ${className ?? ""}`}
      style={[{ opacity }, style]}
    />
  );
}
