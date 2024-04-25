import * as React from 'react';
import {useCallback, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import Video from 'react-native-video';

import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';

import Reanimated, {useSharedValue} from 'react-native-reanimated';
import {
  CONTENT_SPACING,
  SAFE_AREA_PADDING,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from './Constants';

import {PressableOpacity} from 'react-native-pressable-opacity';
import {CaptureButton} from './Views/CaptureButton';

// icons
import {
  ArrowPathIcon,
  CameraIcon,
  VideoCameraIcon,
  CheckIcon,
  XMarkIcon,
} from 'react-native-heroicons/outline';
import {useDispatch, useSelector} from 'react-redux';
import {selectMometsloading, updateMomentsAsync} from '../../components/Cricket/cricketSlice';
import {selectRoom} from '../RoomScreen/roomSlice';
import {useAuthStore} from '../../store/useAuthStore';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const BUTTON_SIZE = 40;

const CameraPage = ({navigation}) => {
  const dispatch = useDispatch();
  const userId = useAuthStore(state => state.user);
  console.log('userId', userId.user.id);
  const roomId = useSelector(selectRoom);
  console.log('roomId', roomId.data.id);
  const loading = useSelector(selectMometsloading)
  const camera = useRef(null);
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [video, setVideo] = useState();
  const [image, setImage] = useState();
  console.log("image from camera page", image);
  const isPressingButton = useSharedValue(false);
  const [recordedTime, setRecordedTime] = useState(0);
  const [cameraMode, setCameraMode] = useState('photo');

  const [cameraPosition, setCameraPosition] = useState('back');

  const device = useCameraDevice(cameraPosition, {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });

  const [targetFps, setTargetFps] = useState(60);

  const toggleCameraMode = () => {
    setCameraMode(prevMode => (prevMode === 'photo' ? 'video' : 'photo'));
  };

  const screenAspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  const format = useCameraFormat(device, [
    {fps: targetFps},
    {videoAspectRatio: screenAspectRatio},
    {videoResolution: 'max'},
    {photoAspectRatio: screenAspectRatio},
    {photoResolution: 'max'},
  ]);

  //#region Callbacks
  const setIsPressingButton = useCallback(
    _isPressingButton => {
      isPressingButton.value = _isPressingButton;
    },
    [isPressingButton],
  );
  // Camera callbacks
  const onError = useCallback(error => {
    console.error(error);
  }, []);

  const onInitialized = useCallback(() => {
    console.log('Camera initialized!');
    setIsCameraInitialized(true);
  }, []);

  const onMediaCaptured = useCallback((media, type) => {
    if (type === 'photo') {
      setImage(media.path);
    } else {
      setVideo(media.path);
    }
  }, []);

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  }, []);

  const handleSave = async () => {
    const momentsData = {
      roomId: roomId?.data?.id,
      userId: userId?.user?.id,
      images: image,
      videos: video,
    };
    console.log(momentsData);

    const response = await dispatch(updateMomentsAsync({momentsData}));
    if (response.payload.status) {
      console.log('moments successfully captured!');
      setVideo('')
      setImage('')
    }
  };

  // if we have clicked image or video after this is for preview
  if (image || video) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#081122]">
        {loading && <Text className="text-white text-[14px]">Saving wait...</Text>} 
        {video ? (
          <Video
            style={styles.video}
            source={{uri: `file://${video}`}}
            resizeMode="cover"
            isLooping
            paused={false}
            repeat={true}
          />
        ) : (
          <Image
            source={{uri: `file://${image}`}}
            style={{flex: 1, width: '100%'}}
          />
        )}
        <View className="flex-row w-full justify-between items-center p-6">
          <TouchableOpacity
            onPress={() => {
              setVideo(undefined), setImage(undefined);
            }}>
            <XMarkIcon size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <CheckIcon size={30} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // this is the inital return for CameraPage funtion
  return (
    <View style={styles.container}>
      {device != null && (
        <Reanimated.View style={StyleSheet.absoluteFill}>
          <ReanimatedCamera
            ref={camera}
            style={StyleSheet.absoluteFill}
            format={format}
            device={device}
            isActive={true}
            onInitialized={onInitialized}
            onError={onError}
            enableZoomGesture={false}
            enableFpsGraph={true}
            orientation="portrait"
            photo={true}
            video={true}
            audio={true}
          />
        </Reanimated.View>
      )}

      <CaptureButton
        style={styles.captureButton}
        camera={camera}
        onMediaCaptured={onMediaCaptured}
        enabled={isCameraInitialized}
        setIsPressingButton={setIsPressingButton}
        cameraMode={cameraMode}
      />

      <View style={styles.rightButtonRow}>
        <PressableOpacity
          style={styles.button}
          onPress={onFlipCameraPressed}
          disabledOpacity={0.4}>
          <ArrowPathIcon color="white" size={24} />
        </PressableOpacity>
        {/* Toggle button for camera mode */}
        <PressableOpacity style={styles.button} onPress={toggleCameraMode}>
          {cameraMode === 'photo' ? (
            <VideoCameraIcon color="#fff" size={25} />
          ) : (
            <CameraIcon color="#fff" size={25} />
          )}
        </PressableOpacity>
      </View>

      <View style={styles.recordedTimeContainer}>
        <Text style={styles.recordedTimeText}>
          {cameraMode === 'video' ? 'Video Mode' : 'Photo Mode'}
        </Text>
      </View>
    </View>
  );
};

export default CameraPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SAFE_AREA_PADDING.paddingBottom,
  },
  button: {
    marginBottom: CONTENT_SPACING,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: SAFE_AREA_PADDING.paddingRight,
    top: SAFE_AREA_PADDING.paddingTop,
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recordedTimeContainer: {
    position: 'absolute',
    left: SAFE_AREA_PADDING.paddingLeft,
    top: SAFE_AREA_PADDING.paddingTop,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  recordedTimeText: {
    color: '#fff',
    fontSize: 16,
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
