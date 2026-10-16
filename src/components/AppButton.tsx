import { Pressable, Text } from "react-native";

type AppButtonProps = {
  title: string;
  onPress: () => void;
};

export default function AppButton({ title, onPress }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="min-h-12 items-center justify-center rounded-xl bg-primary px-5 py-3 active:opacity-80">
      <Text className="font-lato font-light text-base text-white">{title}</Text>
    </Pressable>
  );
}
