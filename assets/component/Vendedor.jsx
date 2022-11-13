import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../Styles/Style';
import { useForm, Controller } from "react-hook-form";
import useVentas from '../hooks/useVentas';

const Vendedor = () => {
  const { vendedores, SetVendedores,
    totalComision, setTotalComision } = useVentas();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      idvend: '',
      nombre: '',
      correo: ''
    }
  });
  const onSubmit = data => {
    console.log(data)
    SetVendedores([...vendedores, data]);

  };
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#fffafa' }}>
        <Text style={{ color: 'black', fontSize: 22, marginBottom: 5, marginTop: 5 }}>
          Bienvenido(a) a la seccion de vendedores</Text>
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
        <Text style={styles.label}>Nombre vendedor</Text>
        <Controller
          control={control}
          rules={{
            required: "Campo obligatorio.",
            maxLength: { value: 100, message: "Se permite maximo 100 letras" },
            minLength: { value: 3, message: "Se permite minimo 3 letras" },
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/, message:
                "Solo se permiten letras",
            },
          }}

          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.inputs, { borderColor: errors.nombre ? 'red' : 'green' }]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Ingrese el nombre del vendedor"
            />
          )}
          name="nombre"
        />
        {errors.nombre && <Text style={{ color: 'red', fontSize: 15 }}>{errors.nombre.message}</Text>}
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
              value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message:
                "El correo no es valido",
            },
          }}

          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.inputs, { borderColor: errors.correo ? 'red' : 'green' }]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Ingrese el correo del vendedor"
            />
          )}
          name="correo"
        />
        {errors.correo && <Text style={{ color: 'red', fontSize: 15 }}>{errors.correo.message}</Text>}
      </View>
      <View>
        <Text style={styles.label}>Total comiciones</Text>
        <TextInput style={styles.pickerStyle} placeholder={totalComision}>
        </TextInput>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.input_flex}>
          <TouchableOpacity
            style={{ backgroundColor: 'green', padding: 10, borderRadius: 10, marginTop: 80, width: 200 }}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>Ingresar vendedor</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.input_flex}>
          <TouchableOpacity
            style={{ backgroundColor: 'green', padding: 10, borderRadius: 10, marginTop: 80, width: 200 }}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>Bucar vendedor</Text>
          </TouchableOpacity>
        </View>
      </View>



    </View>
  )
}

export default Vendedor;