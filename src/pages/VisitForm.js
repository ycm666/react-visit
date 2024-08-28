/* eslint-disable */ 
import axios from "axios";
import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive"

import 'bootstrap/dist/css/bootstrap.min.css'

// MediaQuery 
// $ npm install react-responsive


function VisitForm(){ 

    const isPc = useMediaQuery({
        query : "(min-width:1024px)"
      });
      const isTablet = useMediaQuery({
        query : "(min-width:768px) and (max-width:1023px)"
      });
      const isMobile = useMediaQuery({
        query : "(max-width:767px)"
      });
  
    //   console.log(isPc);
    //   console.log(isTablet);
    //   console.log(isMobile);
  
      let screen_style={ margin:'auto', minWidth:'600px', width: '600px'};
      if(isPc){
         screen_style = { margin:'auto', minWidth:'600px', width: '600px'};
      }else if(isTablet){
        screen_style = { margin:'auto', minWidth:'600px', width: '90%'};
      }else if(isMobile){
        screen_style = { margin:'auto', minWidth:'400px', width: '90%'};
      }

    const [visit,setVisit] = useState({name:"",content:"",pwd:""});
      
    // Page이동(경로이동)
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
        axios.post('https://ycm111.shop/demo_visit/rest/visit',visit)
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
               <div style={screen_style}>
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