import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: 'ホーム' }}
      />
      {/* 他のタブを追加する場合はここに書く */}
    </Tabs>
  );
}
