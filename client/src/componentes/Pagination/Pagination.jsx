import React from "react";
import styles from "../Pagination/Pagination.module.css";
import { useSelector,useDispatch } from "react-redux";
import { currentPage } from "../../Redux/actions";

const Pagination = ({ dogsPerPage, pagination, allDogs,  }) => {

  const pagesNumber = [];
  const state = useSelector((state)=>state)
  const dispatch = useDispatch()

  for (let i = 1; i <= Math.ceil(allDogs.length / dogsPerPage); i++) {
    pagesNumber.push(i);
  }


  const handlerPrev = () => {
    if (state.setCurrentPage === 1) return;
    pagination(state.setCurrentPage - 1);
  };

  const handlerNext = () => {
    if (state.setCurrentPage === pagesNumber.length) return;
    pagination(state.setCurrentPage + 1);
  };

  return (
    <div className={styles.conteiner}>
      <div onClick={handlerPrev} className={styles.prevNext}>
        <h4>Prev</h4>
      </div>
      {pagesNumber &&
        pagesNumber.map((page) => {
          return (
            <div key={page} className={styles.pages}>
              <h2
                className={styles.pagesNumber}
                onClick={() => dispatch(currentPage(page))}
              >
                {page}
              </h2>
            </div>
          );
        })}
      <div onClick={handlerNext} className={styles.prevNext}>
        <h4>Next</h4>
      </div>
    </div>
  );
};

export default Pagination;
