import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ProgressChart } from 'react-native-chart-kit';
import { useAuthStore } from '../store/useAuthStore';
import { Column, Row } from '../ui';

const CricketStates = () => {
  const [percentage, setPercentage] = useState(0);
  const user = useAuthStore(state => state.user);
  console.log("userData from cricket", user);
  const [stateType, setStateType] = useState('cricket');

  const data = {
    data: [0.4],
  };

  useEffect(() => {
    setPercentage((data.data[0] * 100).toFixed(2) + '%');
  }, [data]);

  const chartConfig1 = {
    color: (opacity = 1) => `rgba(234, 238, 61, ${opacity})`,
    useShadowColorFromDataset: false,
  };

  const chartConfig2 = {
    color: (opacity = 1) => `rgba(255, 140, 27, ${opacity})`,
    useShadowColorFromDataset: false,
  };

  return (
    <>
      <View className="flex-1 mb-4">
        <Column
          style={{
            marginTop: 24,
          }}>
          <View className="space-y-4">
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity>
                <Image
                  source={require('../assets/images/cricketBat.png')}
                  className="h-6 w-6"
                />
              </TouchableOpacity>
              <Text
                className="text-[#fff] text-[16px] font-normal"
                style={{fontFamily: 'Poppins-Regular'}}>
                Cricket: {user?.user?.cricket}
              </Text>
            </View>
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity>
                <Image
                  source={require('../assets/images/bat.png')}
                  className="h-6 w-6"
                />
              </TouchableOpacity>
              <Text
                className="text-[#fff] text-[16px] font-normal"
                style={{fontFamily: 'Poppins-Regular'}}>
                Batting: {user?.user?.battingStyle}
              </Text>
            </View>
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity>
                <Image
                  source={require('../assets/images/cricket-ball.png')}
                  className="h-5 w-5"
                />
              </TouchableOpacity>
              <Text
                className="text-[#fff] text-[16px] font-normal"
                style={{fontFamily: 'Poppins-Regular'}}>
                Bowling: {user?.user?.bowlingStyle}
              </Text>
            </View>
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity>
                <Image
                  source={require('../assets/images/expertBatch.png')}
                  className="h-[24px] w-[24px]"
                />
              </TouchableOpacity>
              <Text
                className="text-[#fff] text-[16px] font-normal"
                style={{fontFamily: 'Poppins-Regular'}}>
                {user?.user?.addPlayingcricket}
              </Text>
            </View>
          </View>
        </Column>

        <Column
          style={{
            marginTop: 24,
          }}>
          <LinearGradient
            colors={['#86D957', '#141514']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            className="flex-row flex">
            <Text
              className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[10px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              Format
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[10px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              Matches Played
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[10px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              MVPs
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[10px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              Win (%)
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[10px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              MVPs
            </Text>
          </LinearGradient>

          {/* Table Rows */}
          <View className="flex flex-row">
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              LTD
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              50
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              25
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              50%
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              4
            </Text>
          </View>
        </Column>

        <Row
          style={{
            paddingTop: 15,
          }}>
          <View className="space-y-1">
            <ProgressChart
              data={data}
              width={110}
              height={110}
              strokeWidth={10}
              radius={45}
              chartConfig={chartConfig1}
              hideLegend={true}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 40,
                bottom: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                className="text-white text-[12px]"
                style={{fontFamily: 'Poppins-Regular'}}>
                w
              </Text>
              <Text
                className="text-white text-[12px]"
                style={{fontFamily: 'Poppins-Regular'}}>
                {percentage}
              </Text>
            </View>

            <Text
              className="text-[10px] text-white"
              style={{fontFamily: 'Poppins-Regular'}}>
              MVPs to matches Percentages
            </Text>
            <View className="flex-row items-center space-x-2">
              <View
                style={{
                  height: 10,
                  width: 20,
                  backgroundColor: '#EAEE3D',
                }}></View>
              <Text
                className="text-[10px] text-white"
                style={{fontFamily: 'Poppins-Regular'}}>
                MVPs
              </Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <View
                style={{
                  height: 10,
                  width: 20,
                  backgroundColor: '#ebee3d96',
                }}></View>
              <Text
                className="text-[10px] text-white"
                style={{fontFamily: 'Poppins-Regular'}}>
                Matches Played
              </Text>
            </View>
          </View>

          <View className="space-y-1">
            <ProgressChart
              data={data}
              width={110}
              height={110}
              strokeWidth={10}
              radius={45}
              chartConfig={chartConfig2}
              hideLegend={true}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                className="text-white text-[12px]"
                style={{fontFamily: 'Poppins-Regular'}}>
                w
              </Text>
              <Text
                className="text-white text-[12px]"
                style={{fontFamily: 'Poppins-Regular'}}>
                {percentage}
              </Text>
            </View>

            <Text
              className="text-[10px] text-white"
              style={{fontFamily: 'Poppins-Regular'}}>
              Winning Percentage
            </Text>
            <View className="flex-row items-center space-x-2">
              <View
                style={{
                  height: 10,
                  width: 20,
                  backgroundColor: '#E59A07',
                }}></View>
              <Text
                className="text-[10px] text-white"
                style={{fontFamily: 'Poppins-Regular'}}>
                Matches Won
              </Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <View
                style={{
                  height: 10,
                  width: 20,
                  backgroundColor: '#e59b0779',
                }}></View>
              <Text
                className="text-[10px] text-white"
                style={{fontFamily: 'Poppins-Regular'}}>
                matches Lost
              </Text>
            </View>
          </View>
        </Row>

        <Row style={{paddingTop: 15}}>
          <View>
            <TouchableOpacity onPress={() => setStateType('badminton')}>
              <Text
                style={{
                  color: '#86D957',
                  fontFamily: 'Inter-Regular',
                  fontSize: 15,
                  padding: 4,
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor:
                    stateType == 'badminton'
                      ? 'rgba(255,255,255,.2)'
                      : 'transparent',
                  borderRadius: 3,
                }}>
                Cricket Ball Stats
              </Text>
            </TouchableOpacity>

            <View
              style={{
                width: 130,
                height: 5,
                backgroundColor:
                  stateType == 'badminton' ? '#86D957' : 'transparent',
                borderRadius: 5,
              }}></View>
          </View>

          <View>
            <TouchableOpacity onPress={() => setStateType('cricket')}>
              <Text
                style={{
                  color: '#86D957',
                  fontFamily: 'Inter-Regular',
                  fontSize: 15,
                  padding: 4,
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor:
                    stateType == 'cricket'
                      ? 'rgba(255,255,255,.2)'
                      : 'transparent',
                  borderRadius: 3,
                  paddingHorizontal: 3,
                }}>
                Tennis Ball Stats
              </Text>
            </TouchableOpacity>

            <View
              style={{
                width: 130,
                height: 5,
                backgroundColor:
                  stateType == 'cricket' ? '#86D957' : 'transparent',
                borderRadius: 5,
              }}></View>
          </View>
        </Row>

        {stateType === 'cricket' ? (
          <Column style={{marginTop: 24}}>
            <LinearGradient
              colors={['#86D957', '#FFFFFF1A']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              className="flex-row flex">
              <Text
                className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[6px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                Format
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                M
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                Inn
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                No
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                Runs
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                HS
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                Avg
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                BF
              </Text>
            </LinearGradient>

            {/* Table Rows */}
            <View className="flex flex-row">
              <Text
                className="flex-1 border-l border-[#86D957] p-3 text-[#fff] text-[6px] bg-[#FFFFFF1A]  text-center"
                style={{fontFamily: 'Poppins-Regular'}}></Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                108
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                183
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                11
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                8416
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                256*
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                48.9
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                15211
              </Text>
            </View>

            {/* Table Rows */}
            {/* #FFFFFF1A */}
            <View className="flex flex-row">
              <Text
                className="flex-1 border-l border-[#86D957] p-3 text-[#86D957] bg-[#FFFFFF1A] text-[6px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                Limited Overs
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#86D957] bg-[#FFFFFF1A] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                SR
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#86D957] bg-[#FFFFFF1A] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                30s
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#86D957] bg-[#FFFFFF1A] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                50s
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#86D957] bg-[#FFFFFF1A] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                100s
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#86D957] bg-[#FFFFFF1A] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                4s
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#86D957] bg-[#FFFFFF1A] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                6s
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#86D957] bg-[#FFFFFF1A] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                Ball Type
              </Text>
            </View>

            {/* Table Rows */}
            <View className="flex flex-row">
              <Text
                className="flex-1 border-b border-l border-[#86D957] p-3 text-[#fff] bg-[#FFFFFF1A] text-center"
                style={{fontFamily: 'Poppins-Regular'}}></Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                55.3
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                28
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                28
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                28
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                1004
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                941
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                4
              </Text>
            </View>
          </Column>
        ) : (
          <Column style={{ marginTop: 24}}>
            <LinearGradient
              colors={['#86D957', '#FFFFFF1A']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              className="flex-row flex">
              <Text
                className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[6px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                Format
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                M
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                Inn
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                No
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                Runs
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                HS
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                Avg
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                BF
              </Text>
            </LinearGradient>

            {/* Table Rows */}
            <View className="flex flex-row">
              <Text
                className="flex-1 border-l border-[#86D957] p-3 text-[#fff] text-[6px] bg-[#FFFFFF1A]  text-center"
                style={{fontFamily: 'Poppins-Regular'}}></Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                108
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                183
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                11
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                8416
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                256*
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                48.9
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#fff] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                15211
              </Text>
            </View>

            {/* Table Rows */}
            {/* #FFFFFF1A */}
            <View className="flex flex-row">
              <Text
                className="flex-1 border-l border-[#86D957] p-3 text-[#86D957] bg-[#FFFFFF1A] text-[6px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                Limited Overs
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#86D957] bg-[#FFFFFF1A] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                SR
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#86D957] bg-[#FFFFFF1A] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                30s
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#86D957] bg-[#FFFFFF1A] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                50s
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#86D957] bg-[#FFFFFF1A] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                100s
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#86D957] bg-[#FFFFFF1A] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                4s
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#86D957] bg-[#FFFFFF1A] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                6s
              </Text>
              <Text
                className="flex-1 border border-[#86D957] p-2 text-[#86D957] bg-[#FFFFFF1A] text-[8px] text-center"
                style={{fontFamily: 'Poppins-Regular'}}>
                Ball Type
              </Text>
            </View>
          </Column>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  Text: {
    color: 'white',
    fontSize: 16,
  },
  table: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'green',
    marginBottom: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'green',
  },
  headerCell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 3,
    fontWeight: 'bold',
    color: 'white',
  },
  cell: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 3,
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default CricketStates;
