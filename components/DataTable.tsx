"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import { useTheme } from "@/context/ThemeContext";

interface TableData {
  id: number;
  name: string;
  email: string;
  sales: number;
}

interface HeadCell {
  id: keyof TableData;
  label: string;
}

const headCells: HeadCell[] = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "sales", label: "Sales" },
];

export default function DataTable({ data }: { data: TableData[] }) {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof TableData>("id");
  const { theme } = useTheme();

  const handleSort = (property: keyof TableData) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...data].sort((a, b) => {
    const isAsc = order === "asc";
    return (isAsc ? 1 : -1) * (a[orderBy] > b[orderBy] ? 1 : -1);
  });

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff", // Matches MUI theme's background.paper
        boxShadow: 3,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id}>
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => handleSort(headCell.id)}
                  sx={{
                    color: theme === "dark" ? "#e5e7eb" : "#374151", // Matches MUI theme's text.primary
                    "&:hover": {
                      color: theme === "dark" ? "#ffffff" : "#111827",
                    },
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.id}>
              <TableCell
                sx={{
                  color: theme === "dark" ? "#e5e7eb" : "#374151", // Matches MUI theme's text.primary
                }}
              >
                {row.id}
              </TableCell>
              <TableCell
                sx={{
                  color: theme === "dark" ? "#e5e7eb" : "#374151",
                }}
              >
                {row.name}
              </TableCell>
              <TableCell
                sx={{
                  color: theme === "dark" ? "#e5e7eb" : "#374151",
                }}
              >
                {row.email}
              </TableCell>
              <TableCell
                sx={{
                  color: theme === "dark" ? "#e5e7eb" : "#374151",
                }}
              >
                {row.sales}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}