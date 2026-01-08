import React from 'react';
import { Text } from 'react-native';

// Simple icon stub that uses text instead of vector icons
const Icon = ({ name, size = 20, color = '#000' }) => {
  // Map common icon names to emoji
  const iconMap = {
    // Material Icons / FontAwesome common names
    'star': '⭐',
    'heart': '❤️',
    'shopping-cart': '🛒',
    'plus': '➕',
    'minus': '➖',
    'close': '❌',
    'menu': '☰',
    'search': '🔍',
    'arrow-right': '→',
    'arrow-left': '←',
    'angle-left': '←',  // FontAwesome back arrow
    'check': '✓',
    'home': '🏠',
    'user': '👤',
    'settings': '⚙️',
  };

  const emoji = iconMap[name] || '•';

  return (
    <Text
      style={{
        fontSize: size,
        color: color,
        lineHeight: size,
      }}
    >
      {emoji}
    </Text>
  );
};

export default Icon;
