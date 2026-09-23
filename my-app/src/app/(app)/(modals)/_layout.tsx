import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: "formSheet",
        headerShown: false,
        sheetAllowedDetents: [0.5, 1],
        sheetExpandsWhenScrolledToEdge: true,
      }}
    >
      <Stack.Screen name="redemption-success" />
    </Stack>
  );
}
