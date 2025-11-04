import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [todos, setTodos] = useState([
    { id: "1", text: "Complete online JavaScript course", completed: true },
    { id: "2", text: "Jog around the park 3x", completed: false },
    { id: "3", text: "10 minutes meditation", completed: false },
    { id: "4", text: "Read for 1 hour", completed: false },
    { id: "5", text: "Pick up groceries", completed: false },
    { id: "6", text: "Complete Todo App on Frontend Mentor", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("All");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo,
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const getFilteredTodos = () => {
    if (filter === "Active") {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === "Completed") {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  };

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  const renderTodo = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => toggleTodo(item.id)}
      >
        <View
          style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text
          style={[styles.todoText, item.completed && styles.todoTextCompleted]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <Text style={styles.deleteButton}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#8B5CF6", "#6366F1", "#3B82F6"]}
        style={styles.header}
      >
        <Text style={styles.title}>TODO</Text>
        <Text style={styles.moon}>🌙</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <View style={styles.inputCheckbox} />
          <TextInput
            style={styles.input}
            placeholder="Create a new todo..."
            placeholderTextColor="#9CA3AF"
            value={newTodo}
            onChangeText={setNewTodo}
            onSubmitEditing={addTodo}
          />
        </View>

        <View style={styles.todoList}>
          <FlatList
            data={getFilteredTodos()}
            renderItem={renderTodo}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />

          <View style={styles.footer}>
            <Text style={styles.itemsLeft}>{itemsLeft} items left</Text>
            <TouchableOpacity onPress={clearCompleted}>
              <Text style={styles.clearButton}>Clear Completed</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterContainer}>
            {["All", "Active", "Completed"].map((f) => (
              <TouchableOpacity
                key={f}
                onPress={() => setFilter(f)}
                style={styles.filterButton}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === f && styles.filterTextActive,
                  ]}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.dragText}>Drag and drop to reorder list</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    height: 200,
    paddingHorizontal: 24,
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 12,
  },
  moon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    marginTop: -80,
    paddingHorizontal: 24,
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
  },
  todoList: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  list: {
    maxHeight: 400,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  todoContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxCompleted: {
    backgroundColor: "#8B5CF6",
    borderColor: "#8B5CF6",
  },
  checkmark: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  todoText: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
  },
  todoTextCompleted: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  deleteButton: {
    fontSize: 20,
    color: "#9CA3AF",
    paddingHorizontal: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  itemsLeft: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  clearButton: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterText: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#3B82F6",
  },
  dragText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 48,
  },
});
