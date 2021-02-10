import React, { useEffect, useState } from "react";
import axios from "axios";
import Dexie from "dexie";
import BookTable from "./table";
import AppBar from "./appBar"

const BookStore = () => {
  const db = new Dexie("bookStore");
  db.version(1).stores({
    books:
      "++id, authors, average_rating, bookID, isbn, language_code, price, ratings_count, title",
  });

  const pagelimit = 15;

  const [offSet, setOffSet] = useState(1);
  const [totalData, setTotalData] = useState([]);
  const [totalCount, setTotalCount] = useState(1);

  const setAllData = () => {
    axios
      .get(
        `https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json`
      )
      .then(async (res) => {
        await db.books.bulkAdd(res.data);
      });
    getTotalCount();
    getData(1);
  };

  const getTotalCount = async () => {
    let count = await db.books.count();
    setTotalCount(count);
  };

  const getData = async (page) => {
    setOffSet(page);
    const bookData = await db.books
      .offset(page * pagelimit)
      .limit(pagelimit)
      .toArray();

    setTotalData(bookData);
  };

  const pageChanged=(page)=>{
    getData(page)
  }

  useEffect(() => {
    setAllData();
  }, []);

  return (
    <div className="App">
      <AppBar />
      <BookTable totalData={totalData} totalCount={totalCount} getData={getData} offSet={offSet} totalCount={totalCount} pageChanged={pageChanged} />
    </div>
  );
};

export default BookStore;
