/* eslint-disable */
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMediaQuery } from "react-responsive";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

// import 'bootstrap/dist/css/bootstrap.min.css'

function VisitInfiniteScroll() {
  axios.defaults.withCredentials = true;

  const isPc = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  // console.log(isPc);
  // console.log(isTablet);
  // console.log(isMobile);

  let screen_style = { margin: "auto", minWidth: "600px", width: "600px" };
  if (isPc) {
    screen_style = { margin: "auto", minWidth: "600px", width: "600px" };
  } else if (isTablet) {
    screen_style = { margin: "auto", minWidth: "600px", width: "90%" };
  } else if (isMobile) {
    screen_style = { margin: "auto", minWidth: "400px", width: "90%" };
  }

  const total_count = useRef(0);
  const count = useRef(3);
  const isLast = useRef(false);

  const [data, setData] = useState([]);
  const [visit, setVisit] = useState({ name: "", content: "", pwd: "" });

  // async function getData0(){
  //      const res = await axios.get('http://43.202.59.136:8080/demo_visit/rest/visits');
  //      //console.log(res.data.list);
  //      setData(res.data.list);
  // }

  const handleLoadMore = () => {
    //console.log("---handleLoadMore()---");
    count.current = count.current + 3;

    if (count.current >= total_count.current) {
      //
      isLast.current = true; // setLast(true); // true로 바꿔주자.
    } else {
      isLast.current = false; //setLast(false);
    }

    getData();
  };

  function getData() {
    //console.log("---getData()---");
    //axios.defaults.withCredentials = true;
    const url = "https://ycm111.shop/demo_visit/rest/visits/" + count.current;
    //const url = 'http://192.168.0.49:8080/rest/visits/' + count.current;
    axios
      .get(url)
      .then((res) => {
        //console.log('total_count',res.data.total_count);
        //console.log(res.data);
        total_count.current = res.data.total_count;
        //console.log(total_count);

        setData(res.data.list);
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log(res.data.list);
  }

  function updateData(e) {
    let value = e.target.value;
    let id = e.target.id;
    setVisit({ ...visit, [id]: value });
  }

  function addVisit() {
    // axios.defaults.withCredentials = true;
    axios
      .post("https://ycm111.shop/demo_visit/rest/visit", visit)
      .then((res) => {
        getData(0);
        //화면 초기화
        setVisit({ name: "", content: "", pwd: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteVisit(idx) {
    if (confirm("정말 삭제 하시겠습니까?") == false) return;

    console.log(idx);

    //alert(idx + " : delete");
    //const idx = e.target.id;

    // axios.defaults.withCredentials = true;
    axios
      .delete("https://ycm111.shop/demo_visit/rest/visit/" + idx)
      .then((res) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    //console.log("---useEffect()---");
    getData(0);
    //console.log(data);
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <InfiniteScroll
      className="h-[85%] smartPhone:h-[70%]  scrollbar-hide"
      pageStart={0}
      loadMore={getData}
    >
      <main>
        {/* <div className="flex flex-col items-center justify-center h-full"> */}
        <div className="flex flex-col h-full" style={screen_style}>
          {data &&
            data.map((v, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid black",
                  margin: "10px",
                  padding: "20px",
                  boxShadow: "1px 1px 3px black",
                }}
              >
                <div className="flex flex-row">
                  <span
                    style={{
                      display: "inline-block",
                      width: "80%",
                      textAlign: "left",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    ♥ {v.name}
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      width: "20%",
                      textAlign: "right",
                    }}
                  >
                    <IconButton
                      aria-label="delete"
                      id={v.idx}
                      onClick={() => deleteVisit(v.idx)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </span>
                </div>
                <p
                  style={{
                    textAlign: "left",
                    color: "gray",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {v.content.replaceAll("<br>", "\n")}
                </p>
                <p style={{ textAlign: "left", color: "#ccc" }}>{v.regdate}</p>
              </div>
            ))}

          {!isLast.current && (
            <button onClick={handleLoadMore} className="btn btn-success mybtn">
              더보기...
            </button>
          )}

          {isLast.current && (
            <button onClick={scrollToTop} className="btn btn-success mybtn">
              맨위로...
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
