

import { useState,useEffect } from "react"; //para usar el hook useState o useEffect hay que importarlo
import Header from "./components/Header";
import Guitar from "./components/guitar";
import { db } from "./data/db";

function App() {

  //me creo esta variable parapara definir el inicio del carrito y pueda hacer el carrito persistente:
  const initialCart=()=>{
    const localStorageCart=localStorage.getItem("cart");
    return localStorageCart ?JSON.parse(localStorageCart) : []
  }

  //State del componente gitarra
  const [data] = useState(db);

  //State del carrito,esta vez como se  van añadiendo guitarras al carrito ,sera de tipo array
  const [cart,setCart]=useState(initialCart);

  //Creo una variable constante parav indicar el maximo de productos iguales poder comprar
  const MAX_ITEM=5;
  const MIN_ITEM=1;

  //uso el useEffect aqui para que se me almacene los productso de forma persistente cada vez que entre en la web
  useEffect(()=>{
    //uso el use effect con el metodo localStorage al que se le pasan 2 parametros
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])


  //Funcion para agregar al carrito sin repetir el producto:
  // ...cart  añado el spread operator de cart para ir añadiendo en un array los elementos y por ultimo añadimos un elemento que le ha llemado item como ultimo elemento
  //así  asegura de que el estado del carrito se actualice correctamente y mantenga todos los elementos previos más el nuevo elemento guitarra.
  function addToCart(item){
    //el findIndex es para para buscar el índice del primer elemento en un array que cumple con una condición específica. Este método devuelve el índice del primer elemento que satisface la función de prueba proporcionada, o -1 si ningún elemento cumple la condición.
    const itemExist=cart.findIndex(guitarraExiste=>guitarraExiste.id===item.id);

    if(itemExist>=0){//existe en el carrito
      //añadir mas unidades si ya existe y quiero comprar mas con un limite
      if(cart[itemExist].quantity>=MAX_ITEM){
        return
      }
      const updatedCart=[...cart];
      //le sumo uno cada vez que pulso agregar a la propiedad quantiti del iten existente
      updatedCart[itemExist].quantity++;
      //Lo seteo
      setCart(updatedCart);
    }else{
      //le añado una nueva propiedad al objeto que es la primera cantidad q se agrega es 1
      item.quantity=1;
      setCart([...cart,item])
      //llamo a la funcion del local Storage
    }
  }

  //funcion para eliminar articulos:
  function removeFromCart(id){
    //con filter me devuelve el arreglo del carrito con los elementos que tengan el id distinto al elemento que hize  click para eliminar 
    setCart(prevCart=>prevCart.filter(guitarra=>guitarra.id!==id))
  }

  //funcion incrementar cantidad al carrito hasta un maximo de 5(constante MAX_ITEM):
  function increaseQuantity(id){
    const updateCart=cart.map(item=>{
      if(item.id===id && item.quantity < MAX_ITEM){
        return{
          ...item,
          quantity:item.quantity+1
        }
      }
      return item;
    })
    setCart(updateCart);
  }

    //funcion decrementar cantidad al carrito hasta un minimo de 1(MIN_ITEM):
    function decreaseQuantity(id){
      const updateCart=cart.map(item=>{
        if(item.id===id && item.quantity > MIN_ITEM){
          return{
            ...item,
            quantity:item.quantity-1
          }
        }
        return item;
      })
      setCart(updateCart);
    }

    //funcion para borrar Carrito:
    function cleanCart(){
      //seteo el carro al aary vacio para cuando pulse el boton el arry se quede vacio
      setCart([])
    }

  return (
    <>
      <Header 
        //paso el carrito y las funciones  al header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {/**Dentro del map me creo el objeto guitarra que luego dentro de el componente guitarra me creo su props */}
         {/**Me creo esto por que al usar .map  necesito que cada objeto creado tenga un key unico y por eso le paso el id de cada objeto que es unico,por tanto siempre al usar map hayq crear un props de key */}
          {data.map((guitarra)=>(

            <Guitar
              key={guitarra.id}  
              guitarra={guitarra}
              setCart={setCart}
              addToCart={addToCart}
            />

          ))}
                      

        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA  &copy; - Jose Manuel Polo (2024)&reg; 
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
