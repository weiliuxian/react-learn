import React from 'react'
// import ThreeLayout from './components/common/ThreeLayout'
// import NumberInput from './components/NumberInput'
// import FormTest from './components/FormTest'
import CheckBoxGroupTest from './components/common/CheckBoxGroup/Test'
import RadioBoxGroupTest from './components/common/RadioBoxGroup/Test'
import Select from './components/common/Select/Test'
// import ValidationComp from './components/ValidationComp'
import { A, B } from './components/Comps'
import withLog from './HOC/withLog'
import withLogin from './HOC/withLogin'

import BannerTest from './components/common/Banner/Test'
import NewContext from './NewContext'
const aRef = React.createRef();
let ALog1 = withLog(A);
// ALog1 = withLog(ALog1);
let BLog1 = withLogin(B);
BLog1 = withLog(BLog1);
export default function APP() {

    return (
        <div>
           {/* <ThreeLayout
            left={<div>左边栏</div>}
            right={<div>右边栏</div>}
        >
               <div style={{
                   border: '1px solid red'
               }}>
                   <h1>主区域</h1>
               </div>
            </ThreeLayout> 
            <NumberInput />
            <hr/>
            <div>
                <FormTest />
            </div>

            <hr /> */}

            {/* <div> */}
                <CheckBoxGroupTest />
            {/* </div> */}

            <RadioBoxGroupTest />

            <Select />

            {/* <ValidationComp a={1} b c={2} d={<div>wtwerew</div>} F={Select} i={{name:'dsfsdf',age:10}}/> */}

            <ALog1 a={1} isLogin={true} ref={aRef}/>
            <BLog1 b={1} isLogin={true} />

            <BannerTest />

            <div>
                <NewContext />
            </div>
        

        </div>
    )
}
