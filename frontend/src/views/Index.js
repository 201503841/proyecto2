/*eslint-disable*/
import React, { useRef, useState} from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import image from "assets/img/azul.jpeg";
import { setearpuesto } from "api/acciones.js";
import { endpointcalificacion } from "api/acciones.js";
import { datospuesto } from "api/acciones.js";
import { datosbusqueda } from "api/acciones.js";
import imagen1 from '../imagenes/trabajo1.jpg';
import imagen2 from '../imagenes/trabajo2.jpg';
import imagen3 from '../imagenes/trabajo3.png';
import imagen4 from '../imagenes/trabajo4.jpg';
import {

  CarouselItem,
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

import 'bootstrap/dist/css/bootstrap.min.css';


/*
const items = [
  {
    src: imagen1,
    altText: "Slide 1",
    caption: "Desarollador web",
  },
  {
    src: imagen2,
    altText: "Slide 2",
    caption: "Analista de RRHH",
  },
  {
    src: imagen3,
    altText: "Slide 3",
    caption: "Supervisor RRHH",
  },
  {
    src: imagen4,
    altText: "Slide 4",
    caption: "Tecnico",
  },
];

items*/

export default function Index() {
  const plazaRef=useRef();

  const [demoModal, setDemoModal] = React.useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [puesto, setPuesto] = React.useState([]);
  const [vista, setCarrusel] = React.useState([]);
  const [consulta, setDatos] = React.useState([]);

  React.useEffect(() => {
    async function puestos() {
      const pue = await setearpuesto();
      const respuesta = await pue.json();
      return respuesta;
    }
    async function vercarrusel() {
      const puestitos = await datospuesto();
      const respuesta = await puestitos.json();
      return respuesta;
    }

    
    vercarrusel().then((respuesta) => {
      if (respuesta.status === 200) {
        console.log(respuesta.data);
        if (respuesta.data !== undefined) {
          setCarrusel(respuesta.data);
        }

      } else {
        console.log("error al cargar data carrusel puestos")
      }
    })

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


  async function enviarCali(e) {
    e.preventDefault();



    const calificacion = document.getElementById("calificacion").value;
    const puesto = document.getElementById("puesto_calificar").value;

    try {
      const rawResponse = await endpointcalificacion(
        puesto,
        calificacion
      );

      const respuesta = await rawResponse.json();
      console.log(rawResponse);
      if (rawResponse.status === 200) {
        alert("GRACIAS POR CALIFICARNOS TU OPINION ES IMPORTANTE PARA NOSOTROS")
      } else {
        alert("ALGO OCURRIO MAL")
      }
      console.log(respuesta);

    } catch (error) {
      console.log(error);
      alert("error" + error)
    }

  }

  async function cambios(e){

    async function verplaza() {
      const plaza = await datosbusqueda(
        plazaRef.current.value
      );
      const respuesta = await plaza.json();
      console.log(respuesta);
      return respuesta;
      
    }

    verplaza().then((respuesta) => {
      if (respuesta.status === 200) {
        console.log(respuesta.data);
        if (respuesta.data !== undefined) {
          setDatos(respuesta.data);
        }

      } else {
        console.log("error al cargar puestos")
      }
    })
  }


  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex == vista.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);

  }


  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? vista.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);

  }

  const slides = vista.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item[2]} alt={item[1]} width="100%" />
        <CarouselCaption captionText={item[0]} captionHeader={item[1]} />
      </CarouselItem>
    );
  });

  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px" style={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}>
        <div className="container mx-auto items-center flex flex-wrap" >
          <div className="w-full md:w- lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h1 style={{ color: 'white' }}>
                BIENVENIDO A TOTONET
              </h1>


              <h6 style={{ color: 'white' }}>


                Puedes optar por postularte en una de nuestras plazas disponibles aplica entrando en la pagina de postulación que se encuentra
                en la parte inferior y uno de nuestros colaboradores se pondra en contacto contigo para seguir tu proceso.

                No dudes en postularte y ser parte de la familia TOTONET.
              </h6>


            </div>

          </div>

        </div>


      </section>

      <section>
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}

        >
          < CarouselIndicators items={vista} activeIndex={activeIndex} onClickHandler={goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>


        <div>
          <p></p>
          <p></p>
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
                  <i className="fas fa-medal text-xl text-center"></i>
                </div>
                <h3 className="text-3xl font-semibold">CALIFICA NUESTROS PUESTOS</h3>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  En esta seccion puedes darnos tu opinion sobre nuestros puestos disponibles.
                </p>
                <ul className="list-none mt-6">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>

                        <select id="puesto_calificar" className="text-xl text-center font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                          <option value="N/A">PUESTO</option>
                          {puesto.map((item) => {
                            return (
                              <option value={item}>{item}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>

                      </div>
                      <div>
                        <h4 className="text-blueGray-500 text-center">
                          CALIFICACION
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">

                      <div className="flex items-center">
                        <select id="calificacion" className="text-xl text-center font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                          <option value="N/A">calificacion</option>
                          <option value="0">0 ESTRELLA</option>
                          <option value="1">1 ESTRELLA</option>
                          <option value="2">2 ESTRELLAS</option>
                          <option value="3">3 ESTRELLAS</option>
                          <option value="4">4 ESTRELLAS</option>
                          <option value="5">5 ESTRELLAS</option>
                        </select>
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
                          onClick={enviarCali}
                        >
                          CALIFICAR
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
              <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                <i className="fas fa-poll text-xl"></i>
              </div>
              <h2 className="text-4xl font-semibold text-white">
                BUSCADOR DE PLAZAS
              </h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                En esta seccion tienes la opcion de buscar plazas en especifico por medio de un buscador.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap mt-12 justify-center">

            <div className="w-full lg:w-3/12 px-4 text-center">

              <input
                type="text"
                id="plaza"
                ref={plazaRef}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="plaza"
              />
              
              <button
                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                type="button"
                onClick={cambios}
              >
                BUSCAR
              </button>

            </div>

            <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
                <table className="tablesorter" responsive>
                  <thead className="text-primary text-white" >
                    <tr>
                      <th className="header"> NOMBRE PUESTO</th>
                      <th className="header">SALARIO</th>
                      <th className="header">NOMBRE DEPARTAMENTO</th>
                      
                    </tr>
                  </thead>
                  <tbody>

                  {consulta.map((dato) => {
                  return (
                    <tr className="text-blueGray-400">
                      <td>{dato[0]}</td>
                     
                      <td>{dato[1]}</td>
                     
                      <td>{dato[2]}</td>

                    </tr>
                  );
                })}

                  </tbody>
                </table>

              </div>
              

          </div>
        </div>
      </section>
      <section className="pb-16 bg-blueGray-200 relative pt-32">
        <section className="block relative z-1 bg-blueGray-600">

          <div className="container mx-auto"
            style={{
              // backgroundImage: "url(" + image + ")",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }} >
            <div className="justify-center flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4  -mt-24">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-4/12 px-4">
                    <h5 className="text-xl font-semibold pb-4 text-center">
                      Login Page
                    </h5>
                    <Link to="/auth/login">
                      <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                        <img
                          alt="..."
                          className="align-middle border-none max-w-full h-auto rounded-lg"
                          src={require("assets/img/login.jpg").default}
                        />
                      </div>
                    </Link>
                  </div>

                  <div className="w-full lg:w-4/12 px-4">
                    <h5 className="text-xl font-semibold pb-4 text-center" color="white">
                      Postulation Page
                    </h5>
                    <Link to="/profile">
                      <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                        <img
                          alt="..."
                          className="align-middle border-none max-w-full h-auto rounded-lg"
                          src={require("assets/img/formulario.png").default}
                        />
                      </div>
                    </Link>
                  </div>

                  <div className="w-full lg:w-4/12 px-4">
                    <h5 className="text-xl font-semibold pb-4 text-center">
                      Login Page
                    </h5>
                    <Link to="/auth/login">
                      <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                        <img
                          alt="..."
                          className="align-middle border-none max-w-full h-auto rounded-lg"
                          src={require("assets/img/login.jpg").default}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
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






      <Footer />
    </>
  );
}
