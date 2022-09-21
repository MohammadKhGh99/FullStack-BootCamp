const re = document.getElementById('react');
ReactDOM.render(
    <div>
        <Hello></Hello>
        <Hello></Hello>
    </div>, re
);

function Hello(){
    return <h1>Hello World!</h1>;
}