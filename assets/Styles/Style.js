import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputs: {
    textAlign: 'center',
    borderWidth: 3,
    borderColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    width: 200,
    fontSize: 17,
  },
  pickerStyle: {
    textAlign: 'center',
    borderWidth: 3,
    borderColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    width: 200,
    fontSize: 17,
  },
  label: {

    color: 'black',
    fontSize: 16,
  },
  input_flex: {
    marginLeft: 6,
    marginRight: 6
  },
  datosUsuario: {
    marginLeft: 6,
    marginRight: 6,
    fontSize: 15,
    fontWeight: 1,
    padding: 3
  }
});

export { styles };
