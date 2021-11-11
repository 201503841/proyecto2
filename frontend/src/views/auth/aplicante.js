import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

//este



import { useHistory } from "react-router";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";


export default function Aplicante() {
  



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
                    BIENVENIDO APLICANTE.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    EN ESTA SECCION PUEDES CORREGIR, VERIFICAR TUS DATOS PERSONALES Y CARGAR LOS DOCUMENTOS DE LOS REQUISITOS SOLICITADOS PARA EL PUESTO.
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
                  <h3 className="text-3xl font-semibold">REVISION DE EXPEDIENTE</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    En esta seccion puedes revisar tus datos personales.
                  </p>
                 
                </div>
              </div>
              <div className="container mx-auto px-4">
            
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
              <div className="flex-auto p-5 lg:p-10">
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
                  <select id = "rolesregistro" >
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
                  <h3 className="text-3xl font-semibold">CORRECCION DE EXPEDIENTE</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    Podras ver que requisitos fueron rechazados y aceptados
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
                  <select id = "rolesregistro" >
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
       
       
      </main>
      <Footer />
    </>
  );
}

