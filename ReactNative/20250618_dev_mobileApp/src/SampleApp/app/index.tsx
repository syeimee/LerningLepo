import React, { useState } from 'react';
import {StyleSheet,Text,TouchableOpacity,View,Modal,} from 'react-native';

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tapCount, setCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [rate, setRate] = useState<string | number>(0);

  const tapped = () => {
    const now = Date.now();

    if (tapCount === 0) {
      setStartTime(now);
    }

    const newCount = tapCount + 1;
    setCount(newCount);

    if (newCount >= 10) {
      const elapsedSec = (now - (startTime ?? now)) / 1000;
      setRate((10 / elapsedSec).toFixed(2));

      setIsModalVisible(true);
      setCount(0);
      setStartTime(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>10回連打でモーダルが開きます！</Text>
      <Text style={styles.counter}>回数：{tapCount}回</Text>

      <TouchableOpacity onPress={tapped} style={styles.openButton}>
        <Text style={styles.openButtonText}>連打</Text>
      </TouchableOpacity>

      <Modal transparent visible={isModalVisible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>おめでとう🎉</Text>
            <Text style={styles.modalTitle}>君は世界一の連打王だ！</Text>
            <Text style={styles.modalTitle}>1秒あたり {rate} 回の連打！</Text>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>閉じる</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// スタイル定義
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  counter: {
    fontSize: 18,
    marginBottom: 20,
  },
  openButton: {
    backgroundColor: '#e60012',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
  },
  openButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 16,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 12,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default App;