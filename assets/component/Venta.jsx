import { View, Text, TextInput, TouchableOpacity, Picker } from 'react-native'
import { styles } from '../Styles/Style';
import { useForm, Controller } from "react-hook-form";
import { useState } from 'react';
import useVentas from '../hooks/useVentas';

const Venta = () => {
  //aqui se importaran los componentes
  //const { } = useVentas();
  const [zona, setZona] = useState("norte");
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      idvend: '',
      fecha: '',
      valorVenta: ''
    }
  });
  const onSubmit = data => console.log(data);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#fffafa' }}>
        <Text style={{ color: 'black', fontSize: 22, marginBottom: 5, marginTop: 5 }}>
          Bienvenido(a) a la seccion de: </Text>
          <Text style={{ color: 'black', fontSize: 22, marginBottom: 5, marginTop: 5 }}>
          Ventas</Text>
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
              value: /^[0-9]*$/, message:
                "Solo se permiten numeros",
            },
          }}

          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.inputs, { borderColor: errors.idvend ? 'red' : 'green' }]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Ingrese identificacion"
            />
          )}
          name="idvend"
        />
        {errors.idvend && <Text style={{ color: 'red', fontSize: 15 }}>{errors.idvend.message}</Text>}
      </View>

      <View>
        <Text style={styles.label}>Fecha de la venta</Text>
        <Controller
          control={control}
          rules={{
            required: "El fecha es obligatoria.",
            pattern: {
              value: /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/, message:
                "Formato mm/dd/yy o m/dyyyy ",
            },
          }}

          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.inputs, { borderColor: errors.fecha ? 'red' : 'green' }]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Ingrese MM/DD/YYYY"
            />
          )}
          name="fecha"
        />
        {errors.fecha && <Text style={{ color: 'red', fontSize: 15 }}>{errors.fecha.message}</Text>}
      </View>
      
      <View>
        <Text style={styles.label}>Valor de la venta</Text>
        <Controller
          control={control}
          rules={{
            required: "El valor de la venta es obligatorio.",
            max: { value: 1000000000, message: "Se permite maximo 1000 millones" },
            min: { value: 2000000, message: "Se permite minimo 2 millones" },
            pattern: {
              value: /^[0-9]*$/, message:
                "Solo se permiten numeros",
            },
          }}

          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.inputs, { borderColor: errors.valorVenta ? 'red' : 'green' }]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Ingrese saldo"
            />
          )}
          name="valorVenta"
        />
        {errors.valorVenta && <Text style={{ color: 'red', fontSize: 15 }}>{errors.valorVenta.message}</Text>}
      </View>
      <View>
        <Text style={styles.label}>Seleccione zona</Text>
        <Picker
          selectedValue={zona}
          style={styles.pickerStyle}
          onValueChange={(itemValue, itemIndex) => setZona(itemValue)}
        >
          <Picker.Item label="Norte" value="norte" />
          <Picker.Item label="Sur" value="sur" />
        </Picker>
      </View>
      <View>
        <TouchableOpacity
          style={{ backgroundColor: 'green', padding: 10, borderRadius: 10, marginTop: 80, width: 200 }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>Agregar venta</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

export default Venta;