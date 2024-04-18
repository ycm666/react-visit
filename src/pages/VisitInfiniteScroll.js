/* eslint-disable */ 
import axios from "axios";
import React, { useEffect, useRef, useState } from "react"; 
import InfiniteScroll from "react-infinite-scroller";

// import 'bootstrap/dist/css/bootstrap.min.css'

function VisitInfiniteScroll(){ 

    axios.defaults.withCredentials = true;
    
    
    const total_count = useRef(0);
    const count = useRef(5);
    const isLast = useRef(false);

    
    const [data,setData] = useState([]);
    const [visit,setVisit] = useState({name:"",content:"",pwd:""});
        
    // async function getData0(){
    //      const res = await axios.get('http://43.202.59.136:8080/demo_visit/rest/visits');
    //      //console.log(res.data.list);
    //      setData(res.data.list);
    // }
    
    const handleLoadMore = () => {
      //console.log("---handleLoadMore()---");
      count.current = count.current + 5;

      if (count.current>=total_count.current) { // 
        isLast.current = true;// setLast(true); // true로 바꿔주자.
      } else {
        isLast.current = false;//setLast(false);
      }

      
      getData();
      
    };


    function getData(){
         //console.log("---getData()---");
         //axios.defaults.withCredentials = true;
         const url = 'https://3.35.18.174.nip.io/demo_visit/rest/visits/' + count.current ;
         //const url = 'http://192.168.0.49:8080/rest/visits/' + count.current;
         axios.get(url)
              .then((res)=>{
                //console.log('total_count',res.data.total_count);
                //console.log(res.data);
                total_count.current = res.data.total_count;
                //console.log(total_count);
                
                setData(res.data.list);
              })
              .catch((error)=>{
                console.log(error);
              });
         //console.log(res.data.list);
    }



    function updateData(e){
        let value = e.target.value;
        let id    = e.target.id;
        setVisit({...visit,[id]:value});
    }

    function addVisit(){
       // axios.defaults.withCredentials = true;
        axios.post('https://3.35.18.174.nip.io/demo_visit/rest/visit',visit)
        .then((res)=>{
          getData(0);
          //화면 초기화
          setVisit({name:"",content:"",pwd:""});
        })
        .catch((error)=>{
          console.log(error);
        });  
    }

    function deleteVisit(e){
       
        if(confirm("정말 삭제 하시겠습니까?")==false)return;
       
        //alert(e.target.id + " : delete");
        const idx = e.target.id;
       // axios.defaults.withCredentials = true;
        axios.delete('https://3.35.18.174.nip.io/demo_visit/rest/visit/' + idx)
              .then((res)=>{
                getData();
              })
              .catch((error)=>{
                console.log(error);
              }); 
    }


    useEffect(() => {
      //console.log("---useEffect()---");
      getData(0);   
       //console.log(data);
    },[]);

    

    return ( 
      <InfiniteScroll
          className="h-[85%] smartPhone:h-[70%]  scrollbar-hide"
          pageStart={0}
          loadMore={getData}
      >
        <main>
          {/* <div className="flex flex-col items-center justify-center h-full"> */}
          <div className="flex flex-col h-full"  style={{ margin:'auto', minWidth:'600px', width: '600px'}}>
            { data &&
              data.map((v, index) => (
              <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '20px', boxShadow:'1px 1px 3px black' }}>
                 <p style={{textAlign:'left',color:'black',fontWeight:'bold'}}>♥ {v.name}</p>
                 <p style={{textAlign:'left',color:'gray',whiteSpace:'pre-wrap'}}>{v.content.replaceAll('<br>','\n')}</p>
                 <p style={{textAlign:'left',color:'#ccc'}}>{v.regdate}</p>
              </div>
            ))}

            {!isLast.current && (
              <button
                onClick={handleLoadMore}
                className="flex justify-center items-center h-10 w-full"
              >
                더보기...
              </button>
            )}

            <br></br>
            <br></br>

          </div>
        </main>    
      </InfiniteScroll>  
    ); 
} 
export default VisitInfiniteScroll;