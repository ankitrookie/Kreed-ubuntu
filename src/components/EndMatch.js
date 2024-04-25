import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunity from "react-native-vector-icons/dist/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRoom } from "../screens/RoomScreen/roomSlice";
import { getRoomScoreAsync, selectRoomScore } from "./Badminton/badmintionSlice";

const EndMatch = ({ setData }) => {
  const user = useSelector(selectRoom);
  console.log(user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const score = useSelector(selectRoomScore);
  const gameScores = score?.games?.map(scores => scores.scores);
  const [status, setStatus] = useState("m");

  const fetchUserData = async () => {
    try {
      await dispatch(getRoomScoreAsync({ roomId: user?.createdRoom?.id }));
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [dispatch]);

  const data = [
    { id: 1, playerName: "Player 1" },
    { id: 2, playerName: "Player 2" },
    { id: 3, playerName: "Player 3" },
    { id: 4, playerName: "Player 4" },
    { id: 5, playerName: "Player 5" },
    { id: 6, playerName: "Player 1" },
    { id: 7, playerName: "Player 3" },
    { id: 8, playerName: "Player 4" },
    { id: 9, playerName: "Player 5" },
    { id: 10, playerName: "Player 1" },
  ];

  const scoreCard = [];

  const renderItem = ({ item }) => (
    <View className="bg-[#FFFFFF0F] rounded-md flex-row px-6 py-1 items-center m-2 space-x-6 border border-[#86D957]">
      <Image
        source={require("../assets/images/MSD.jpg")}
        style={{ height: 25, width: 25, borderRadius: 20 }}
      />
      <Text
        className="text-[12px] text-[#fff] font-normal"
        style={{ fontFamily: "Inter-Regular" }}
      >
        {item.playerName}
      </Text>
    </View>
  );

  const renderItem2 = ({ item }) => {
    const bowlerScoreCard = item[0]?.cricScore
    const batteraScoreCard = item[1]?.cricScore;
    return (

      <View style={{ backgroundColor: "#192513", margin: 10, borderRadius: 10, borderWidth: 0.3, borderColor: color, marginBottom: 20, height: 300 }}>
        <ScrollView>
          <Text
            style={{
              color: color,
              fontSize: 18,
              marginRight: "auto",
              marginLeft: "auto",
              marginVertical: 10,
            }}
          >
            Full Scoredcard of Team 1{" "}
          </Text>

          {/* Batting */}
          <View style={{ height: 30, borderTopColor: "rgba(255,255,255,.5)", borderBottomColor: "rgba(255,255,255,.5)", borderWidth: 1, marginVertical: 10, justifyContent: "space-around", flex: 1, flexDirection: "row", }}>
            <Text style={{ color: "white", fontSize: 16 }}>Bating</Text>
            <Text style={{ color: "white", fontSize: 16, marginLeft: "30%" }}>R</Text>
            <Text style={{ color: "white", fontSize: 16 }}>B</Text>
            <Text style={{ color: "white", fontSize: 16 }}>4s</Text>
            <Text style={{ color: "white", fontSize: 16 }}>6s</Text>
            <Text style={{ color: "white", fontSize: 16 }}>S/R</Text>
          </View>

          {batteraScoreCard?.map((item) => {
            const strikeRate = (item?.runs / item?.ballfaced) * 100;
            return (
              <View
                style={{
                  height: 30,
                  borderTopColor: "rgba(255,255,255,.5)",
                  marginVertical: 3,
                  justifyContent: "space-around",
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{ height: 20, width: 20, borderRadius: 20 }}
                  source={require("../assets/images//MSD.jpg")}
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: 13,
                    marginLeft: -10,
                    width: 80,
                  }}
                >
                  {item?.fname}
                </Text>
                <Text style={{ color: "white", fontSize: 13, marginLeft: "10%" }}>{item?.runs}</Text>
                <Text style={{ color: "white", fontSize: 13 }}>{item?.ballfaced}</Text>
                <Text style={{ color: "white", fontSize: 13 }}>{item?.totalfour}</Text>
                <Text style={{ color: "white", fontSize: 13 }}>{item?.totalsix}</Text>
                <Text style={{ color: "white", fontSize: 13 }}>{strikeRate.toFixed(2)}</Text>
              </View>
            )
          })}

          {/* Bowling */}
          <View
            style={{
              height: 30,
              borderTopColor: "rgba(255,255,255,.5)",
              borderBottomColor: "rgba(255,255,255,.5)",
              borderWidth: 1,
              marginVertical: 10,
              justifyContent: "space-around",
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Bowling</Text>
            <Text
              style={{ color: "white", fontSize: 16, marginLeft: "30%" }}
            >
              O
            </Text>
            <Text style={{ color: "white", fontSize: 16 }}>M</Text>
            <Text style={{ color: "white", fontSize: 16 }}>R</Text>
            <Text style={{ color: "white", fontSize: 16 }}>W</Text>
            <Text style={{ color: "white", fontSize: 16 }}>Econ</Text>
          </View>

          {bowlerScoreCard?.map((item) => {
            const economyRate = item?.runsConcided / item?.ballBowled;
            return (
              <View
                style={{
                  height: 30,
                  borderTopColor: "rgba(255,255,255,.5)",
                  marginVertical: 3,
                  justifyContent: "space-around",
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{ height: 20, width: 20, borderRadius: 20 }}
                  source={require("../assets/images//MSD.jpg")}
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: 13,
                    marginLeft: -10,
                    width: 80,
                  }}
                >
                  {item?.fname}
                </Text>
                <Text style={{ color: "white", fontSize: 13, marginLeft: "10%" }}>13</Text>
                <Text style={{ color: "white", fontSize: 13 }}>0</Text>
                <Text style={{ color: "white", fontSize: 13 }}>{item?.runsConcided}</Text>
                <Text style={{ color: "white", fontSize: 13 }}>{item?.totalWicket}</Text>
                <Text style={{ color: "white", fontSize: 13 }}>{economyRate?.toFixed(2)}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  const color = "#68d957";
  return (
    <View className="relative h-screen">
      <View className="absolute bottom-0 w-full">
        <LinearGradient
          colors={["#7BF13B42", "#000000"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="bg-[#1f1f1f] rounded-t-lg"
        >
          <View className="bg-[#00000073] m-4 rounded-lg p-4">
            <View className="flex-row justify-between">
              <Text className="text-[#86D957] font-bold text-[14px]">
                Team 1
              </Text>
              <View>
                <Text className="text-[#fff] font-bold text-[14px]">104/3</Text>
                <Text className="text-[#fff] font-bold text-[14px]">
                  8 overs
                </Text>
              </View>
              <View className="flex-col justify-center items-center">
                <MaterialCommunity name="trophy" size={20} color="gold" />
                <Text className="text-[#FEC119]">Won</Text>
                <Text className="text-[#FEC119]">Against</Text>
              </View>

              <View>
                <Text className="text-[#fff] font-bold text-[14px]">139/3</Text>
                <Text className="text-[#fff] font-bold text-[14px]">
                  8 overs
                </Text>
              </View>
              <Text className="text-[#86D957] font-bold text-[14px]">
                Team 2
              </Text>
            </View>
          </View>

          <View className=" flex-row w-full h-50 mt-30 justify-evenly p-4">
            <View>
              <TouchableOpacity onPress={() => setStatus("m")}>
                <Text
                  style={{
                    color: "#86D957",
                    fontFamily: "Inter-Regular",
                    fontSize: 16,
                    padding: 4,
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor:
                      status == "m" ? "rgba(255,255,255,.2)" : "transparent",
                    borderRadius: 3,
                  }}

                >
                  MVP
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  width: 100,
                  height: 5,
                  backgroundColor: status == "m" ? "#86D957" : "transparent",
                  borderRadius: 5,
                }}
              ></View>
            </View>
            <View>
              <TouchableOpacity>
                <Text
                  style={{
                    color: "#86D957",
                    fontFamily: "Inter-Regular",
                    fontSize: 16,
                    padding: 4,
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor:
                      status == "f" ? "rgba(255,255,255,.2)" : "transparent",
                    borderRadius: 3,
                    paddingHorizontal: 3,
                  }}
                  onPress={() => setStatus("f")}
                >
                  Full Scorecard
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  width: 115,
                  height: 5,
                  backgroundColor: status == "f" ? "#86D957" : "transparent",
                  borderRadius: 5,
                }}
              ></View>
            </View>
          </View>

          {status === "m" ? (
            <View className="p-4">
              <Text
                style={{
                  color: "#86D957",
                  fontSize: 16,
                  marginBottom: 20,
                  fontFamily: "Inter-Regular",
                }}
              >
                Choose MVP From Winning Team
              </Text>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
              />
            </View>
          ) : (
            <>
              <FlatList
                data={gameScores}
                renderItem={renderItem2}
                keyExtractor={(item) => item.teamId}
              />
            </>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("EndLiveRoom")}
            className="m-6"
          >
            <LinearGradient
              colors={["#86D957", "#000000"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.LinearGradientButton, { padding: 15 }]}
            >
              <Text className="text-[16px] text-white font-bold">End Voting {"(03:40)"}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 20,
  },
  item: {
    borderColor: "#86d957",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    width: 150,
    justifyContent: "space-evenly",
    borderWidth: 0.7,
    margin: 5,
  },
  Text: {
    color: "white",
    fontSize: 16,
  },
  table: {
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "green",
    marginBottom: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "green",
  },
  headerCell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 3,
    fontWeight: "bold",
    color: "white",
  },
  cell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 3,
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  playerName: {
    fontSize: 15,

    color: "rgba(255,255,255,.8)",
  },
  NextButton: {
    backgroundColor: "#436A2E",
    alignItems: "center",
    width: "85%",
    borderRadius: 10,
    alignSelf: "center",
  },
  LoginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  LinearGradientButton: {
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "100%",
  },
});

export default EndMatch;



