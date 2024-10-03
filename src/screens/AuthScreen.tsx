import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { theme } from '../theme';

type AuthScreenProps = {
  onAuthenticate: () => void;
};

export default function AuthScreen({ onAuthenticate }: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Ici, vous ajouteriez la logique d'authentification réelle
    if (email && password) {
      onAuthenticate();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/speakdate-logo.png' }}
        style={styles.logo}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Input
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Se connecter" onPress={handleLogin} style={styles.button} />
      <Text style={styles.signupText}>Nouveau sur Speakdate ? S'inscrire</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: theme.spacing.xl,
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  button: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  signupText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
});