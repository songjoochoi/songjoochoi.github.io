import React from "react";

function Jojo(props) {
    return (
        <div>
            <h1>{`이 만화의 이름은 ${props.title} 입니다.`}</h1>
            <h2>{`${props.desc}`}</h2>
        </div>
    );
}

export default Jojo;