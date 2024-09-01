export const Greeting = ({name,children}) =>{
    return(
        <>
        <h1>こんにちは、{name}</h1>
        {children}
        
        </>
    )
}

export default Greeting;