import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Button, TouchableOpacity, TextInput, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DATA =[
  {
    id: "1",
    title: "Mediation",
    completed: false,
  },
  {
    id: "2",
    title: "Coding",
    completed: false,
  },
  {
    id: "3",
    title: "Journaling",
    completed: false,
  }
]

export default function App() {
  const [items, setItems] = useState(DATA);
  const [text, setText] = useState("");
  const [isModalVisible, setModal] = useState(false);

  const addNewTodo = () => {
    let newTodo = {
      id: items.length + 1,
      title: text,
      completed: false
    }

    setItems([...items, newTodo]);
    setText("");
    setModal(false);
  }

  const markItemCompleted = (item) => {
    const itemIndex = items.findIndex(currItem => item.id === currItem.id);

    if (itemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[itemIndex] = {...items[itemIndex], completed: true};
      setItems(updatedItems);
    }
  }

  const TodoItem = (props) => (
    <TouchableOpacity style={styles.item} onPress={() => markItemCompleted(props.item)}>
      <Text style={props.item.completed ? styles.itemTextCompleted : styles.itemText}> {props.item.title} </Text>
    </TouchableOpacity>
  )

  const renderAddButton =() => {
    return (
      <TouchableOpacity onPress={() => setModal(true)}>
        <View style={styles.icon}>
          <Ionicons name='add' size={35} color="black"/>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={isModalVisible} transparent={true} onRequestClose={() => setModal(!isModalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput style={styles.input} onChangeText={setText} value={text}/>
            <Button title="Add todo item" onPress={addNewTodo}/>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
      <FlatList
        style={styles.list}
        data={items}
        renderItem={({item}) => <TodoItem item={item}/>}
        keyExtractor={item => item.id}
        ListFooterComponent={renderAddButton}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderWidth:1,
    padding: 10,
    borderColor:'gray',
  },
  list: {
    alignSelf:'stretch',
  },
  item: {
    backgroundColor: '#6DB6DD',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:10,
  },
  itemText: {
    color: 'white'
  },
  itemTextCompleted: {
    color: 'white',
    textDecorationLine: 'line-through',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor:'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    backgroundColor:'white',
    borderRadius: '100%',
    padding: 10,
    margin: 5,
    shadowColor:'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
});
