import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

export default props => {
  const {
    state,
    descriptors,
    navigation,
    tabBarActiveTintColor,
    tabBarActiveBackgroundColor,
    tabBarInactiveTintColor,
    tabBarInactiveBackgroundColor,
  } = props;
  
  const { routes } = state;
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          height: 64,
          alignItems: "center",
          justifyContent: "center" 
        }}
      >
        {routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const tintColor = isFocused ? tabBarActiveTintColor : tabBarInactiveTintColor;
          const backgroundColor = isFocused
            ? tabBarActiveBackgroundColor
            : tabBarInactiveBackgroundColor;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          return (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: backgroundColor,
                flexDirection: "row",
                margin: 4,
                height: 50,
                padding: 8,
                paddingRight: 16,
                paddingLeft: 16,
                borderRadius: "20%",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={onPress}
            >
              {options.tabBarIcon !== undefined &&
                options.tabBarIcon({ color: tintColor, size: 28 })}
              {isFocused && (
                <Text
                  style={{
                    marginLeft: 8,
                    color: tintColor
                  }}
                >
                  {label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};