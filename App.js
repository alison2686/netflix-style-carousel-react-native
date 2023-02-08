import React from "react";
import {
  ScrollView,
  Animated,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  View,
  Image,
} from "react-native";
import { getLogoHeight } from "./utils";

const OFFSET = 40;
const ITEM_WIDTH = Dimensions.get("window").width - OFFSET * 2;
const ITEM_HEIGHT = 200;

const cards = [
  { title: "Movie 1", posterUrl: require("./images/1917.jpeg") },
  { title: "Movie 2", posterUrl: require("./images/tenent.jpeg") },
  { title: "Movie 3", posterUrl: require("./images/spiderman.jpeg") },
  { title: "Movie 4", posterUrl: require("./images/mando.jpeg") },
];

export default function CardCarousel() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "black", paddingVertical: 200 }}
    >
      <View style={{ marginBottom: 20, alignSelf: "center" }}>
        <Image
          source={require("./images/netflix.png")}
          style={{ height: getLogoHeight(100), width: 100 }}
        />
      </View>
      <ScrollView
        horizontal={true}
        decelerationRate={"normal"}
        snapToInterval={ITEM_WIDTH}
        style={{ paddingHorizontal: 0 }}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        disableIntervalMomentum
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={12}
      >
        {cards.map((item, index) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const translate = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
          });

          return (
            <Animated.View
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                marginLeft: index === 0 ? OFFSET : undefined,
                marginRight: index === cards.length - 1 ? OFFSET : undefined,
                opacity: opacity,
                transform: [{ scale: translate }],
              }}
            >
              <ImageBackground
                source={item.posterUrl}
                style={{
                  flex: 1,
                  resizeMode: "cover",
                  justifyContent: "center",
                }}
                imageStyle={{ borderRadius: 6 }}
              />
            </Animated.View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
