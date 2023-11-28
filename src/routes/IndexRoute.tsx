import {
  Badge,
  Button,
  Center,
  Container,
  Group,
  SimpleGrid,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  IconCloudDownload,
  IconCurrencyDollar,
  IconKey,
  IconLock,
  IconNorthStar,
} from "@tabler/icons-react";
import { useLiveQuery } from "dexie-react-hooks";
import { Logo } from "../components/Logo";
import { SettingsModal } from "../components/SettingsModal";
import { db } from "../db";
import { config } from "../utils/config";

export function IndexRoute() {
  const settings = useLiveQuery(() => db.settings.get("general"));
  const { openAiApiKey } = settings ?? {};

  return (
    <>
      <Center py="xl" sx={{ height: "100%" }}>
        <Container size="sm">
          <Badge mb="lg">GPT-4 Turbo</Badge>
          <Text mt={4} size="xl">
            A better Chatpad clone!
          </Text>
          <SimpleGrid
            mt={50}
            cols={3}
            spacing={30}
            breakpoints={[{ maxWidth: "md", cols: 1 }]}
          >
            {features.map((feature) => (
              <div key={feature.title}>
                <ThemeIcon variant="outline" size={50} radius={50}>
                  <feature.icon size={26} stroke={1.5} />
                </ThemeIcon>
                <Text mt="sm" mb={7}>
                  {feature.title}
                </Text>
                <Text size="sm" color="dimmed" sx={{ lineHeight: 1.6 }}>
                  {feature.description}
                </Text>
              </div>
            ))}
          </SimpleGrid>
          <Group mt={50}>
            {config.allowSettingsModal && (
              <SettingsModal>
                <Button
                  size="md"
                  variant={openAiApiKey ? "light" : "filled"}
                  leftIcon={<IconKey size={20} />}
                >
                  {openAiApiKey ? "Change OpenAI Key" : "Enter OpenAI Key"}
                </Button>
              </SettingsModal>
            )}
          </Group>
        </Container>
      </Center>
    </>
  );
}

const features = [
  {
    icon: IconNorthStar,
    title: "GPT4 Turbo Ready",
    description:
      "Access the latest GPT4 Turbo, a cheaper but stronger API model.",
  },
];
