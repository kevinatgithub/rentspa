import { FC } from "react";

const TestError:FC = (props:any) => {
    return <div style={{color:'red'}}>
        {props.children}
    </div>
}

export default TestError