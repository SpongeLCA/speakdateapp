import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Paramètres</Text>
        <ScrollView style={styles.content}>
          <View style={styles.setting}>
            <Text style={styles.settingText}>Notifications</Text>
            <Button variant="outline" size="sm" onPress={() => {}}>
              Activer
            </Button>
          </View>
          <View style={styles.setting}>
            <Text style={styles.settingText}>Mode sombre</Text>
            <Button variant="outline" size="sm" onPress={() => {}}>
              Désactiver
            </Button>
          </View>
          <View style={styles.setting}>
            <Text style={styles.settingText}>Langue</Text>
            <Button variant="outline" size="sm" onPress={() => {}}>
              Français
            </Button>
          </View>
          <View style={styles.setting}>
            <Text style={styles.settingText}>Confidentialité</Text>
            <Button variant="outline" size="sm" onPress={() => {}}>
              Gérer
            </Button>
          </View>
        </ScrollView>
        <Button variant="destructive" onPress={() => {}} style={styles.logoutButton}>
          Se déconnecter
        </Button>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 16,
  },
});