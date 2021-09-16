import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


const getLocalStorage=()=>{
  
  let list= localStorage.getItem('list');
  
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }else{
    return []
  }

}

function App() {

  const [name, setName] = useState('')
  //sin local
  // const [list, setList] = useState([])
  //con local storage
  const [list, setList] = useState(getLocalStorage())
  const [IsEndit, setIsEndit] = useState(false)
  const [editID,setEditID]= useState(null)

  //usado en los mensajes
  const [alert, setAlert] = useState(
    {show:false,
      msg:'',
      type:''}
    );

    const alertaVacia={show:false,
      msg:'',
      type:''}

  //funcion del submit
  const resolverSubmit=(e)=>{
    e.preventDefault();

    console.log("hola");

    
    
    if (!name) {
      // desplegar alerta 
      let mensaje={show:true,
        msg:'el item esta vacio , vuelva a mandarlo llenando el bloque ejm:huevos',
        type:'danger'}
        //mensaje
        setAlert(mensaje)

        //desaparesca 
      setTimeout(() => {
        setAlert(alertaVacia)
      }, 3000);
      
      

    }
    else if(name && IsEndit){
      //tratar con editar el componente
      setList(list.map((item)=>{
          if(item.id===editID){
            return {...item,title:name}
          }
        
          return item
      }))

      //volvemos todo al valor vacio
      setName('')
      setEditID(null)
      setIsEndit(false)


      let mensaje={show:true,
        msg:'Exelente, fue editado con exito',
        type:'success'}

        //aparece el mensaje
        setAlert(mensaje)
        //desaparece
        setTimeout(() => {
          setAlert(alertaVacia)
        }, 3000);

      

    }
    else{
      // mirar aleerta
      let mensaje={show:true,
        msg:'Exelente, fue ingresado con exito',
        type:'success'}

        //aparece el mensaje
        setAlert(mensaje)
        //desaparece
        setTimeout(() => {
          setAlert(alertaVacia)
        }, 3000);
      

      //crear el item
      const newItem={id:  new Date().getTime().toString(), 
        title:name
      }

      //anadir a las lista
      setList([...list,newItem])

      //se vuekva el name vacio denuevo
      setName('')
      

    }
    
  }

  const borrarLista=()=>{
    
    //borrar lista
      setList([])
    
    //mensaje
    let mensaje={show:true,
      msg:'Exelente, fue borrado toda la lista con exito',
      type:'success'}

      setAlert(mensaje)

      setTimeout(() => {
        setAlert(alertaVacia)
      }, 5000);




  }

  //eliminar el item

  const remueveItem=(id)=>{
     //mensaje
     let mensaje={show:true,
      msg:'Exelente,el item fue borrado  de la lista con exito',
      type:'success'}

      setAlert(mensaje)

      setTimeout(() => {
          setAlert(alertaVacia)
      }, 3000);

      //retorne lso qu no son iguales al id mandado
      setList(list.filter((f)=>{
        return f.id !==id
      }))

  }

  //editar el item
  const editItem=(id)=>{

    let itemElegido= list.find((item)=>{
      return item.id===id; })
      
      setIsEndit(true)

      setEditID(id)


//cambiamos el value name por el set name
      setName(itemElegido.title)


  }


  // console.log(name);


  /// para guardar en local storage
  useEffect(() => {
      localStorage.setItem('list',JSON.stringify(list))
  }, [list])


  return <section className="section-center" >
   
   <form className="grocery-form" onSubmit={resolverSubmit}>
      {alert.show && <Alert {...alert} />} 
      <h3> Listado de Viveres </h3>
      <div className="form-control">
        <input type="text" 
        className="grocery" 
        placeholder='ejm: huevos' 
        value={name}
         onChange={e=>{
          setName(e.target.value)

        }} />
        <button  type="submit" className="submit-btn" >
            {/* si edit es true editar */}
            {IsEndit ? 'editar': 'Guardar'}
        </button>

      </div>
    </form>

    {/* //hacer condicional si existe lista */}
    {list.length >0 && (
      <div className="grocery-container">
          
          {/* //importamos la lista i mandar los valores creados*/}
          <List items={list}  remueveItem={remueveItem} editItem={editItem} />

          <button className="clear-btn" onClick={borrarLista}>
              Borrar Todos
          </button>

      </div>
    )}
    
  </section>
}

export default App
