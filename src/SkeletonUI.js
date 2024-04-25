import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonUI = () => {
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'black', marginVertical: 10}}
      contentContainerStyle={{alignItems: 'center'}}>
      <SkeletonPlaceholder backgroundColor="#1B1B1B" highlightColor="#26282A">
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: 50, height: 50, borderRadius: 50}} />
          <View style={{marginLeft: 20}}>
            <View style={{width: 300, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
            />
          </View>
        </View>
        <View style={{marginTop: 10, marginBottom: 30}}>
          <View style={{height: 30, borderRadius: 4}} />
          <View style={{marginTop: 6, height: 40, borderRadius: 4}} />
          <View style={{marginTop: 6, height: 40, borderRadius: 4}} />
          <View style={{marginTop: 15, height: 200, borderRadius: 4}} />
        </View>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder backgroundColor="#1B1B1B" highlightColor="#26282A">
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: 50, height: 50, borderRadius: 50}} />
          <View style={{marginLeft: 20}}>
            <View style={{width: 300, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
            />
          </View>
        </View>
        <View style={{marginTop: 10, marginBottom: 30}}>
          <View style={{height: 30, borderRadius: 4}} />
          <View style={{marginTop: 6, height: 40, borderRadius: 4}} />
          <View style={{marginTop: 6, height: 40, borderRadius: 4}} />
          <View style={{marginTop: 15, height: 200, borderRadius: 4}} />
        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default SkeletonUI;

const styles = StyleSheet.create({});
