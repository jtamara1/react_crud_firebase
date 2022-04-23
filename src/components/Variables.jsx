

const Variables = () => {
const saludo = "Hola Mundo"
const imagen = 'https://picsum.photos/300'
const texto_alternativo = 'Esto es una imagen de picsum'

    return (
        <>
            <h2>{saludo}</h2>
            <img src={imagen} alt = {texto_alternativo}/>
        </>
    )
}


export default Variables