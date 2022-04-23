import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { nanoid } from "nanoid";

const Formulario = () => {
  const [modelo, setModelo] = useState("");
  const [fechaAdquirido, setFechaAdquirido] = useState("");
  const [asientosCuero, setAsientosCuero] = useState(false);
  const [asientosTerceraFila, setAsientosTerceraFila] = useState(false);
  const [sistemaNavegacion, setSistemaNavegacion] = useState(false);
  const [deteccionPuntosCiegos, setDeteccionPuntosCiegos] = useState(false);
  const [traccionRuedas, setTraccionRuedas] = useState(false);
  const [lista, setLista] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("carro").get();
        const array = data.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setLista(array);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  });

  const guardarDatos = async (e) => {
    e.preventDefault();

    if (!modelo.trim()) {
      setError("Campo modelo vacío");
      return;
    }

    if (!fechaAdquirido.trim()) {
      setError("Campo descripción vacío");
      return;
    }
    try {
      const db = firebase.firestore();
      const nuevaFruta = {
        modelo,
        fechaAdquirido: firebase.firestore.Timestamp.fromDate(
          new Date(fechaAdquirido)
        ),
        asientosCuero: JSON.parse(asientosCuero),
        asientosTerceraFila: JSON.parse(asientosTerceraFila),
        deteccionPuntosCiegos: JSON.parse(deteccionPuntosCiegos),
        traccionRuedas: JSON.parse(traccionRuedas),
        sistemaNavegacion: JSON.parse(sistemaNavegacion),
      };
      await db.collection("carro").add(nuevaFruta);
      setLista([
        ...lista,
        {
          id: nanoid(),
          modelo,
          fechaAdquirido: firebase.firestore.Timestamp.fromDate(
            new Date(fechaAdquirido)
          ),
          asientosCuero: JSON.parse(asientosCuero),
          asientosTerceraFila: JSON.parse(asientosTerceraFila),
          deteccionPuntosCiegos: JSON.parse(deteccionPuntosCiegos),
          traccionRuedas: JSON.parse(traccionRuedas),
          sistemaNavegacion: JSON.parse(sistemaNavegacion),
        },
      ]);
    } catch (error) {
      console.log(error);
    }

    cancelar();
  };
  const eliminar = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("carro").doc(id).delete();
      const aux = lista.filter((item) => item.id !== id);
      setLista(aux);
    } catch (error) {
      console.log(error);
    }
  };

  const auxEditar = (item) => {
    setModelo(item.modelo);
    setFechaAdquirido(
      new Date(item.fechaAdquirido.seconds * 1000)
        .toISOString()
        .substring(0, 10)
    );
    setAsientosCuero(item.asientosCuero);
    setAsientosTerceraFila(item.asientosTerceraFila);
    setDeteccionPuntosCiegos(item.deteccionPuntosCiegos);
    setSistemaNavegacion(item.sistemaNavegacion);
    setTraccionRuedas(item.traccionRuedas);
    setModoEdicion(true);
    setId(item.id);
  };

  const editar = async (e) => {
    e.preventDefault();
    if (!modelo.trim()) {
      setError("Campo modelo vacío");
      return;
    }

    if (!fechaAdquirido.trim()) {
      setError("Fecha adquisición vacía");
      return;
    }

    try {
      const db = firebase.firestore();
      await db
        .collection("carro")
        .doc(id)
        .update({
          modelo,
          fechaAdquirido: firebase.firestore.Timestamp.fromDate(
            new Date(fechaAdquirido)
          ),
          asientosCuero: JSON.parse(asientosCuero),
          asientosTerceraFila: JSON.parse(asientosTerceraFila),
          deteccionPuntosCiegos: JSON.parse(deteccionPuntosCiegos),
          traccionRuedas: JSON.parse(traccionRuedas),
          sistemaNavegacion: JSON.parse(sistemaNavegacion),
        });
    } catch (error) {
      console.log(error);
    }
    cancelar();
  };

  const cancelar = () => {
    setModelo("");
    setFechaAdquirido("");
    setAsientosCuero(false);
    setAsientosTerceraFila(false);
    setDeteccionPuntosCiegos(false);
    setSistemaNavegacion(false);
    setTraccionRuedas(false);
    setModoEdicion(false);
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD BÁSICO REACT</h1>
      <hr />
      <div className="row">
        <div className="col-9">
          <h4 className="text-center">Listado de carros</h4>
          <table className="table table bordered">
            <thead>
              <tr>
                <th>Nombre modelo</th>
                <th>Cuenta con asientos de cuero</th>
                <th>Cuenta con asientos en la tercera fila</th>
                <th>Tiene detección de puntos ciegos</th>
                <th>Fecha de adquisición</th>
                <th>Cuenta con sistema de navegación</th>
                <th>Cuenta con tracción en las cuatro ruedas</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((item) => (
                <tr key={item.id}>
                  <td>{item.modelo}</td>
                  <td>{item.asientosCuero ? "Si" : "No"}</td>
                  <td>{item.asientosTerceraFila ? "Si" : "No"}</td>
                  <td>{item.deteccionPuntosCiegos ? "Si" : "No"}</td>
                  <td>
                    {new Date(
                      item.fechaAdquirido.seconds * 1000
                    ).toLocaleDateString()}
                  </td>
                  <td>{item.sistemaNavegacion ? "Si" : "No"}</td>
                  <td>{item.traccionRuedas ? "Si" : "No"}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm float-end"
                      onClick={() => auxEditar(item)}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm float-end mx-2"
                      onClick={() => eliminar(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-3">
          <h4 className="text-center">
            {modoEdicion ? "Editar carros" : "Agregar carros"}
          </h4>
          <form onSubmit={modoEdicion ? editar : guardarDatos}>
            {error ? <span className="text-danger">{error}</span> : null}
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Ingrese modelo"
              onChange={(e) => setModelo(e.target.value)}
              value={modelo}
            />
            <input
              className="form-control mb-2"
              type="date"
              onChange={(e) => setFechaAdquirido(e.target.value)}
              value={fechaAdquirido}
            />
            <label>¿Tiene asientos cuero?</label>
            <select
              className="form-control mb-2"
              onChange={(e) => {
                setAsientosCuero(e.target.selectedOptions[0].value);
              }}
              value={asientosCuero}
            >
              <option value={false}>No</option>
              <option value={true}>Sí</option>
            </select>

            <label>¿Tiene asientos tercera fila?</label>
            <select
              className="form-control mb-2"
              onChange={(e) => {
                setAsientosTerceraFila(e.target.selectedOptions[0].value);
              }}
              value={asientosTerceraFila}
            >
              <option value={false}>No</option>
              <option value={true}>Sí</option>
            </select>

            <label>¿Tiene detección de puntos ciegos?</label>
            <select
              className="form-control mb-2"
              onChange={(e) => {
                setDeteccionPuntosCiegos(e.target.selectedOptions[0].value);
              }}
              value={deteccionPuntosCiegos}
            >
              <option value={false}>No</option>
              <option value={true}>Sí</option>
            </select>

            <label>¿Tiene tracción en las cuatro ruedas?</label>
            <select
              className="form-control mb-2"
              onChange={(e) => {
                setTraccionRuedas(e.target.selectedOptions[0].value);
              }}
              value={traccionRuedas}
            >
              <option value={false}>No</option>
              <option value={true}>Sí</option>
            </select>

            <label>¿Tiene sistema de navegación?</label>
            <select
              className="form-control mb-2"
              onChange={(e) => {
                setSistemaNavegacion(e.target.selectedOptions[0].value);
              }}
              value={sistemaNavegacion}
            >
              <option value={false}>No</option>
              <option value={true}>Sí</option>
            </select>

            {!modoEdicion ? (
              <button className="btn btn-primary btn-block" type="submit">
                Agregar
              </button>
            ) : (
              <>
                <button className="btn btn-warning btn-block" type="submit">
                  Editar
                </button>
                <button
                  className="btn btn-dark btn-block mx-2"
                  onClick={() => cancelar()}
                >
                  Cancelar
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
