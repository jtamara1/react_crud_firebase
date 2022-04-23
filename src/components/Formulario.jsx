import React from 'react'
import {firebase} from '../firebase'
import {nanoid} from 'nanoid'

const Formulario = () =>{
    const[fruta, setFruta] = React.useState('')
    const [descripcion, setDescripcion ] = React.useState('')
    const [lista, setLista] = React.useState([])
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [id, setId] = React.useState('')
    const [error, setError] = React.useState(null)

    React.useEffect(()=>{
        const obtenerDatos = async () =>{
            try{
                const db = firebase.firestore()
                const data = await db.collection('frutas').get()
                const array = data.docs.map(item =>(
                    {
                        id:item.id, ...item.data()
                    }
                ))
                setLista(array)

            }catch(error){
                console.log(error)
            }
        }
        obtenerDatos()

    })

    const guardarDatos = async (e) =>{
        e.preventDefault()

        if(!fruta.trim()){
            setError('Campo fruta vacío')
            return
        }

        if(!descripcion.trim()){
            setError('Campo descripción vacío')
            return
        }
        try{
            const db = firebase.firestore()
            const nuevaFruta = {
                nombreFruta:fruta,
                nombreDescripcion:descripcion
            }
            await db.collection('frutas').add(nuevaFruta)
            setLista([...lista,
                {id:nanoid(), nombreFruta: fruta, nombreDescripcion: descripcion}
            ])
        }catch(error){
            console.log(error)
        }

        setModoEdicion(false)
        setFruta('')
        setDescripcion('')
        setError(null)
        
    }

    const eliminar= async (id) =>{
        try{
            const db = firebase.firestore()
            await db.collection('frutas').doc(id).delete()
            const aux = lista.filter(item => item.id !== id)
            setLista(aux)
        }catch(error){
            console.log(error)
        }
    }

    const auxEditar = (item) =>{
        setFruta(item.nombreFruta)
        setDescripcion(item.nombreDescripcion)
        setModoEdicion(true)
        setId(item.id)
    }

    const editar = async e =>{
        e.preventDefault()
        if(!fruta.trim()){
            setError('Campo fruta vacío')
            return
        }

        if(!descripcion.trim()){
            setError('Campo descripción vacío')
            return
        }
        try{
            const db= firebase.firestore()
            await db.collection('frutas').doc(id).update({
                nombreFruta:fruta,
                nombreDescripcion:descripcion
            })

           
        }catch(error){
            console.log(error)
        }
        setFruta('')
        setDescripcion('')
        setModoEdicion(false)
        setError(null)

    }

    const cancelar =()=>{
        setFruta('')
        setDescripcion('')
        setModoEdicion(false)
        setError(null)
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>CRUD BÁSICO REACT</h1>
            <hr/>
            <div className='row'>
                <div className="col-8">
                    <h4 className="text-center">Listado de frutas</h4>
                    <ul className="list-group">
                    {
                        lista.map((item)=>(
                            <li className='list-group-item' key={item.id}>
                                <span className='lead'>{item.nombreFruta} - {item.nombreDescripcion}</span>
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> eliminar(item.id)}>Eliminar</button>
                                <button className='btn btn-warning btn-sm float-end' onClick={()=> auxEditar(item)}>editar</button>
                            </li>
                        ))
                    }
                    </ul>
                </div>
                <div className="col-4">
                    <h4 className="text-center">
                    {
                        modoEdicion ? 'Editar Frutas': 'Agregar Frutas'
                    }</h4>
                    <form onSubmit={modoEdicion ? editar: guardarDatos}>
                        {
                            error ? <span className='text-danger'>{error}</span> : null
                        }
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese Frutra'
                            onChange={(e)=>setFruta(e.target.value)}
                            value = {fruta}
                        />
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese Descripción'
                            onChange={(e)=>setDescripcion(e.target.value)}
                            value = {descripcion}
                        />{
                            !modoEdicion? (
                                <button className='btn btn-primary btn-block' type='submit'>Agregar</button>
                            )
                            :
                            (  <>
                                <button className='btn btn-warning btn-block' type='submit'>Editar</button>
                                <button className='btn btn-dark btn-block mx-2' onClick={() => cancelar()}>Cancelar</button>
                                </>
                            )
                        }
                                              
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario
