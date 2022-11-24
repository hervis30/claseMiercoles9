import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { styles } from '../Styles/Style';
import { useForm, Controller } from "react-hook-form";
import { useState } from 'react';
import useVentas from '../hooks/useVentas';

const Vendedor = () => {
  let buscar = () => {
    console.log(arreglo.idvend);
    setPlaceholder(true);
  }
  const [prueba, setPrueba] = useState("prueba");
  const [isLoading, setLoading] = useState(true);
  const [arreglo, setArreglo] = useState([]);
  const { vendedores, SetVendedores,
    totalComision, setTotalComision,
    placeHolder, setPlaceholder } = useVentas();

  //agregar vendedor
  const saveCustumer = async () => {
    const { idvend, nombre, correo } = arreglo;
    setLoading(true);
    try {
      const response = await axios.post(`http://10.2.5.189:3000/api/clientes`, {
        idvend,
        nombre,
        correo
      });
      alert("Vendedor agregado correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };


  const { control, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      idvend: '',
      nombre: '',
      correo: ''
    },
  });
  const onSubmit = data => {
    //reset();
    console.log(data)
    SetVendedores([...vendedores, data]);
    setArreglo(data);
    setPlaceholder(false);
    saveCustumer();

  };
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#fffafa" }}>
        <Text
          style={{
            color: "black",
            fontSize: 22,
            marginBottom: 5,
            marginTop: 5,
          }}
        >
          Bienvenido(a) a la seccion de vendedores
        </Text>
      </View>

      <View>
        <Text style={styles.label}>Identificacion del vendedor</Text>
        <Controller
          control={control}
          rules={{
            required: "La identificacion es obligatoria.",
            maxLength: { value: 15, message: "Se permite maximo 12 numeros" },
            minLength: { value: 3, message: "Se permite minimo 3 numeros" },
            pattern: {
              value: /^[0-9]*$/,
              message: "Solo se permiten numeros",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.inputs,
                { borderColor: errors.idvend ? "#df5b5b" : "#eeeeee" },
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder=""
            />
          )}
          name="idvend"
        />
        {errors.idvend && (
          <Text style={{ color: "red", fontSize: 15 }}>
            {errors.idvend.message}
          </Text>
        )}
      </View>
      <View>
        <Text style={styles.label}>Nombre vendedor</Text>
        <Controller
          control={control}
          rules={{
            required: "Campo obligatorio.",
            maxLength: { value: 100, message: "Se permite maximo 100 letras" },
            minLength: { value: 3, message: "Se permite minimo 3 letras" },
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
              message: "Solo se permiten letras",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.inputs,
                { borderColor: errors.nombre ? "#df5b5b" : "#eeeeee" },
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={
                placeHolder ? `${prueba}` : ""
              }
            />
          )}
          name="nombre"
        />
        {errors.nombre && (
          <Text style={{ color: "red", fontSize: 15 }}>
            {errors.nombre.message}
          </Text>
        )}
      </View>
      <View>
        <Text style={styles.label}>Correo electronico</Text>
        <Controller
          control={control}
          rules={{
            required: "Campo obligatorio.",
            maxLength: { value: 50, message: "Se permite maximo 50 letras" },
            minLength: { value: 6, message: "Se permite minimo 6  caracteres" },
            pattern: {
              value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
              message: "El correo no es valido",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.inputs,
                { borderColor: errors.correo ? "#df5b5b" : "#eeeeee" },
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder=""
            />
          )}
          name="correo"
        />
        {errors.correo && (
          <Text style={{ color: "red", fontSize: 15 }}>
            {errors.correo.message}
          </Text>
        )}
      </View>
      <View>
        <Text style={styles.label}>Total comiciones</Text>
        <TextInput
          style={styles.pickerStyle}
          placeholder={totalComision}
        ></TextInput>
      </View>

      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.input_flex}>
          <TouchableOpacity
            style={{
              backgroundColor: "#eeeeee",
              padding: 10,
              borderRadius: 20,
              marginTop: 15,
              width: 150,
            }}
            onPress={handleSubmit(onSubmit)}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 23,
              }}
            >
              Agregar
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.input_flex}>
          <TouchableOpacity
            style={{
              backgroundColor: "#eeeeee",
              padding: 10,
              borderRadius: 20,
              marginTop: 15,
              width: 150,
            }}
            onPress={() => buscar()}
          >
            <Text style={{ color: "black", textAlign: "center", fontSize: 23 }}>
              Buscar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Vendedor;