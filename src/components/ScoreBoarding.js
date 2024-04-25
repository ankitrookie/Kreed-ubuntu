import LottieView from 'lottie-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {
  Bowled,
  CoughtByModal,
  EndMatch,
  LBW,
  LegByesModal,
  NoBallModal,
  OverThrowModal,
  RoomHeader,
  ScoreBoard,
  Stumped,
  WideBall,
} from '.';

// icons
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {selectRoom} from '../screens/RoomScreen/roomSlice';
import {getRoomScoreAsync, selectRoomScore} from './Badminton/badmintionSlice';
import Byes from './Byes';
import {
  selectBowlerCount,
  selectOverId,
  selectPlayerOverId,
  selectSelectedSingleBowler,
  selectSelectedStrAndNonStr,
  selectTeamScores,
  selectUpdateScoreLoading,
  selectUpdatedScore,
  selectedOpeningBowler,
  teamRunsAsync,
  updatePlayerScoreAsync,
} from './Cricket/cricketSlice';
import HitWicket from './HitWicket';
import RetiredHurt from './RetiredHurt';
import RunOut from './RunOut';
import ChooseBowler from './ChooseBowler';
import ChooseBatsman from './ChooseBatsman';

const runs = ['.', 1, 2, 3, 4, 5];

const DismissalOptions = [
  'Bowled',
  'LBW',
  'Stumped',
  'Hit Wicket',
  'Caught',
  'Run out',
  'Retired Hurt',
];

const BoundaryOptions = ['Four', 'Six'];

const ExtraOptions = ['Wide', 'No-Ball', 'Byes', 'Leg Byes'];

const screenWidth = Dimensions.get('window').width;
const maxButtonsPerRow = 4;

const ScoreBoarding = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectRoom);
  const teamScore = useSelector(selectTeamScores);
  const overId = useSelector(selectOverId);
  const overRequest = useSelector(selectPlayerOverId);
  const getRoomResponse = useSelector(selectRoomScore);
  const updatedScoreData = useSelector(selectUpdatedScore);
  const [runEffectTrigger, setRunEffectTrigger] = useState(false);

  const confettiRef = useRef(null);
  const [data, setData] = useState('');
  const [status, setStatus] = useState(false);
  const openingBowler = useSelector(selectedOpeningBowler);
  const selectedBowler = useSelector(selectSelectedSingleBowler);
  const [isInningOver, setInningOver] = useState(false);

  const selectedUserData = useSelector(selectSelectedStrAndNonStr);

  const runLoading = useSelector(selectUpdateScoreLoading);
  const selectNextBowler = useSelector(selectBowlerCount);

  const buttonWidth = screenWidth / maxButtonsPerRow - 16;

  const fetchRoomScore = async () => {
    try {
      await dispatch(getRoomScoreAsync({roomId: user?.data?.id}));
      setRunEffectTrigger(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoomScore();
  }, [dispatch, runEffectTrigger]);

  const handleRun = item => {
    switch (item) {
      case '.':
        const findStrikerDot = getRoomResponse?.data[0]?.scores[0]?.cricScore;
        let strikerDetailsDot = null;

        for (const player of findStrikerDot) {
          if (player.isStriker) {
            strikerDetailsDot = {
              playerId: player.playerId,
              gameId: player.gameId,
              teamId: player.teamId,
              userId: player.userId,
              ballfaced: 1,
            };
            break;
          }
        }
        dispatch(updatePlayerScoreAsync({playerData: strikerDetailsDot}));
        setRunEffectTrigger(true);
        break;
      case 1:
      case 3:
      case 5:
        const findStrikerOnOne = getRoomResponse?.data[0]?.scores[0]?.cricScore;
        let strikerDetailsOnOne = null;
        let strickerDetails = null;

        for (const player of findStrikerOnOne) {
          if (!player.isOut && player.isStriker) {
            strikerDetailsOnOne = {
              playerId: player.playerId,
              gameId: player.gameId,
              teamId: player.teamId,
              userId: player.userId,
              runs: item,
              isStriker: false,
            };
            break;
          }
        }

        for (const player2 of findStrikerOnOne) {
          if (!player2.isOut && !player2.isStriker) {
            strickerDetails = {
              playerId: player2.playerId,
              gameId: player2.gameId,
              teamId: player2.teamId,
              userId: player2.userId,
              isStriker: true,
            };
            break;
          }
        }

        const wholeTeamScore = {
          roomId: user?.data?.id,
          gameId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.gameId,
          teamId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.teamId,
          runs: item,
        };

        dispatch(updatePlayerScoreAsync({playerData: strikerDetailsOnOne}));
        dispatch(updatePlayerScoreAsync({playerData: strickerDetails}));
        dispatch(teamRunsAsync({teamScore: wholeTeamScore}));
        setRunEffectTrigger(true);
        break;
      case 2:
      case 4:
        const findStriker = getRoomResponse?.data[0]?.scores[0]?.cricScore;
        let strikerDetails = null;

        for (const player of findStriker) {
          if (player.isStriker) {
            strikerDetails = {
              playerId: player.playerId,
              gameId: player.gameId,
              teamId: player.teamId,
              userId: player.userId,
              runs: item,
            };
            break;
          }
        }

        const wholeTeamScor = {
          roomId: user?.data?.id,
          gameId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.gameId,
          teamId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.teamId,
          runs: item,
        };

        dispatch(updatePlayerScoreAsync({playerData: strikerDetails}));
        dispatch(teamRunsAsync({teamScore: wholeTeamScor}));
        setRunEffectTrigger(true);
        break;
      default:
        break;
    }
  };

  const handleBoundary = async item => {
    switch (item) {
      case 'Four':
        const findStriker = getRoomResponse?.data[0]?.scores[0]?.cricScore;
        let strikerDetails = null;

        for (const player of findStriker) {
          if (player.isStriker) {
            strikerDetails = {
              playerId: player.playerId,
              gameId: player.gameId,
              teamId: player.teamId,
              userId: player.userId,
              runs: 4,
            };
            break;
          }
        }

        const wholeTeamScore23 = {
          roomId: user?.data?.id,
          gameId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.gameId,
          teamId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.teamId,
          runs: 4,
        };

        dispatch(updatePlayerScoreAsync({playerData: strikerDetails}));
        dispatch(teamRunsAsync({teamScore: wholeTeamScore23}));
        break;
      case 'Six':
        const findStriker2 = getRoomResponse?.data[0]?.scores[0]?.cricScore;
        let strikerDetails2 = null;

        for (const player of findStriker2) {
          if (player.isStriker) {
            strikerDetails2 = {
              playerId: player.playerId,
              gameId: player.gameId,
              teamId: player.teamId,
              userId: player.userId,
              runs: 6,
            };
            break;
          }
        }
        const wholeTeamScore2 = {
          roomId: user?.data?.id,
          gameId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.gameId,
          teamId: getRoomResponse?.data[0]?.scores[0]?.cricScore[1]?.teamId,
          runs: 6,
        };

        dispatch(updatePlayerScoreAsync({playerData: strikerDetails2}));
        dispatch(teamRunsAsync({teamScore: wholeTeamScore2}));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <View className="flex-1 bg-black">
        {runLoading && (
          <View className="justify-center items-center">
            <Text className="text-[#ffffff83] text-[15px]">
              Updating wait...
            </Text>
          </View>
        )}
        {/* Header */}
        <View className="p-4">
          <RoomHeader route={user?.data?.roomname} showConfirmation={true} />
        </View>

        {/* ScoreBoard */}
        <View>
          <ScoreBoard />
        </View>

        {openingBowler?.status && (
          <>
            <View className="flex-row justify-center items-center">
              <Text
                className="text-[#5eff00] border-b-[#5eff00] border-b text-[15px] p-1"
                style={{fontFamily: 'Inter-Regular'}}>
                Live ScoreBoarding
              </Text>
            </View>

            <View className="p-4">
              <Text className="text-[12px] text-white p-2">Runs</Text>
              <View className="flex-row justify-between items-center">
                {runs.map(item => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => handleRun(item)}
                    className="border border-[#86d957] rounded-full items-center justify-center w-7 h-7">
                    <Text style={{fontSize: 12, color: 'white'}}>{item}</Text>
                  </TouchableOpacity>
                ))}

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#86d957',
                    borderRadius: 8,
                    alignItems: 'center',
                    padding: 6,
                    position: 'relative',
                  }}
                  onPress={() => {
                    setData('throw');
                    setStatus(true);
                  }}>
                  <Ionicons name="tennisball" size={20} color="#ED4C5C" />
                  <Text
                    style={{
                      fontSize: 8,
                      color: 'white',
                      textAlign: 'center',
                      marginLeft: 5,
                    }}>
                    Overthrow
                  </Text>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      bottom: -10,
                      right: 0,
                      backgroundColor: '#86D957',
                      borderRadius: 10,
                    }}>
                    <AntDesign name="plus" size={16} color="#fff" />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              <Text className="text-[12px] text-white p-2">Dismissal</Text>
              <View className="flex-row flex-wrap">
                {DismissalOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`border border-[#86d957] rounded-md py-2 m-1`}
                    style={{width: buttonWidth}}
                    onPress={() => {
                      setData(option), setStatus(true);
                    }}>
                    <Text
                      className="text-[12px] text-white text-center"
                      style={{fontFamily: 'Inter-Regular'}}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text
                className="text-[12px] text-white p-2"
                onPress={() => setData('boundary')}>
                Boundary
              </Text>
              <View className="flex-row flex-wrap">
                {BoundaryOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`border border-[#86d957] rounded-md py-2 m-1`}
                    style={{width: buttonWidth}}
                    onPress={() => handleBoundary(option)}>
                    <Text
                      className="text-[12px] text-white text-center"
                      style={{fontFamily: 'Inter-Regular'}}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text className="text-[12px] text-white p-2">Extra</Text>
              <View className="flex-row flex-wrap">
                {ExtraOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`border border-[#86d957] rounded-md py-2 m-1`}
                    style={{width: buttonWidth}}
                    onPress={() => {
                      setData(option), setStatus(true);
                    }}>
                    <Text
                      className="text-[12px] text-white text-center"
                      style={{fontFamily: 'Inter-Regular'}}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <TouchableOpacity
              style={styles.StartGameButton}
              onPress={() => {
                if (isInningOver === false) {
                  setInningOver(true);
                } else {
                  setStatus(true);
                  setData('EndMatch');
                }
              }}>
              <LinearGradient
                colors={['#63A140', '#111C0B']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                className="rounded-[10px] px-10 py-3 w-[100%] items-center">
                <Text
                  className="text-[15px] text-white font-bold"
                  style={{fontFamily: 'Inter-Regular'}}>
                  {isInningOver ? 'End Match' : 'Innings Over'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {selectedUserData === null ? (
              showMessage({
                message: 'Please select a player first!',
                type: 'info',
                floating: true,
              })
            ) : (
              <Modal animationType="slide" transparent={true} visible={status}>
                <TouchableWithoutFeedback onPress={() => setStatus(false)}>
                  <View
                    style={{backgroundColor: 'rgba(0,0,0,.6)', flex: 1}}></View>
                </TouchableWithoutFeedback>
                <View>
                  {data === 'throw' ? (
                    <OverThrowModal
                      setModal={setStatus}
                      setRunEffectTrigger={setRunEffectTrigger}
                      setData={setData}
                    />
                  ) : data === 'Stumped' ? (
                    <Stumped
                      setModal={setStatus}
                      setRunEffectTrigger={setRunEffectTrigger}
                    />
                  ) : data === 'Leg Byes' ? (
                    <LegByesModal
                      setModal={setStatus}
                      setRunEffectTrigger={setRunEffectTrigger}
                      setData={setData}
                    />
                  ) : data === 'No-Ball' ? (
                    <NoBallModal
                      setModal={setStatus}
                      setRunEffectTrigger={setRunEffectTrigger}
                      setData={setData}
                    />
                  ) : data === 'Wide' ? (
                    <WideBall
                      setModal={setStatus}
                      setRunEffectTrigger={setRunEffectTrigger}
                      setData={setData}
                    />
                  ) : data === 'Caught' ? (
                    <CoughtByModal
                      setModal={setStatus}
                      setRunEffectTrigger={setRunEffectTrigger}
                    />
                  ) : data === 'EndMatch' ? (
                    <EndMatch
                      setStatus={setStatus}
                      setRunEffectTrigger={setRunEffectTrigger}
                    />
                  ) : data === 'Bowled' ? (
                    <Bowled
                      setModal={setStatus}
                      setRunEffectTrigger={setRunEffectTrigger}
                    />
                  ) : data === 'LBW' ? (
                    <LBW
                      setModal={setStatus}
                      setRunEffectTrigger={setRunEffectTrigger}
                    />
                  ) : data === 'Hit Wicket' ? (
                    <HitWicket
                      setModal={setStatus}
                      setRunEffectTrigger={setRunEffectTrigger}
                    />
                  ) : data === 'Retired Hurt' ? (
                    <RetiredHurt
                      setModal={setStatus}
                      setRunEffectTrigger={setRunEffectTrigger}
                    />
                  ) : data === 'Byes' ? (
                    <Byes
                      setModal={setStatus}
                      setRunEffectTrigger={setRunEffectTrigger}
                      setData={setData}
                    />
                  ) : data === 'Run out' ? (
                    <RunOut
                      setModal={setStatus}
                      setRunEffectTrigger={setRunEffectTrigger}
                      setData={setData}
                    />
                  ) : data === 'ChooseBatsman' ? (
                    <ChooseBatsman />
                  ) : data === 'ChooseBowler' ? (
                    <ChooseBowler />
                  ) : null}
                </View>
                {data !== 'EndMatch' &&
                  data !== 'Bowled' &&
                  data !== 'LBW' &&
                  data !== 'Caught' &&
                  data !== 'Retired Hurt' &&
                  data !== 'Run out' &&
                  data !== 'ChooseBatsman' && (
                    <TouchableWithoutFeedback onPress={() => setStatus(false)}>
                      <View
                        style={{
                          backgroundColor: 'rgba(0,0,0,.6)',
                          flex: 1,
                        }}></View>
                    </TouchableWithoutFeedback>
                  )}
              </Modal>
            )}
            <LottieView
              ref={confettiRef}
              loop={false}
              autoPlay={false}
              source={require('../assets/confetti/confetti.json')}
              style={styles.lottie}
            />
          </>
        )}
      </View>
    </>
  );
};

export default ScoreBoarding;

const styles = StyleSheet.create({
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    pointerEvents: 'none',
  },
  CategoryHeading: {
    color: 'white',
    marginLeft: 10,
    marginTop: 10,
  },
  RunCircle: {
    borderColor: '#86D957',
    borderWidth: 1,
    borderRadius: 25,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  RunCircleText: {
    color: 'white',
  },
  Button: {
    borderColor: '#86D957',
    borderWidth: 1,
    borderRadius: 10,
    width: 83,
    paddingVertical: 7,
    alignItems: 'center',
    margin: 5,
    marginHorizontal: '1.21%',
  },
  ButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  StartGameButton: {
    backgroundColor: '#436A2E',
    alignItems: 'center',
    borderRadius: 15,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  StartGameButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  LinearGradientStartGameButtonButton: {
    padding: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%',
    borderRadius: 15,
  },
});

// score id as an -> scoreId
