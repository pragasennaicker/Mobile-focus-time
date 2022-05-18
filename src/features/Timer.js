import React, { useState } from 'react';
import {View, StyleSheet, Text, Platform, Vibration} from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';
import { Countdown } from '../components/CountDown';
import { RoundedButton } from '../components/RoundedButton'
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown 
        minutes={minutes}
        isPaused={!isStarted} 
        onProgress={setProgress} 
        onEnd={onEnd} 
        />
        <View style={{ paddingTop: spacing.xxl}}>
          <Text style={styles.title}>Focusing on: </Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm}}>
        <ProgressBar 
        progress={progress}
        color={colors.progressBar}
        style={{height: spacing.sm}}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && (
        <RoundedButton title="start" onPress={() => setIsStarted(true)}/>
        )}
        {isStarted && (
        <RoundedButton title="pause" onPress={() => setIsStarted(false)}/>
        )}
      </View>
      <View style={styles.clearWrapper}>
        <RoundedButton size={50} title="reset" onPress={clearSubject} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    paddingTop: spacing.xxl,
    flexDirection: 'row'
  },
  buttonWrapper: {
    flex: 0.3, 
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    fontWeight: "bold",
    textAlign: 'center'
  },
  task: {
    textAlign: 'center'
  }
})