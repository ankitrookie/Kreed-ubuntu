import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    PanGestureHandler,
    State,
    TapGestureHandler,
} from 'react-native-gesture-handler';
import Reanimated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { CAPTURE_BUTTON_SIZE, SCREEN_WIDTH } from '../Constants';

const PAN_GESTURE_HANDLER_FAIL_X = [-SCREEN_WIDTH, SCREEN_WIDTH];
const PAN_GESTURE_HANDLER_ACTIVE_Y = [-2, 2];

const _CaptureButton = ({
  camera,
  onMediaCaptured,
  enabled,
  setIsPressingButton,
  cameraMode,
  style,
  ...props
}) => {
  const isPressingButton = useSharedValue(false);
  const isRecording = useRef(false);

  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');
      console.log('Taking photo...');
      const photo = await camera.current.takePhoto({
        photoCodec: 'jpeg',
        qualityPrioritization: 'speed',
        quality: 90,
        enableShutterSound: false,
      });
      onMediaCaptured(photo, 'photo');
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, [camera, onMediaCaptured]);

  // strt recoding video
  const startRecording = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');
      console.log('Start recording...');
      await camera.current.startRecording({
        onRecordingFinished: (video) => {
          console.log('Recording finished:', video);
          onMediaCaptured(video, 'video');
        },
        onRecordingError: (error) => console.error('Recording error:', error),
      });
      isRecording.current = true;
    } catch (error) {
      console.error('Failed to start recording!', error);
    }
  }, [camera, onMediaCaptured]);

  // in second click stop recoding
  const stopRecording = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');
      console.log('Stop recording...');
      await camera.current.stopRecording();
      isRecording.current = false;
    } catch (error) {
      console.error('Failed to stop recording!', error);
    }
  }, [camera]);

  const toggleRecording = useCallback(async () => {
    if (isRecording.current) {
      await stopRecording();
    } else {
      await startRecording();
    }
  }, [startRecording, stopRecording]);

  // thi is the entire state shange, from begening to end, when this state we are performing our photo and video taking
  const onHandlerStateChanged = useCallback(
    async ({ nativeEvent: event }) => {
      console.debug(`state: ${Object.keys(State)[event.state]}`);
      switch (event.state) {
        case State.BEGAN: {
          isPressingButton.value = true;

          if (cameraMode === 'photo') {
            await takePhoto();
          }

          if (cameraMode === 'video') {
            await toggleRecording();
          }

          setIsPressingButton(true);
          return;
        }
        case State.END:
        case State.FAILED:
        case State.CANCELLED: {
          isPressingButton.value = false;
          setIsPressingButton(false);
          return;
        }
        default:
          break;
      }
    },
    [isPressingButton, setIsPressingButton, takePhoto, cameraMode, toggleRecording]
  );

  const shadowStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: withSpring(isPressingButton.value ? 1 : 0, {
            mass: 1,
            damping: 35,
            stiffness: 300,
          }),
        },
      ],
    }),
    [isPressingButton]
  );

  const buttonStyle = useAnimatedStyle(() => {
    let scale;
    if (enabled) {
      if (isPressingButton.value) {
        scale = withRepeat(
          withSpring(1, {
            stiffness: 100,
            damping: 1000,
          }),
          -1,
          true
        );
      } else {
        scale = withSpring(0.9, {
          stiffness: 500,
          damping: 300,
        });
      }
    } else {
      scale = withSpring(0.6, {
        stiffness: 500,
        damping: 300,
      });
    }

    return {
      opacity: withTiming(enabled ? 1 : 0.3, {
        duration: 100,
        easing: Easing.linear,
      }),
      transform: [
        {
          scale: scale,
        },
      ],
    };
  }, [enabled, isPressingButton]);

  return (
    <TapGestureHandler
      enabled={enabled}
      onHandlerStateChange={onHandlerStateChanged}>
      <Reanimated.View {...props} style={[buttonStyle, style]}>
        <PanGestureHandler
          enabled={enabled}
          failOffsetX={PAN_GESTURE_HANDLER_FAIL_X}
          activeOffsetY={PAN_GESTURE_HANDLER_ACTIVE_Y}>
          <Reanimated.View style={styles.flex}>
            {/* // this is for red button animation under when we start video */}
            <Reanimated.View style={[styles.shadow, shadowStyle]} />
            <View style={styles.button} />
          </Reanimated.View>
        </PanGestureHandler>
      </Reanimated.View>
    </TapGestureHandler>
  );
};

export const CaptureButton = React.memo(_CaptureButton);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  shadow: {
    position: 'absolute',
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    backgroundColor: '#e34077',
  },
  button: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: CAPTURE_BUTTON_SIZE * 0.1,
    borderColor: 'white',
  },
});
