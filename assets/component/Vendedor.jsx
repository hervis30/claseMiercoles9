import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { styles } from '../Styles/Style';
import { useForm, Controller } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import useVentas from '../hooks/useVentas';
import axios from 'axios';

const Vendedor = () => {
  const [data, setData] = useState([]);
  const [idven, setIdVen] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [totalComision, setTotalComision] = useState('');
  const [sid, setSid] = useState('');
  const [idCambio, setIdCambio] = useState(false);

  const [prueba, setPrueba] = useState("prueba");
  const [isLoading, setLoading] = useState(true);
  const { vendedores, SetVendedores,
    placeHolder, setPlaceholder } = useVentas();
  
  const check = () => {
    setIdCambio(true);
    getVendedorById(sid);
    console.log("sdf");
}
  
  const getVendedors = async () => {
    
    try {
      const url = `http://192.168.1.7:8500/api/vendedor`;
      const response = await axios.get(url);
      setData(response.data)
      console.log(data)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  };
  const getVendedorById = async (id) => {
    setIdCambio(true)
    try {
      const url = `http://192.168.1.7:8500/api/vendedor/${id}`;
      const response = await axios.get(url);
      console.log(response.data);
      
      if (response.data.nombre != null) {
        setPlaceholder(true);
        setIdVen(response.data.idvend);
        setNombre(response.data.nombre);
        setCorreo(response.data.correo);
        setTotalComision(response.data.totalComision);
      } else {
        alert("Cliente no existe");
        setNombre('');
        // setCorreo('');
        //setTotalComision('');
      }

    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  };
  //agregar vendedor
  const saveVendedor = async (idvend, nombre, correo) => {

    setLoading(true);

    try {
      const response = await axios.post(`http://192.168.1.7:8500/api/vendedor`, {
        idvend,
        nombre,
        correo
      });
      console.log(response)
      alert("Vendedor agregado correctamente ...");
    } catch (error) {
      console.log(error);
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
    reset();
    console.log(data)
    SetVendedores([...vendedores, data]);
    setPlaceholder(false);
    saveVendedor(data.idvend, data.nombre, data.correo);
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#fffafa' }}>
        <Text style={{ color: 'black', fontSize: 22, marginBottom: 5, marginTop: 5 }}>
          Bienvenido(a) a la seccion de vendedores</Text>
      </View>

      <View>
         {/* <TextInput style={styles.inputs}
          placeholder="Ingrese el id del usuario"
          //onChangetex debe ser onChangeText, pq es String
          onChangeText={sid => setSid(sid)}
          value={sid}
        >
        </TextInput>  */}
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
              onChangeText={idCambio ? (sid => setSid(sid) ): onChange}
              value={idCambio ? (`${sid}`) : value}
             // placeholder={placeHolder ? (`${idven}`) : "Ingrese id"}
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
              placeholder={placeHolder ? (`${nombre}`):"Ingrese nombre"}
            />
          )}
          name="nombre"
        />
        {errors.nombre && <Text style={{ color: 'red', fontSize: 15 }}>{errors.nombre.message}</Text>}
      </View>
      <View>
        <Text style={styles.label}>Correo electronico </Text>
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
              placeholder={placeHolder ? (`${correo}`) : "Ingrese correo"}
            ></TextInput>
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
            onPress={() => check()}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>Buscar vendedor</Text>
          </TouchableOpacity>
        </View>


      </View>

      <View style={{}}>
        {isLoading ? <ActivityIndicator size="large" color="green" /> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.buttons, { backgroundColor: item.idvend % 2 == 0 ? 'orange' : 'gray' }]}
                onPress={() => {
                  //alert(item.username);
                  if (confirm(`Esta seguro de borrar el usuario ${item.idvend}   ?`)) {
                    alert("Borrado");
                  }

                }}

              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.idvend},{item.nombre}, {item.correo}, {item.totalComision}</Text>
              </TouchableOpacity>

            )}
          />
        )}
      </View>

    </View>
  )

}
export default Vendedor;
    /* const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);
const [sid, setSid] = useState('');
const [idvend, setIdvend] = useState('');
const [nombre, setNombre] = useState('');
const [correo, setCorreo] = useState('');
const [totalComision, setTotalComision] = useState('');

console.log("corriendo aplicacion");

useEffect(() => {
//getUsers();
}, []);

const getVendedor = async () => {
try {
const url = `http://192.168.1.7:8500/api/vendedor`;
const response = await axios.get(url);
setData(response.data)
console.log(data)
}
catch (error) {
console.log(error)
}
finally {
setLoading(false)
}
};

const getVendedorById = async (id) => {
try {
const url = `http://192.168.1.7:8500/api/vendedor/${id}`;
const response = await axios.get(url);
if (response.data.idvend != null) {
setIdvend(response.data.idvend);
setNombre(response.data.nombre);
setCorreo(response.data.correo);
setTotalComision(response.data.totalComision);
} else {
alert("Vendedor no existe");
setIdvend('');
setNombre('');
setCorreo('');
setTotalComision('');
}

}
catch (error) {
console.log(error)
}
finally {
setLoading(false)
}
};
const saveVendedor = async () => {
if (!idvend.trim() || !nombre.trim() || !correo.trim()) {
alert("Todos los campos son obligatorios..");
return;
}
setLoading(true);
try {
const response = await axios.post(`http://192.168.1.7:8500/api/vendedor`, {
idvend,
nombre,
correo,
totalComision
});
alert("Vendedor agregado correctamente ...")
} catch (error) {
console.log(error)
}
finally {
setLoading(false);
}
};

const updateVendedor = async (id) => {
if (!idvend.trim() || !nombre.trim() || !correo.trim()) {
alert("Todos los campos son obligatorios....");
return;
}
setLoading(true);
try {
const response = await axios.put(`http://192.168.1.7:8500/api/vendedor/${id}`, {
idvend,
nombre,
correo,
totalComision
});
alert("Vendedor actualizado correctamente ...")
} catch (error) {
console.log(error)
}
finally {
setLoading(false);
}
};

const deleteVendedor = async (id) => {
try {
if (confirm("Esta seguro de borrar")) {
const response = await axios.delete(`http://192.168.1.7:8500/api/vendedor/${id}`);
alert("Vendedor Eliminado exitosamente ...")
}
} catch (error) {
console.log(error)
}
finally {
setLoading(false);
}
};
return (

<View style={{ flex: 1, padding: 24 }}>
 

<TextInput style={styles.inputs}
placeholder="Ingrese el id del usuario"
//onChangetex debe ser onChangeText, pq es String
onChangeText={sid => setSid(sid)}
value={sid}

>
</TextInput>
<TextInput style={styles.inputs}
placeholder="Ingrese el idvend"
onChangeText={idvend => setIdvend(idvend)}
value={idvend}
>
</TextInput>
<TextInput style={styles.inputs}
placeholder="Ingrese el nombre"
onChangeText={nombre => setNombre(nombre)}
value={nombre}
>
</TextInput>
<TextInput style={styles.inputs}
placeholder="Ingrese correo"
onChangeText={correo => setCorreo(correo)}
value={correo}
>
</TextInput>
<TextInput style={styles.inputs}
placeholder="Ingrese el total comision"
onChangeText={totalComision => setTotalComision(totalComision)}
value={totalComision}
>
</TextInput>
<TouchableOpacity style={{ backgroundColor: 'blue', marginBottom: 10 }}
onPress={getVendedor}
>
<Text style={{ color: 'white' }}>Vendedores</Text>
</TouchableOpacity>
<TouchableOpacity style={{ backgroundColor: 'blue', marginBottom: 10 }}
onPress={() => getVendedorById(sid)}
>
<Text style={{ color: 'white' }}>Buscar por id</Text>
</TouchableOpacity>
<TouchableOpacity style={{ backgroundColor: 'yellow', marginBottom: 10 }}
onPress={() => saveVendedor()}
>
<Text style={{ color: 'black' }}>Guardar</Text>
</TouchableOpacity>

<TouchableOpacity style={{ backgroundColor: 'green', marginBottom: 10 }}
onPress={() => updateVendedor(sid)}
>
<Text style={{ color: 'black' }}>Actualizar</Text>
</TouchableOpacity>

<TouchableOpacity style={{ backgroundColor: 'red', marginBottom: 10 }}
onPress={() => deleteVendedor(sid)}
>
<Text style={{ color: 'black' }}>Borrar</Text>
</TouchableOpacity>

{isLoading ? <ActivityIndicator size="large" color="red" /> : (
<FlatList
data={data}
keyExtractor={({ id }, index) => id}
renderItem={({ item }) => (
<TouchableOpacity
style={[styles.buttons, { backgroundColor: item.id % 2 == 0 ? 'orange' : 'gray' }]}
onPress={() => {
  //alert(item.username);
  if (confirm(`Esta seguro de borrar el usuario ${item.idvend}   ?`)) {
    alert("Borrado");
  }

}}

>
<Text style={{ color: 'white', fontWeight: 'bold' }}>{item.idvend},{item.nombre}, {item.correo}, {item.totalComision}</Text>
</TouchableOpacity>

)}
/>
)}
</View>
); */

