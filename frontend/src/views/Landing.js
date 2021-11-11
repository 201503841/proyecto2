
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { mostrardatos } from "api/acciones.js"
import { cargaBD } from "api/acciones.js";
//este
import { borrarUsuario } from "api/acciones.js";
import { setearpuesto } from "api/acciones.js";

import { addUser } from "api/acciones.js";
import { tablausuario } from "api/acciones.js";

import { useHistory } from "react-router";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { editarUser } from "api/acciones.js";

export default function Landing() {
  

  const nombreRef = useRef();
  const passwordRef = useRef();
  const Eliminarusuario = useRef();
  const fechafRef =useRef();
  const rolRef = useRef();
  const idRef= useRef();
  const nombreEditado = useRef();
  const contrasenaEditada= useRef();

  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = React.useState([]);
  const [puesto, setPuesto] = React.useState([]);

  let history = useHistory();


  React.useEffect(() => {
    async function puestos() {
      const pue = await setearpuesto();
      const respuesta = await pue.json();
      return respuesta;
    }

    puestos().then((respuesta) => {
      if (respuesta.status === 200) {
        console.log(respuesta.data);
        if (respuesta.data !== undefined) {
          setPuesto(respuesta.data);
        }

      } else {
        console.log("error al cargar puestos")
      }
    })

  }, []);
  /*React.useEffect(() => {
    async function datosusuario(){
      const usuario=await tablausuario();
      const respuesta=await usuario.json();
      return respuesta;
    }

    datosusuario().then((respuesta)=>{
      if(respuesta.status===200){
        console.log(respuesta.data);
        setUsuarios(respuesta.data);
      }else{
        console.log("no se llego a los datos del usuario")
      }
    })
  });*/



  async function editarUsuario(e) {
    e.preventDefault();
    setLoading(true);

    const roleditar = document.getElementById("roles").value;

    try {
      const rawResponse = await editarUser(
        idRef.current.value,
        nombreEditado.current.value,
        contrasenaEditada.current.value,
        roleditar
      ).then(res => res.json())
      .then((data) => {
        console.log(data);
        if (data["msg"] === "No autorizado") {
          alert("Tu sesion esta caducada porfavor iniciar sesión de nuevo");
          history.push('refrescarpag');
        } else{
          alert("USUARIO EDITADO CORRECTAMENTE")
          history.push('landing');
        }
      });
      console.log(rawResponse);
    } catch (error) {
      console.log(error);
      alert("error")
    }
  }

  async function deleteUser(e) {
    e.preventDefault();
    setLoading(true);


    try {


      const rawResponse = await borrarUsuario(

        Eliminarusuario.current.value,
        fechafRef.current.value
      ).then(res => res.json())
      .then((data) => {
        console.log(data);
        if (data["msg"] === "No autorizado") {
          alert("Tu sesion esta caducada porfavor iniciar sesión de nuevo");
          history.push('refrescarpag');
        } else{
          alert("USUARIO BORRADO CORRECTAMENTE")
        }
      });
      console.log(rawResponse);

    } catch (error) {
      console.log(error);
      alert("error")
    }

  }

  async function newUser(e) {
    e.preventDefault();
    setLoading(true);
    const rolRegistrado = document.getElementById("rolesregistro").value;
    const puesto =  document.getElementById("puesto").value;

    try {
      const rawResponse = await addUser(
        nombreRef.current.value,
        passwordRef.current.value,
        rolRegistrado,
        puesto
      ).then(res => res.json())
      .then((data) => {
        console.log(data);
        if (data["msg"] === "No autorizado") {
          alert("Tu sesion esta caducada porfavor iniciar sesión de nuevo");
          history.push('refrescarpag');
        } else{
          alert("USUARIO CREADO CORRECTAMENTE")
        }
      });
      console.log(rawResponse);
    } catch (error) {
      console.log(error);
      alert("error")
    }

  }
  

  async function cargardatos(e) {
    try {
      const rawResponse = await cargaBD(
      ).then(res => res.json())
        .then((data) => {
          console.log(data);
          if (data["msg"] === "No autorizado") {
            alert("Tu sesion esta caducada porfavor iniciar sesión de nuevo");
            history.push('refrescarpag');

          }
        });
      return (rawResponse);
    } catch (error) {
      console.log(error);
    }
  }
  async function VerUsuarios(e) {

    async function datosusuario(){
      const usuario=await tablausuario();
      const respuesta=await usuario.json();
      return respuesta;
    }

    datosusuario().then((respuesta)=>{
      if(respuesta.status===200){
        console.log(respuesta.data);
        setUsuarios(respuesta.data);
      }else{
        console.log("no se llego a los datos del usuario")
      }
    })

  }

  async function visualizar(e) {
    var imprimir = "";

    //SE COMIENZA A CONSUMIR ENDPOINT
    try {
      const rawResponse = await mostrardatos(
      ).then(res => res.json())
        .then((data) => {
          imprimir = data["msg"];
          if (data["msg"] === "No autorizado") {
            alert("Tu sesion esta caducada porfavor iniciar sesión de nuevo");
            history.push('refrescarpag');
          } else {
            document.getElementById('seccion').value = imprimir;
          }
          console.log(rawResponse);
        });


    } catch (error) {
      console.log(error);
      //alert("error" + error)
    }

  }
  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    BIENVENIDO ADMINISTRADOR.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    EN ESTA SECCION PUEDES CARGAR TODOS LOS PUESTOS, DEPARTAMENTOS, CATEGORIAS, REQUISITOS DE LOS PUESTOS DISPONIBLES MEDIANTE UN ARCHIVO XML, TAMBIEN PUEDES OBSERVAR LOS USUARIOS QUE EXISTEN, TANTO COMO ELIMINARLOS COMO EDITARLOS.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>



        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <h3 className="text-3xl font-semibold">Cargar XML</h3>
                <form action='http://localhost:5000/cargamasiva' method="POST" enctype="multipart/form-data">
                  <input type="file" name="file" />
                  <button
                    className="nav-link d-none d-lg-block"
                    color="default">
                    <i className="tim-icons icon-book-bookmark" /> SUBIR XML
                  </button>
                </form>
                <h3 className="text-3xl font-semibold">VISUALIZAR XML</h3>
                <button
                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  onClick={visualizar}
                >
                  VISUALIZAR
                </button>
                <textarea name="seccion" id="seccion" cols="40" rows="28"> </textarea>

              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                    <i className="fas fa-rocket text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">CARGA MASIVA</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    En esta seccion puedes subir un archivo XML y cargar la información correspondiente.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            DEPARTAMENTOS
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fab fa-html5"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            PUESTOS
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="far fa-paper-plane"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            CATEGORIAS
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                        </div>
                        <div>
                          <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={cargardatos}
                          >
                            CARGAR INFORMACION A BASE DE DATOS
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="pb-20 relative block bg-blueGray-800">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  ADMINISTRACION DE USUARIOS
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                  EN ESTA SECCION PODRAS REVISAR TODO LO RELACIONADO CON LOS USUARIOS.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-medal text-xl"></i>
                </div>
                <h6 className="text-xl mt-5 font-semibold text-white">
                  VER USUARIOS
                </h6>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={VerUsuarios}
                          >
                            VER USUARIOS
                          </button>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-poll text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  CREAR USUARIOS
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>

              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  ELIMINAR USUARIOS
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-poll text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  EDITAR USUARIOS
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <table className="tablesorter" responsive>
              <thead className="text-primary text-white" >
                <tr>
                 <th className="header"> ID USUARIO</th>
                  <th className="header">USERNAME</th>
                  <th className="header">PASSWORD</th>
                  <th className="header">ESTADO</th>
                  <th className="header">FECHA</th>
                  <th className="header">ROL</th>
                </tr>
              </thead>
              <tbody>

                {usuarios.map((usuario) => {
                  return (
                    <tr className="text-blueGray-400">
                      <td>{usuario[0]}</td>
                     
                      <td>{usuario[1]}</td>
                     
                      <td>{usuario[2]}</td>
                  
                      <td>{usuario[3]}</td>
                   
                      <td>{usuario[4]}</td>

                      <td>{usuario[5]}</td>
                    </tr>
                  );
                })}

              </tbody>
            </table>

          </div>
            </div>
          </div>
        </section>
        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">

              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                    <i className="fas fa-poll text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">CREAR USUARIO</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    Creación de nuevos usuarios
                  </p>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
              <div className="flex-auto p-5 lg:p-10">
                <h4 className="text-2xl font-semibold">
                  REGISTRO DE USUARIO
                </h4>
                <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                  Complete este formulario para registrar un nuevo usuario.
                </p>
                <div className="relative w-full mb-3 mt-8">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="full-name"
                  >
                    Nombre Usuario
                  </label>
                  <input
                    type="text"
                    ref={nombreRef}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="username"
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="contraseña"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    ref={passwordRef}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="contraseña"
                  />
                </div>
              
                
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="contraseña"
                  >
                    rol
                  </label>
                  <select id = "rolesregistro" >
                            <option value="N/A">Seleccionar Rol</option>
                            <option value="administrador">ADMINISTRADOR</option>
                            <option value="coordinador">COORDINADOR</option>
                            <option value="revisor">REVISOR</option>
                            <option value="reclutador">RECLUTADOR</option>
                </select>
                </div>


                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="contraseña"
                  >
                    Puesto
                  </label>
                  <select id="puesto">
                          <option value="N/A">PUESTO</option>
                          {puesto.map((item) => {
                            return (
                              <option value={item}>{item}</option>
                            );
                          })}
                        </select>
                </div>
                

                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={newUser}
                  >
                    Crear Usuario
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div
                className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
                style={{ transform: "translateZ(0)" }}
              >
                <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="text-blueGray-800 fill-current"
                    points="2560 0 2560 100 0 100"
                  ></polygon>
                </svg>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  ELIMINAR USUARIOS
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  En esta seccion debera ingresar el nombre de usuario que desea eliminar.
                </p>
              </div>
            </div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
              <div className="flex-auto p-5 lg:p-10">
                <h4 className="text-2xl font-semibold">
                  ELIMINACION DE USUARIO
                </h4>
                <div className="relative w-full mb-3 mt-8">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="full-name"
                  >
                    Nombre Usuario
                  </label>
                  <input
                    type="text"
                    ref={Eliminarusuario}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="username"
                  />
                </div>
                <div>
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="full-name"
                  >
                    Fecha en la que se dio de baja al usuario
                  </label>
                  <input
                    type="text"
                    ref={fechafRef}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="formtao dd/mm/aa"
                  />
                </div>
                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={deleteUser}
                  >
                    Eliminar usuario
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">

              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                    <i className="fas fa-poll text-xl items-center"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">EDITAR USUARIO </h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    En esta seccion debera ingresar el username del usuario a editar y la contraseña que desea editar.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
              <div className="flex-auto p-5 lg:p-10">
                <h4 className="text-2xl font-semibold">
                  EDITAR USUARIO
                </h4>
                <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                  Ingrese el id el usuario a editar
                </p>
                <div className="relative w-full mb-3 mt-8">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="full-name"
                  >
                    IDUSUARIO
                  </label>
                  <input
                    type="text"
                    ref={idRef}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="username"
                  />
                </div>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  Coloque los datos a editar.
                </p>
                <div className="relative w-full mb-3 mt-8">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="full-name"
                  >
                    Nombre Usuario
                  </label>
                  <input
                    type="text"
                    ref={nombreEditado}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="username"
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="contraseña"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    ref={contrasenaEditada}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="contraseña"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="contraseña"
                  >
                    rol
                  </label>
                  <select id = "roles" >
                            <option value="N/A">Seleccionar Rol</option>
                            <option value="administrador">ADMINISTRADOR</option>
                            <option value="coordinador">COORDINADOR</option>
                            <option value="revisor">REVISOR</option>
                            <option value="reclutador">RECLUTADOR</option>
                            <option value="aplicante">APLICANTE</option>
                </select>
                </div>
                
                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={editarUsuario}
                  >
                    Editar Usuario
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

