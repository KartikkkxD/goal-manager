import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSaveGoal = () => {
    if (!inputText.trim()) return;
    
    if (editingId) {
      setGoals(goals.map(g => g.id === editingId ? { ...g, text: inputText } : g));
      setEditingId(null);
    } else {
      setGoals([...goals, { id: Date.now().toString(), text: inputText, done: false }]);
    }
    setInputText('');
  };

  const toggleDone = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const startEdit = (goal) => {
    setEditingId(goal.id);
    setInputText(goal.text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goal Manager</Text>
      
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Enter a goal" 
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title={editingId ? "Update" : "Add"} onPress={handleSaveGoal} />
      </View>

      <FlatList 
        data={goals}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <TouchableOpacity onPress={() => toggleDone(item.id)} style={styles.textContainer}>
              <Text style={[styles.goalText, item.done && styles.doneText]}>
                {item.text} {item.done ? '(Done)' : ''}
              </Text>
            </TouchableOpacity>
            <View style={styles.actions}>
              <View style={styles.buttonWrapper}>
                <Button title="Edit" onPress={() => startEdit(item)} />
              </View>
              <View style={styles.buttonWrapper}>
                <Button title="Delete" color="#ff5c5c" onPress={() => deleteGoal(item.id)} />
              </View>
            </View>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  goalItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  goalText: {
    fontSize: 16,
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
  },
  buttonWrapper: {
    marginLeft: 5,
  }
});
