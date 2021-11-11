import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useHistory } from "react-router";
import { upload } from "../api/acciones.js"
import { correo } from "../api/acciones.js"
import { setearpuesto } from "api/acciones.js";


import { CardMembershipSharp } from "@material-ui/icons";

export default function Profile() {


  const dpiRef = useRef();
  const nombreRef = useRef();
  const apellidoRef = useRef();
  const correoRef = useRef();
  const direccionRef = useRef();
  const telefonoRef = useRef();
  const [loading, setLoading] = useState(false);

  const [puesto, setPuesto] = React.useState([]);

  let history = useHistory();

  const cambiar = e => {
    history.push('/profile');
  }

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


  async function accion(e) {
    e.preventDefault();
    setLoading(true);

    const puesto = document.getElementById("puesto_calificar").value;

    alert("Hola: " + nombreRef.current.value);

    //SE COMIENZA A CONSUMIR ENDPOINT
    try {
      const rawResponse = await upload(
        dpiRef.current.value,
        nombreRef.current.value,
        apellidoRef.current.value,
        correoRef.current.value,
        direccionRef.current.value,
        telefonoRef.current.value,
        puesto
      );

      console.log(dpiRef.current.value + nombreRef.current.value + apellidoRef.current.value);
      const respuesta = await rawResponse.json();

      console.log(rawResponse);

      if (rawResponse.status === 200) {
        alert("FORMULARIO ENVIADO CORRECTAMENTE")
      } else {
        alert("ALGO OCURRIO MAL")
      }
      console.log(respuesta);

      const enviocorreo = await correo(
        nombreRef.current.value,
        apellidoRef.current.value,
        correoRef.current.value

      );
      console.log(enviocorreo);

      if (enviocorreo.status === 200) {
        alert("SE ENVIO UN MENSAJE A TU CORREO ELECTRONICO FAVOR REVISAR TU BANDEJA")
      } else {
        alert("ALGO OCURRIO MAL")
      }


    } catch (error) {
      console.log(error);
      alert("error")
    }


  }


  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
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
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={require("assets/img/descarga.jpeg").default}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>


                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    FORMULARIO APLICANTE
                  </h3>
                  <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">

                        <div className="rounded-t mb-0 px-4 py-4">
                          <hr className="mt-4 border-b-1 border-blueGray-300" />
                        </div>
                        <div className="flex-auto px-4 lg:px- py-10 pt-0">
                          <form>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-left font-bold mb-2"
                                htmlFor="grid-password" >
                                CUI/DPI
                              </label>
                              <input
                                type="text"
                                ref={dpiRef}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="CUI/DPI" />
                            </div>

                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-left font-bold mb-2"
                                htmlFor="grid-password">
                                NOMBRE
                              </label>
                              <input
                                type="text"
                                ref={nombreRef}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Nombre" />
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-left font-bold mb-2"
                                htmlFor="grid-password">
                                APELLIDO
                              </label>
                              <input
                                type="text"
                                ref={apellidoRef}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Apellido" />
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-left font-bold mb-2"
                                htmlFor="grid-password">
                                CORREO
                              </label>
                              <input
                                type="correo"
                                ref={correoRef}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Correo Electronico" />
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-left font-bold mb-2"
                                htmlFor="grid-password">
                                DIRECCION
                              </label>
                              <input
                                type="text"
                                ref={direccionRef}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Direccion" />
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-left font-bold mb-2"
                                htmlFor="grid-password">
                                TELEFONO
                              </label>
                              <input
                                type="text"
                                ref={telefonoRef}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Telefóno" />
                            </div>
                            <div>
                            <label
                                className="block uppercase text-blueGray-600 text-left font-bold mb-2"
                                htmlFor="grid-password">
                                PUESTO:
                              </label>
                              <select id="puesto_calificar">
                                <option value="N/A">PUESTO</option>
                                {puesto.map((item) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-left font-bold mb-2"
                                htmlFor="grid-password">
                                CV
                              </label>

                              <form action='http://localhost:5000/upload' method="POST" enctype="multipart/form-data">
                                <input type="file" name="file" />
                                <button
                                  className="nav-link d-none d-lg-block"
                                  color="default">

                                  <i className="tim-icons icon-book-bookmark" /> SUBIR CV

                                </button>
                              </form>
                            </div>
                            <div className="text-center mt-6">
                              <button
                                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                type="button"
                                onClick={accion}

                              >
                                ENVIAR
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="flex flex-wrap mt-6 relative">

                      </div>
                    </div>
                  </div>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                    GUATEMALA,GUATEMALA
                  </div>
                  <div className="container mx-auto px-4 h-full">

                  </div>
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
