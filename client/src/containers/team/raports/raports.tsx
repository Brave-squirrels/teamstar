import styles from"./raports.module.scss";
import React from "react";

const dupa : any = [1,2,3]
const Raports = (props : any ) => {
  return <div className={styles.wrapper}> 
      {dupa.map((raport : any) =><div className={styles.container}>
          <div className={styles.raportColumn}>
            <div>Raport</div> 
            <div>Data</div>
          </div>
          <div className={styles.raportColumn}>
              <div>Author</div>
              <div>Delete Raport</div>
          </div>
          <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
          </p>
      </div>)}


  </div>;
};

export default Raports;