/* eslint-disable */ 
import axios from "axios";
import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'


function VisitForm(){ 

    const [visit,setVisit] = useState({name:"",content:"",pwd:""});
       
    const navigate = useNavigate();

    function updateData(e){
        let value = e.target.value;
        let id    = e.target.id;
        setVisit({...visit,[id]:value});
    }

    function addVisit(){

        if(visit.name==''){
            alert('이름을 입력하세요!.');
            return;
        }
        if(visit.content==''){
            alert('내용을 입력하세요!.');
            return;
        }
        if(visit.pwd==''){
            alert('비밀번호를 입력하세요!.');
            return;
        }
       // axios.defaults.withCredentials = true;
        axios.post('https://3.35.18.174.nip.io/demo_visit/rest/visit',visit)
        .then((res)=>{

          //화면 초기화
          setVisit({name:"",content:"",pwd:""});
          
          navigate('/');

        })
        .catch((error)=>{
          console.log(error);
        });  
    }

    
    return ( 
           <div>
               <div style={{width:"500px",margin:"auto",padding:"10px"}}>
                    <form className="form-inline">
                        <h2 style={{ color:'#999',fontSize:'20px'}}>♣ 방명록 작성하기 ♣</h2> 
                        <br/>
                        <input className="form-control" id="name" value={visit.name} onChange={updateData} placeholder="작성자명을 입력하세요" />
                        <br/>
                        <textarea className="form-control" style={ {width:'100%',resize:'none'} } id="content" rows={5} cols={50} onChange={updateData} value={visit.content} placeholder="내용을 입력하세요"></textarea>
                        <br/>
                        <input className="form-control" type="password" id="pwd" value={visit.pwd} onChange={updateData} placeholder="비밀번호 입력하세요"/>
                        <br/>
                        <input className="btn btn-success"  type="button" value="글올리기" onClick={ addVisit }/>
                    </form>    
                </div>

            </div>

    ); 
} 
export default VisitForm;