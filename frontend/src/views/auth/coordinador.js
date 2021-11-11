
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

//este




import { useHistory } from "react-router";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { tablaplicante } from "api/acciones.js";
import { tablaplanilla } from "api/acciones.js";

import CardTable from "components/Cards/CardTable.js";

import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function Coordinador() {

  const [usuarios, setAplicante] = React.useState([]);

  const [datos, setPlanilla] = React.useState([]);
  async function Veraplicantes(e) {

    async function datoaplicante() {
      const usuario = await tablaplicante();
      const respuesta = await usuario.json();
      return respuesta;
    }

    datoaplicante().then((respuesta) => {
      if (respuesta.status === 200) {
        console.log(respuesta.data);
        setAplicante(respuesta.data);
      } else {
        console.log("no se llego a los datos del aplicante")
      }
    })

  }

  async function Verplanilla(e) {

    async function datoplanilla() {
      const usuario = await tablaplanilla();
      const respuesta = await usuario.json();
      return respuesta;
    }

    datoplanilla().then((respuesta) => {
      if (respuesta.status === 200) {
        console.log(respuesta.data);
        setPlanilla(respuesta.data);
      } else {
        console.log("no se llego a los datos del aplicante")
      }
    })

  }

  const [loading, setLoading] = useState(false);

  let history = useHistory();

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
                    BIENVENIDO COORDINADOR.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    EN ESTA SECCION PODRAS OBSERVAR EL LISTADO DE APLICANTES EXISTENTES, PODRAS ACEPTAR O RECHAZAR ASI COMO VER ASOCIAR Y ELIMINAR.
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
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                    <i className="fas fa-rocket text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">VISUALIZACION DE APLICANTES</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    En esta sección se mostraran todos los aplicantes a los puestos.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
                            <table className="tablesorter" responsive>
                              <thead className="text-lightBlue-600" >
                                <tr>
                                  <th className="header">CUI</th>
                                  <th className="header">NOMBRES</th>
                                  <th className="header">APELLIDOS</th>
                                  <th className="header">CORREO</th>
                                  <th className="header">DIRECCION</th>
                                  <th className="header">TELEFONO</th>
                                  <th className="header">CV</th>
                                  <th className="header">ESTADO</th>
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

                                      <td>{usuario[6]}</td>

                                      <td>{usuario[7]}</td>
                                    </tr>
                                  );
                                })}

                              </tbody>
                            </table>

                          </div>
                        </div>
                        <div>
                          <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={Veraplicantes}
                          >
                            VISUALIZAR
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
                  VISUALIZACION DE PLANILLA
                </h2>

              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">

              <button
                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                type="button"
                onClick={Verplanilla}

              >
                VER PLANILLA
              </button>

              <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
                <table className="tablesorter" responsive>
                  <thead className="text-primary text-white" >
                    <tr>
                      <th className="header"> ID</th>
                      <th className="header">CUI</th>
                      <th className="header">NOMBRE</th>
                      <th className="header">APELLIDO</th>
                      <th className="header">CORREO</th>
                      <th className="header">TELEFONO</th>
                      <th className="header">ESTADO</th>
                    </tr>
                  </thead>
                  <tbody>
                              
                  {datos.map((usuario) => {
                                  return (
                                    <tr className="text-blueGray-400">
                                      <td>{usuario[0]}</td>

                                      <td>{usuario[1]}</td>

                                      <td>{usuario[2]}</td>

                                      <td>{usuario[3]}</td>

                                      <td>{usuario[4]}</td>

                                      <td>{usuario[5]}</td>

                                      <td>{usuario[6]}</td>

                                      <td>{usuario[7]}</td>
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
                  <select id="rolesregistro" >
                    <option value="N/A">Seleccionar Rol</option>
                    <option value="administrador">ADMINISTRADOR</option>
                    <option value="coordinador">COORDINADOR</option>
                    <option value="revisor">REVISOR</option>
                    <option value="reclutador">RECLUTADOR</option>
                    <option value="aplicante">APLICANTE</option>
                  </select>
                </div>


                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="contraseña"
                  >
                    Puesto
                  </label>

                </div>


                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"

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

                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="formtao dd/mm/aa"
                  />
                </div>
                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"

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
                  <select id="roles" >
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

