import React from 'react';
import { ActivityIndicator, Switch, Text, View } from 'react-native';

import { useSettings } from '../features/settings/SettingsProvider';

const SettingsScreen = () => {
    const {
        settings,
        isLoaded,
        setNotificationsEnabled,
        setDarkModeEnabled,
    } = useSettings();

    if (!isLoaded) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View className="flex-1 gap-6 bg-white px-6 pt-8">
            <Text className="font-lato-bold text-2xl text-primary">
                Ajustes
            </Text>

            <View className="gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <Text className="font-lato-bold text-lg text-gray-800">
                    Preferencias
                </Text>

                <View className="flex-row items-center justify-between gap-4">
                    <View className="flex-1">
                        <Text className="text-base font-medium text-gray-800">
                            Notificaciones
                        </Text>
                        <Text className="text-sm text-gray-500">
                            Recordar esta preferencia en el dispositivo.
                        </Text>
                    </View>
                    <Switch
                        accessibilityLabel="Notificaciones"
                        value={settings.notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                    />
                </View>

                <View className="flex-row items-center justify-between gap-4">
                    <View className="flex-1">
                        <Text className="text-base font-medium text-gray-800">
                            Modo oscuro
                        </Text>
                        <Text className="text-sm text-gray-500">
                            Recordar esta preferencia en el dispositivo.
                        </Text>
                    </View>
                    <Switch
                        accessibilityLabel="Modo oscuro"
                        value={settings.darkModeEnabled}
                        onValueChange={setDarkModeEnabled}
                    />
                </View>
            </View>

            <Text className="text-sm text-gray-500">
                Estas opciones guardan tu preferencia localmente. Su efecto en la
                app se puede conectar más adelante.
            </Text>
        </View>
    );
};

export default SettingsScreen;
