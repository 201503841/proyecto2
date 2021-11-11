import { Filter1Sharp, Router } from "@material-ui/icons";

const url_login = "http://localhost:5000/login";
const url_acceso = "http://localhost:5000/login/administrador";
const url_revisor = "http://localhost:5000/login/revisor";
const url_aplicante = "http://localhost:5000/login/aplicante";
const url_coordinador = "http://localhost:5000/login/coordinador";
const url_upload = "http://localhost:5000/agregar/aplicante";
const url_archivo = "http://localhost:5000/subirxml";
const url_correo =  "http://localhost:5000/correoapertura";
const url_visualizar =  "http://localhost:5000/visualizarArchivo";
const url_carga =  "http://localhost:5000/cargarinformacion";
const url_usuario = "http://localhost:5000/agregar/usuario";
const verusuario="http://localhost:5000/consultar";
const token2="http://localhost:5000/tokenrefresco";
const url_delete = "http://localhost:5000/eliminar/usuario";
const url_editar = "http://localhost:5000/editar/usuario";
const verpuesto = "http://localhost:5000/obtener/puestos";
const estrellas ="http://localhost:5000/agregar/calificacion";
const carrusel ="http://localhost:5000/obtener/carrusel";
const tabla ="http://localhost:5000/obtener/plaza";
const veraplicante = "http://localhost:5000/obtener/aplicante";
const veraplirevisor="http://localhost:5000/aplicante/revisor";
const buscarusuariorol="http://localhost:5000/filtro/usuario";


export async function filtrobuscar(rol){
  return fetch(buscarusuariorol,{
    method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      } ,
      body: JSON.stringify({
        rol: rol
      }),
    });
}

export async function tablausuario(){
  return fetch(verusuario,{
    method:"GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    } 
  });
}

export async function tablaplicante(){
  return fetch(veraplicante,{
    method:"GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    } 
  });
}


export async function tablarevisor(){
  return fetch(veraplirevisor,{
    method:"GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    } 
  });
}


export async function tablaplanilla(){
  return fetch(veraplicante,{
    method:"GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    } 
  });
}

export async function datospuesto(){
  return fetch(carrusel,{
    method:"GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    } 
  });
}

export async function datosbusqueda(puesto){
  return fetch(tabla,{
  method: "POST",
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    } ,
    body: JSON.stringify({
      puesto: puesto
    }),
  });
}


export async function setearpuesto(){
  return fetch(verpuesto,{
    method:"GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    } 
  });
}


export async function endpointcalificacion(puesto,calificacion){
  return fetch(estrellas,{
  method: "POST",
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    } ,
    body: JSON.stringify({
      puesto: puesto,
      calificacion:calificacion
    }),
  });
}

export async function buscar_usuario_rol(rol){
  return fetch(buscarusuariorol,{
    method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      } ,
      body: JSON.stringify({
        ROL: rol
      }),
    });
}

export async function nuevousuario(usuario,password){
  const token = document.cookie.replace('token=','');
    return fetch(url_login,{
    method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'authorization': token

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


  export async function loginrevisor(nombre,password){
    return fetch(url_revisor,{
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

  export async function logincoordinador(nombre,password){
    return fetch(url_coordinador,{
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

  export async function loginaplicante(nombre,password){
    return fetch(url_aplicante,{
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


  export async function upload(cui,nombres,apellidos,correo,direccion,telefono,puesto){
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
        cv: ".files/postulantes/"+nombres+apellidos,
        puesto: puesto
      }),
    });
  }


  export async function addUser(nombre,password,rol){
    const token = document.cookie.replace('token=','');
    return fetch(url_usuario,{
    method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'authorization': token
      } ,
      body: JSON.stringify({
        nombre:nombre,
        password: password,
        rol:rol
      }),
    });
  }


  export async function editarUser(idusuario,nombre,password,rol){
    const token = document.cookie.replace('token=','');
    return fetch(url_editar,{
    method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'authorization': token
      } ,
      body: JSON.stringify({
        idusuario:idusuario,
        nombre:nombre,
        password: password,
        rol:rol,
      }),
    });
  }


  export async function borrarUsuario(nombre,fecha_fin){
    const token = document.cookie.replace('token=','');
    return fetch(url_delete,{
    method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'authorization': token
      } ,
      body: JSON.stringify({
        nombre:nombre,
        fecha_fin: fecha_fin
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



  export async function generar2(){
    return fetch(token2,{
      method: "POST",
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        } 
      });
  }

