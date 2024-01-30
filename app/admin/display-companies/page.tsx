"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DocumentData, QuerySnapshot, collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseApp from "@/firebase/config";

export default function DisplayCompanies() {

  const [data, setData] = useState<QuerySnapshot<DocumentData> | null>(null);

  React.useEffect(() => {
    const db = getFirestore(firebaseApp);
    const ref = collection(db, "comapnies");

    let docs: QuerySnapshot<DocumentData>;
    const fetchData = async () => {
      docs = await getDocs(ref);
      setData(docs);
    }
    fetchData();
  }, []);


  const rows: any = [];

  data?.forEach((doc) => {
    const docData = doc.data();
    rows.push(
      <TableRow>
        <TableCell className="font-medium">{docData["name"]}</TableCell>
        <TableCell>{docData["description"]}</TableCell>
      </TableRow>
    );
  })

  return (
    <div className="flex items-center justify-center w-full">
      <Table className="max-width-full border rounded-md px-20">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </Table>

    </div>
  );
}


