function Greeting(props) {
    console.log(props); // This will show the props object in your browser's console.

    return (
        <div className="greeting">
            <h1>Welcome, {props.name}!</h1>
            <p>{props.message}</p>
        </div>
    );
}

export default Greeting;