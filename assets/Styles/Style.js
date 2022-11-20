import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputs: {
    textAlign: "center",
    borderWidth: 3,
    borderColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    width: 200,
    fontSize: 17,
    backgroundColor: "#eeeeee",
  },
  pickerStyle: {
    textAlign: "center",
    borderWidth: 3,
    borderColor: "#eeeeee",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    width: 200,
    fontSize: 17,
    backgroundColor: "#eeeeee",
  },
  label: {
    color: "black",
    fontSize: 16,
  },
  input_flex: {
    marginLeft: 6,
    marginRight: 6,
  },
  datosUsuario: {
    marginLeft: 6,
    marginRight: 6,
    fontSize: 15,
    fontWeight: 1,
    padding: 3,
  },
});

export { styles };
