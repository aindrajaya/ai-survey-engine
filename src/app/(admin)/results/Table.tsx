"use client"

import * as React from "react"
import type { InferSelectModel } from "drizzle-orm"
import type { answers, formSubmissions, questions, fieldOptions } from "@/db/schema"

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

type FieldOption = InferSelectModel<typeof fieldOptions>

type Answer = InferSelectModel<typeof answers> & {
  fieldOption?: FieldOption | null
}

type Question = InferSelectModel<typeof questions> & {
  fieldOptions: FieldOption[]
}

type FormSubmission = InferSelectModel<typeof formSubmissions> & {
  answers: Answer[]
}

interface TableProps {
  data: FormSubmission[]
  columns: Question[]
}

const columnHelper = createColumnHelper<any>()

export function Table({ data, columns }: TableProps) {
  const tableColumns = React.useMemo(
    () => [
      columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: "Submission ID",
      }),
      ...columns.map((question: Question) => {
        return columnHelper.accessor(
          (row) => {
            const answer = row.answers.find((a: Answer) => a.questionId === question.id)
            return answer?.fieldOption ? answer.fieldOption.text : answer?.value
          },
          {
            id: question.id.toString(),
            header: question.text ?? "No Question Text",
            cell: (info) => info.getValue(),
          },
        )
      }),
    ],
    [columns],
  )

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

