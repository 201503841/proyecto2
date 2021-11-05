import { Filter1Sharp, Router } from "@material-ui/icons";

const url_login = "http://localhost:5000/login";
const url_acceso = "http://localhost:5000/login/administrador";
const url_upload = "http://localhost:5000/agregar/aplicante";
const url_archivo = "http://localhost:5000/subirxml";
const url_correo =  "http://localhost:5000/correoapertura";
const url_visualizar =  "http://localhost:5000/visualizarArchivo";
const url_carga =  "http://localhost:5000/cargarinformacion";



export async function nuevousuario(usuario,password){
    return fetch(url_login,{
    method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      } ,
      body: JSON.stringify({
        usuario: usuario,
        password:password
      }),
    });
  }


  export async function login(nombre,password){
    return fetch(url_acceso,{
    method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      } ,
      body: JSON.stringify({
        nombre: nombre,
        password:password
      }),
    });
  }

  export async function archivo(){
    return fetch(url_archivo,{
    method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      } 
    });
  }


  export async function upload(cui,nombres,apellidos,correo,direccion,telefono){
    return fetch(url_upload,{
    method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      } ,
      body: JSON.stringify({
        cui:cui,
        nombres: nombres,
        apellidos:apellidos,
        correo:correo,
        direccion:direccion,
        telefono:telefono,
      }),
    });
  }


  export async function correo(nombres,apellidos,correo){
    return fetch(url_correo,{
    method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      } ,
      body: JSON.stringify({
        nombres: nombres,
        apellidos:apellidos,
        correo:correo,
      }),
    });
  }

  export async function cargaBD(){
    const token = document.cookie.replace('token=','');
    return fetch(url_carga,{
    method: "POST",
        headers: {
         'authorization': token
      } 
    });
  }


  


  export async function mostrardatos(){
    const token = document.cookie.replace('token=','');
    return fetch(url_visualizar,{
    method: "POST",
        headers: {
         'authorization': token
      } 
    });
  }

