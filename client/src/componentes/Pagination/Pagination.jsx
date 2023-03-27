import React from "react";
import styles from "../Pagination/Pagination.module.css";

const Pagination = ({ dogsPerPage, pagination, allDogs, currentPage }) => {
  const pagesNumber = [];

  for (let i = 1; i <= Math.ceil(allDogs.length / dogsPerPage); i++) {
    pagesNumber.push(i);
  }


  const handlerPrev = () => {
    if (currentPage === 1) return;
    pagination(currentPage - 1);
  };

  const handlerNext = () => {
    if (currentPage === pagesNumber.length) return;
    pagination(currentPage + 1);
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
                onClick={() => pagination(page)}
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
