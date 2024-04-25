import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import PieChart from 'react-native-pie-chart';
import * as Progress from 'react-native-progress';

// React Native Chart Kit
import { ProgressChart } from 'react-native-chart-kit';
import { useAuthStore } from '../store/useAuthStore';
import { Column, Row } from '../ui';

const BadmintonStates = () => {
  const [percentage, setPercentage] = useState(0);
  const user = useAuthStore(state => state.user);
  const widthAndHeight = 100;
  const series = [22, 27];
  const sliceColor = ['#fbd203', 'aqua'];
  const labels = ['22', '27'];

  const data = {
    data: [0.4],
  };

  useEffect(() => {
    setPercentage((data.data[0] * 100).toFixed(2) + '%');
  }, [data]);

  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 140, 27, ${opacity})`,
    useShadowColorFromDataset: false,
  };

  return (
    <View>
      <View className="flex-1 mb-4">
        <Column
          style={{
            marginTop: 24,
          }}>
          <View className="space-y-4">
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity>
                <Image
                  source={require('../assets/images/badminton2.png')}
                  className="h-[24px] w-[24px]"
                />
              </TouchableOpacity>
              <Text
                className="text-[#fff] text-[16px] font-normal"
                style={{fontFamily: 'Poppins-Regular'}}>
                {user?.user?.badminton}
              </Text>
            </View>
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity>
                <Image
                  source={require('../assets/images/hand.png')}
                  className="h-[24px] w-[24px]"
                />
              </TouchableOpacity>
              <Text
                className="text-[#fff] text-[16px] font-normal"
                style={{fontFamily: 'Poppins-Regular'}}>
                Grip: {user?.user?.grip}
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
                {user?.user?.addPlayingBadminton}
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
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[10px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              Category
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[10px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              Match Played
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[10px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              Match Won
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[10px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              Won%
            </Text>
          </LinearGradient>

          {/* Table Rows */}
          <View className="flex flex-row">
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#FFF176] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              Singles
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              10
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              5
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              50%
            </Text>
          </View>

          <View className="flex flex-row">
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#19B5B6] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              Doubles
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              15
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              8
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              53.33%
            </Text>
          </View>

          <View className="flex flex-row">
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#E1980C] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              Total
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              20
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              12
            </Text>
            <Text
              className="flex-1 border border-[#86D957] p-3 text-[#fff] text-[12px] text-center"
              style={{fontFamily: 'Poppins-Regular'}}>
              60%
            </Text>
          </View>
        </Column>

        <Row
          style={{
            paddingTop: 15,
          }}>
          <View className="space-y-1">
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              labels={labels}
              coverFill={'#FFF'}
            />
            <Text
              className="text-[10px] text-white"
              style={{fontFamily: 'Poppins-Regular'}}>
              Test Match Played
            </Text>
            <View className="flex-row items-center space-x-2">
              <View
                style={{
                  height: 10,
                  width: 20,
                  backgroundColor: '#fbd203',
                }}></View>
              <Text
                className="text-[10px] text-white"
                style={{fontFamily: 'Poppins-Regular'}}>
                Singles
              </Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <View
                style={{
                  height: 10,
                  width: 20,
                  backgroundColor: 'aqua',
                }}></View>
              <Text
                className="text-[10px] text-white"
                style={{fontFamily: 'Poppins-Regular'}}>
                Doubles
              </Text>
            </View>
          </View>

          <View className="space-y-1">
            <ProgressChart
              data={data}
              width={110}
              height={110}
              strokeWidth={10}
              radius={50}
              chartConfig={chartConfig}
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
              Test Match Played
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
                Singles
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
                Doubles
              </Text>
            </View>
          </View>
        </Row>

        <View className="space-y-4">
          <Text
            className="text-[#FFFFFF] text-[12px]"
            style={{fontFamily: 'Poppins-Regular'}}>
            Win percentage in Singles
          </Text>
          <View>
            <Progress.Bar
              progress={0.3}
              width={null}
              color="#86eded"
              height={8}
              backgroundColor="#FFFFFF21"
            />
          </View>
          <Text
            className="text-[#FFFFFF] text-[12px]"
            style={{fontFamily: 'Poppins-Regular'}}>
            Win percentage in Doubles
          </Text>
          <View>
            <Progress.Bar
              progress={0.5}
              width={null}
              color="#fe5981"
              height={8}
              backgroundColor="#FFFFFF21"
            />
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Text: {
    color: 'white',
    fontSize: 16,
  },
  table: {
    backgroundColor: '[#86D957]',
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
    paddingHorizontal: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  cell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: 'white',
  },
});

export default BadmintonStates;
